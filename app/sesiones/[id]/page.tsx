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

// Content badge component that links to the correct tab
function ContentBadge({
  count,
  icon: Icon,
  label,
  tabId,
  sessionId
}: {
  count: number
  icon: React.ElementType
  label: string
  tabId: string
  sessionId: number
}) {
  if (count === 0) return null

  return (
    <Link
      href={`/sesiones/${sessionId}?tab=${tabId}`}
      className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#F5F4F0] dark:bg-[#333333] hover:bg-[#DA7756]/10 dark:hover:bg-[#DA7756]/20 rounded-lg sm:rounded-xl transition-colors group"
    >
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-[#DA7756]" />
      <span className="text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-[#DA7756] font-medium text-xs sm:text-sm">{count} {label}</span>
    </Link>
  )
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
                  <ContentBadge count={contentCounts.pdf} icon={FileText} label="PDF" tabId="pdf" sessionId={sessionId} />
                  <ContentBadge count={contentCounts.videos} icon={Video} label="Videos" tabId="videos" sessionId={sessionId} />
                  <ContentBadge count={contentCounts.audios} icon={Headphones} label="Audios" tabId="audios" sessionId={sessionId} />
                  <ContentBadge count={contentCounts.themes} icon={BookOpen} label="Temas" tabId="themes" sessionId={sessionId} />
                  <ContentBadge count={contentCounts.protocols} icon={ClipboardList} label="Protocolos" tabId="protocols" sessionId={sessionId} />
                  <ContentBadge count={contentCounts.apps} icon={Smartphone} label="Apps" tabId="apps" sessionId={sessionId} />
                </div>
              </div>
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
