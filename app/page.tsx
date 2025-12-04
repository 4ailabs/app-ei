import { auth } from "@/lib/auth-server"
import { SessionCard } from "@/components/session/SessionCard"
import { sessions } from "@/data/sessions"
import { prisma } from "@/lib/prisma"
import { Zap, GraduationCap, Clock, Award, Bell, Play, Sparkles, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

type ProgressData = {
  completed: boolean
  pdfViewed: boolean
  videosViewed: boolean
  audiosViewed: boolean
  themesViewed: boolean
}

type ProgressRecord = {
  sessionId: number
  completed: boolean
  pdfViewed: boolean
  videosViewed: boolean
  audiosViewed: boolean
  themesViewed: boolean
}

export default async function HomePage() {
  const session = await auth()
  const isLoggedIn = !!session

  let progressMap: Record<number, ProgressData> = {}
  let completedSessions = 0
  let overallProgress = 0

  if (isLoggedIn) {
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

      completedSessions = Object.values(progressMap).filter(p => p.completed).length
      overallProgress = Math.round((completedSessions / sessions.length) * 100)
    } catch (error) {
      console.error("Error fetching progress:", error)
    }
  }

  const totalSessions = sessions.length

  return (
    <div className="w-full space-y-8 lg:mt-20 mt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black p-8 lg:p-12 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
              {isLoggedIn ? "Bienvenido de nuevo" : "Bienvenido"}
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Seminario Internacional de<br />Inteligencia Energética
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mb-6">
            Accede a {totalSessions} sesiones formativas exclusivas con material de alta calidad: videos, PDFs, audios, protocolos y herramientas prácticas.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSessions}</p>
                <p className="text-sm text-gray-400">Sesiones</p>
              </div>
            </div>
            {isLoggedIn && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedSessions}/{totalSessions}</p>
                    <p className="text-sm text-gray-400">Completadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{overallProgress}%</p>
                    <p className="text-sm text-gray-400">Progreso</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Progress Bar - Only for logged in users */}
          {isLoggedIn && overallProgress > 0 && (
            <div className="mt-6 max-w-md">
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 transition-all duration-1000 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Promocional */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Play className="h-5 w-5 text-black" />
            <h2 className="text-xl lg:text-2xl font-bold text-black">Video Promocional</h2>
          </div>
          <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="h-8 w-8 text-black ml-1" />
              </div>
              <p className="text-white font-semibold">Ver Video de Introducción</p>
              <p className="text-gray-300 text-sm mt-1">Conoce más sobre el seminario</p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Descubre los fundamentos de la Inteligencia Energética y cómo este seminario transformará tu práctica profesional.
          </p>
        </div>

        {/* Noticias */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-black" />
            <h2 className="text-xl lg:text-2xl font-bold text-black">Noticias</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sparkles className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-900">Nuevo Contenido</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Se agregaron nuevos protocolos a la sesión de TRSB
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">Hace 2 días</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">Recordatorio</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Sesión en vivo este viernes a las 18:00 hrs
                  </p>
                  <p className="text-xs text-blue-600 mt-2">Hace 1 semana</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Actualización</p>
                  <p className="text-xs text-gray-700 mt-1">
                    Nuevos PDFs disponibles en todas las sesiones
                  </p>
                  <p className="text-xs text-gray-600 mt-2">Hace 2 semanas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Section or CTA */}
      <div id="sesiones" className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-200 scroll-mt-24">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">Sesiones del Seminario</h2>
          <p className="text-gray-600">
            {isLoggedIn
              ? `Explora las ${totalSessions} sesiones formativas con contenido exclusivo y herramientas prácticas`
              : `Regístrate para acceder a las ${totalSessions} sesiones formativas exclusivas`
            }
          </p>
        </div>

        {isLoggedIn ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sessions.map((sessionData, index) => (
              <div key={sessionData.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 50}ms`, opacity: 0 }}>
                <SessionCard
                  session={sessionData}
                  progress={progressMap[sessionData.id]}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Contenido Exclusivo</h3>
              <p className="text-gray-600 mb-8">
                Las sesiones de entrenamiento están disponibles solo para usuarios registrados.
                Inicia sesión o regístrate para acceder a todo el contenido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <button className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    Iniciar Sesión
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-xl font-semibold hover:border-black transition-all duration-300 flex items-center justify-center gap-2">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
