"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Mic, PhoneOff, AlertCircle, GraduationCap, Clock } from 'lucide-react';
import { useLiveSession } from '@/hooks/maestro/useLiveSession';

interface LiveVoiceInterfaceProps {
  onClose: () => void;
  systemPrompt: string;
}

export const LiveVoiceInterface: React.FC<LiveVoiceInterfaceProps> = ({
  onClose,
  systemPrompt
}) => {
  const {
    connect,
    disconnect,
    isConnected,
    isError,
    connectionStatus,
    analyser,
    timeRemaining,
    voiceRateLimit
  } = useLiveSession(systemPrompt);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Conectar automáticamente al montar
    connect();

    return () => {
      disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Analizar nivel de audio
  useEffect(() => {
    if (!isConnected || !analyser) {
      setAudioLevel(0);
      setIsSpeaking(false);
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const threshold = 30;

    const updateAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const normalizedLevel = Math.min(average / 100, 1);

      setAudioLevel(normalizedLevel);
      setIsSpeaking(average > threshold);

      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    };

    updateAudioLevel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isConnected, analyser]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    disconnect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0f0f0f] text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f0f] opacity-50"></div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <Mic size={24} className="mr-2 text-[#ea580c]" /> Sesión de Voz
          </h2>
          <div className="flex items-center gap-3">
            {/* Tiempo restante */}
            {isConnected && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono ${
                timeRemaining <= 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
              }`}>
                <Clock size={14} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
            {/* Estado de conexión */}
            <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
              {isConnected ? 'Conectado' : (connectionStatus || 'Conectando...')}
            </div>
          </div>
        </div>
        {/* Indicador de sesiones restantes */}
        {voiceRateLimit && (
          <div className="mt-2 text-xs text-gray-400 text-right">
            {voiceRateLimit.remaining} de {voiceRateLimit.limit} sesiones disponibles
          </div>
        )}
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-8">

        {isError ? (
          <div className="text-center p-8 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Error de Conexión</h3>
            <p className="text-gray-300 mb-6">No pudimos establecer conexión con el Maestro. Por favor verifica tu micrófono y conexión.</p>
            <button
              onClick={handleClose}
              className="bg-white text-red-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Volver
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Pulsing Orb */}
            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
              isConnected
                ? 'bg-[#ea580c] shadow-[0_0_50px_rgba(234,88,12,0.4)]'
                : 'bg-gray-600'
            } ${isConnected && isSpeaking ? 'animate-pulse' : ''}`}>
              <div className="flex items-center justify-center">
                {isConnected ? (
                  <GraduationCap size={80} className="text-white" />
                ) : (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </div>

            {/* Connection Ripples */}
            {isConnected && (
              <>
                <div className="absolute inset-0 rounded-full border border-[#ea580c]/30 scale-125 animate-ping opacity-20"></div>
                <div className="absolute inset-0 rounded-full border border-[#ea580c]/20 scale-150 animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}

            <div className="mt-12 text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Maestro IA
              </h3>
              <p className="text-[#b4b4b4]">
                {isConnected 
                  ? (isSpeaking ? 'Escuchando...' : 'Esperando...') 
                  : (connectionStatus || 'Estableciendo conexión segura...')}
              </p>

              {/* Audio Level Indicator */}
              {isConnected && (
                <div className="mt-6 flex items-center justify-center space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const barHeight = audioLevel * 20;
                    const isActive = i < barHeight;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-75 ${
                          isActive
                            ? isSpeaking
                              ? 'bg-[#ea580c]'
                              : 'bg-[#6366f1]'
                            : 'bg-gray-600'
                        }`}
                        style={{
                          height: isActive
                            ? isSpeaking
                              ? `${8 + Math.random() * 16}px`
                              : '16px'
                            : '8px'
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 p-8 pb-12 flex justify-center">
        <button
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          title="Terminar llamada"
        >
          <PhoneOff size={32} />
        </button>
      </div>
    </div>
  );
};
