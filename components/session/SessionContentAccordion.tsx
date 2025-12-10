"use client"

import { Session } from "@/data/sessions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PDFSection } from "./PDFSection"
import { VideoSection } from "./VideoSection"
import { AudioSection } from "./AudioSection"
import { ThemeExplorer } from "./ThemeExplorer"
import { ProtocolSection } from "./ProtocolSection"
import { AppSection } from "./AppSection"
import {
  FileText,
  Video,
  Headphones,
  BookOpen,
  ClipboardList,
  Smartphone,
  ChevronDown
} from "lucide-react"

interface ContentCounts {
  pdf: number
  videos: number
  audios: number
  themes: number
  protocols: number
  apps: number
}

interface SessionContentAccordionProps {
  sessionData: Session
  contentCounts: ContentCounts
}

interface SectionConfig {
  id: string
  title: string
  icon: React.ReactNode
  count: number
  color: string
  bgColor: string
  content: React.ReactNode
}

export function SessionContentAccordion({ sessionData, contentCounts }: SessionContentAccordionProps) {
  const sections: SectionConfig[] = [
    {
      id: "pdf",
      title: "Material Principal",
      icon: <FileText className="h-5 w-5" />,
      count: contentCounts.pdf,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      content: <PDFSection pdfUrl={sessionData.pdfUrl} pdfs={sessionData.pdfs} sessionId={sessionData.id} title="Manual de la Sesión" />
    },
    {
      id: "videos",
      title: "Videos de Formación",
      icon: <Video className="h-5 w-5" />,
      count: contentCounts.videos,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      content: <VideoSection videos={sessionData.videos} />
    },
    {
      id: "audios",
      title: "Audios y Meditaciones",
      icon: <Headphones className="h-5 w-5" />,
      count: contentCounts.audios,
      color: "text-green-600",
      bgColor: "bg-green-50",
      content: <AudioSection audios={sessionData.audios} />
    },
    {
      id: "themes",
      title: "Temas y Conceptos",
      icon: <BookOpen className="h-5 w-5" />,
      count: contentCounts.themes,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      content: <ThemeExplorer themes={sessionData.themes} />
    },
    {
      id: "protocols",
      title: "Protocolos y Herramientas",
      icon: <ClipboardList className="h-5 w-5" />,
      count: contentCounts.protocols,
      color: "text-red-600",
      bgColor: "bg-red-50",
      content: <ProtocolSection protocols={sessionData.protocols || []} />
    },
    {
      id: "apps",
      title: "Aplicaciones",
      icon: <Smartphone className="h-5 w-5" />,
      count: contentCounts.apps,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      content: <AppSection apps={sessionData.apps || []} />
    }
  ]

  // Filter sections that have content
  const activeSections = sections.filter(section => section.count > 0)

  // Default open the first section with content
  const defaultValue = activeSections.length > 0 ? activeSections[0].id : undefined

  if (activeSections.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-gray-200">
        <div className="text-gray-400 mb-4">
          <FileText className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Contenido próximamente</h3>
        <p className="text-gray-500">El material de esta sesión estará disponible pronto.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={[defaultValue || ""]} className="space-y-4">
        {activeSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 transition-colors [&[data-state=open]]:bg-gray-50">
              <div className="flex items-center gap-4 w-full">
                <div className={`p-3 rounded-xl ${section.bgColor} ${section.color}`}>
                  {section.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">
                    {section.count} {section.count === 1 ? 'elemento' : 'elementos'} disponibles
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${section.bgColor} ${section.color}`}>
                  {section.count}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="pt-4 border-t border-gray-100">
                {section.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Show sections without content at the bottom */}
      {sections.filter(s => s.count === 0).length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-gray-400 mb-3 px-2">Próximamente</p>
          <div className="flex flex-wrap gap-3">
            {sections.filter(s => s.count === 0).map((section) => (
              <div
                key={section.id}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-400"
              >
                {section.icon}
                <span className="text-sm">{section.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
