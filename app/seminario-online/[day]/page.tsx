"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { seminarioOnline, AudioSeminarioOnline, SEMINARIO_BACKGROUND_VIDEO_ID } from "@/data/seminario-online"
import { VideoSection } from "@/components/session/VideoSection"
import { Calendar, Video as VideoIcon, ArrowLeft, Home, Play, X, Volume2, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video } from "@/data/sessions"
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
  const [selectedAudio, setSelectedAudio] = useState<AudioSeminarioOnline | null>(null)

  const dayNumber = parseInt(params?.day as string)
  const dia = seminarioOnline.find(d => d.day === dayNumber)

  if (!dia) {
    router.push("/seminario-online")
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

  // Convertir videos del seminario al formato Video para VideoSection
  const videosForSection: Video[] = dia.videos.map(video => ({
    id: video.id,
    title: video.title,
    cloudflareStreamId: video.cloudflareStreamId,
    vimeoId: undefined,
    duration: video.duration,
    description: video.description
  }))

  const handleAudioClick = (audio: AudioSeminarioOnline) => {
    setSelectedAudio(audio)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/seminario-online">
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
            <div className={`p-5 sm:p-8 lg:p-12 bg-gradient-to-br ${colors.gradient} text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                    Seminario On Line
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl ${colors.accent} bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg flex-shrink-0`}>
                    {dia.day}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 text-white">
                      {dia.title}
                    </h1>
                    {dia.date ? (
                      <p className="text-sm sm:text-lg text-white/90">{dia.date}</p>
                    ) : (
                      <p className="text-sm sm:text-lg text-white/80">Videos del seminario</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  {dia.videos.length > 0 && (
                    <button
                      onClick={() => document.getElementById('section-videos')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg border border-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    >
                      <VideoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="font-semibold text-white">
                        {videosConStreamId.length} / {dia.videos.length} videos
                      </span>
                    </button>
                  )}
                  {dia.audios.length > 0 && (
                    <button
                      onClick={() => document.getElementById('section-audios')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg border border-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="font-semibold text-white">
                        {dia.audios.length} audios
                      </span>
                    </button>
                  )}
                  {dia.slides && dia.slides.length > 0 && (
                    <button
                      onClick={() => document.getElementById('section-slides')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg border border-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    >
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="font-semibold text-white">
                        {dia.slides.length} slides
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Videos - Reproductor embebido */}
          {dia.videos.length > 0 && (
            <div id="section-videos" className="mb-10 scroll-mt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}>
                  <VideoIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Videos del Seminario
                </h2>
              </div>
              <div className="bg-white dark:bg-[#252525] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <VideoSection videos={videosForSection} />
              </div>
            </div>
          )}

          {/* Sección de Audios */}
          {dia.audios.length > 0 && (
            <div id="section-audios" className="mb-10 scroll-mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Sesiones en Audio
                </h2>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-6 ml-13">
                El contenido esencial del seminario en formato portátil. Ideal para repasar los conceptos clave en tu día a día.
              </p>
              <div className="flex flex-col gap-3">
                {dia.audios.map((audio, index) => (
                  <div
                    key={audio.id}
                    onClick={() => handleAudioClick(audio)}
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/30 dark:hover:border-[#DA7756]/30 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    {/* Número */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756]/10 dark:group-hover:bg-[#DA7756]/20 flex items-center justify-center transition-colors">
                      <span className="font-bold text-sm sm:text-base text-[#DA7756]">
                        {index + 1}
                      </span>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] transition-colors line-clamp-1">
                        {audio.title}
                      </h3>
                      {audio.description && (
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-1 mt-0.5">
                          {audio.description}
                        </p>
                      )}
                    </div>

                    {/* Botón de reproducir */}
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756] flex items-center justify-center transition-all duration-200">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-white transition-colors ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección de Slides */}
          {dia.slides && dia.slides.length > 0 && (
            <div id="section-slides" className="mb-10 scroll-mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Slides de las Sesiones
                </h2>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-6 ml-13">
                Material visual de apoyo para cada sesión. Descarga o visualiza las presentaciones.
              </p>
              <div className="flex flex-col gap-3">
                {dia.slides
                  .sort((a, b) => a.order - b.order)
                  .map((slide, index) => (
                  <a
                    key={slide.id}
                    href={slide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/30 dark:hover:border-[#DA7756]/30 hover:shadow-md transition-all duration-200"
                  >
                    {/* Número */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756]/10 dark:group-hover:bg-[#DA7756]/20 flex items-center justify-center transition-colors">
                      <span className="font-bold text-sm sm:text-base text-[#DA7756]">
                        {index + 1}
                      </span>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] transition-colors line-clamp-1">
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-1 mt-0.5">
                          {slide.description}
                        </p>
                      )}
                    </div>

                    {/* Icono de PDF */}
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756] flex items-center justify-center transition-all duration-200">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje si no hay contenido */}
          {dia.videos.length === 0 && dia.audios.length === 0 && (!dia.slides || dia.slides.length === 0) && (
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

          {/* Audio Player Modal */}
          {selectedAudio && (
            <div className="fixed inset-0 bg-[#1A1915]/80 dark:bg-[#000000]/80 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
              <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-[#252525] border-b border-[#E5E4E0] dark:border-[#333333] p-3 sm:p-4 flex items-center justify-between z-10">
                  <h2 className="text-base sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] line-clamp-1 pr-2">{selectedAudio.title}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAudio(null)}
                    className="flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Audio Player */}
                <div className="p-3 sm:p-6">
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

