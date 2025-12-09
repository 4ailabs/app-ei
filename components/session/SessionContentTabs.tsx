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
function getDefaultTab(contentCounts: ContentCounts): string {
  if (contentCounts.pdf > 0) return "pdf"
  if (contentCounts.videos > 0) return "videos"
  if (contentCounts.audios > 0) return "audios"
  if (contentCounts.themes > 0) return "themes"
  if (contentCounts.protocols > 0) return "protocols"
  if (contentCounts.apps > 0) return "apps"
  return "pdf"
}

export function SessionContentTabs({ sessionData, contentCounts }: SessionContentTabsProps) {
  const defaultTab = getDefaultTab(contentCounts)

  // If no content available
  if (Object.values(contentCounts).every(count => count === 0)) {
    return (
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-200 text-center py-12">
        <div className="text-gray-400 mb-4">
          <FileText className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Contenido próximamente</h3>
        <p className="text-gray-500">El material de esta sesión estará disponible pronto.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-200">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 h-auto bg-gray-50 p-1 gap-1 mb-6">
          {contentCounts.pdf > 0 && (
            <TabsTrigger value="pdf" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Material</span>
              <span className="sm:hidden">PDF</span>
              {contentCounts.pdf > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full font-medium">
                  {contentCounts.pdf}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.videos > 0 && (
            <TabsTrigger value="videos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Video className="h-4 w-4" />
              <span>Videos</span>
              {contentCounts.videos > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full font-medium">
                  {contentCounts.videos}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.audios > 0 && (
            <TabsTrigger value="audios" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Headphones className="h-4 w-4" />
              <span>Audios</span>
              {contentCounts.audios > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-600 rounded-full font-medium">
                  {contentCounts.audios}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.themes > 0 && (
            <TabsTrigger value="themes" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Temas</span>
              <span className="sm:hidden">Temas</span>
              {contentCounts.themes > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full font-medium">
                  {contentCounts.themes}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.protocols > 0 && (
            <TabsTrigger value="protocols" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden lg:inline">Protocolos</span>
              <span className="lg:hidden">Prot.</span>
              {contentCounts.protocols > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded-full font-medium">
                  {contentCounts.protocols}
                </span>
              )}
            </TabsTrigger>
          )}
          {contentCounts.apps > 0 && (
            <TabsTrigger value="apps" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Smartphone className="h-4 w-4" />
              <span>Apps</span>
              {contentCounts.apps > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-cyan-100 text-cyan-600 rounded-full font-medium">
                  {contentCounts.apps}
                </span>
              )}
            </TabsTrigger>
          )}
        </TabsList>

        {contentCounts.pdf > 0 && (
          <TabsContent value="pdf" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Material Principal</h3>
                  <p className="text-sm text-gray-500">Manual y documentos de la sesión</p>
                </div>
              </div>
              <PDFSection pdfUrl={sessionData.pdfUrl} sessionId={sessionData.id} title="Manual de la Sesión" />
            </div>
          </TabsContent>
        )}

        {contentCounts.videos > 0 && (
          <TabsContent value="videos" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Video className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Videos de Formación</h3>
                  <p className="text-sm text-gray-500">{contentCounts.videos} videos disponibles</p>
                </div>
              </div>
              <VideoSection videos={sessionData.videos} />
            </div>
          </TabsContent>
        )}

        {contentCounts.audios > 0 && (
          <TabsContent value="audios" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Headphones className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Audios y Meditaciones</h3>
                  <p className="text-sm text-gray-500">{contentCounts.audios} audios disponibles</p>
                </div>
              </div>
              <AudioSection audios={sessionData.audios} />
            </div>
          </TabsContent>
        )}

        {contentCounts.themes > 0 && (
          <TabsContent value="themes" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Temas y Conceptos</h3>
                  <p className="text-sm text-gray-500">{contentCounts.themes} temas disponibles</p>
                </div>
              </div>
              <ThemeExplorer themes={sessionData.themes} />
            </div>
          </TabsContent>
        )}

        {contentCounts.protocols > 0 && (
          <TabsContent value="protocols" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Protocolos y Herramientas</h3>
                  <p className="text-sm text-gray-500">{contentCounts.protocols} protocolos disponibles</p>
                </div>
              </div>
              <ProtocolSection protocols={sessionData.protocols || []} />
            </div>
          </TabsContent>
        )}

        {contentCounts.apps > 0 && (
          <TabsContent value="apps" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-50 rounded-lg">
                  <Smartphone className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Aplicaciones</h3>
                  <p className="text-sm text-gray-500">{contentCounts.apps} aplicaciones disponibles</p>
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

