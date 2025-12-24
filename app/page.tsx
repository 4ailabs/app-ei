import { auth } from "@/lib/auth-server"
import { sessions } from "@/data/sessions"
import { GraduationCap, Bell, Play, Sparkles, Lock, ArrowRight, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PromoVideo } from "@/components/PromoVideo"

export default async function HomePage() {
  const session = await auth()
  const isLoggedIn = !!session

  const totalSessions = sessions.length

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-8 lg:mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#DA7756] via-[#C4684A] to-[#B85D45] dark:from-[#252525] dark:via-[#2A2A2A] dark:to-[#333333] dark:border dark:border-[#DA7756]/30 p-4 sm:p-6 lg:p-12 rounded-2xl sm:rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E89A7F] dark:bg-[#505050] opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <div className="rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm p-1.5 sm:p-2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                alt="Inteligencia Energética"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90">
              {isLoggedIn ? "Bienvenido de nuevo" : "Bienvenido"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Seminario Internacional de<br />Inteligencia Energética
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-white/80 max-w-3xl mb-4 sm:mb-6">
            Accede a {totalSessions} sesiones formativas exclusivas con material de alta calidad.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white bg-opacity-15 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{totalSessions}</p>
                <p className="text-xs sm:text-sm text-white/70">Sesiones</p>
              </div>
            </div>
          </div>

          {/* CTA Button - Access Sessions */}
          {isLoggedIn && (
            <div className="mt-4 sm:mt-8">
              <Link href="/sesiones">
                <button className="px-5 sm:px-8 py-3 sm:py-4 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white rounded-full font-semibold hover:bg-[#C4684A] dark:hover:bg-[#C4684A] transition-all duration-200 flex items-center gap-2 sm:gap-3 shadow-md hover:shadow-lg active:scale-[0.98] group text-sm sm:text-base">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  <span>Acceder a las Sesiones</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Video de Introducción */}
        <PromoVideo />

        {/* Noticias */}
        <div className="bg-white dark:bg-[#2A2A2A] p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#2ca58d]/30">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#DA7756] dark:text-[#ECECEC]" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Noticias</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-4 bg-[#DA7756]/10 dark:bg-[#252525] border border-[#DA7756]/20 dark:border-[#DA7756]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/20 rounded-lg">
                  <Sparkles className="h-4 w-4 text-[#DA7756] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Sistema de XP y Premium</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Gana experiencia en las apps y desbloquea contenido exclusivo al alcanzar 500 XP
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Nuevo</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#2ca58d]/10 dark:bg-[#252525] border border-[#2ca58d]/20 dark:border-[#2ca58d]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#2ca58d]/20 dark:bg-[#2ca58d]/20 rounded-lg">
                  <Play className="h-4 w-4 text-[#2ca58d] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">10 Apps Interactivas</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Herramientas prácticas disponibles: Respiración Guiada, Las 4 Palancas, Re-etiquetado y más
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Disponible</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F5F4F0] dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#2ca58d]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5E4E0] dark:bg-[#2ca58d]/20 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-[#706F6C] dark:text-[#B4B4B4]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">Context Engineering</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-1">
                    Videos y kit de tarjetas disponibles en la Sesión 7 para transformar tu contexto
                  </p>
                  <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C] mt-2">Actualizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section for non-logged in users */}
      {!isLoggedIn && (
        <div className="bg-white dark:bg-[#2A2A2A] p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#2ca58d]/30">
          <div className="text-center py-6 sm:py-12 px-2 sm:px-4">
            <div className="max-w-md mx-auto">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#252525] dark:border dark:border-[#2ca58d]/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Lock className="h-7 w-7 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#7A7A76]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC] mb-2 sm:mb-3">Accede a las Sesiones</h3>
              <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#B4B4B4] mb-5 sm:mb-8">
                Explora las {totalSessions} sesiones formativas exclusivas.
                Inicia sesión o regístrate para acceder al material.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/login">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white rounded-full font-semibold hover:bg-[#C4684A] dark:hover:bg-[#C4684A] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] text-sm sm:text-base">
                    Iniciar Sesión
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-[#252525] text-[#1A1915] dark:text-[#E5E5E5] border-2 border-[#E5E4E0] dark:border-[#2ca58d]/30 rounded-full font-semibold hover:border-[#DA7756] dark:hover:border-[#2ca58d]/50 hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] text-sm sm:text-base">
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
