import { Protocol } from "@/data/sessions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"

interface ProtocolSectionProps {
    protocols: Protocol[]
}

export function ProtocolSection({ protocols }: ProtocolSectionProps) {
    if (!protocols || protocols.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No hay protocolos disponibles</h3>
                <p className="text-gray-500">No se han asignado protocolos para esta sesión aún.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6">
            {protocols.map((protocol) => (
                <Card key={protocol.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="p-6 md:p-8 flex-1">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {protocol.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {protocol.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 md:p-8 md:pl-0 flex items-center justify-end">
                            {protocol.pdfUrl && (
                                <Button className="w-full md:w-auto bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <Download className="mr-2 h-5 w-5" />
                                    Descargar Protocolo
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
