"use client"

import { Session } from "@/data/sessions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Video,
  Headphones,
  BookOpen,
  ClipboardList,
  Smartphone
} from "lucide-react"
import { PDFSection } from "./PDFSection"
import { VideoSection } from "./VideoSection"
import { AudioSection } from "./AudioSection"
import { ThemeExplorer } from "./ThemeExplorer"
import { ProtocolSection } from "./ProtocolSection"
import { AppSection } from "./AppSection"

interface ContentCounts {
  pdf: number
  videos: number
  audios: number
  themes: number
  protocols: number
  apps: number
}

interface SessionContentTabsProps {
  sessionData: Session
  contentCounts: ContentCounts
}

// Helper function to determine default tab
// Orden pedagógico: Teoría → Demostración → Práctica → Profundización → Refuerzo → Apps
function getDefaultTab(contentCounts: ContentCounts): string {
  if (contentCounts.pdf > 0) return "pdf"
  if (contentCounts.videos > 0) return "videos"
  if (contentCounts.protocols > 0) return "protocols"
  if (contentCounts.themes > 0) return "themes"
  if (contentCounts.audios > 0) return "audios"
  if (contentCounts.apps > 0) return "apps"
  return "pdf"
}

export function SessionContentTabs({ sessionData, contentCounts }: SessionContentTabsProps) {
  const defaultTab = getDefaultTab(contentCounts)

  // If no content available
  if (Object.values(contentCounts).every(count => count === 0)) {
    return (
      <div className="bg-white dark:bg-[#252525] rounded-3xl p-6 lg:p-8 shadow-sm border border-[#E5E4E0] dark:border-[#333333] text-center py-12">
        <div className="text-[#9B9A97] dark:text-[#808080] mb-4">
          <FileText className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Contenido próximamente</h3>
        <p className="text-[#706F6C] dark:text-[#A0A0A0]">El material de esta sesión estará disponible pronto.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#252525] rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
      <Tabs defaultValue={defaultTab} className="w-full">
        {/* Orden pedagógico: Material → Videos → Protocolos → Temas → Audios → Apps */}
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 h-auto bg-[#F5F4F0] dark:bg-[#333333] p-2 gap-2 mb-10 rounded-2xl">
          {contentCounts.pdf > 0 && (
            <TabsTrigger value="pdf" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Material</span>
              <span className="sm:hidden">PDF</span>
              {contentCounts.pdf > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                  {contentCounts.pdf}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.videos > 0 && (
            <TabsTrigger value="videos" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <Video className="h-4 w-4" />
              <span>Videos</span>
              {contentCounts.videos > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-medium">
                  {contentCounts.videos}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.protocols > 0 && (
            <TabsTrigger value="protocols" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden lg:inline">Protocolos</span>
              <span className="lg:hidden">Prot.</span>
              {contentCounts.protocols > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium">
                  {contentCounts.protocols}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.themes > 0 && (
            <TabsTrigger value="themes" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Temas</span>
              <span className="sm:hidden">Temas</span>
              {contentCounts.themes > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium">
                  {contentCounts.themes}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.audios > 0 && (
            <TabsTrigger value="audios" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <Headphones className="h-4 w-4" />
              <span>Audios</span>
              {contentCounts.audios > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full font-medium">
                  {contentCounts.audios}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.apps > 0 && (
            <TabsTrigger value="apps" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
              <Smartphone className="h-4 w-4" />
              <span>Apps</span>
              {contentCounts.apps > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full font-medium">
                  {contentCounts.apps}
                </span>
              )}
            </TabsTrigger>
          )}
        </TabsList>

        {contentCounts.pdf > 0 && (
          <TabsContent value="pdf" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Material Principal</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">Manual y documentos de la sesión</p>
                </div>
              </div>
              <PDFSection pdfUrl={sessionData.pdfUrl} pdfs={sessionData.pdfs} sessionId={sessionData.id} title="Manual de la Sesión" />
            </div>
          </TabsContent>
        )}

        {contentCounts.videos > 0 && (
          <TabsContent value="videos" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                  <Video className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Videos de Formación</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">{contentCounts.videos} videos disponibles</p>
                </div>
              </div>
              <VideoSection videos={sessionData.videos} />
            </div>
          </TabsContent>
        )}

        {contentCounts.protocols > 0 && (
          <TabsContent value="protocols" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                  <ClipboardList className="h-7 w-7 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Protocolos y Herramientas</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">{contentCounts.protocols} protocolos disponibles</p>
                </div>
              </div>
              <ProtocolSection protocols={sessionData.protocols || []} moduleNumber={sessionData.moduleNumber} />
            </div>
          </TabsContent>
        )}

        {contentCounts.themes > 0 && (
          <TabsContent value="themes" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                  <BookOpen className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Temas y Conceptos</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">{contentCounts.themes} temas disponibles</p>
                </div>
              </div>
              <ThemeExplorer themes={sessionData.themes} />
            </div>
          </TabsContent>
        )}

        {contentCounts.audios > 0 && (
          <TabsContent value="audios" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <Headphones className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Audios y Meditaciones</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">{contentCounts.audios} audios disponibles</p>
                </div>
              </div>
              <AudioSection audios={sessionData.audios} />
            </div>
          </TabsContent>
        )}

        {contentCounts.apps > 0 && (
          <TabsContent value="apps" className="mt-0">
            <div className="space-y-8">
              <div className="flex items-center gap-5 mb-8 pb-5 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl">
                  <Smartphone className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Aplicaciones</h3>
                  <p className="text-base text-[#706F6C] dark:text-[#A0A0A0] mt-1">{contentCounts.apps} aplicaciones disponibles</p>
                </div>
              </div>
              <AppSection apps={sessionData.apps || []} />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
