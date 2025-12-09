"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { seminarioPasado } from "@/data/seminario-pasado"
import { VideoSection } from "@/components/session/VideoSection"
import { VideoCard } from "@/components/session/VideoCard"
import { Calendar, Video as VideoIcon, ArrowLeft, Home, Play, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video } from "@/data/sessions"

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

export default function DayPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const dayNumber = parseInt(params?.day as string)
  const dia = seminarioPasado.find(d => d.day === dayNumber)
  
  if (!dia) {
    router.push("/seminario-pasado")
    return null
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
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

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/seminario-pasado">
            <Button variant="ghost" className="group hover:bg-gray-100 transition-all rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <Home className="mr-2 h-4 w-4" />
              Volver a Seminario On Line
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border border-gray-200">
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
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                    <VideoIcon className="h-5 w-5 text-white" />
                    <span className="font-semibold text-white">
                      {videosConStreamId.length} / {dia.videos.length} videos disponibles
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                    <Play className="h-5 w-5 text-white" />
                    <span className="font-semibold text-white">Haz clic en una tarjeta para reproducir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Videos - 4 tarjetas (2x2 en desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Video Player Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedVideo(null)}
                    className="rounded-full"
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
        </div>
      </div>
    </div>
  )
}

