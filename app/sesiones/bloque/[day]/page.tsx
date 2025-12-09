import { auth } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { sessions } from "@/data/sessions"
import { prisma } from "@/lib/prisma"
import { SessionCard } from "@/components/session/SessionCard"
import {
  ArrowLeft,
  Home,
  BookOpen,
  Calendar,
  GraduationCap,
  CheckCircle2,
  Clock
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

type ProgressRecord = {
  sessionId: number
  completed: boolean
  pdfViewed: boolean
  videosViewed: boolean
  audiosViewed: boolean
  themesViewed: boolean
}

type ProgressData = {
  completed: boolean
  pdfViewed: boolean
  videosViewed: boolean
  audiosViewed: boolean
  themesViewed: boolean
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

  // Get progress data
  let progressMap: Record<number, ProgressData> = {}
  try {
    const progressRecords = await prisma.progress.findMany({
      where: { userId: session.user.id },
    })

    progressMap = progressRecords.reduce((acc: Record<number, ProgressData>, p: ProgressRecord) => {
      acc[p.sessionId] = {
        completed: p.completed,
        pdfViewed: p.pdfViewed,
        videosViewed: p.videosViewed,
        audiosViewed: p.audiosViewed,
        themesViewed: p.themesViewed,
      }
      return acc
    }, {} as Record<number, ProgressData>)
  } catch (error) {
    console.error("Error fetching progress:", error)
  }

  // Calculate bloque progress
  const completedSessions = bloqueSessions.filter(s => progressMap[s.id]?.completed).length
  const progressPercentage = Math.round((completedSessions / bloqueSessions.length) * 100)

  const bloqueColors = [
    { gradient: "from-blue-600 to-blue-800", accent: "bg-blue-500" },
    { gradient: "from-purple-600 to-purple-800", accent: "bg-purple-500" },
    { gradient: "from-green-600 to-green-800", accent: "bg-green-500" },
    { gradient: "from-orange-600 to-orange-800", accent: "bg-orange-500" },
    { gradient: "from-red-600 to-red-800", accent: "bg-red-500" },
    { gradient: "from-cyan-600 to-cyan-800", accent: "bg-cyan-500" },
    { gradient: "from-indigo-600 to-indigo-800", accent: "bg-indigo-500" },
    { gradient: "from-pink-600 to-pink-800", accent: "bg-pink-500" },
    { gradient: "from-teal-600 to-teal-800", accent: "bg-teal-500" },
  ]

  const colors = bloqueColors[(dayNumber - 1) % bloqueColors.length]

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/sesiones">
            <Button variant="ghost" className="group hover:bg-gray-100 transition-all rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <BookOpen className="mr-2 h-4 w-4" />
              Volver a Sesiones
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl mb-8 overflow-hidden animate-fade-in-up shadow-sm border border-gray-200">
            <div className={`p-8 lg:p-12 bg-gradient-to-br ${colors.gradient} text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-white/90" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
                    Bloque {dayNumber}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-20 h-20 rounded-xl ${colors.accent} bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-3xl shadow-lg`}>
                    {dayNumber}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">
                      {info.title}
                    </h1>
                    <p className="text-lg text-white/80">{info.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-semibold">{bloqueSessions.length} sesiones</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-semibold">{completedSessions}/{bloqueSessions.length} completadas</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">{progressPercentage}% progreso</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progreso del Bloque</span>
                <span className={`font-bold ${progressPercentage === 100 ? 'text-green-600' : 'text-gray-900'}`}>
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progressPercentage === 100 ? 'bg-green-500' : colors.accent
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloqueSessions.map((sessionData, index) => (
              <div
                key={sessionData.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SessionCard
                  session={sessionData}
                  progress={progressMap[sessionData.id]}
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

