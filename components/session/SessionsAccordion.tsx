"use client"

import { Session } from "@/data/sessions"
import { SessionCard } from "./SessionCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Layers, BookOpen, CheckCircle2 } from "lucide-react"

type ProgressData = {
  completed: boolean
  pdfViewed: boolean
  videosViewed: boolean
  audiosViewed: boolean
  themesViewed: boolean
}

interface SessionsAccordionProps {
  sessions: Session[]
  progressMap: Record<number, ProgressData>
}

interface BloqueInfo {
  id: number
  title: string
  description: string
}

const bloqueInfo: Record<number, BloqueInfo> = {
  1: {
    id: 1,
    title: "Fundamentos de Regulación",
    description: "Bases científicas del sistema nervioso y técnicas de autorregulación"
  },
  2: {
    id: 2,
    title: "TRSB",
    description: "Técnica de Reprocesamiento Somato-Cognitivo Bilateral"
  },
  3: {
    id: 3,
    title: "PONS",
    description: "Procesamiento Ocular Neural Somático"
  },
  4: {
    id: 4,
    title: "Context Engineering",
    description: "Ingeniería del contexto y las 7 fases"
  },
  5: {
    id: 5,
    title: "Miracle Question",
    description: "La pregunta del milagro y visualización de soluciones"
  },
  6: {
    id: 6,
    title: "Los 4 Protocolos",
    description: "Protocolos Alpha, Beta, Gamma y Delta"
  },
  7: {
    id: 7,
    title: "El Poder de los Rituales",
    description: "Los 3 elementos para rituales transformadores"
  },
  8: {
    id: 8,
    title: "Las 7 Excepciones",
    description: "Identificación y manejo de excepciones en el cambio"
  },
  9: {
    id: 9,
    title: "LSP Insight System",
    description: "Sistema de insight profundo para la transformación"
  }
}

export function SessionsAccordion({ sessions, progressMap }: SessionsAccordionProps) {
  // Group sessions by day (which represents "Bloque")
  const sessionsByBloque = sessions.reduce((acc, session) => {
    const bloque = session.day
    if (!acc[bloque]) {
      acc[bloque] = []
    }
    acc[bloque].push(session)
    return acc
  }, {} as Record<number, Session[]>)

  // Get sorted bloque numbers
  const bloqueNumbers = Object.keys(sessionsByBloque).map(Number).sort((a, b) => a - b)

  // Calculate progress per bloque
  const getBloqueProgress = (bloqueSessions: Session[]) => {
    const completed = bloqueSessions.filter(s => progressMap[s.id]?.completed).length
    return {
      completed,
      total: bloqueSessions.length,
      percentage: Math.round((completed / bloqueSessions.length) * 100)
    }
  }

  return (
    <Accordion type="single" collapsible defaultValue="bloque-1" className="w-full">
      {bloqueNumbers.map((bloqueNum, index) => {
        const bloqueSessions = sessionsByBloque[bloqueNum]
        const info = bloqueInfo[bloqueNum] || {
          id: bloqueNum,
          title: `Bloque ${bloqueNum}`,
          description: ""
        }
        const progress = getBloqueProgress(bloqueSessions)
        const hasModules = bloqueSessions.some(s => s.moduleNumber)

        return (
          <AccordionItem
            key={bloqueNum}
            value={`bloque-${bloqueNum}`}
            className="border border-gray-200 rounded-2xl mb-4 overflow-hidden bg-white"
          >
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-black rounded-xl text-white">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Bloque {bloqueNum}
                    </span>
                    {hasModules && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {bloqueSessions.length} módulos
                      </span>
                    )}
                    {progress.completed > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {progress.completed}/{progress.total}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{info.description}</p>
                </div>
                {progress.percentage > 0 && (
                  <div className="hidden sm:flex items-center gap-3 mr-4">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500">{progress.percentage}%</span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
                {bloqueSessions.map((sessionData, sessionIndex) => (
                  <div
                    key={sessionData.id}
                    className="animate-slide-in-up"
                    style={{ animationDelay: `${sessionIndex * 50}ms`, opacity: 0 }}
                  >
                    <SessionCard
                      session={sessionData}
                      progress={progressMap[sessionData.id]}
                      index={sessionIndex}
                      compact={hasModules}
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
