import { Protocol } from "@/data/sessions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, CreditCard, BookOpen, Wrench } from "lucide-react"
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
        <div className="relative py-4 sm:py-6 lg:py-8">
            {/* Línea decorativa */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E4E0] dark:border-[#333333]"></div>
            </div>
            {/* Contenido central */}
            <div className="relative flex justify-center">
                <div className="bg-[#FAF9F7] dark:bg-[#1A1A1A] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#E5E4E0] dark:border-[#333333] flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-[#F5F4F0] dark:bg-[#252525] rounded-full">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
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
            <div className="text-center py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-3xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
                <FileText className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay protocolos disponibles</h3>
                <p className="text-[#706F6C] dark:text-[#B4B4B4]">No se han asignado protocolos para esta sesión aún.</p>
            </div>
        )
    }

    // Colores distintivos para cada protocolo (más sutiles)
    const getProtocolColor = (protocolId: string) => {
      const colors: Record<string, string> = {
        "p1-1": "#1B6B4A", // Verde - Los 3 Estados
        "p1-2": "#B8860B", // Dorado - Ventana de Tolerancia
        "p1-3": "#2563EB", // Azul - Herramientas de Regulación
      }
      return colors[protocolId] || "#DA7756"
    }

    // Separar protocolos especiales de los genéricos
    const specialProtocols = protocols.filter(p => ["p1-1", "p1-2", "p1-3"].includes(p.id))
    const otherProtocols = protocols.filter(p => !["p1-1", "p1-2", "p1-3"].includes(p.id))

    return (
        <div className="space-y-2 sm:space-y-4">
            {/* SECCIÓN 1: Tarjetas de Bolsillo */}
            {showPocketCards && (
                <section>
                    <SectionDivider
                        icon={CreditCard}
                        title="Tarjetas de Bolsillo"
                        description="6 tarjetas para imprimir"
                    />
                    <PocketCards />
                </section>
            )}

            {/* SECCIÓN 2: Materiales de Referencia (protocolos especiales) */}
            {specialProtocols.length > 0 && (
                <section>
                    <SectionDivider
                        icon={BookOpen}
                        title="Materiales de Referencia"
                        description="Infografías descargables"
                    />
                    <div className="space-y-4 sm:space-y-6">
                        {specialProtocols.map((protocol) => {
                            const accentColor = getProtocolColor(protocol.id)

                            if (protocol.id === "p1-1") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <ThreeStatesCard accentColor={accentColor} />
                                    </div>
                                )
                            }

                            if (protocol.id === "p1-2") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <WindowOfToleranceCard accentColor={accentColor} />
                                    </div>
                                )
                            }

                            if (protocol.id === "p1-3") {
                                return (
                                    <div key={protocol.id} className="w-full">
                                        <RegulationToolsCard accentColor={accentColor} />
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
                    <SectionDivider
                        icon={Wrench}
                        title="Protocolos Adicionales"
                        description="Guías y documentos complementarios"
                    />
                    <div className="space-y-6">
                        {otherProtocols.map((protocol) => (
                            <Card key={protocol.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 group bg-white dark:bg-[#393939]">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="p-6 md:p-8 flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#ECECEC] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {protocol.title}
                                                </h3>
                                                <p className="text-[#706F6C] dark:text-[#B4B4B4] leading-relaxed">
                                                    {protocol.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 md:p-8 md:pl-0 flex items-center justify-end">
                                        {protocol.pdfUrl && (
                                            <Button 
                                                onClick={() => {
                                                    if (protocol.pdfUrl?.endsWith('.html')) {
                                                        window.open(protocol.pdfUrl, '_blank')
                                                    } else {
                                                        window.open(protocol.pdfUrl, '_blank')
                                                    }
                                                }}
                                                className="w-full md:w-auto bg-[#1A1915] hover:bg-[#2F2F2F] dark:bg-[#ECECEC] dark:hover:bg-white dark:text-[#1A1915] text-white rounded-xl px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <ExternalLink className="mr-2 h-5 w-5" />
                                                {protocol.pdfUrl?.endsWith('.html') ? 'Ver Protocolo' : 'Descargar Protocolo'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
