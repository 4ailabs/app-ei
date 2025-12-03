"use client"

import { Audio } from "@/data/sessions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Headphones } from "lucide-react"
import { useState, useRef } from "react"

interface AudioSectionProps {
  audios: Audio[]
}

export function AudioSection({ audios }: AudioSectionProps) {
  if (audios.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audios</CardTitle>
          <CardDescription>Los audios estarán disponibles próximamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Audios</h2>
        <p className="text-gray-600 mb-6">
          Escucha los audios formativos de esta sesión
        </p>
      </div>
      <div className="grid gap-6">
        {audios.map((audio) => (
          <AudioPlayer key={audio.id} audio={audio} />
        ))}
      </div>
    </div>
  )
}

function AudioPlayer({ audio }: { audio: Audio }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-blue-600" />
          {audio.title}
        </CardTitle>
        {audio.description && (
          <CardDescription>{audio.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <audio
          ref={audioRef}
          src={audio.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.5 4l9 6-9 6V4z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
