"use client"

import { Protocol } from "@/data/sessions"
import { FileText, ChevronRight, BookOpen, Wrench, Map, Brain, FlaskConical, Sparkles, Target, PenTool, Calendar } from "lucide-react"
import { ThreeStatesCard } from "./ThreeStatesCard"
import { WindowOfToleranceCard } from "./WindowOfToleranceCard"
import { RegulationToolsCard } from "./RegulationToolsCard"
import { PocketCards } from "./PocketCards"

interface ProtocolSectionProps {
    protocols: Protocol[]
    moduleNumber?: number
}

// Componente para separador de sección
function SectionDivider({
    icon: Icon,
    title,
    description
}: {
    icon: React.ElementType
    title: string
    description: string
}) {
    return (
        <div className="relative py-6 sm:py-8 lg:py-12">
            {/* Línea decorativa */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E4E0] dark:border-[#333333]"></div>
            </div>
            {/* Contenido central */}
            <div className="relative flex justify-center">
                <div className="bg-[#FAF9F7] dark:bg-[#1A1A1A] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#E5E4E0] dark:border-[#333333] flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-2.5 bg-[#F5F4F0] dark:bg-[#252525] rounded-full">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                    </div>
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{title}</h3>
                        <p className="text-[10px] sm:text-xs text-[#706F6C] dark:text-[#A0A0A0] hidden sm:block">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Configuración de iconos para protocolos específicos (color uniforme gris)
const protocolIcons: Record<string, React.ElementType> = {
    // Módulo 1
    "p1-1": Sparkles,
    "p1-2": Target,
    "p1-3": Wrench,
    // Módulo 2
    "p2-1": Map,
    "p2-2": Brain,
    "p2-3": FlaskConical,
    // Módulo 3
    "p3-1": Target,
    "p3-2": PenTool,
    "p3-3": Sparkles,
    // Módulo 4
    "p4-1": PenTool,
    "p4-2": Calendar,
    "p4-3": BookOpen,
}

// Iconos por defecto para protocolos sin configuración específica
const defaultIcons = [FileText, BookOpen, Brain, Target, Sparkles, FlaskConical]

export function ProtocolSection({ protocols, moduleNumber }: ProtocolSectionProps) {
    // Mostrar tarjetas de bolsillo si es módulo 1
    const showPocketCards = moduleNumber === 1

    if (!protocols || protocols.length === 0) {
        if (showPocketCards) {
            return (
                <div className="space-y-6">
                    <PocketCards />
                </div>
            )
        }
        return (
            <div className="text-center py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-2xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
                <FileText className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay protocolos disponibles</h3>
                <p className="text-[#706F6C] dark:text-[#B4B4B4]">No se han asignado protocolos para esta sesión aún.</p>
            </div>
        )
    }

    // Separar protocolos especiales (Módulo 1) de los genéricos
    const specialProtocols = protocols.filter(p => ["p1-1", "p1-2", "p1-3"].includes(p.id))
    const otherProtocols = protocols.filter(p => !["p1-1", "p1-2", "p1-3"].includes(p.id))

    const getProtocolIcon = (protocolId: string, index: number) => {
        if (protocolIcons[protocolId]) {
            return protocolIcons[protocolId]
        }
        return defaultIcons[index % defaultIcons.length]
    }

    return (
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {/* SECCIÓN 1: Tarjetas de Bolsillo */}
            {showPocketCards && (
                <section>
                    <PocketCards />
                </section>
            )}

            {/* SECCIÓN 2: Materiales de Referencia (protocolos especiales del Módulo 1) */}
            {specialProtocols.length > 0 && (
                <section>
                    <SectionDivider
                        icon={BookOpen}
                        title="Materiales de Referencia"
                        description="Infografías descargables"
                    />
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                        {specialProtocols.map((protocol) => {
                            if (protocol.id === "p1-1") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <ThreeStatesCard accentColor="#1B6B4A" />
                                    </div>
                                )
                            }

                            if (protocol.id === "p1-2") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <WindowOfToleranceCard accentColor="#B8860B" />
                                    </div>
                                )
                            }

                            if (protocol.id === "p1-3") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <RegulationToolsCard accentColor="#2563EB" />
                                    </div>
                                )
                            }

                            return null
                        })}
                    </div>
                </section>
            )}

            {/* SECCIÓN 3: Otros Protocolos */}
            {otherProtocols.length > 0 && (
                <section>
                    {specialProtocols.length > 0 && (
                        <SectionDivider
                            icon={Wrench}
                            title="Protocolos y Herramientas"
                            description="Guías y documentos de trabajo"
                        />
                    )}
                    <div className="space-y-4">
                        {otherProtocols.map((protocol, index) => {
                            const Icon = getProtocolIcon(protocol.id, index)
                            const hasUrl = protocol.pdfUrl && protocol.pdfUrl.length > 0

                            return (
                                <div
                                    key={protocol.id}
                                    className="bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
                                >
                                    <div className="px-5 sm:px-6 py-4 sm:py-5">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#F5F4F0] dark:bg-[#333333] relative">
                                                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
                                                <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-[#DA7756]"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-1 group-hover:text-[#1A1915] dark:group-hover:text-[#E5E5E5] transition-colors">
                                                            {protocol.title}
                                                        </h3>
                                                        <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                                                            {protocol.description}
                                                        </p>
                                                    </div>

                                                    {/* Action Button */}
                                                    {hasUrl && (
                                                        <button
                                                            onClick={() => window.open(protocol.pdfUrl, '_blank')}
                                                            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 bg-[#F5F4F0] dark:bg-[#333333] text-[#1A1915] dark:text-[#E5E5E5] hover:bg-[#E5E4E0] dark:hover:bg-[#404040]"
                                                        >
                                                            <span className="hidden sm:inline">Ver</span>
                                                            <ChevronRight className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Tags/Info */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                                                        {protocol.pdfUrl?.endsWith('.html') ? 'Interactivo' : 'Documento'}
                                                    </span>
                                                    {!hasUrl && (
                                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                                                            Próximamente
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer Summary */}
                    <div className="mt-6 p-4 bg-[#F5F4F0] dark:bg-[#1F1F1F] rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
                        <div className="flex items-center gap-3">
                            <Wrench className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                            <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                                <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{otherProtocols.length}</span> protocolo{otherProtocols.length > 1 ? 's' : ''} disponible{otherProtocols.length > 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
