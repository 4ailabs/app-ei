"use client"

import { FileText, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceDiagramProps {
  id: string
  title: string
  url: string
  description?: string
}

export function ResourceDiagram({ title, url, description }: ResourceDiagramProps) {
  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl p-4 sm:p-6 border border-[#E5E4E0] dark:border-[#333333]">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex-shrink-0">
          <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg text-[#1A1915] dark:text-[#ECECEC] mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-[#706F6C] dark:text-[#B4B4B4] mb-3">{description}</p>
          )}
        </div>
      </div>
      {url && (
        <div className="flex gap-2">
          <Button
            onClick={() => window.open(url, "_blank")}
            variant="outline"
            className="flex-1"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver diagrama
          </Button>
          <Button
            onClick={() => {
              const link = document.createElement('a')
              link.href = url
              link.download = title
              link.click()
            }}
            variant="outline"
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </div>
      )}
    </div>
  )
}
