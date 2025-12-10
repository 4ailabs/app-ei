"use client"

import { Audio } from "@/data/sessions"
import { Play, Pause, Clock, Headphones } from "lucide-react"
import { useState, useRef } from "react"

interface DialogosAudioPlayerProps {
  audio: Audio
}

export function DialogosAudioPlayer({ audio }: DialogosAudioPlayerProps) {
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
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const hasValidUrl = audio.url && audio.url.trim() !== ""

  return (
    <div className="bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-xl p-3 sm:p-4 border border-[#E5E4E0] dark:border-[#4A4A4A]">
      {hasValidUrl && (
        <audio
          ref={audioRef}
          src={audio.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      <div className="mb-2">
        <Headphones className="h-4 w-4 text-[#9B9A97] dark:text-[#8C8C8C]" />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={togglePlay}
          disabled={!hasValidUrl}
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
            hasValidUrl
              ? 'bg-green-600 dark:bg-green-500 text-white'
              : 'bg-[#E5E4E0] dark:bg-[#4A4A4A] text-[#9B9A97] dark:text-[#8C8C8C]'
          }`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h4 className="font-medium text-[#1A1915] dark:text-[#ECECEC] truncate text-sm sm:text-base flex-1">{audio.title}</h4>
            {audio.duration && (
              <div className="flex items-center gap-1 text-xs text-[#706F6C] dark:text-[#B4B4B4] flex-shrink-0">
                <Clock className="h-3 w-3 hidden sm:block" />
                <span>{audio.duration}</span>
              </div>
            )}
          </div>

          {audio.description && (
            <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4] truncate mb-2">{audio.description}</p>
          )}

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[10px] sm:text-xs text-[#9B9A97] dark:text-[#8C8C8C] w-8 sm:w-10">{formatTime(currentTime)}</span>
            <div className="flex-1 relative h-1.5 bg-[#E5E4E0] dark:bg-[#4A4A4A] rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-green-600 dark:bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-[10px] sm:text-xs text-[#9B9A97] dark:text-[#8C8C8C] w-8 sm:w-10 text-right">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
