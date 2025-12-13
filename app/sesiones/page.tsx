import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { sessions } from "@/data/sessions"
import { BookOpen, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SessionsByBloqueTabs } from "@/components/session/SessionsByBloqueTabs"

interface BloqueInfo {
  id: number
  title: string
  shortTitle: string
  description: string
  intro: string
}

const bloqueInfo: Record<number, BloqueInfo> = {
  1: {
    id: 1,
    title: "Fundamentos de Regulación",
    shortTitle: "Fundamentos",
    description: "Bases científicas del sistema nervioso y técnicas de autorregulación",
    intro: "En este bloque exploraremos las bases científicas del sistema nervioso y cómo influye en nuestras respuestas emocionales y conductuales. Aprenderás sobre la Ventana de Tolerancia, los tres estados del sistema nervioso autónomo, y las técnicas fundamentales de autorregulación que te permitirán mantener un estado de equilibrio óptimo para el bienestar y el rendimiento."
  },
  2: {
    id: 2,
    title: "TRSB",
    shortTitle: "TRSB",
    description: "Técnica de Reprocesamiento Somato-Cognitivo Bilateral",
    intro: "La Técnica de Reprocesamiento Somato-Cognitivo Bilateral (TRSB) es una herramienta poderosa para procesar experiencias difíciles y liberar bloqueos emocionales. En este bloque aprenderás los fundamentos teóricos y prácticos de esta técnica, incluyendo los protocolos paso a paso para aplicarla de manera segura y efectiva."
  },
  3: {
    id: 3,
    title: "PONS",
    shortTitle: "PONS",
    description: "Procesamiento Ocular Neural Somático",
    intro: "El Procesamiento Ocular Neural Somático (PONS) integra el movimiento ocular con la conciencia corporal para facilitar el procesamiento de información emocional. En este bloque descubrirás cómo los patrones de movimiento ocular están conectados con estados emocionales y aprenderás a utilizar esta conexión para promover la regulación y el bienestar."
  },
  4: {
    id: 4,
    title: "Context Engineering",
    shortTitle: "Context",
    description: "Ingeniería del contexto y las 7 fases",
    intro: "La Ingeniería del Contexto te enseña a diseñar y modificar los ambientes internos y externos que influyen en tu comportamiento y bienestar. A través de las 7 fases del proceso, aprenderás a identificar los elementos contextuales que te afectan y a crear condiciones óptimas para el cambio positivo y sostenible."
  },
  5: {
    id: 5,
    title: "Miracle Question",
    shortTitle: "Miracle Q.",
    description: "La pregunta del milagro y visualización de soluciones",
    intro: "La Pregunta del Milagro es una técnica transformadora que proviene de la terapia breve centrada en soluciones. En este bloque aprenderás a utilizar esta poderosa herramienta para ayudar a visualizar un futuro preferido, identificar recursos ocultos y generar motivación para el cambio desde una perspectiva orientada a las soluciones."
  },
  6: {
    id: 6,
    title: "Los 4 Protocolos",
    shortTitle: "4 Protocolos",
    description: "Protocolos Alpha, Beta, Gamma y Delta",
    intro: "Los 4 Protocolos (Alpha, Beta, Gamma y Delta) son secuencias estructuradas de intervención diseñadas para abordar diferentes tipos de desafíos emocionales y conductuales. Cada protocolo tiene un propósito específico y en este bloque aprenderás cuándo y cómo aplicar cada uno para obtener los mejores resultados."
  },
  7: {
    id: 7,
    title: "El Poder de los Rituales",
    shortTitle: "Rituales",
    description: "Los 3 elementos para rituales transformadores",
    intro: "Los rituales son prácticas estructuradas que tienen el poder de crear cambios profundos y duraderos. En este bloque explorarás los 3 elementos esenciales que hacen que un ritual sea verdaderamente transformador y aprenderás a diseñar e implementar rituales personalizados para diferentes objetivos terapéuticos y de desarrollo personal."
  },
  8: {
    id: 8,
    title: "Las 7 Excepciones",
    shortTitle: "Excepciones",
    description: "Identificación y manejo de excepciones en el cambio",
    intro: "Las excepciones son esos momentos en los que el problema no ocurre o es menos intenso. En este bloque aprenderás a identificar sistemáticamente estas excepciones, a amplificarlas y a utilizarlas como recursos para construir soluciones. Este enfoque te permitirá trabajar con las fortalezas existentes en lugar de enfocarte solo en los problemas."
  },
  9: {
    id: 9,
    title: "Sistema de Insight Profundo",
    shortTitle: "Insight",
    description: "Sistema de insight profundo para la transformación",
    intro: "El Sistema de Insight Profundo es un marco integrador que combina las herramientas y técnicas aprendidas en los bloques anteriores. En este bloque final aprenderás a facilitar momentos de comprensión profunda que generan cambios significativos y duraderos, integrando todos los conocimientos adquiridos en un enfoque coherente y efectivo."
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

  // Prepare data for client component
  const bloquesData = bloqueNumbers.map(bloqueNum => ({
    ...bloqueInfo[bloqueNum],
    sessions: sessionsByBloque[bloqueNum]
  }))

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" className="group hover:bg-[#F5F4F0] dark:hover:bg-[#252525] transition-all rounded-full text-[#706F6C] dark:text-[#A0A0A0] px-3 sm:px-5 py-2 h-auto text-sm">
              <Home className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Dashboard</span>
              <span className="sm:hidden">Inicio</span>
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

          {/* Tabs by Bloque */}
          <SessionsByBloqueTabs bloquesData={bloquesData} />
        </div>
      </div>
    </div>
  )
}
