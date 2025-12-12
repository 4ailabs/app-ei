import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions } from "@/data/sessions"
import { SessionCard } from "@/components/session/SessionCard"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BloquePageProps {
  params: Promise<{ day: string }>
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
    title: "Sistema de Insight Profundo",
    description: "Sistema de insight profundo para la transformación"
  }
}

export default async function BloquePage({ params }: BloquePageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const { day } = await params
  const dayNumber = parseInt(day)
  const bloqueSessions = sessions.filter(s => s.day === dayNumber)

  if (bloqueSessions.length === 0) {
    notFound()
  }

  const info = bloqueInfo[dayNumber] || {
    id: dayNumber,
    title: `Bloque ${dayNumber}`,
    description: ""
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/sesiones">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <BookOpen className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver a Sesiones</span>
              <span className="sm:hidden">Volver</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl lg:rounded-3xl mb-6 sm:mb-10 overflow-hidden animate-fade-in-up shadow-sm border-2 border-[#DA7756] dark:border-[#DA7756]">
            <div className="p-4 sm:p-6 lg:p-12 text-[#1A1915] dark:text-[#E5E5E5] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Calendar className="h-5 w-5 sm:h-8 sm:w-8 text-[#DA7756] dark:text-[#DA7756]" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#DA7756] dark:text-[#DA7756]">
                    Bloque {dayNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-[#DA7756] dark:bg-[#DA7756] flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-sm text-white flex-shrink-0`}>
                    {dayNumber}
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 text-[#1A1915] dark:text-[#E5E5E5]">
                      {info.title}
                    </h1>
                    <p className="text-xs sm:text-lg text-[#706F6C] dark:text-[#A0A0A0] line-clamp-2">{info.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 border border-[#DA7756]/20 dark:border-[#DA7756]/30 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756] dark:text-[#DA7756]" />
                    <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{bloqueSessions.length} sesiones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            {bloqueSessions.map((sessionData, index) => (
              <div
                key={sessionData.id}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SessionCard
                  session={sessionData}
                  progress={undefined}
                  index={index}
                  compact={false}
                />
              </div>
            ))}

            {/* Tarjeta de Material Extra - Solo para Bloque 1 */}
            {dayNumber === 1 && (
              <div
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${bloqueSessions.length * 50}ms` }}
              >
                <Link href={`/sesiones/bloque/${dayNumber}/recursos-adicionales`} className="block h-full">
                  <div className="bg-white dark:bg-[#252525] hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
                    <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-grow min-h-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-shrink-0">
                        <span className="text-[10px] sm:text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#F5F4F0] dark:bg-[#333333]">
                          Material Extra
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1.5 sm:mb-2 lg:mb-3 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors flex-shrink-0">
                        Recursos Adicionales
                      </h3>
                      <p className="text-[#706F6C] dark:text-[#A0A0A0] text-[11px] sm:text-xs lg:text-sm mb-3 sm:mb-4 lg:mb-6 flex-grow line-clamp-2 sm:line-clamp-3 min-h-0">
                        Material complementario: videos, PDFs, audios, diagramas e imágenes.
                      </p>

                      <div className="border-t border-[#E5E4E0] dark:border-[#333333] pt-3 sm:pt-4 lg:pt-6 flex justify-end items-center flex-shrink-0 mt-auto">
                        <div className="text-[#1A1915] dark:text-[#E5E5E5] hover:text-[#DA7756] dark:hover:text-[#DA7756] transition-all duration-300 group-hover:translate-x-1">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

