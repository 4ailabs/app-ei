import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions } from "@/data/sessions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFSection } from "@/components/session/PDFSection"
import { VideoSection } from "@/components/session/VideoSection"
import { AudioSection } from "@/components/session/AudioSection"
import { ThemeExplorer } from "@/components/session/ThemeExplorer"
import { ProtocolSection } from "@/components/session/ProtocolSection"
import { AppSection } from "@/components/session/AppSection"
import {
  FileText,
  Video,
  Headphones,
  BookOpen,
  ArrowLeft,
  Lightbulb,
  Settings,
  Rocket,
  Cpu,
  Leaf,
  Home,
  ClipboardList,
  Smartphone
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SessionPageProps {
  params: Promise<{ id: string }>
}

const sessionIcons = [Lightbulb, Settings, Rocket, Cpu, Leaf]
const sessionColors = [
  { gradient: "#000000" },
  { gradient: "#000000" },
  { gradient: "#000000" },
  { gradient: "#000000" },
  { gradient: "#000000" }
]

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
  const colors = sessionColors[index % sessionColors.length]

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
                      Día {sessionData.day}
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
                        Día {sessionData.day}
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
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="pdf" className="w-full animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-200 h-auto gap-2">
              <TabsTrigger
                value="pdf"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">PDF</span>
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Videos</span>
              </TabsTrigger>
              <TabsTrigger
                value="audios"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Headphones className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Audios</span>
              </TabsTrigger>
              <TabsTrigger
                value="temas"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Temas</span>
              </TabsTrigger>
              <TabsTrigger
                value="protocolos"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Protocolos</span>
              </TabsTrigger>
              <TabsTrigger
                value="apps"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Apps</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
              <TabsContent value="pdf" className="mt-0 animate-fade-in">
                <PDFSection pdfUrl={sessionData.pdfUrl} sessionId={sessionData.id} />
              </TabsContent>

              <TabsContent value="videos" className="mt-0 animate-fade-in">
                <VideoSection videos={sessionData.videos} />
              </TabsContent>

              <TabsContent value="audios" className="mt-0 animate-fade-in">
                <AudioSection audios={sessionData.audios} />
              </TabsContent>

              <TabsContent value="temas" className="mt-0 animate-fade-in">
                <ThemeExplorer themes={sessionData.themes} />
              </TabsContent>

              <TabsContent value="protocolos" className="mt-0 animate-fade-in">
                <ProtocolSection protocols={sessionData.protocols || []} />
              </TabsContent>

              <TabsContent value="apps" className="mt-0 animate-fade-in">
                <AppSection apps={sessionData.apps || []} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
