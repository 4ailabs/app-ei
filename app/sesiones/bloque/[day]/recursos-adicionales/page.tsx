import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions, Audio, Video, PDF } from "@/data/sessions"
import { DialogosAudioPlayer } from "./DialogosAudioPlayer"
import { ResourceSlide } from "./ResourceSlide"
import { ImageGallery } from "./ImageGallery"
import {
  ArrowLeft,
  FolderOpen,
  Presentation,
  Headphones,
  Images,
  MessageSquare,
  Sparkles,
  Sun,
  Moon,
  Home
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

  // Obtener todas las sesiones del bloque y combinar sus recursos adicionales
  const bloqueSessions = sessions.filter(s => s.day === dayNumber)

  // Combinar todos los recursos adicionales de las sesiones del bloque
  const allAdditionalResources = bloqueSessions.flatMap(s => s.additionalResources || [])

  // Usar la primera sesión como referencia para datos básicos
  const sessionData = bloqueSessions[0]

  if (!sessionData || allAdditionalResources.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-8 pb-24">
          <div className="mb-6 animate-fade-in">
            <Link href="/sesiones">
              <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0]">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <Home className="mr-2 h-4 w-4" />
                Volver a Sesiones
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#252525] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E5E4E0] dark:border-[#333333] text-center">
              <FolderOpen className="h-16 w-16 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Recursos Adicionales</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0]">Los recursos adicionales estarán disponibles próximamente.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Organizar recursos por tipo
  const audios: Audio[] = []
  const images: any[] = []
  const slides: any[] = []

  allAdditionalResources.forEach((resource) => {
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
        case 'image':
          images.push(resource)
          break
        case 'slide':
          slides.push(resource)
          break
      }
    }
  })

  // Categorizar audios
  const dialogos = audios.filter(audio => audio.title.toLowerCase().includes('diálogo'))
  const meditaciones = audios.filter(audio =>
    audio.category === 'meditacion' && !audio.title.toLowerCase().includes('diálogo')
  )
  const ritualesMatutinos = audios.filter(audio => audio.category === 'ritual_matutino')
  const ritualesNocturnos = audios.filter(audio => audio.category === 'ritual_nocturno')

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/sesiones">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <Home className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver a Sesiones</span>
              <span className="sm:hidden">Volver</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header - Estilo consistente con el resto de la app */}
          <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl mb-5 sm:mb-8 p-4 sm:p-6 lg:p-8 shadow-sm border-2 border-[#DA7756]">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#DA7756] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-1">
                      Recursos Adicionales
                    </h1>
                    <p className="text-xs sm:text-sm text-[#DA7756] font-medium">
                      Bloque {dayNumber} • Material Complementario
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-[#DA7756]/10 px-3 py-1.5 rounded-lg flex-shrink-0">
                    <Presentation className="h-4 w-4 text-[#DA7756]" />
                    <span className="text-sm font-semibold text-[#DA7756]">
                      {slides.length > 0 ? `${slides.length} presentaciones` : `${audios.length} audios`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="pt-4 sm:pt-5 border-t border-[#E5E4E0] dark:border-[#333333]">
              <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                Material complementario para profundizar tu aprendizaje: presentaciones, diálogos guiados, meditaciones, rituales y recursos visuales.
              </p>
            </div>

            {/* Mobile stats */}
            <div className="flex sm:hidden items-center gap-4 mt-4 pt-4 border-t border-[#E5E4E0] dark:border-[#333333] flex-wrap">
              {slides.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Presentation className="h-4 w-4 text-[#DA7756]" />
                  <span className="text-sm font-semibold text-[#DA7756]">{slides.length} presentaciones</span>
                </div>
              )}
              {audios.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Headphones className="h-4 w-4 text-[#DA7756]" />
                  <span className="text-sm font-semibold text-[#DA7756]">{audios.length} audios</span>
                </div>
              )}
              {images.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Images className="h-4 w-4 text-[#DA7756]" />
                  <span className="text-sm font-semibold text-[#DA7756]">{images.length} imágenes</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 sm:space-y-6">
            {/* Presentaciones / Slides */}
            {slides.length > 0 && (
              <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                  <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                    <Presentation className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                      Presentaciones
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                      Slides del seminario
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                    {slides.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {slides.map((slide) => (
                    <ResourceSlide key={slide.id} {...slide} />
                  ))}
                </div>
              </section>
            )}

            {/* Diálogos */}
            {dialogos.length > 0 && (
              <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                  <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                      Diálogos
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                      Conversaciones guiadas para la práctica
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                    {dialogos.length}
                  </span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {dialogos.map((audio) => (
                    <DialogosAudioPlayer key={audio.id} audio={audio} />
                  ))}
                </div>
              </section>
            )}

            {/* Meditaciones */}
            {meditaciones.length > 0 && (
              <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                  <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                      Meditaciones
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                      Prácticas guiadas de regulación
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                    {meditaciones.length}
                  </span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {meditaciones.map((audio) => (
                    <DialogosAudioPlayer key={audio.id} audio={audio} />
                  ))}
                </div>
              </section>
            )}

            {/* Rituales - Grid de 2 columnas */}
            {(ritualesMatutinos.length > 0 || ritualesNocturnos.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                {/* Rituales Matutinos */}
                {ritualesMatutinos.length > 0 && (
                  <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                      <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                        <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                          Rituales Matutinos
                        </h2>
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                          Comienza el día con intención
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                        {ritualesMatutinos.length}
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {ritualesMatutinos.map((audio) => (
                        <DialogosAudioPlayer key={audio.id} audio={audio} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Rituales Nocturnos */}
                {ritualesNocturnos.length > 0 && (
                  <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                      <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                        <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                          Rituales Nocturnos
                        </h2>
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                          Cierra el día con gratitud
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                        {ritualesNocturnos.length}
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {ritualesNocturnos.map((audio) => (
                        <DialogosAudioPlayer key={audio.id} audio={audio} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Galería de Imágenes */}
            {images.length > 0 && (
              <section className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
                <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-4 border-b border-[#E5E4E0] dark:border-[#333333]">
                  <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl">
                    <Images className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                      Galería de Imágenes
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                      Diagramas y recursos visuales
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                    {images.length}
                  </span>
                </div>
                <ImageGallery images={images} />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
