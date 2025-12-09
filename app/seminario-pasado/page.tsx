import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { seminarioPasado } from "@/data/seminario-pasado"
import { Calendar, Video as VideoIcon, ArrowLeft, Home, Play, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export default async function SeminarioPasadoPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const totalVideos = seminarioPasado.reduce((acc, dia) => acc + dia.videos.length, 0)
  const videosWithStreamId = seminarioPasado.reduce((acc, dia) => {
    return acc + dia.videos.filter(v => v.cloudflareStreamId).length
  }, 0)

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all text-[#706F6C] dark:text-[#A0A0A0]">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <Home className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-[#252525] rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border-2 border-[#DA7756] dark:border-[#DA7756]">
            <div className="p-8 lg:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-[#DA7756] dark:text-[#DA7756]" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#DA7756] dark:text-[#DA7756]">
                    Seminario On Line
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 text-[#1A1915] dark:text-[#E5E5E5]">
                  Videos del Seminario
                </h1>
                <p className="text-lg text-[#706F6C] dark:text-[#A0A0A0] mb-6">
                  Accede a todos los videos del seminario online. Organizados por día para facilitar tu navegación.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/10 border border-[#DA7756]/20 dark:border-[#DA7756]/20 px-4 py-2 rounded-full">
                    <VideoIcon className="h-5 w-5 text-[#DA7756] dark:text-[#DA7756]" />
                    <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{videosWithStreamId} / {totalVideos} videos disponibles</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/10 border border-[#DA7756]/20 dark:border-[#DA7756]/20 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-[#DA7756] dark:text-[#DA7756]" />
                    <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{seminarioPasado.length} días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Días - 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seminarioPasado.map((dia, index) => {
              const colors = dayColors[index % dayColors.length]
              const videosConStreamId = dia.videos.filter(v => v.cloudflareStreamId)
              const hasVideos = videosConStreamId.length > 0

              return (
                <Link
                  key={dia.day}
                  href={`/seminario-pasado/${dia.day}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-[#252525] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/30 dark:hover:border-[#E5E5E5]/30 h-full flex flex-col">
                    {/* Header con Gradiente */}
                    <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 rounded-xl ${colors.accent} bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-sm`}>
                            {dia.day}
                          </div>
                          {hasVideos && (
                            <CheckCircle2 className="h-6 w-6 text-white/90" />
                          )}
                        </div>
                        <h2 className="text-2xl font-bold mb-1">{dia.title}</h2>
                        {dia.date && (
                          <p className="text-sm text-white/80">{dia.date}</p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <VideoIcon className={`h-5 w-5 ${colors.text}`} />
                          <span className={`text-sm font-semibold ${colors.text}`}>
                            {videosConStreamId.length} / {dia.videos.length} videos
                          </span>
                        </div>
                      </div>

                      {/* Video List Preview */}
                      <div className="space-y-2 mb-4 flex-1">
                        {dia.videos.slice(0, 3).map((video) => (
                          <div
                            key={video.id}
                            className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                              video.cloudflareStreamId ? colors.bg : 'bg-[#F5F4F0] dark:bg-[#333333]'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              video.cloudflareStreamId ? colors.accent : 'bg-[#E5E4E0] dark:bg-[#4A4A4A]'
                            }`}>
                              {video.cloudflareStreamId ? (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              ) : (
                                <Clock className="h-3 w-3 text-[#9B9A97] dark:text-[#808080]" />
                              )}
                            </div>
                            <span className={`flex-1 truncate ${
                              video.cloudflareStreamId ? 'text-[#1A1915] dark:text-[#E5E5E5] font-medium' : 'text-[#9B9A97] dark:text-[#808080]'
                            }`}>
                              {video.title}
                            </span>
                          </div>
                        ))}
                        {dia.videos.length > 3 && (
                          <p className="text-xs text-[#9B9A97] dark:text-[#808080] text-center">
                            +{dia.videos.length - 3} videos más
                          </p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        className={`w-full py-3 px-4 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          hasVideos
                            ? `${colors.accent} text-white group-hover:shadow-md active:scale-[0.98]`
                            : 'bg-[#F5F4F0] dark:bg-[#333333] text-[#9B9A97] dark:text-[#808080]'
                        }`}
                      >
                        <Play className="h-4 w-4" />
                        <span>Ver Videos</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

