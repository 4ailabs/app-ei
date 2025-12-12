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
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <PDFSection pdfUrl={sessionData.pdfUrl} pdfs={sessionData.pdfs} sessionId={sessionData.id} title="Manual de la Sesión" />
    },
    {
      id: "videos",
      title: "Videos de Formación",
      icon: <Video className="h-5 w-5" />,
      count: contentCounts.videos,
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <VideoSection videos={sessionData.videos} />
    },
    {
      id: "audios",
      title: "Audios y Meditaciones",
      icon: <Headphones className="h-5 w-5" />,
      count: contentCounts.audios,
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <AudioSection audios={sessionData.audios} />
    },
    {
      id: "themes",
      title: "Temas y Conceptos",
      icon: <BookOpen className="h-5 w-5" />,
      count: contentCounts.themes,
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <ThemeExplorer themes={sessionData.themes} />
    },
    {
      id: "protocols",
      title: "Protocolos y Herramientas",
      icon: <ClipboardList className="h-5 w-5" />,
      count: contentCounts.protocols,
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <ProtocolSection protocols={sessionData.protocols || []} />
    },
    {
      id: "apps",
      title: "Aplicaciones",
      icon: <Smartphone className="h-5 w-5" />,
      count: contentCounts.apps,
      color: "text-[#DA7756] dark:text-[#DA7756]",
      bgColor: "bg-[#DA7756]/10 dark:bg-[#DA7756]/20",
      content: <AppSection apps={sessionData.apps || []} />
    }
  ]

  // Filter sections that have content
  const activeSections = sections.filter(section => section.count > 0)

  if (activeSections.length === 0) {
    return (
      <div className="bg-white dark:bg-[#252525] rounded-3xl p-8 text-center border border-[#E5E4E0] dark:border-[#333333]">
        <div className="text-[#9B9A97] dark:text-[#808080] mb-4">
          <FileText className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">Contenido próximamente</h3>
        <p className="text-[#706F6C] dark:text-[#A0A0A0]">El material de esta sesión estará disponible pronto.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-4">
        {activeSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A] transition-colors [&[data-state=open]]:bg-[#F5F4F0] dark:[&[data-state=open]]:bg-[#2A2A2A]">
              <div className="flex items-center gap-4 w-full">
                <div className={`p-3 rounded-xl ${section.bgColor} ${section.color}`}>
                  {section.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">{section.title}</h3>
                  <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                    {section.count} {section.count === 1 ? 'elemento' : 'elementos'} disponibles
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${section.bgColor} ${section.color}`}>
                  {section.count}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="pt-4 border-t border-[#E5E4E0] dark:border-[#333333]">
                {section.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Show sections without content at the bottom */}
      {sections.filter(s => s.count === 0).length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-[#9B9A97] dark:text-[#808080] mb-3 px-2">Próximamente</p>
          <div className="flex flex-wrap gap-3">
            {sections.filter(s => s.count === 0).map((section) => (
              <div
                key={section.id}
                className="flex items-center gap-2 px-4 py-2 bg-[#F5F4F0] dark:bg-[#333333] rounded-full text-[#9B9A97] dark:text-[#808080]"
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
