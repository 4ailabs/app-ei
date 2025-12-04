import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions } from "@/data/sessions"
import { SessionContentAccordion } from "@/components/session/SessionContentAccordion"
import {
  ArrowLeft,
  Lightbulb,
  Settings,
  Rocket,
  Cpu,
  Leaf,
  Home,
  FileText,
  Video,
  Headphones,
  BookOpen,
  ClipboardList,
  Smartphone
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SessionPageProps {
  params: Promise<{ id: string }>
}

const sessionIcons = [Lightbulb, Settings, Rocket, Cpu, Leaf]

export default async function SessionPage({ params }: SessionPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const { id } = await params
  const sessionId = parseInt(id)
  const sessionData = sessions.find((s) => s.id === sessionId)

  if (!sessionData) {
    notFound()
  }

  const index = sessionId - 1
  const IconComponent = sessionIcons[index % sessionIcons.length]

  // Calculate content counts
  const contentCounts = {
    pdf: sessionData.pdfUrl ? 1 : 0,
    videos: sessionData.videos.length,
    audios: sessionData.audios.length,
    themes: sessionData.themes.length,
    protocols: sessionData.protocols?.length || 0,
    apps: sessionData.apps?.length || 0
  }

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

        <div className="max-w-5xl mx-auto">
          {/* Session Header with Image */}
          <div className="bg-white rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border border-gray-200">
            {/* Session Image Banner */}
            {sessionData.imageUrl && (
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={sessionData.imageUrl}
                  alt={sessionData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex gap-2 mb-4">
                    <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white inline-block">
                      Bloque {sessionData.day}
                    </span>
                    {sessionData.moduleNumber && (
                      <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white inline-block">
                        Módulo {sessionData.moduleNumber}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                    {sessionData.title}
                  </h1>
                  <p className="text-lg text-white/90">{sessionData.description}</p>
                </div>
              </div>
            )}

            {/* Fallback Header (if no image) */}
            {!sessionData.imageUrl && (
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-black rounded-2xl">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black text-white">
                        Bloque {sessionData.day}
                      </span>
                      {sessionData.moduleNumber && (
                        <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-200 text-gray-700">
                          Módulo {sessionData.moduleNumber}
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                      {sessionData.title}
                    </h1>
                    <p className="text-lg text-gray-600">{sessionData.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Bar */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap gap-4 text-sm">
                {contentCounts.pdf > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>1 PDF</span>
                  </div>
                )}
                {contentCounts.videos > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Video className="h-4 w-4" />
                    <span>{contentCounts.videos} videos</span>
                  </div>
                )}
                {contentCounts.audios > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Headphones className="h-4 w-4" />
                    <span>{contentCounts.audios} audios</span>
                  </div>
                )}
                {contentCounts.themes > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{contentCounts.themes} temas</span>
                  </div>
                )}
                {contentCounts.protocols > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClipboardList className="h-4 w-4" />
                    <span>{contentCounts.protocols} protocolos</span>
                  </div>
                )}
                {contentCounts.apps > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Smartphone className="h-4 w-4" />
                    <span>{contentCounts.apps} apps</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Unified Content with Collapsible Sections */}
          <SessionContentAccordion
            sessionData={sessionData}
            contentCounts={contentCounts}
          />
        </div>
      </div>
    </div>
  )
}
