import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { sessions } from "@/data/sessions"
import { prisma } from "@/lib/prisma"
import { BookOpen, ArrowRight, Calendar, CheckCircle2, Clock, Home, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export default async function SesionesPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Group sessions by day (bloque)
  const sessionsByBloque = sessions.reduce((acc, session) => {
    const bloque = session.day
    if (!acc[bloque]) {
      acc[bloque] = []
    }
    acc[bloque].push(session)
    return acc
  }, {} as Record<number, typeof sessions>)

  const bloqueNumbers = Object.keys(sessionsByBloque).map(Number).sort((a, b) => a - b)

  // Get progress data
  let progressMap: Record<number, { completed: boolean }> = {}
  try {
    const progressRecords = await prisma.progress.findMany({
      where: { userId: session.user.id },
    })

    progressMap = progressRecords.reduce((acc: Record<number, { completed: boolean }>, p: ProgressRecord) => {
      acc[p.sessionId] = { completed: p.completed }
      return acc
    }, {} as Record<number, { completed: boolean }>)
  } catch (error) {
    console.error("Error fetching progress:", error)
  }

  // Calculate progress per bloque
  const getBloqueProgress = (bloqueSessions: typeof sessions) => {
    const completed = bloqueSessions.filter(s => progressMap[s.id]?.completed).length
    return {
      completed,
      total: bloqueSessions.length,
      percentage: Math.round((completed / bloqueSessions.length) * 100)
    }
  }

  // Paleta de colores estilo Claude de Anthropic
  const bloqueColors = [
    { gradient: "from-[#DA7756] to-[#C4684A]", accent: "bg-[#DA7756]", text: "text-[#DA7756]", bg: "bg-[#FAF9F7]", hover: "hover:bg-[#C4684A]" },
    { gradient: "from-[#2ca58d] to-[#259078]", accent: "bg-[#2ca58d]", text: "text-[#2ca58d]", bg: "bg-[#FAF9F7]", hover: "hover:bg-[#259078]" },
    { gradient: "from-[#706F6C] to-[#1A1915]", accent: "bg-[#706F6C]", text: "text-[#706F6C]", bg: "bg-[#FAF9F7]", hover: "hover:bg-[#1A1915]" },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] transition-all rounded-full text-[#706F6C]">
              <Home className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#DA7756] rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1915]">Sesiones del Seminario</h1>
                <p className="text-[#706F6C] mt-1">
                  {sessions.length} sesiones organizadas en {bloqueNumbers.length} bloques
                </p>
              </div>
            </div>
          </div>

          {/* Bloques Lista */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {bloqueNumbers.map((bloqueNum, index) => {
              const bloqueSessions = sessionsByBloque[bloqueNum]
              const info = bloqueInfo[bloqueNum] || {
                id: bloqueNum,
                title: `Bloque ${bloqueNum}`,
                description: ""
              }
              const progress = getBloqueProgress(bloqueSessions)
              const colors = bloqueColors[index % bloqueColors.length]

              return (
                <Link
                  key={bloqueNum}
                  href={`/sesiones/bloque/${bloqueNum}`}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E4E0] hover:border-[#DA7756]/30 h-full flex flex-col">
                    {/* Header con Gradiente */}
                    <div className={`p-6 text-white bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 ${colors.accent} rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-sm`}>
                            {bloqueNum}
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-white/90" />
                            <span className="text-sm font-semibold text-white/90">
                              {bloqueSessions.length} {bloqueSessions.length === 1 ? 'sesión' : 'sesiones'}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{info.description}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Progress Section */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-[#706F6C]">Progreso</span>
                          <span className={`font-bold ${progress.percentage === 100 ? 'text-[#2ca58d]' : 'text-[#1A1915]'}`}>
                            {progress.completed}/{progress.total} completadas
                          </span>
                        </div>
                        <div className="w-full bg-[#E5E4E0] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress.percentage === 100 ? 'bg-[#2ca58d]' : colors.accent
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Sessions Preview */}
                      <div className="space-y-2 mb-4 flex-1">
                        {bloqueSessions.slice(0, 3).map((session) => (
                          <div
                            key={session.id}
                            className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                              progressMap[session.id]?.completed ? 'bg-[#2ca58d]/10' : 'bg-[#F5F4F0]'
                            }`}
                          >
                            {progressMap[session.id]?.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-[#2ca58d] flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-[#DA7756]/40 flex-shrink-0"></div>
                            )}
                            <span className={`text-sm ${progressMap[session.id]?.completed ? 'text-[#1A1915] font-medium' : 'text-[#706F6C]'} line-clamp-1`}>
                              {session.moduleNumber && `Módulo ${session.moduleNumber}: `}
                              {session.title}
                            </span>
                          </div>
                        ))}
                        {bloqueSessions.length > 3 && (
                          <p className="text-xs text-[#9B9A97] text-center">
                            +{bloqueSessions.length - 3} sesiones más
                          </p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          progress.percentage === 100
                            ? 'bg-[#2ca58d] text-white hover:bg-[#259078]'
                            : `${colors.accent} text-white ${colors.hover} group-hover:scale-[1.02]`
                        }`}
                      >
                        <span>Ver Bloque</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

