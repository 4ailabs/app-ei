import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { seminarioPasado } from "@/data/seminario-pasado"
import { Calendar, Video as VideoIcon, ArrowLeft, Home, Play, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const dayColors = [
  {
    gradient: "from-gray-800 via-gray-700 to-gray-800",
    accent: "bg-gray-700",
    text: "text-gray-700",
    bg: "bg-gray-50"
  },
  {
    gradient: "from-gray-900 via-gray-800 to-gray-900",
    accent: "bg-gray-800",
    text: "text-gray-700",
    bg: "bg-gray-50"
  },
  {
    gradient: "from-black via-gray-900 to-black",
    accent: "bg-black",
    text: "text-gray-700",
    bg: "bg-gray-50"
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
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-gray-100 transition-all rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <Home className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border border-gray-200">
            <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-yellow-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
                    Seminario On Line
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                  Videos del Seminario
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  Accede a todos los videos del seminario online. Organizados por día para facilitar tu navegación.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <VideoIcon className="h-5 w-5" />
                    <span className="font-semibold">{videosWithStreamId} / {totalVideos} videos disponibles</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">{seminarioPasado.length} días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Días */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 h-full flex flex-col">
                    {/* Header con Gradiente */}
                    <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 rounded-xl ${colors.accent} bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-lg`}>
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
                              video.cloudflareStreamId ? colors.bg : 'bg-gray-50'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              video.cloudflareStreamId ? colors.accent : 'bg-gray-300'
                            }`}>
                              {video.cloudflareStreamId ? (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              ) : (
                                <Clock className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className={`flex-1 truncate ${
                              video.cloudflareStreamId ? 'text-gray-900 font-medium' : 'text-gray-400'
                            }`}>
                              {video.title}
                            </span>
                          </div>
                        ))}
                        {dia.videos.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{dia.videos.length - 3} videos más
                          </p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          hasVideos
                            ? `${colors.accent} text-white group-hover:opacity-90 group-hover:scale-105`
                            : 'bg-gray-100 text-gray-400'
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

