"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { seminarioOnline, AudioSeminarioOnline, SEMINARIO_BACKGROUND_VIDEO_ID } from "@/data/seminario-online"
import { VideoSection } from "@/components/session/VideoSection"
import { Calendar, Video as VideoIcon, Play, X, Volume2, FileText, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video } from "@/data/sessions"
import { AudioVisualizer } from "@/components/session/AudioVisualizer"

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA7756] mx-auto mb-4"></div>
          <p className="text-[#706F6C] dark:text-[#A0A0A0]">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

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
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/seminario-online">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <Home className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Seminario</span>
              <span className="sm:hidden">Seminario</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header - Igual que bloque de sesiones */}
          <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl mb-6 sm:mb-8 overflow-hidden animate-fade-in-up shadow-sm border-2 border-[#DA7756]">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#DA7756]" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#DA7756]">
                  Seminario Online
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-[#DA7756] flex items-center justify-center font-bold text-2xl sm:text-3xl text-white shadow-sm flex-shrink-0">
                  {dia.day}
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                    {dia.title}
                  </h1>
                  {dia.date && (
                    <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">{dia.date}</p>
                  )}
                </div>
              </div>

              {/* Stats badges - Estilo naranja sutil */}
              <div className="flex flex-wrap gap-2">
                {dia.videos.length > 0 && (
                  <button
                    onClick={() => document.getElementById('section-videos')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#DA7756]/10 border border-[#DA7756]/20 rounded-lg hover:bg-[#DA7756]/20 transition-colors"
                  >
                    <VideoIcon className="h-4 w-4 text-[#DA7756]" />
                    <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                      {videosConStreamId.length}/{dia.videos.length} videos
                    </span>
                  </button>
                )}
                {dia.audios.length > 0 && (
                  <button
                    onClick={() => document.getElementById('section-audios')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#DA7756]/10 border border-[#DA7756]/20 rounded-lg hover:bg-[#DA7756]/20 transition-colors"
                  >
                    <Volume2 className="h-4 w-4 text-[#DA7756]" />
                    <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                      {dia.audios.length} audios
                    </span>
                  </button>
                )}
                {dia.slides && dia.slides.length > 0 && (
                  <button
                    onClick={() => document.getElementById('section-slides')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#DA7756]/10 border border-[#DA7756]/20 rounded-lg hover:bg-[#DA7756]/20 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-[#DA7756]" />
                    <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                      {dia.slides.length} slides
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sección de Videos */}
          {dia.videos.length > 0 && (
            <div id="section-videos" className="mb-8 scroll-mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <VideoIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Videos
                </h2>
              </div>
              <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <VideoSection videos={videosForSection} />
              </div>
            </div>
          )}

          {/* Sección de Audios */}
          {dia.audios.length > 0 && (
            <div id="section-audios" className="mb-8 scroll-mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                    Audios
                  </h2>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">
                    Contenido esencial en formato portátil
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {dia.audios.map((audio, index) => (
                  <div
                    key={audio.id}
                    onClick={() => handleAudioClick(audio)}
                    className="group flex items-center gap-3 p-3 bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/40 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#F5F4F0] dark:bg-[#333333] flex items-center justify-center">
                      <span className="font-semibold text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] transition-colors truncate">
                        {audio.title}
                      </h3>
                      {audio.description && (
                        <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] truncate">
                          {audio.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756] flex items-center justify-center transition-colors">
                      <Play className="h-3.5 w-3.5 text-[#706F6C] group-hover:text-white transition-colors ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección de Slides */}
          {dia.slides && dia.slides.length > 0 && (
            <div id="section-slides" className="mb-8 scroll-mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DA7756] rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                    Slides
                  </h2>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">
                    Material visual de apoyo
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {dia.slides
                  .sort((a, b) => a.order - b.order)
                  .map((slide, index) => (
                  <a
                    key={slide.id}
                    href={slide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#F5F4F0] dark:bg-[#333333] flex items-center justify-center">
                      <span className="font-semibold text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] transition-colors truncate">
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] truncate">
                          {slide.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756] flex items-center justify-center transition-colors">
                      <FileText className="h-3.5 w-3.5 text-[#706F6C] group-hover:text-white transition-colors" />
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
                El contenido de este día estará disponible pronto.
              </p>
            </div>
          )}

          {/* Audio Player Modal */}
          {selectedAudio && (
            <div className="fixed inset-0 bg-[#1A1915]/80 dark:bg-[#000000]/80 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
              <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-[#252525] border-b border-[#E5E4E0] dark:border-[#333333] p-3 sm:p-4 flex items-center justify-between z-10">
                  <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5] truncate pr-2">{selectedAudio.title}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAudio(null)}
                    className="flex-shrink-0 hover:bg-[#F5F4F0] dark:hover:bg-[#333333]"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
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
