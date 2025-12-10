"use client"

import { Audio } from "@/data/sessions"
import { Headphones, Play, Pause, Clock, Sun, Moon, Sparkles, Heart } from "lucide-react"
import { useState, useRef } from "react"

interface AudioSectionProps {
  audios: Audio[]
}

const categoryInfo: Record<string, { label: string; icon: React.ReactNode; color: string; bgColor: string; darkBgColor: string; darkColor: string }> = {
  regulacion: {
    label: "Regulación",
    icon: <Heart className="h-4 w-4" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    darkBgColor: "dark:bg-red-900/20",
    darkColor: "dark:text-red-400"
  },
  ritual_matutino: {
    label: "Ritual Matutino",
    icon: <Sun className="h-4 w-4" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-900/20",
    darkColor: "dark:text-amber-400"
  },
  ritual_nocturno: {
    label: "Ritual Nocturno",
    icon: <Moon className="h-4 w-4" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    darkBgColor: "dark:bg-indigo-900/20",
    darkColor: "dark:text-indigo-400"
  },
  meditacion: {
    label: "Meditación",
    icon: <Sparkles className="h-4 w-4" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-900/20",
    darkColor: "dark:text-purple-400"
  }
}

export function AudioSection({ audios }: AudioSectionProps) {
  if (audios.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8">
        <Headphones className="h-10 w-10 sm:h-12 sm:w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-2 sm:mb-3" />
        <h3 className="text-base sm:text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay audios disponibles</h3>
        <p className="text-[#706F6C] dark:text-[#B4B4B4] text-xs sm:text-sm">Los audios estarán disponibles próximamente</p>
      </div>
    )
  }

  // Group audios by category
  const groupedAudios = audios.reduce((acc, audio) => {
    const category = audio.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(audio)
    return acc
  }, {} as Record<string, Audio[]>)

  const categories = Object.keys(groupedAudios)
  const hasMultipleCategories = categories.length > 1

  return (
    <div className="space-y-6">
      {hasMultipleCategories ? (
        // Grouped view
        categories.map((category) => {
          const info = categoryInfo[category] || {
            label: "General",
            icon: <Headphones className="h-4 w-4" />,
            color: "text-[#706F6C]",
            bgColor: "bg-[#F5F4F0]",
            darkBgColor: "dark:bg-[#4A4A4A]",
            darkColor: "dark:text-[#B4B4B4]"
          }
          return (
            <div key={category} className="space-y-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${info.bgColor} ${info.darkBgColor} ${info.color} ${info.darkColor} w-fit`}>
                {info.icon}
                <span className="text-sm font-medium">{info.label}</span>
                <span className="text-xs opacity-70">({groupedAudios[category].length})</span>
              </div>
              <div className="grid gap-3">
                {groupedAudios[category].map((audio) => (
                  <AudioPlayer key={audio.id} audio={audio} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        // Simple list view
        <div className="grid gap-3">
          {audios.map((audio) => (
            <AudioPlayer key={audio.id} audio={audio} />
          ))}
        </div>
      )}
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
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // Only render audio element if URL is valid
  const hasValidUrl = audio.url && audio.url.trim() !== ""

  return (
    <div className="bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-xl p-3 sm:p-4 hover:bg-[#ECEAE5] dark:hover:bg-[#393939] transition-colors border border-[#E5E4E0] dark:border-[#4A4A4A] overflow-hidden">
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

      <div className="flex items-center gap-2 sm:gap-4 w-full min-w-0">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          disabled={!hasValidUrl}
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border-2 border-[#DA7756] ${
            hasValidUrl
              ? 'text-[#DA7756] hover:bg-[#DA7756] hover:text-white'
              : 'text-[#DA7756]/50 cursor-not-allowed'
          }`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
          )}
        </button>

        {/* Info and Progress */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1 gap-2 min-w-0">
            <h4 className="font-medium text-[#1A1915] dark:text-[#ECECEC] truncate text-sm sm:text-base min-w-0 flex-1">{audio.title}</h4>
            {audio.duration && (
              <div className="flex items-center gap-1 text-xs text-[#706F6C] dark:text-[#B4B4B4] flex-shrink-0">
                <Clock className="h-3 w-3 hidden sm:block" />
                <span className="whitespace-nowrap">{audio.duration}</span>
              </div>
            )}
          </div>

          {audio.description && (
            <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4] truncate mb-2">{audio.description}</p>
          )}

          {/* Progress Bar */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <span className="text-[10px] sm:text-xs text-[#9B9A97] dark:text-[#8C8C8C] w-8 sm:w-10 flex-shrink-0">{formatTime(currentTime)}</span>
            <div className="flex-1 relative h-1.5 bg-[#E5E4E0] dark:bg-[#4A4A4A] rounded-full overflow-hidden min-w-0">
              <div
                className="absolute inset-y-0 left-0 bg-[#DA7756] rounded-full transition-all"
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
            <span className="text-[10px] sm:text-xs text-[#9B9A97] dark:text-[#8C8C8C] w-8 sm:w-10 text-right flex-shrink-0">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
