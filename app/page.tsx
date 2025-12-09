import { auth } from "@/lib/auth-server"
import { sessions } from "@/data/sessions"
import { prisma } from "@/lib/prisma"
import { GraduationCap, Clock, Award, Bell, Play, Sparkles, Lock, ArrowRight, BookOpen } from "lucide-react"
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
      <div className="bg-gradient-to-br from-[#DA7756] via-[#C4684A] to-[#B85D45] dark:from-[#252525] dark:via-[#2A2A2A] dark:to-[#333333] dark:border dark:border-[#DA7756]/30 p-8 lg:p-12 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E89A7F] dark:bg-[#505050] opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-white/90" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {isLoggedIn ? "Bienvenido de nuevo" : "Bienvenido"}
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Seminario Internacional de<br />Inteligencia Energética
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mb-6">
            Accede a {totalSessions} sesiones formativas exclusivas con material de alta calidad: videos, PDFs, audios, protocolos y herramientas prácticas.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-15 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSessions}</p>
                <p className="text-sm text-white/70">Sesiones</p>
              </div>
            </div>
            {isLoggedIn && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white bg-opacity-15 rounded-xl backdrop-blur-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedSessions}/{totalSessions}</p>
                    <p className="text-sm text-white/70">Completadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white bg-opacity-15 rounded-xl backdrop-blur-sm">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{overallProgress}%</p>
                    <p className="text-sm text-white/70">Progreso</p>
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
                  className="h-full rounded-full bg-gradient-to-r from-white to-white/80 transition-all duration-1000 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA Button - Access Sessions */}
          {isLoggedIn && (
            <div className="mt-8">
              <Link href="/sesiones">
                <button className="px-8 py-4 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white rounded-full font-semibold hover:bg-[#C4684A] dark:hover:bg-[#C4684A] transition-all duration-200 flex items-center gap-3 shadow-md hover:shadow-lg active:scale-[0.98] group">
                  <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Acceder a las Sesiones</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Promocional */}
        <div className="lg:col-span-2 bg-white dark:bg-[#252525] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#DA7756]/30">
          <div className="flex items-center gap-2 mb-4">
            <Play className="h-5 w-5 text-[#DA7756] dark:text-[#ECECEC]" />
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Video Promocional</h2>
          </div>
          <div className="aspect-video bg-gradient-to-br from-[#DA7756]/20 to-[#C4684A]/30 dark:from-[#333333]/30 dark:to-[#252525]/40 rounded-2xl flex items-center justify-center relative overflow-hidden group border border-[#E5E4E0] dark:border-[#DA7756]/30">
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white dark:bg-[#252525] dark:border dark:border-[#DA7756]/30 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform cursor-pointer shadow-lg">
                <Play className="h-8 w-8 text-[#DA7756] dark:text-[#ECECEC] ml-1" />
              </div>
              <p className="text-[#1A1915] dark:text-[#ECECEC] font-semibold">Ver Video de Introducción</p>
              <p className="text-[#706F6C] dark:text-[#B4B4B4] text-sm mt-1">Conoce más sobre el seminario</p>
            </div>
          </div>
              <p className="text-[#706F6C] dark:text-[#A0A0A0] mt-4 text-sm">
            Descubre los fundamentos de la Inteligencia Energética y cómo este seminario transformará tu práctica profesional.
          </p>
        </div>

        {/* Noticias */}
        <div className="bg-white dark:bg-[#2A2A2A] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#2ca58d]/30">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-[#DA7756] dark:text-[#ECECEC]" />
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Noticias</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#DA7756]/10 dark:bg-[#252525] border border-[#DA7756]/20 dark:border-[#DA7756]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/20 rounded-lg">
                  <Sparkles className="h-4 w-4 text-[#DA7756] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Nuevo Contenido</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Se agregaron nuevos protocolos a la sesión de TRSB
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Hace 2 días</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#2ca58d]/10 dark:bg-[#252525] border border-[#2ca58d]/20 dark:border-[#2ca58d]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#2ca58d]/20 dark:bg-[#2ca58d]/20 rounded-lg">
                  <Bell className="h-4 w-4 text-[#2ca58d] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">Recordatorio</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Sesión en vivo este viernes a las 18:00 hrs
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Hace 1 semana</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F5F4F0] dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#2ca58d]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5E4E0] dark:bg-[#2ca58d]/20 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-[#706F6C] dark:text-[#B4B4B4]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">Actualización</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Nuevos PDFs disponibles en todas las sesiones
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Hace 2 semanas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section for non-logged in users */}
      {!isLoggedIn && (
        <div className="bg-white dark:bg-[#2A2A2A] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#2ca58d]/30">
          <div className="text-center py-12 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#F5F4F0] dark:bg-[#252525] dark:border dark:border-[#2ca58d]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-10 w-10 text-[#9B9A97] dark:text-[#7A7A76]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC] mb-3">Accede a las Sesiones</h3>
              <p className="text-[#706F6C] dark:text-[#B4B4B4] mb-8">
                Explora las {totalSessions} sesiones formativas exclusivas con contenido de alta calidad.
                Inicia sesión o regístrate para acceder a todo el material.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white rounded-full font-semibold hover:bg-[#C4684A] dark:hover:bg-[#C4684A] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]">
                    Iniciar Sesión
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#252525] text-[#1A1915] dark:text-[#E5E5E5] border-2 border-[#E5E4E0] dark:border-[#2ca58d]/30 rounded-full font-semibold hover:border-[#DA7756] dark:hover:border-[#2ca58d]/50 hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
