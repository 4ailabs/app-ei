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

  // Paleta de colores estilo Claude
  const bloqueColors = [
    { gradient: "from-[#DA7756] to-[#C4684A]", accent: "bg-[#DA7756]", hover: "hover:bg-[#C4684A]" },
    { gradient: "from-[#2ca58d] to-[#259078]", accent: "bg-[#2ca58d]", hover: "hover:bg-[#259078]" },
    { gradient: "from-[#706F6C] to-[#1A1915]", accent: "bg-[#706F6C]", hover: "hover:bg-[#1A1915]" },
  ]

  const colors = bloqueColors[(dayNumber - 1) % bloqueColors.length]

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/sesiones">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0]">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <BookOpen className="mr-2 h-4 w-4" />
              Volver a Sesiones
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-[#252525] rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border-2 border-[#DA7756] dark:border-[#DA7756]">
            <div className="p-8 lg:p-12 text-[#1A1915] dark:text-[#E5E5E5] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-[#DA7756] dark:text-[#DA7756]" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#DA7756] dark:text-[#DA7756]">
                    Bloque {dayNumber}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-20 h-20 rounded-xl bg-[#DA7756] dark:bg-[#DA7756] flex items-center justify-center font-bold text-3xl shadow-sm text-white`}>
                    {dayNumber}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-[#1A1915] dark:text-[#E5E5E5]">
                      {info.title}
                    </h1>
                    <p className="text-lg text-[#706F6C] dark:text-[#A0A0A0]">{info.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 border border-[#DA7756]/20 dark:border-[#DA7756]/30 px-4 py-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-[#DA7756] dark:text-[#DA7756]" />
                    <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{bloqueSessions.length} sesiones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
          </div>
        </div>
      </div>
    </div>
  )
}

