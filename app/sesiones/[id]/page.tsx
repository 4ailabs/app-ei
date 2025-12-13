import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions } from "@/data/sessions"
import { SessionContentTabs } from "@/components/session/SessionContentTabs"
import {
  ArrowLeft,
  Lightbulb,
  Settings,
  Rocket,
  Cpu,
  Leaf,
  FileText,
  Video,
  Headphones,
  BookOpen,
  ClipboardList,
  Smartphone,
  Calendar,
  Clock,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SessionPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}

const sessionIcons = [Lightbulb, Settings, Rocket, Cpu, Leaf]

export default async function SessionPage({ params, searchParams }: SessionPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const { id } = await params
  const { tab } = await searchParams
  const sessionId = parseInt(id)
  const sessionData = sessions.find((s) => s.id === sessionId)

  if (!sessionData) {
    notFound()
  }

  const index = sessionId - 1
  const IconComponent = sessionIcons[index % sessionIcons.length]

  // Calculate content counts
  const contentCounts = {
    pdf: sessionData.pdfs?.length || (sessionData.pdfUrl ? 1 : 0),
    videos: sessionData.videos.length,
    audios: sessionData.audios.length,
    themes: sessionData.themes.length,
    protocols: sessionData.protocols?.length || 0,
    apps: sessionData.apps?.length || 0,
    additionalResources: sessionData.additionalResources?.length || 0
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 lg:py-12 pb-20 sm:pb-28 lg:pb-32">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 lg:mb-10 animate-fade-in">
          <Link href="/sesiones">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 sm:py-3 h-auto text-sm sm:text-base">
              <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
              <BookOpen className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Volver a Sesiones</span>
              <span className="sm:hidden">Volver</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Session Header with Image */}
          <div className="bg-white dark:bg-[#252525] rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in-up shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
            {/* Session Image Banner */}
            {sessionData.imageUrl && (
              <div className="relative h-48 sm:h-64 lg:h-96 overflow-hidden">
                <img
                  src={sessionData.imageUrl}
                  alt={sessionData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-4 sm:left-6 lg:left-10 right-4 sm:right-6 lg:right-10">
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-4 lg:mb-5">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm text-white inline-block">
                      Bloque {sessionData.day}
                    </span>
                    {sessionData.moduleNumber && (
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-black/40 backdrop-blur-sm text-white inline-block">
                        Módulo {sessionData.moduleNumber}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-3 lg:mb-4">
                    {sessionData.title}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed line-clamp-2 sm:line-clamp-none">{sessionData.description}</p>
                </div>
              </div>
            )}

            {/* Fallback Header (if no image) */}
            {!sessionData.imageUrl && (
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-[#DA7756] dark:bg-[#DA7756] rounded-2xl">
                    <IconComponent className="h-8 w-8 text-white dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white">
                        Bloque {sessionData.day}
                      </span>
                      {sessionData.moduleNumber && (
                        <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                          Módulo {sessionData.moduleNumber}
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-3">
                      {sessionData.title}
                    </h1>
                    <p className="text-lg text-[#706F6C] dark:text-[#A0A0A0]">{sessionData.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Bar */}
            <div className="px-3 sm:px-6 lg:px-10 py-3 sm:py-5 lg:py-7 bg-[#FAF9F7] dark:bg-[#2A2A2A] border-t border-[#E5E4E0] dark:border-[#333333]">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-10 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#706F6C] dark:text-[#A0A0A0]">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">Día {sessionData.day}</span>
                </div>
                {sessionData.moduleNumber && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[#706F6C] dark:text-[#A0A0A0]">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="font-medium">Módulo {sessionData.moduleNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#706F6C] dark:text-[#A0A0A0]">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">
                    {Object.values(contentCounts).reduce((a, b) => a + b, 0)} elementos
                  </span>
                </div>
                <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-0">
                  {contentCounts.pdf > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl">
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm">{contentCounts.pdf}</span>
                    </div>
                  )}
                  {contentCounts.videos > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg sm:rounded-xl">
                      <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-700 dark:text-purple-400 font-medium text-xs sm:text-sm">{contentCounts.videos}</span>
                    </div>
                  )}
                  {contentCounts.audios > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                      <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#DA7756]" />
                      <span className="text-[#DA7756] font-medium text-xs sm:text-sm">{contentCounts.audios}</span>
                    </div>
                  )}
                  {contentCounts.themes > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg sm:rounded-xl">
                      <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-orange-700 dark:text-orange-400 font-medium text-xs sm:text-sm">{contentCounts.themes}</span>
                    </div>
                  )}
                  {contentCounts.protocols > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 rounded-lg sm:rounded-xl">
                      <ClipboardList className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
                      <span className="text-red-700 dark:text-red-400 font-medium text-xs sm:text-sm">{contentCounts.protocols}</span>
                    </div>
                  )}
                  {contentCounts.apps > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg sm:rounded-xl">
                      <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-cyan-700 dark:text-cyan-400 font-medium text-xs sm:text-sm">{contentCounts.apps}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About This Module */}
          <div className="bg-white dark:bg-[#252525] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-2.5 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                Acerca de este módulo
              </h2>
            </div>

            {/* Main description */}
            <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed mb-4">
              {sessionData.description}
            </p>

            {/* Additional context */}
            <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
              Este módulo forma parte del <span className="font-semibold text-[#DA7756]">Bloque {sessionData.day}</span> del seminario.
              Aquí encontrarás material teórico y práctico cuidadosamente seleccionado para facilitar tu aprendizaje.
              Te recomendamos revisar primero el material en PDF, luego ver los videos explicativos,
              y finalmente practicar con los audios y protocolos disponibles.
            </p>

            {/* What you'll learn */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#E5E4E0] dark:border-[#333333]">
              <h3 className="text-sm sm:text-base font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-4">
                En este módulo encontrarás:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {contentCounts.pdf > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.pdf} {contentCounts.pdf === 1 ? 'Documento' : 'Documentos'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Material de lectura y guías de estudio
                      </p>
                    </div>
                  </div>
                )}
                {contentCounts.videos > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10">
                    <Video className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.videos} {contentCounts.videos === 1 ? 'Video' : 'Videos'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Explicaciones y demostraciones prácticas
                      </p>
                    </div>
                  </div>
                )}
                {contentCounts.audios > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#DA7756]/10 dark:bg-[#DA7756]/10">
                    <Headphones className="h-5 w-5 text-[#DA7756] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.audios} {contentCounts.audios === 1 ? 'Audio' : 'Audios'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Meditaciones y ejercicios guiados
                      </p>
                    </div>
                  </div>
                )}
                {contentCounts.themes > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10">
                    <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.themes} {contentCounts.themes === 1 ? 'Tema' : 'Temas'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Conceptos teóricos fundamentales
                      </p>
                    </div>
                  </div>
                )}
                {contentCounts.protocols > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/10">
                    <ClipboardList className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.protocols} {contentCounts.protocols === 1 ? 'Protocolo' : 'Protocolos'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Guías paso a paso para la práctica
                      </p>
                    </div>
                  </div>
                )}
                {contentCounts.apps > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/10">
                    <Smartphone className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                        {contentCounts.apps} {contentCounts.apps === 1 ? 'App' : 'Apps'}
                      </span>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                        Herramientas digitales complementarias
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-5 sm:mt-6 p-4 rounded-xl bg-[#FAF9F7] dark:bg-[#1A1A1A] border border-[#E5E4E0] dark:border-[#333333]">
              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] italic">
                <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5] not-italic">Sugerencia:</span> Para aprovechar al máximo este módulo,
                dedica tiempo a cada sección sin prisas. Los conceptos se construyen progresivamente,
                así que es importante completar el material en el orden sugerido antes de avanzar.
              </p>
            </div>
          </div>

          {/* Content Navigation - Tabs View */}
          <SessionContentTabs
            sessionData={sessionData}
            contentCounts={contentCounts}
            defaultTab={tab}
          />
        </div>
      </div>
    </div>
  )
}
