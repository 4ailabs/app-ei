import { auth } from "@/lib/auth-server"
import { sessions } from "@/data/sessions"
import { GraduationCap, Bell, Play, Sparkles, Lock, ArrowRight, BookOpen, Info, Award, Smartphone, Video, FileText, Target, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PromoVideo } from "@/components/PromoVideo"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const session = await auth()
  const isLoggedIn = !!session

  const totalSessions = sessions.length

  // Verificar si es un usuario nuevo (sin progreso)
  let isNewUser = false
  if (session?.user?.id) {
    const userProgress = await prisma.progress.count({
      where: { userId: session.user.id }
    })
    isNewUser = userProgress === 0
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12 mt-4 sm:mt-8 lg:mt-20">
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
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
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

      {/* Sección de características - Visible para todos */}
      <div className="bg-gradient-to-br from-[#DA7756]/5 to-[#DA7756]/10 dark:from-[#DA7756]/10 dark:to-[#DA7756]/20 border border-[#DA7756]/20 dark:border-[#DA7756]/30 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-3 sm:mb-4">
            ¿Qué encontrarás en la plataforma?
          </h2>
          <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas para tu desarrollo en Inteligencia Energética en un solo lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Sesiones Formativas */}
          <div className="bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                <BookOpen className="h-6 w-6 text-[#DA7756] dark:text-[#E5E5E5]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Sesiones Formativas</h3>
            </div>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
              {totalSessions} sesiones completas con videos educativos, audios guiados, PDFs descargables, protocolos interactivos y temas explorables.
            </p>
            <ul className="text-xs text-[#706F6C] dark:text-[#A0A0A0] space-y-2">
              <li>• Videos de alta calidad</li>
              <li>• Meditaciones y audios guiados</li>
              <li>• Material descargable</li>
              <li>• Protocolos interactivos</li>
            </ul>
            {isLoggedIn && (
              <Link href="/sesiones" className="block mt-4">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Ver sesiones <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            )}
          </div>

          {/* Apps Interactivas */}
          <div className="bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                <Smartphone className="h-6 w-6 text-[#DA7756] dark:text-[#E5E5E5]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Apps Interactivas</h3>
            </div>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
              10 herramientas prácticas para regular tu sistema nervioso, trabajar con estados emocionales y desarrollar nuevas habilidades.
            </p>
            <ul className="text-xs text-[#706F6C] dark:text-[#A0A0A0] space-y-2">
              <li>• Respiración Guiada</li>
              <li>• Las 4 Palancas</li>
              <li>• Re-etiquetado con IA</li>
              <li>• Y 7 apps más</li>
            </ul>
            {isLoggedIn && (
              <Link href="/apps" className="block mt-4">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Explorar apps <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            )}
          </div>

          {/* Sistema de XP y Premium */}
          <div className="bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                <Award className="h-6 w-6 text-[#DA7756] dark:text-[#E5E5E5]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">XP y Premium</h3>
            </div>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
              Gana experiencia usando las apps y desbloquea contenido premium exclusivo al alcanzar 500 XP.
            </p>
            <ul className="text-xs text-[#706F6C] dark:text-[#A0A0A0] space-y-2">
              <li>• Gana XP practicando</li>
              <li>• Contenido exclusivo</li>
              <li>• Actualizaciones semanales</li>
              <li>• Seguimiento de progreso</li>
            </ul>
            {isLoggedIn && (
              <Link href="/premium" className="block mt-4">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Ver contenido premium <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Beneficios adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-3 mb-3">
              <Play className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
              <h4 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Videos de Alta Calidad</h4>
            </div>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
              Accede a videos educativos con integración de Cloudflare Stream para una reproducción fluida y de alta calidad.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
              <h4 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Material Descargable</h4>
            </div>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
              PDFs, protocolos, guías y manuales que puedes descargar y consultar cuando quieras.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Video de Introducción */}
        <PromoVideo />

        {/* Noticias */}
        <div className="bg-white dark:bg-[#2A2A2A] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-[#DA7756] dark:text-[#ECECEC]" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Noticias</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-[#DA7756]/20 to-[#DA7756]/10 dark:from-[#DA7756]/20 dark:to-[#252525] border-2 border-[#DA7756]/40 dark:border-[#DA7756]/40 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#DA7756]/30 dark:bg-[#DA7756]/30 rounded-lg flex-shrink-0">
                  <Calendar className="h-5 w-5 text-[#DA7756] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#DA7756] dark:text-[#DA7756]">SESIÓN 4 - 31 DE ENERO 2026</p>
                  <p className="text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5] mt-2">Presencial y Online</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-2 space-y-0.5">
                    <span className="block">Centrobioenergetica - Acapulco 36, Piso 8</span>
                    <span className="block">10:00 AM - 6:00 PM</span>
                    <span className="block">Disponible para participantes online</span>
                  </p>
                  <p className="text-xs font-semibold text-[#DA7756] dark:text-[#DA7756] mt-2">Próximo evento</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#DA7756]/10 dark:bg-[#252525] border border-[#DA7756]/20 dark:border-[#DA7756]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-[#DA7756]/20 dark:bg-[#DA7756]/20 rounded-lg flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-[#DA7756] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Sistema de XP y Premium</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                    Gana experiencia en las apps y desbloquea contenido exclusivo al alcanzar 500 XP
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#DA7756]/10 dark:bg-[#252525] border border-[#DA7756]/20 dark:border-[#DA7756]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-[#DA7756]/20 dark:bg-[#DA7756]/20 rounded-lg flex-shrink-0">
                  <Play className="h-4 w-4 text-[#DA7756] dark:text-[#ECECEC]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A1915] dark:text-[#ECECEC]">10 Apps Interactivas</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                    Herramientas prácticas: Respiración Guiada, Las 4 Palancas, Re-etiquetado y más
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5F4F0] dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#333333] rounded-lg">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-[#E5E4E0] dark:bg-[#333333] rounded-lg flex-shrink-0">
                  <GraduationCap className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A1915] dark:text-[#ECECEC]">Context Engineering</p>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mt-0.5">
                    Videos y kit de tarjetas disponibles en la Sesión 7 para transformar tu contexto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección informativa para usuarios nuevos */}
      {isLoggedIn && isNewUser && (
        <div className="bg-gradient-to-br from-[#DA7756]/5 to-[#DA7756]/10 dark:from-[#DA7756]/10 dark:to-[#DA7756]/20 border border-[#DA7756]/20 dark:border-[#DA7756]/30 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-[#DA7756] dark:bg-[#DA7756] rounded-xl">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-3">
                ¡Bienvenido a la plataforma!
              </h2>
              <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                Te ayudamos a empezar con todo lo que necesitas saber.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Sesiones */}
            <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                  <BookOpen className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
                </div>
                <h3 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Sesiones Formativas</h3>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
                Accede a {totalSessions} sesiones con videos educativos, audios guiados, PDFs, protocolos y material descargable.
              </p>
              <Link href="/sesiones">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Ver sesiones <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Apps Interactivas */}
            <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                  <Smartphone className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
                </div>
                <h3 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Apps Interactivas</h3>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
                10 herramientas prácticas: Respiración Guiada, Las 4 Palancas, Re-etiquetado y más. Practica y gana XP.
              </p>
              <Link href="/apps">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Explorar apps <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Sistema de XP */}
            <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                  <Award className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
                </div>
                <h3 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Sistema de XP</h3>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-4 leading-relaxed">
                Gana experiencia (XP) usando las apps. Al alcanzar 500 XP, desbloqueas contenido premium exclusivo.
              </p>
              <Link href="/premium">
                <button className="text-sm font-medium text-[#DA7756] dark:text-[#DA7756] hover:underline flex items-center gap-1">
                  Ver contenido premium <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Cómo empezar */}
            <div className="bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#DA7756]/20 dark:bg-[#DA7756]/30 rounded-lg">
                  <Target className="h-5 w-5 text-[#DA7756] dark:text-[#E5E5E5]" />
                </div>
                <h3 className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Cómo empezar</h3>
              </div>
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                1. Explora las sesiones formativas<br />
                2. Prueba las apps interactivas<br />
                3. Gana XP y desbloquea premium
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section para usuarios no registrados */}
      {!isLoggedIn && (
        <div className="bg-white dark:bg-[#2A2A2A] p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
          <div className="text-center py-6 sm:py-12 px-2 sm:px-4">
            <div className="max-w-md mx-auto">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#252525] dark:border dark:border-[#333333] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Lock className="h-7 w-7 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#7A7A76]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC] mb-2 sm:mb-3">Acceso Exclusivo para Alumnos</h3>
              <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#B4B4B4] mb-5 sm:mb-8">
                Esta plataforma es exclusiva para participantes del Seminario Internacional de Inteligencia Energetica. Si ya eres alumno, inicia sesion para acceder a las {totalSessions} sesiones formativas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/login">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white rounded-full font-semibold hover:bg-[#C4684A] dark:hover:bg-[#C4684A] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] text-sm sm:text-base">
                    Iniciar Sesion
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-[#252525] text-[#1A1915] dark:text-[#E5E5E5] border-2 border-[#E5E4E0] dark:border-[#333333] rounded-full font-semibold hover:border-[#DA7756] dark:hover:border-[#DA7756] hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] text-sm sm:text-base">
                    Crear cuenta de alumno
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
