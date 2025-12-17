import { AppLink } from "@/data/sessions"
import { Play, Activity, Radio, Smartphone, Zap, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

interface AppSectionProps {
    apps: AppLink[]
}

const iconMap: Record<string, any> = {
    Activity,
    Radio,
    Smartphone,
    Zap,
    Heart
}

// Colores por tipo de app - consistente con el estilo de la app
const appStyles: Record<string, { color: string; bgLight: string; bgDark: string }> = {
    Heart: {
        color: "#7C3AED",
        bgLight: "bg-violet-50",
        bgDark: "dark:bg-violet-950/20"
    },
    Activity: {
        color: "#10B981",
        bgLight: "bg-emerald-50",
        bgDark: "dark:bg-emerald-950/20"
    },
    Radio: {
        color: "#3B82F6",
        bgLight: "bg-blue-50",
        bgDark: "dark:bg-blue-950/20"
    },
    Zap: {
        color: "#F59E0B",
        bgLight: "bg-amber-50",
        bgDark: "dark:bg-amber-950/20"
    },
    default: {
        color: "#706F6C",
        bgLight: "bg-gray-50",
        bgDark: "dark:bg-gray-950/20"
    }
}

export function AppSection({ apps }: AppSectionProps) {
    if (!apps || apps.length === 0) {
        return (
            <div className="text-center py-6 sm:py-8 lg:py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
                <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-2 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay aplicaciones disponibles</h3>
                <p className="text-[#706F6C] dark:text-[#B4B4B4] text-xs sm:text-sm px-4">No se han asignado aplicaciones para esta sesión aún.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {apps.map((app) => {
                const IconComponent = iconMap[app.iconName] || Smartphone
                const styles = appStyles[app.iconName] || appStyles.default

                return (
                    <div
                        key={app.id}
                        className="bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="p-5 sm:p-6">
                            {/* Header con icono y badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`p-3 sm:p-3.5 rounded-xl ${styles.bgLight} ${styles.bgDark} transition-transform duration-200 group-hover:scale-105`}
                                >
                                    <IconComponent
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: styles.color }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                                    <Sparkles className="h-2.5 w-2.5" />
                                    Interactivo
                                </span>
                            </div>

                            {/* Contenido */}
                            <div className="mb-5">
                                <h3 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-1.5">
                                    {app.name}
                                </h3>
                                <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                                    {app.description}
                                </p>
                            </div>

                            {/* Botón de acción */}
                            <Link href={app.url} target="_blank" className="block">
                                <button
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F5F4F0] dark:bg-[#333333] text-[#1A1915] dark:text-[#E5E5E5] font-medium text-sm transition-all duration-200 hover:bg-[#E5E4E0] dark:hover:bg-[#404040] active:scale-[0.98]"
                                >
                                    <Play className="h-4 w-4" style={{ color: styles.color }} fill="currentColor" />
                                    <span>Iniciar Práctica</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
