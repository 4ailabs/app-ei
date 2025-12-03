import { AppLink } from "@/data/sessions"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Activity, Radio, Smartphone, Zap, Heart } from "lucide-react"
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

export function AppSection({ apps }: AppSectionProps) {
    if (!apps || apps.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Smartphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No hay aplicaciones disponibles</h3>
                <p className="text-gray-500">No se han asignado aplicaciones para esta sesión aún.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
                const IconComponent = iconMap[app.iconName] || Smartphone

                return (
                    <Card key={app.id} className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                        <div className="p-8 flex-1 flex flex-col items-center text-center">
                            <div className="mb-6 p-4 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                                <IconComponent className="h-8 w-8" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {app.name}
                            </h3>

                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                {app.description}
                            </p>
                        </div>

                        <div className="p-6 pt-0 mt-auto">
                            <Link href={app.url} target="_blank" className="block w-full">
                                <Button className="w-full bg-white border-2 border-gray-100 hover:border-purple-600 hover:bg-purple-50 text-gray-900 hover:text-purple-700 rounded-xl py-6 h-auto transition-all duration-300 font-semibold">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Abrir Aplicación
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
