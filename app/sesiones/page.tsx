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

  const bloqueColors = [
    { gradient: "from-blue-600 to-blue-800", accent: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
    { gradient: "from-purple-600 to-purple-800", accent: "bg-purple-500", text: "text-purple-600", bg: "bg-purple-50" },
    { gradient: "from-green-600 to-green-800", accent: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
    { gradient: "from-orange-600 to-orange-800", accent: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
    { gradient: "from-red-600 to-red-800", accent: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
    { gradient: "from-cyan-600 to-cyan-800", accent: "bg-cyan-500", text: "text-cyan-600", bg: "bg-cyan-50" },
    { gradient: "from-indigo-600 to-indigo-800", accent: "bg-indigo-500", text: "text-indigo-600", bg: "bg-indigo-50" },
    { gradient: "from-pink-600 to-pink-800", accent: "bg-pink-500", text: "text-pink-600", bg: "bg-pink-50" },
    { gradient: "from-teal-600 to-teal-800", accent: "bg-teal-500", text: "text-teal-600", bg: "bg-teal-50" },
  ]

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-gray-100 transition-all rounded-full">
              <Home className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-black rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-black">Sesiones del Seminario</h1>
                <p className="text-gray-600 mt-1">
                  {sessions.length} sesiones organizadas en {bloqueNumbers.length} bloques
                </p>
              </div>
            </div>
          </div>

          {/* Bloques Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 h-full flex flex-col">
                    {/* Header con Gradiente */}
                    <div className={`p-6 text-white bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 ${colors.accent} rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-lg`}>
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
                          <span className="text-gray-600">Progreso</span>
                          <span className={`font-bold ${progress.percentage === 100 ? 'text-green-600' : 'text-gray-900'}`}>
                            {progress.completed}/{progress.total} completadas
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress.percentage === 100 ? 'bg-green-500' : colors.accent
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
                              progressMap[session.id]?.completed ? 'bg-green-50' : colors.bg
                            }`}
                          >
                            {progressMap[session.id]?.completed ? (
                              <CheckCircle2 className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-2 ${colors.text} border-current flex-shrink-0`}></div>
                            )}
                            <span className={`text-sm ${progressMap[session.id]?.completed ? 'text-green-700 font-medium' : 'text-gray-700'} line-clamp-1`}>
                              {session.moduleNumber && `Módulo ${session.moduleNumber}: `}
                              {session.title}
                            </span>
                          </div>
                        ))}
                        {bloqueSessions.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{bloqueSessions.length - 3} sesiones más
                          </p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          progress.percentage === 100
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : `${colors.accent} text-white group-hover:opacity-90 group-hover:scale-105`
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

