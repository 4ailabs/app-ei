"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { createBlob, decode, decodeAudioData } from '@/lib/maestro/audioUtils';

export const useLiveSession = (systemPrompt: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Audio context refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Session ref
  const sessionRef = useRef<any>(null);

  // Stream and processor refs for cleanup
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const disconnect = useCallback(() => {
    setAnalyser(null);

    // Stop script processor
    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) {}
      scriptProcessorRef.current = null;
    }

    // Disconnect source node
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch (e) {}
      sourceNodeRef.current = null;
    }

    // Stop media stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close()).catch(() => {});
      sessionRef.current = null;
    }

    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close().catch(() => {});
      inputAudioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close().catch(() => {});
      outputAudioContextRef.current = null;
    }

    // Stop all playing sources
    for (const source of sourcesRef.current) {
      try {
        source.stop();
      } catch (e) {}
    }
    sourcesRef.current.clear();

    setIsConnected(false);
  }, []);

  const connect = useCallback(async () => {
    try {
      setIsError(false);

      // Dynamic import of @google/genai for client-side only
      const { GoogleGenAI, Modality } = await import('@google/genai');

      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });

      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Fetch API key from server
      const keyResponse = await fetch('/api/maestro/key');
      const { apiKey } = await keyResponse.json();

      if (!apiKey) {
        throw new Error('API key not available');
      }

      // Initialize GenAI Client
      const ai = new GoogleGenAI({ apiKey });

      // Setup Connection
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-preview-native-audio-dialog',
        callbacks: {
          onopen: () => {
            console.log('Live session opened');
            setIsConnected(true);

            // Process Input Audio
            const source = inputCtx.createMediaStreamSource(stream);
            sourceNodeRef.current = source;

            // Create analyser for audio level visualization
            const analyserNode = inputCtx.createAnalyser();
            analyserNode.fftSize = 256;
            setAnalyser(analyserNode);

            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            // Connect: source -> analyser -> scriptProcessor -> destination
            source.connect(analyserNode);
            analyserNode.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: any) => {
            // Handle Output Audio
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              const outputNode = ctx.destination;

              // Sync timing
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );

              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);

              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruptions
            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current) {
                source.stop();
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log('Live session closed');
            setIsConnected(false);
          },
          onerror: (err) => {
            console.error('Live session error:', err);
            setIsError(true);
            disconnect();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: systemPrompt,
        },
      });

      sessionRef.current = sessionPromise;

    } catch (error) {
      console.error('Failed to start session:', error);
      setIsError(true);
      disconnect();
    }
  }, [disconnect, systemPrompt]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    isConnected,
    isError,
    analyser
  };
};
