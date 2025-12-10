import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { sessions } from "@/data/sessions"
import { BookOpen, ArrowRight, Home, GraduationCap } from "lucide-react"
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

  // Paleta de colores estilo Claude de Anthropic
  const bloqueColors = [
    { border: "border-[#DA7756]", accent: "bg-[#DA7756]", text: "text-[#DA7756]", hover: "hover:bg-[#C4684A]" },
    { border: "border-[#2ca58d]", accent: "bg-[#2ca58d]", text: "text-[#2ca58d]", hover: "hover:bg-[#259078]" },
    { border: "border-[#706F6C]", accent: "bg-[#706F6C]", text: "text-[#706F6C]", hover: "hover:bg-[#1A1915]" },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <Home className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Dashboard</span>
              <span className="sm:hidden">Volver</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-5 sm:mb-8 animate-fade-in-up">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#DA7756] dark:bg-[#DA7756] rounded-lg sm:rounded-xl flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-8 sm:w-8 text-white dark:text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Sesiones del Seminario</h1>
                <p className="text-xs sm:text-base text-[#706F6C] dark:text-[#A0A0A0] mt-0.5 sm:mt-1">
                  {sessions.length} sesiones en {bloqueNumbers.length} bloques
                </p>
              </div>
            </div>
          </div>

          {/* Bloques Grid - 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {bloqueNumbers.map((bloqueNum, index) => {
              const bloqueSessions = sessionsByBloque[bloqueNum]
              const info = bloqueInfo[bloqueNum] || {
                id: bloqueNum,
                title: `Bloque ${bloqueNum}`,
                description: ""
              }
              const colors = bloqueColors[index % bloqueColors.length]

              return (
                <Link
                  key={bloqueNum}
                  href={`/sesiones/bloque/${bloqueNum}`}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 ${colors.border} h-full flex flex-col`}>
                    {/* Header */}
                    <div className="p-4 sm:p-6 text-[#1A1915] dark:text-[#E5E5E5] relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.accent} rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm text-white`}>
                            {bloqueNum}
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <GraduationCap className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
                            <span className={`text-xs sm:text-sm font-semibold ${colors.text}`}>
                              {bloqueSessions.length} {bloqueSessions.length === 1 ? 'sesión' : 'sesiones'}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base sm:text-xl font-bold mb-1.5 sm:mb-2 text-[#1A1915] dark:text-[#E5E5E5]">{info.title}</h3>
                        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-2">{info.description}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      {/* Sessions Preview */}
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-1">
                        {bloqueSessions.slice(0, 3).map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center gap-2 text-xs sm:text-sm p-1.5 sm:p-2 rounded-lg bg-[#F5F4F0] dark:bg-[#333333]"
                          >
                            <span className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-1">
                              {session.moduleNumber && `M${session.moduleNumber}: `}
                              {session.title}
                            </span>
                          </div>
                        ))}
                        {bloqueSessions.length > 3 && (
                          <p className="text-[10px] sm:text-xs text-[#9B9A97] dark:text-[#808080] text-center">
                            +{bloqueSessions.length - 3} más
                          </p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${colors.accent} text-white ${colors.hover} group-hover:scale-[1.02] text-sm sm:text-base`}
                      >
                        <span>Ver Bloque</span>
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
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

