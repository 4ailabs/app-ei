import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions, AdditionalResource, Audio, Video, PDF } from "@/data/sessions"
import { PDFSection } from "@/components/session/PDFSection"
import { DialogosAudioPlayer } from "./DialogosAudioPlayer"
import { VideoCard } from "@/components/session/VideoCard"
import { ResourceImage } from "./ResourceImage"
import { ResourceDiagram } from "./ResourceDiagram"
import { ResourceSlide } from "./ResourceSlide"
import {
  ArrowLeft,
  BookOpen,
  FolderPlus,
  Image as ImageIcon,
  FileText,
  Presentation,
  Video as VideoIcon,
  Headphones
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface RecursosAdicionalesPageProps {
  params: Promise<{ day: string }>
}

export default async function RecursosAdicionalesPage({ params }: RecursosAdicionalesPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const { day } = await params
  const dayNumber = parseInt(day)

  // Solo permitir para bloque 1
  if (dayNumber !== 1) {
    notFound()
  }

  // Obtener la sesión 1 para acceder a los recursos adicionales
  const sessionData = sessions.find(s => s.id === 1)

  if (!sessionData || !sessionData.additionalResources || sessionData.additionalResources.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-8 pb-24">
          {/* Back Button */}
          <div className="mb-6 animate-fade-in">
            <Link href={`/sesiones/bloque/${dayNumber}`}>
              <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0]">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <BookOpen className="mr-2 h-4 w-4" />
                Volver al Bloque {dayNumber}
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#252525] rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E5E4E0] dark:border-[#333333] text-center">
              <FolderPlus className="h-16 w-16 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Recursos Adicionales</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0]">Los recursos adicionales estarán disponibles próximamente.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href={`/sesiones/bloque/${dayNumber}`}>
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0]">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <BookOpen className="mr-2 h-4 w-4" />
              Volver al Bloque {dayNumber}
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header - Simplificado */}
          <div className="bg-white dark:bg-[#252525] rounded-2xl sm:rounded-3xl mb-6 p-6 sm:p-8 shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-xl">
                <FolderPlus className="h-6 w-6 sm:h-8 sm:w-8 text-[#706F6C] dark:text-[#A0A0A0]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#706F6C] dark:text-[#A0A0A0] block mb-1">
                  Material Extra
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                  Recursos Adicionales
                </h1>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] mb-3">
              Material complementario: videos, PDFs, audios, diagramas, slides e imágenes
            </p>
            <span className="inline-block text-xs sm:text-sm px-3 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#2F2F2F] text-[#706F6C] dark:text-[#A0A0A0] border border-[#E5E4E0] dark:border-[#333333]">
              {sessionData.additionalResources.length} recursos
            </span>
          </div>

          {/* Content - Organizado por tipo */}
          {(() => {
            const pdfs: PDF[] = []
            const audios: Audio[] = []
            const videos: Video[] = []
            const images: any[] = []
            const diagrams: any[] = []
            const slides: any[] = []

            sessionData.additionalResources.forEach((resource) => {
              if ('type' in resource) {
                switch (resource.type) {
                  case 'audio':
                    audios.push({
                      id: resource.id,
                      title: resource.title,
                      url: resource.url,
                      duration: resource.duration,
                      description: resource.description,
                      category: resource.category
                    })
                    break
                  case 'video':
                    videos.push({
                      id: resource.id,
                      title: resource.title,
                      cloudflareStreamId: resource.cloudflareStreamId,
                      vimeoId: resource.vimeoId,
                      duration: resource.duration,
                      description: resource.description
                    })
                    break
                  case 'image':
                    images.push(resource)
                    break
                  case 'diagram':
                    diagrams.push(resource)
                    break
                  case 'slide':
                    slides.push(resource)
                    break
                }
              } else {
                // Es un PDF
                pdfs.push(resource as PDF)
              }
            })

            return (
              <div className="space-y-6">
                {videos.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <VideoIcon className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Videos</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({videos.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <VideoCard key={video.id} video={video} index={index} />
                      ))}
                    </div>
                  </div>
                )}
                {pdfs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Documentos PDF</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({pdfs.length})</span>
                    </div>
                    <PDFSection pdfUrl="" pdfs={pdfs} sessionId={1} title="" />
                  </div>
                )}
                {audios.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Headphones className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Audios</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({audios.length})</span>
                    </div>
                    <div className="space-y-3">
                      {audios.map((audio) => (
                        <DialogosAudioPlayer key={audio.id} audio={audio} />
                      ))}
                    </div>
                  </div>
                )}
                {images.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ImageIcon className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Imágenes</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({images.length})</span>
                    </div>
                    <div className="space-y-4">
                      {images.map((image) => (
                        <ResourceImage key={image.id} {...image} />
                      ))}
                    </div>
                  </div>
                )}
                {diagrams.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Diagramas</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({diagrams.length})</span>
                    </div>
                    <div className="space-y-4">
                      {diagrams.map((diagram) => (
                        <ResourceDiagram key={diagram.id} {...diagram} />
                      ))}
                    </div>
                  </div>
                )}
                {slides.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Presentation className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                      <h2 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Presentaciones</h2>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">({slides.length})</span>
                    </div>
                    <div className="space-y-4">
                      {slides.map((slide) => (
                        <ResourceSlide key={slide.id} {...slide} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
