"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Session } from "@/data/sessions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Video,
  Headphones,
  BookOpen,
  ClipboardList,
  Smartphone,
  FolderPlus
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
  additionalResources: number
}

interface SessionContentTabsProps {
  sessionData: Session
  contentCounts: ContentCounts
  defaultTab?: string
}

// Helper function to determine default tab
// Orden: Videos → Audios → Temas → Protocolos → Material → Recursos
function getDefaultTab(contentCounts: ContentCounts): string {
  if (contentCounts.videos > 0) return "videos"
  if (contentCounts.audios > 0) return "audios"
  if (contentCounts.themes > 0) return "themes"
  if (contentCounts.protocols > 0) return "protocols"
  if (contentCounts.pdf > 0) return "pdf"
  if (contentCounts.additionalResources > 0) return "additionalResources"
  if (contentCounts.apps > 0) return "apps"
  return "videos"
}

export function SessionContentTabs({ sessionData, contentCounts, defaultTab: propDefaultTab }: SessionContentTabsProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const tabFromUrl = searchParams.get('tab')
  const defaultTab = propDefaultTab || getDefaultTab(contentCounts)
  
  // Estado controlado del tab activo
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl || defaultTab)

  // Sincronizar con la URL cuando cambie el parámetro tab
  useEffect(() => {
    const urlTab = searchParams.get('tab')
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab)
    } else if (!urlTab && activeTab !== defaultTab) {
      setActiveTab(defaultTab)
    }
  }, [searchParams, activeTab, defaultTab])

  // Función para manejar el cambio de tab
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Actualizar la URL sin recargar la página
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Todos los tabs posibles (siempre disponibles)
  const allTabs = ['videos', 'audios', 'themes', 'protocols', 'pdf', 'additionalResources', 'apps']
  
  // Si el tab activo no es válido, usar el default
  const currentTab = allTabs.includes(activeTab) ? activeTab : defaultTab

  // If no content available
  const allCounts = Object.values(contentCounts)
  if (allCounts.every(count => count === 0)) {
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
    <div className="bg-white dark:bg-[#252525] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        {/* Orden: Videos → Audios → Temas → Protocolos → Material → Recursos */}
        <TabsList className="grid w-full h-auto bg-[#F5F4F0] dark:bg-[#333333] p-1 sm:p-1.5 gap-1 sm:gap-1.5 mb-6 sm:mb-8 lg:mb-10 rounded-xl sm:rounded-2xl grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="videos" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Videos</span>
            <span className="sm:hidden text-[10px]">Video</span>
          </TabsTrigger>
          <TabsTrigger value="audios" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Audios</span>
            <span className="sm:hidden text-[10px]">Audio</span>
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Temas</span>
            <span className="sm:hidden text-[10px]">Temas</span>
          </TabsTrigger>
          <TabsTrigger value="protocols" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <ClipboardList className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Protocolos</span>
            <span className="sm:hidden text-[10px]">Prot.</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Material</span>
            <span className="sm:hidden text-[10px]">PDF</span>
          </TabsTrigger>
          <TabsTrigger value="additionalResources" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <FolderPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Recursos</span>
            <span className="sm:hidden text-[10px]">Extra</span>
          </TabsTrigger>
          <TabsTrigger value="apps" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A] data-[state=active]:shadow-sm rounded-lg text-[#706F6C] dark:text-[#A0A0A0] data-[state=active]:text-[#1A1915] dark:data-[state=active]:text-[#E5E5E5]">
            <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Apps</span>
            <span className="sm:hidden text-[10px]">Apps</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-0">
          {contentCounts.videos > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <Video className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Videos de Formación</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.videos} videos</p>
                </div>
              </div>
              <VideoSection videos={sessionData.videos} />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Videos próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Los videos de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="audios" className="mt-0">
          {contentCounts.audios > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Audios y Meditaciones</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.audios} audios</p>
                </div>
              </div>
              <AudioSection audios={sessionData.audios} />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Audios próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Los audios de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="themes" className="mt-0">
          {contentCounts.themes > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Temas y Conceptos</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.themes} temas</p>
                </div>
              </div>
              <ThemeExplorer themes={sessionData.themes} />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Temas próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Los temas de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="protocols" className="mt-0">
          {contentCounts.protocols > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Protocolos y Herramientas</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.protocols} protocolos</p>
                </div>
              </div>
              <ProtocolSection protocols={sessionData.protocols || []} moduleNumber={sessionData.moduleNumber} />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Protocolos próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Los protocolos de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pdf" className="mt-0">
          {contentCounts.pdf > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Material Principal</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">Manual y documentos</p>
                </div>
              </div>
              <PDFSection pdfUrl={sessionData.pdfUrl} pdfs={sessionData.pdfs} sessionId={sessionData.id} title="Manual de la Sesión" />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Material próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                El material de esta sección estará disponible próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="additionalResources" className="mt-0">
          {contentCounts.additionalResources > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <FolderPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Recursos Adicionales</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.additionalResources} recursos disponibles</p>
                </div>
              </div>
              <PDFSection
                pdfUrl=""
                pdfs={sessionData.additionalResources?.filter((r): r is Extract<typeof r, { pages?: number }> =>
                  'pages' in r || (!('type' in r)) || ('type' in r && r.type === 'slide')
                ) || []}
                sessionId={sessionData.id}
                title="Recursos Adicionales"
              />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderPlus className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Recursos próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Los recursos adicionales de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="apps" className="mt-0">
          {contentCounts.apps > 0 ? (
            <div className="space-y-5 sm:space-y-7 lg:space-y-8">
              <div className="flex items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-5 lg:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
                <div className="p-2 sm:p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
                  <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Aplicaciones</h3>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">{contentCounts.apps} apps</p>
                </div>
              </div>
              <AppSection apps={sessionData.apps || []} />
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Apps próximamente</h3>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
                Las aplicaciones de esta sección estarán disponibles próximamente.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
