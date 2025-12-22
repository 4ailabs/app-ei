import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Lock, Star, Play, FileText, Headphones, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"

const XP_THRESHOLD = 500

// Contenido Premium - Lo puedes actualizar aquí cada semana
const premiumContent = {
    videos: [
        {
            id: "v1",
            title: "Masterclass: Regulación Avanzada",
            description: "Técnicas avanzadas de regulación del sistema nervioso para situaciones de alta intensidad.",
            duration: "45 min",
            url: "#", // Reemplazar con URL real
            isNew: true
        },
        {
            id: "v2",
            title: "Neurociencia del Cambio",
            description: "Cómo el cerebro crea nuevos patrones y por qué la repetición importa.",
            duration: "32 min",
            url: "#",
            isNew: false
        }
    ],
    audios: [
        {
            id: "a1",
            title: "Meditación: Conexión Profunda",
            description: "Práctica guiada de 20 minutos para conectar con tu estado ventral.",
            duration: "20 min",
            url: "#",
            isNew: true
        },
        {
            id: "a2",
            title: "Respiración para Dormir",
            description: "Secuencia especial de respiración para conciliar el sueño.",
            duration: "15 min",
            url: "#",
            isNew: false
        }
    ],
    pdfs: [
        {
            id: "p1",
            title: "Guía: Las 10 Técnicas Esenciales",
            description: "Resumen descargable de las técnicas más efectivas del programa.",
            pages: 12,
            url: "#",
            isNew: true
        },
        {
            id: "p2",
            title: "Workbook: Journaling Terapéutico",
            description: "Plantillas y ejercicios de escritura para procesar emociones.",
            pages: 24,
            url: "#",
            isNew: false
        }
    ]
}

export default async function PremiumPage() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    // Obtener datos de XP del usuario
    let totalXP = 0
    let premiumUnlocked = false

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                totalXP: true,
                premiumUnlocked: true
            }
        })
        totalXP = user?.totalXP || 0
        premiumUnlocked = user?.premiumUnlocked || false
    } catch (e) {
        // Los campos aún no existen en la BD - usar valores por defecto
        console.log('XP fields not yet migrated, using defaults')
    }
    const progress = Math.min(100, Math.round((totalXP / XP_THRESHOLD) * 100))
    const xpNeeded = Math.max(0, XP_THRESHOLD - totalXP)

    return (
        <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#0F0F0F]">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                            Contenido Premium
                        </h1>
                    </div>
                    <p className="text-[#706F6C] dark:text-[#A0A0A0] text-base sm:text-lg">
                        Material exclusivo que se actualiza cada semana.
                    </p>
                </div>

                {/* XP Progress Card */}
                <div className="mb-8 p-6 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E5E4E0] dark:border-[#333333]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">Tu progreso</p>
                                <p className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
                                    {totalXP} <span className="text-sm font-normal text-[#706F6C]">/ {XP_THRESHOLD} XP</span>
                                </p>
                            </div>
                        </div>
                        {premiumUnlocked ? (
                            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Desbloqueado
                            </span>
                        ) : (
                            <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                                Faltan {xpNeeded} XP
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="h-3 bg-[#F5F4F0] dark:bg-[#252525] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {!premiumUnlocked && (
                        <p className="mt-4 text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                            Practica en las apps interactivas para ganar XP y desbloquear el contenido premium.{" "}
                            <Link href="/apps" className="text-[#DA7756] hover:underline">
                                Ir a las Apps
                            </Link>
                        </p>
                    )}
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Videos */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Play className="w-5 h-5 text-[#DA7756]" />
                            <h2 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Videos</h2>
                        </div>
                        <div className="grid gap-4">
                            {premiumContent.videos.map((video) => (
                                <ContentCard
                                    key={video.id}
                                    title={video.title}
                                    description={video.description}
                                    meta={video.duration}
                                    url={video.url}
                                    isNew={video.isNew}
                                    isLocked={!premiumUnlocked}
                                    type="video"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Audios */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Headphones className="w-5 h-5 text-[#DA7756]" />
                            <h2 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Audios</h2>
                        </div>
                        <div className="grid gap-4">
                            {premiumContent.audios.map((audio) => (
                                <ContentCard
                                    key={audio.id}
                                    title={audio.title}
                                    description={audio.description}
                                    meta={audio.duration}
                                    url={audio.url}
                                    isNew={audio.isNew}
                                    isLocked={!premiumUnlocked}
                                    type="audio"
                                />
                            ))}
                        </div>
                    </section>

                    {/* PDFs */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-[#DA7756]" />
                            <h2 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Material Descargable</h2>
                        </div>
                        <div className="grid gap-4">
                            {premiumContent.pdfs.map((pdf) => (
                                <ContentCard
                                    key={pdf.id}
                                    title={pdf.title}
                                    description={pdf.description}
                                    meta={`${pdf.pages} páginas`}
                                    url={pdf.url}
                                    isNew={pdf.isNew}
                                    isLocked={!premiumUnlocked}
                                    type="pdf"
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Info */}
                <div className="mt-12 p-4 sm:p-6 bg-[#DA7756]/5 dark:bg-[#DA7756]/10 rounded-xl border border-[#DA7756]/20">
                    <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                        <span className="font-medium text-[#DA7756]">Nuevo contenido cada semana:</span> Agregamos videos, audios y material descargable regularmente. Una vez desbloqueado, tendrás acceso permanente a todo el contenido presente y futuro.
                    </p>
                </div>
            </div>
        </div>
    )
}

// Componente para las cards de contenido
function ContentCard({
    title,
    description,
    meta,
    url,
    isNew,
    isLocked,
    type
}: {
    title: string
    description: string
    meta: string
    url: string
    isNew: boolean
    isLocked: boolean
    type: "video" | "audio" | "pdf"
}) {
    const IconMap = {
        video: Play,
        audio: Headphones,
        pdf: FileText
    }
    const Icon = IconMap[type]

    if (isLocked) {
        return (
            <div className="relative p-5 bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E5E4E0] dark:border-[#333333] opacity-60">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-[#1A1A1A]/50 rounded-xl" />
                <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#F5F4F0] dark:bg-[#252525]">
                        <Lock className="w-5 h-5 text-[#9B9A97]" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-[#9B9A97]">{title}</h3>
                            {isNew && (
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                    Nuevo
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-[#B4B4B4] mb-2">{description}</p>
                        <span className="text-xs text-[#B4B4B4]">{meta}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link
            href={url}
            className="block p-5 bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756] dark:hover:border-[#DA7756] transition-all hover:shadow-md"
        >
            <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#DA7756]/10">
                    <Icon className="w-5 h-5 text-[#DA7756]" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-[#1A1915] dark:text-[#E5E5E5]">{title}</h3>
                        {isNew && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Nuevo
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mb-2">{description}</p>
                    <span className="text-xs text-[#9B9A97]">{meta}</span>
                </div>
            </div>
        </Link>
    )
}
