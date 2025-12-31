import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { seminarioOnline } from "@/data/seminario-online"
import { Calendar, Video as VideoIcon, Home, CheckCircle2, ArrowRight, Volume2, FileText } from "lucide-react"
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
          {/* Header - Card destacada con borde naranja */}
          <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl mb-6 sm:mb-8 overflow-hidden animate-fade-in-up shadow-sm border-2 border-[#DA7756]">
            <div className="p-5 sm:p-8">
              {/* Título y badge */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                <div className="p-2.5 sm:p-3 bg-[#DA7756] rounded-lg sm:rounded-xl flex-shrink-0">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                    Seminario Online
                  </h1>
                  <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Programa completo de transformación y bienestar
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-5 sm:mb-6">
                <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                  Un viaje profundo de tres días explorando la neurociencia del bienestar, técnicas avanzadas de regulación
                  del sistema nervioso y herramientas prácticas para la transformación personal sostenible.
                </p>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#DA7756]/10 border border-[#DA7756]/20">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#DA7756]">
                    {seminarioOnline.length} Días
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#DA7756]/10 border border-[#DA7756]/20">
                  <VideoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#DA7756]">
                    {videosWithStreamId} Videos
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#DA7756]/10 border border-[#DA7756]/20">
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#DA7756]">
                    {totalAudios} Audios
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Días */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {seminarioOnline.map((dia) => {
              const videosConStreamId = dia.videos.filter(v => v.cloudflareStreamId)
              const hasContent = videosConStreamId.length > 0 || dia.audios.length > 0 || (dia.slides && dia.slides.length > 0)

              return (
                <Link
                  key={dia.day}
                  href={`/seminario-online/${dia.day}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-[#E5E4E0] dark:border-[#333333] h-full flex flex-col">
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      {/* Header con número y título */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-[#DA7756] flex items-center justify-center">
                            <span className="text-xl sm:text-2xl font-bold text-[#DA7756]">
                              {dia.day}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-1 group-hover:text-[#DA7756] transition-colors">
                            {dia.title}
                          </h2>
                          {hasContent && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" />
                              <span className="text-xs text-[#22C55E] font-medium">Disponible</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Descripción */}
                      {dia.description && (
                        <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed mb-4 line-clamp-3">
                          {dia.description}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#E5E4E0] dark:border-[#333333]">
                        {dia.videos.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <VideoIcon className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                            <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                              {videosConStreamId.length}
                            </span>
                          </div>
                        )}
                        {dia.audios.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Volume2 className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                            <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                              {dia.audios.length}
                            </span>
                          </div>
                        )}
                        {dia.slides && dia.slides.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                            <span className="text-xs sm:text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                              {dia.slides.length}
                            </span>
                          </div>
                        )}

                        {hasContent && (
                          <ArrowRight className="h-4 w-4 text-[#DA7756] ml-auto group-hover:translate-x-1 transition-transform" />
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

