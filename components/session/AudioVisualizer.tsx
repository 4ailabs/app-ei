"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioVisualizerProps {
  audioUrl: string
  title: string
  description?: string
  backgroundVideoId?: string // ID de Cloudflare Stream para video de fondo
}

// Helper para obtener URL del video de Cloudflare Stream
function getCloudflareStreamUrl(streamId: string): string {
  return `https://customer-qhobzy75u1p8j3tq.cloudflarestream.com/${streamId}/iframe?muted=true&loop=true&autoplay=true&controls=false`
}

export function AudioVisualizer({ audioUrl, title, description, backgroundVideoId }: AudioVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [hasError, setHasError] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number | null>(null)

  // Simulated audio level animation when playing
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        // Simulate audio level with smooth random values
        setAudioLevel(prev => {
          const target = 0.3 + Math.random() * 0.5
          return prev + (target - prev) * 0.1
        })
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setAudioLevel(0)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setHasError(false)
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (e) {
      console.error("Error playing audio:", e)
      setHasError(true)
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setAudioLevel(0)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = clickPosition * audioRef.current.duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Dynamic scale based on audio level
  const orbScale = 1 + audioLevel * 0.3
  const glowIntensity = 0.3 + audioLevel * 0.5
  const pulseOpacity = 0.2 + audioLevel * 0.4

  return (
    <div className="w-full">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
        preload="auto"
      />

      {/* Visualizer Container */}
      <div className="aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1915] via-[#2A2925] to-[#1A1915] dark:from-[#0a0a0a] dark:via-[#151515] dark:to-[#0a0a0a] shadow-xl ring-1 ring-black/5 relative">

        {/* Background Video (si está disponible) */}
        {backgroundVideoId ? (
          <>
            <iframe
              src={getCloudflareStreamUrl(backgroundVideoId)}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              style={{ border: "none" }}
            />
            {/* Overlay oscuro para mejor contraste */}
            <div className="absolute inset-0 bg-black/30" />
          </>
        ) : (
          <>
            {/* Background ambient glow (fallback sin video) */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, rgba(218, 119, 86, ${pulseOpacity}) 0%, transparent 60%)`,
              }}
            />

            {/* Animated circles in background */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute rounded-full border border-[#DA7756]/10 transition-all duration-500"
                  style={{
                    width: `${120 + ring * 80 + audioLevel * 30}px`,
                    height: `${120 + ring * 80 + audioLevel * 30}px`,
                    opacity: isPlaying ? 0.3 - ring * 0.05 : 0.1,
                    transform: `scale(${1 + audioLevel * 0.1 * ring})`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Main orb / Play button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={togglePlay}
            className="relative group cursor-pointer focus:outline-none"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {/* Glow effect - más sutil con video de fondo */}
            {!backgroundVideoId && (
              <div
                className="absolute inset-0 rounded-full blur-xl transition-all duration-200"
                style={{
                  background: `rgba(218, 119, 86, ${glowIntensity})`,
                  transform: `scale(${orbScale * 1.5})`,
                }}
              />
            )}

            {/* Outer ring pulse - solo sin video de fondo */}
            {!backgroundVideoId && (
              <div
                className={`absolute inset-0 rounded-full border-2 border-[#DA7756]/40 transition-all duration-200 ${isPlaying ? 'animate-ping' : ''}`}
                style={{
                  transform: `scale(${orbScale * 1.2})`,
                  animationDuration: '2s',
                }}
              />
            )}

            {/* Main orb body - más pequeño con video de fondo */}
            <div
              className={`relative rounded-full bg-gradient-to-br from-[#DA7756] to-[#C4684A] shadow-lg flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(218,119,86,0.4)] ${
                backgroundVideoId
                  ? 'w-10 h-10 sm:w-12 sm:h-12'
                  : 'w-20 h-20 sm:w-28 sm:h-28'
              }`}
              style={{
                transform: backgroundVideoId ? 'scale(1)' : `scale(${orbScale})`,
              }}
            >
              {/* Inner highlight - solo sin video de fondo */}
              {!backgroundVideoId && (
                <div className="absolute top-2 left-3 sm:top-3 sm:left-4 w-5 h-3 sm:w-7 sm:h-5 bg-white/20 rounded-full blur-sm" />
              )}

              {/* Play/Pause icon */}
              <div className="relative z-10 text-white transition-transform duration-200 group-hover:scale-110">
                {isPlaying ? (
                  <Pause className={backgroundVideoId ? "w-4 h-4 sm:w-5 sm:h-5" : "w-8 h-8 sm:w-10 sm:h-10"} fill="currentColor" />
                ) : (
                  <Play className={`${backgroundVideoId ? "w-4 h-4 sm:w-5 sm:h-5" : "w-8 h-8 sm:w-10 sm:h-10"} ml-0.5`} fill="currentColor" />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Wave bars at bottom (solo si no hay video de fondo) */}
        {!backgroundVideoId && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
            {Array.from({ length: 20 }).map((_, i) => {
              const baseHeight = Math.sin((i / 20) * Math.PI) * 0.5 + 0.3
              const dynamicHeight = isPlaying
                ? baseHeight + audioLevel * Math.sin((i + Date.now() / 100) * 0.5) * 0.5
                : baseHeight * 0.3
              return (
                <div
                  key={i}
                  className="w-1 sm:w-1.5 bg-gradient-to-t from-[#DA7756] to-[#DA7756]/50 rounded-full transition-all duration-100"
                  style={{
                    height: `${Math.max(4, dynamicHeight * 48)}px`,
                    opacity: isPlaying ? 0.8 : 0.3,
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute top-4 left-4 right-14 sm:top-6 sm:left-6 sm:right-16 z-10">
          <p className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">
            {backgroundVideoId ? "Seminario" : "Audio"}
          </p>
          <h3 className="text-white text-sm sm:text-lg font-bold line-clamp-1 drop-shadow-lg">
            {title}
          </h3>
          {hasError && (
            <p className="text-red-400 text-xs mt-1">
              Error al cargar el audio
            </p>
          )}
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          )}
        </button>
      </div>

      {/* Progress bar and time */}
      <div className="mt-4 px-1">
        <div
          className="h-2 bg-[#E5E4E0] dark:bg-[#333333] rounded-full cursor-pointer overflow-hidden group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-[#DA7756] to-[#C4684A] rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
