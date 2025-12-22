import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { seminarioOnline } from "@/data/seminario-online"
import { Calendar, Video as VideoIcon, Home, Play, CheckCircle2, Clock, ArrowRight, Volume2, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function SeminarioOnlinePage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const videosWithStreamId = seminarioOnline.reduce((acc, dia) => {
    return acc + dia.videos.filter(v => v.cloudflareStreamId).length
  }, 0)
  const totalAudios = seminarioOnline.reduce((acc, dia) => acc + dia.audios.length, 0)

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <Home className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Dashboard</span>
              <span className="sm:hidden">Inicio</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header - Estilo coherente con sesiones */}
          <div className="mb-5 sm:mb-8 animate-fade-in-up">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#DA7756] rounded-lg sm:rounded-xl flex-shrink-0">
                <Calendar className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Seminario Online</h1>
                <p className="text-xs sm:text-base text-[#706F6C] dark:text-[#A0A0A0] mt-0.5 sm:mt-1">
                  {seminarioOnline.length} días · {videosWithStreamId} videos · {totalAudios} audios
                </p>
              </div>
            </div>
          </div>

          {/* Grid de Días */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {seminarioOnline.map((dia) => {
              const videosConStreamId = dia.videos.filter(v => v.cloudflareStreamId)
              const hasContent = videosConStreamId.length > 0 || dia.audios.length > 0 || (dia.slides && dia.slides.length > 0)
              const totalContent = videosConStreamId.length + dia.audios.length + (dia.slides?.length || 0)

              return (
                <Link
                  key={dia.day}
                  href={`/seminario-online/${dia.day}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/50 dark:hover:border-[#DA7756]/50 h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 sm:p-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#DA7756] flex items-center justify-center font-bold text-xl sm:text-2xl text-white shadow-sm group-hover:scale-105 transition-transform">
                            {dia.day}
                          </div>
                          <div className="min-w-0">
                            <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] transition-colors">
                              {dia.title}
                            </h2>
                            {dia.date && (
                              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{dia.date}</p>
                            )}
                          </div>
                        </div>
                        {hasContent && (
                          <CheckCircle2 className="h-5 w-5 text-[#DA7756] flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>

                    {/* Content Stats */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dia.videos.length > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                            <VideoIcon className="h-3.5 w-3.5" />
                            <span className="font-medium">{videosConStreamId.length}/{dia.videos.length}</span>
                          </div>
                        )}
                        {dia.audios.length > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                            <Volume2 className="h-3.5 w-3.5" />
                            <span className="font-medium">{dia.audios.length}</span>
                          </div>
                        )}
                        {dia.slides && dia.slides.length > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                            <FileText className="h-3.5 w-3.5" />
                            <span className="font-medium">{dia.slides.length}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Preview - Solo mostrar si hay contenido */}
                      {hasContent ? (
                        <div className="space-y-2 mb-4 flex-1">
                          {/* Mostrar primeros 2 items de cualquier tipo */}
                          {videosConStreamId.slice(0, 1).map((video) => (
                            <div
                              key={video.id}
                              className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded-lg bg-[#F5F4F0] dark:bg-[#333333]"
                            >
                              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#706F6C] dark:bg-[#505050]">
                                <Play className="h-2.5 w-2.5 text-white ml-0.5" fill="currentColor" />
                              </div>
                              <span className="flex-1 truncate text-[#1A1915] dark:text-[#E5E5E5]">
                                {video.title}
                              </span>
                            </div>
                          ))}
                          {dia.audios.slice(0, videosConStreamId.length > 0 ? 1 : 2).map((audio) => (
                            <div
                              key={audio.id}
                              className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded-lg bg-[#F5F4F0] dark:bg-[#333333]"
                            >
                              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#706F6C] dark:bg-[#505050]">
                                <Volume2 className="h-2.5 w-2.5 text-white" />
                              </div>
                              <span className="flex-1 truncate text-[#1A1915] dark:text-[#E5E5E5]">
                                {audio.title}
                              </span>
                            </div>
                          ))}
                          {totalContent > 2 && (
                            <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] text-center pt-1">
                              +{totalContent - 2} elementos más
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center py-4">
                          <div className="text-center">
                            <Clock className="h-8 w-8 text-[#E5E4E0] dark:text-[#4A4A4A] mx-auto mb-2" />
                            <p className="text-xs text-[#9B9A97] dark:text-[#808080]">Próximamente</p>
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div
                        className={`w-full py-2.5 sm:py-3 px-4 rounded-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          hasContent
                            ? 'border border-[#DA7756] text-[#DA7756] group-hover:bg-[#DA7756] group-hover:text-white active:scale-[0.98]'
                            : 'bg-[#F5F4F0] dark:bg-[#333333] text-[#9B9A97] dark:text-[#808080]'
                        }`}
                      >
                        <span>{hasContent ? 'Ver Contenido' : 'Sin contenido'}</span>
                        {hasContent && (
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

