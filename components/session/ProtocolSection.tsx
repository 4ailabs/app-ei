import { Protocol } from "@/data/sessions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import { ThreeStatesCard } from "./ThreeStatesCard"
import { WindowOfToleranceCard } from "./WindowOfToleranceCard"
import { RegulationToolsCard } from "./RegulationToolsCard"

interface ProtocolSectionProps {
    protocols: Protocol[]
}

export function ProtocolSection({ protocols }: ProtocolSectionProps) {
    if (!protocols || protocols.length === 0) {
        return (
            <div className="text-center py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-3xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
                <FileText className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay protocolos disponibles</h3>
                <p className="text-[#706F6C] dark:text-[#B4B4B4]">No se han asignado protocolos para esta sesión aún.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6">
            {protocols.map((protocol) => {
                // Si es la tarjeta de "Los 3 Estados", mostrar el componente especial
                if (protocol.id === "p1-1") {
                    return (
                        <div key={protocol.id} className="w-full">
                            <ThreeStatesCard />
                        </div>
                    )
                }

                // Si es la tarjeta de "Mi Ventana de Tolerancia", mostrar el componente especial
                if (protocol.id === "p1-2") {
                    return (
                        <div key={protocol.id} className="w-full">
                            <WindowOfToleranceCard />
                        </div>
                    )
                }

                // Si es la tarjeta de "Herramientas de Regulación", mostrar el componente especial
                if (protocol.id === "p1-3") {
                    return (
                        <div key={protocol.id} className="w-full">
                            <RegulationToolsCard />
                        </div>
                    )
                }

                // Para otros protocolos, mostrar la tarjeta estándar
                return (
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
                                    <Button className="w-full md:w-auto bg-[#1A1915] hover:bg-[#2F2F2F] dark:bg-[#ECECEC] dark:hover:bg-white dark:text-[#1A1915] text-white rounded-xl px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <Download className="mr-2 h-5 w-5" />
                                        Descargar Protocolo
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
