import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { Wind, Heart, Shield, ScanLine, Gauge, SlidersHorizontal, MessageSquare } from "lucide-react"
import { AppLink } from "@/components/apps/AppLink"

interface AppCard {
  id: string
  name: string
  description: string
  url: string
  iconName: string
  color: string
}

const apps: AppCard[] = [
  {
    id: "respiracion",
    name: "Respiración Guiada",
    description: "Patrones de respiración para regular el sistema nervioso: 4-7-8, Box Breathing y más.",
    url: "/protocols/respiracion-guiada-app.html",
    iconName: "Wind",
    color: "bg-[#2ca58d]/10 text-[#2ca58d] dark:bg-[#2ca58d]/20 dark:text-[#5BB98C]"
  },
  {
    id: "mariposa",
    name: "Abrazo de Mariposa",
    description: "Práctica guiada de estimulación bilateral con vibración, timer y registro de sensaciones.",
    url: "/protocols/abrazo-mariposa-app.html",
    iconName: "Heart",
    color: "bg-[#2ca58d]/10 text-[#2ca58d] dark:bg-[#2ca58d]/20 dark:text-[#5BB98C]"
  },
  {
    id: "lugar-seguro",
    name: "Lugar Seguro",
    description: "Visualización guiada para crear y anclar tu espacio interno de calma y seguridad.",
    url: "/protocols/lugar-seguro-app.html",
    iconName: "Shield",
    color: "bg-[#2ca58d]/10 text-[#2ca58d] dark:bg-[#2ca58d]/20 dark:text-[#5BB98C]"
  },
  {
    id: "escaner",
    name: "Escáner Corporal",
    description: "Recorrido guiado por todo el cuerpo para observar sensaciones y liberar tensiones.",
    url: "/protocols/escaner-corporal-app.html",
    iconName: "ScanLine",
    color: "bg-[#DA7756]/10 text-[#DA7756] dark:bg-[#DA7756]/20 dark:text-[#E89A7F]"
  },
  {
    id: "checkin",
    name: "Check-in de Estado",
    description: "Identifica si estás en Ventral, Simpático o Dorsal y recibe recomendaciones personalizadas.",
    url: "/protocols/checkin-estado-app.html",
    iconName: "Gauge",
    color: "bg-[#706F6C]/10 text-[#706F6C] dark:bg-[#706F6C]/20 dark:text-[#A0A0A0]"
  },
  {
    id: "palancas",
    name: "Las 4 Palancas",
    description: "Guía interactiva paso a paso para cambiar tu estado neurobiológico usando las 4 palancas.",
    url: "/protocols/las-4-palancas-app.html",
    iconName: "SlidersHorizontal",
    color: "bg-[#DA7756]/10 text-[#DA7756] dark:bg-[#DA7756]/20 dark:text-[#E89A7F]"
  },
  {
    id: "reetiquetado",
    name: "Re-etiquetado",
    description: "Práctica de transformar lenguaje limitante en lenguaje que abre posibilidades.",
    url: "/protocols/re-etiquetado-app.html",
    iconName: "MessageSquare",
    color: "bg-[#DA7756]/10 text-[#DA7756] dark:bg-[#DA7756]/20 dark:text-[#E89A7F]"
  }
]

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wind,
  Heart,
  Shield,
  ScanLine,
  Gauge,
  SlidersHorizontal,
  MessageSquare
}

export default async function AppsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#0F0F0F]">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-3">
            Apps Interactivas
          </h1>
          <p className="text-[#706F6C] dark:text-[#A0A0A0] text-base sm:text-lg">
            Herramientas para practicar las técnicas del programa.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {apps.map((app) => {
            const IconComponent = iconMap[app.iconName]
            return (
              <AppLink
                key={app.id}
                href={app.url}
                className="group block bg-white dark:bg-[#1A1A1A] rounded-2xl p-6 border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756] dark:hover:border-[#DA7756] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-2 group-hover:text-[#DA7756] transition-colors">
                  {app.name}
                </h2>
                <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                  {app.description}
                </p>
              </AppLink>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-[#DA7756]/5 dark:bg-[#DA7756]/10 rounded-xl border border-[#DA7756]/20">
          <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
            <span className="font-medium text-[#DA7756]">Consejo:</span> Estas apps funcionan mejor en dispositivos móviles. Puedes añadirlas a tu pantalla de inicio para acceso rápido.
          </p>
        </div>
      </div>
    </div>
  )
}
