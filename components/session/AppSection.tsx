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
            <div className="text-center py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-3xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
                <Smartphone className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay aplicaciones disponibles</h3>
                <p className="text-[#706F6C] dark:text-[#B4B4B4]">No se han asignado aplicaciones para esta sesión aún.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
                const IconComponent = iconMap[app.iconName] || Smartphone

                return (
                    <Card key={app.id} className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full bg-white dark:bg-[#393939]">
                        <div className="p-8 flex-1 flex flex-col items-center text-center">
                            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                                <IconComponent className="h-8 w-8" />
                            </div>

                            <h3 className="text-xl font-bold text-[#1A1915] dark:text-[#ECECEC] mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {app.name}
                            </h3>

                            <p className="text-[#706F6C] dark:text-[#B4B4B4] mb-6 leading-relaxed text-sm">
                                {app.description}
                            </p>
                        </div>

                        <div className="p-6 pt-0 mt-auto">
                            <Link href={app.url} target="_blank" className="block w-full">
                                <Button className="w-full bg-white dark:bg-[#2F2F2F] border-2 border-[#E5E4E0] dark:border-[#4A4A4A] hover:border-purple-600 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-[#1A1915] dark:text-[#ECECEC] hover:text-purple-700 dark:hover:text-purple-400 rounded-xl py-6 h-auto transition-all duration-300 font-semibold">
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
