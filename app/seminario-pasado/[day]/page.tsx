"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { seminarioPasado } from "@/data/seminario-pasado"
import { VideoSection } from "@/components/session/VideoSection"
import { VideoCard } from "@/components/session/VideoCard"
import { Calendar, Video as VideoIcon, ArrowLeft, Home, Play, X, Volume2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video } from "@/data/sessions"
import { AudioSeminarioPasado, SEMINARIO_BACKGROUND_VIDEO_ID } from "@/data/seminario-pasado"
import { AudioVisualizer } from "@/components/session/AudioVisualizer"

// Paleta de colores estilo Claude de Anthropic
const dayColors = [
  {
    gradient: "from-[#DA7756] to-[#C4684A]",
    accent: "bg-[#DA7756]",
    text: "text-[#DA7756]",
    bg: "bg-[#DA7756]/10"
  },
  {
    gradient: "from-[#2ca58d] to-[#259078]",
    accent: "bg-[#2ca58d]",
    text: "text-[#2ca58d]",
    bg: "bg-[#2ca58d]/10"
  },
  {
    gradient: "from-[#706F6C] to-[#1A1915]",
    accent: "bg-[#706F6C]",
    text: "text-[#706F6C]",
    bg: "bg-[#F5F4F0]"
  }
]

export default function DayPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [selectedAudio, setSelectedAudio] = useState<AudioSeminarioPasado | null>(null)

  const dayNumber = parseInt(params?.day as string)
  const dia = seminarioPasado.find(d => d.day === dayNumber)
  
  if (!dia) {
    router.push("/seminario-pasado")
    return null
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA7756] dark:border-[#DA7756] mx-auto mb-4"></div>
          <p className="text-[#706F6C] dark:text-[#A0A0A0]">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const colors = dayColors[(dayNumber - 1) % dayColors.length]
  const videosConStreamId = dia.videos.filter(v => v.cloudflareStreamId)

  const handleVideoClick = (video: any) => {
    setSelectedVideo({
      id: video.id,
      title: video.title,
      cloudflareStreamId: video.cloudflareStreamId,
      vimeoId: undefined,
      duration: video.duration,
      description: video.description
    })
  }

  const handleAudioClick = (audio: AudioSeminarioPasado) => {
    setSelectedAudio(audio)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/seminario-pasado">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all text-[#706F6C] dark:text-[#A0A0A0]">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <Home className="mr-2 h-4 w-4" />
              Volver a Seminario On Line
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-[#252525] rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
            <div className={`p-8 lg:p-12 bg-gradient-to-br ${colors.gradient} text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-white">
                    Seminario On Line
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
                  <div className={`w-20 h-20 rounded-xl ${colors.accent} bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-3xl shadow-lg flex-shrink-0`}>
                    {dia.day}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
                      {dia.title}
                    </h1>
                    {dia.date ? (
                      <p className="text-lg text-white/90">{dia.date}</p>
                    ) : (
                      <p className="text-lg text-white/80">Videos del seminario</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {dia.videos.length > 0 && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                      <VideoIcon className="h-5 w-5 text-white" />
                      <span className="font-semibold text-white">
                        {videosConStreamId.length} / {dia.videos.length} videos
                      </span>
                    </div>
                  )}
                  {dia.audios.length > 0 && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                      <Volume2 className="h-5 w-5 text-white" />
                      <span className="font-semibold text-white">
                        {dia.audios.length} audios
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                    <Play className="h-5 w-5 text-white" />
                    <span className="font-semibold text-white">Haz clic en una tarjeta para reproducir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Videos Recuperados */}
          {dia.videos.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}>
                  <VideoIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Videos Recuperados
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dia.videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={{
                      id: video.id,
                      title: video.title,
                      cloudflareStreamId: video.cloudflareStreamId,
                      vimeoId: undefined,
                      duration: video.duration,
                      description: video.description
                    }}
                    index={index}
                    onPlay={handleVideoClick}
                    accentColor={colors.accent}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sección de Audios */}
          {dia.audios.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Sesiones en Audio
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dia.audios.map((audio, index) => (
                  <div
                    key={audio.id}
                    onClick={() => handleAudioClick(audio)}
                    className="bg-white dark:bg-[#252525] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5E4E0] dark:border-[#333333] group cursor-pointer"
                  >
                    {/* Audio Thumbnail con video de fondo */}
                    <div className="relative aspect-video bg-[#1A1915] overflow-hidden">
                      {/* Video thumbnail de fondo */}
                      <img
                        src={`https://customer-qhobzy75u1p8j3tq.cloudflarestream.com/${audio.backgroundVideoId || SEMINARIO_BACKGROUND_VIDEO_ID}/thumbnails/thumbnail.jpg?time=2s`}
                        alt={audio.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                      {/* Play Button pequeño */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DA7756] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                          <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#DA7756] rounded-md flex items-center justify-center font-semibold text-white shadow-lg text-xs sm:text-sm">
                          {index + 1}
                        </div>
                      </div>

                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-1 line-clamp-2 group-hover:text-[#DA7756] transition-colors text-sm sm:text-base">
                        {audio.title}
                      </h3>
                      {audio.description && (
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-2 mt-1">
                          {audio.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje si no hay contenido */}
          {dia.videos.length === 0 && dia.audios.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">
                Contenido próximamente
              </h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm max-w-md mx-auto">
                Los videos y audios de este día estarán disponibles pronto.
              </p>
            </div>
          )}

          {/* Video Player Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-[#1A1915]/80 dark:bg-[#000000]/80 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white dark:bg-[#252525] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-[#252525] border-b border-[#E5E4E0] dark:border-[#333333] p-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">{selectedVideo.title}</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedVideo(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Video Player */}
                <div className="p-6">
                  <VideoSection videos={[selectedVideo]} />
                </div>
              </div>
            </div>
          )}

          {/* Audio Player Modal */}
          {selectedAudio && (
            <div className="fixed inset-0 bg-[#1A1915]/80 dark:bg-[#000000]/80 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white dark:bg-[#252525] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-[#252525] border-b border-[#E5E4E0] dark:border-[#333333] p-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">{selectedAudio.title}</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedAudio(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Audio Player */}
                <div className="p-6">
                  <AudioVisualizer
                    audioUrl={selectedAudio.audioUrl}
                    title={selectedAudio.title}
                    description={selectedAudio.description}
                    backgroundVideoId={selectedAudio.backgroundVideoId || SEMINARIO_BACKGROUND_VIDEO_ID}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

