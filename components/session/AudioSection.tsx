"use client"

import { Audio } from "@/data/sessions"
import { Headphones, Play, Pause, Clock, Sun, Moon, Sparkles, Heart } from "lucide-react"
import { useState, useRef } from "react"

interface AudioSectionProps {
  audios: Audio[]
}

const categoryInfo: Record<string, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
  regulacion: {
    label: "Regulación",
    icon: <Heart className="h-4 w-4" />,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  ritual_matutino: {
    label: "Ritual Matutino",
    icon: <Sun className="h-4 w-4" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  ritual_nocturno: {
    label: "Ritual Nocturno",
    icon: <Moon className="h-4 w-4" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  meditacion: {
    label: "Meditación",
    icon: <Sparkles className="h-4 w-4" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
}

export function AudioSection({ audios }: AudioSectionProps) {
  if (audios.length === 0) {
    return (
      <div className="text-center py-8">
        <Headphones className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No hay audios disponibles</h3>
        <p className="text-gray-500 text-sm">Los audios estarán disponibles próximamente</p>
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
            color: "text-gray-600",
            bgColor: "bg-gray-50"
          }
          return (
            <div key={category} className="space-y-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${info.bgColor} ${info.color} w-fit`}>
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
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
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

      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          disabled={!hasValidUrl}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            hasValidUrl
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </button>

        {/* Info and Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 truncate pr-2">{audio.title}</h4>
            {audio.duration && (
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                <Clock className="h-3 w-3" />
                <span>{audio.duration}</span>
              </div>
            )}
          </div>

          {audio.description && (
            <p className="text-sm text-gray-500 truncate mb-2">{audio.description}</p>
          )}

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <div className="flex-1 relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-green-600 rounded-full transition-all"
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
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
