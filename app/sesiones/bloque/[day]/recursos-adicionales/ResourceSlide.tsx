"use client"

import { Presentation, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceSlideProps {
  id: string
  title: string
  url: string
  description?: string
}

export function ResourceSlide({ title, url, description }: ResourceSlideProps) {
  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#E5E4E0] dark:border-[#333333]">
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg sm:rounded-xl flex-shrink-0">
          <Presentation className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base sm:text-lg text-[#1A1915] dark:text-[#ECECEC] mb-1 break-words">{title}</h4>
          {description && (
            <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4] mb-2 sm:mb-3">{description}</p>
          )}
        </div>
      </div>
      {url && (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => window.open(url, "_blank")}
            variant="outline"
            className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Ver presentación
          </Button>
          <Button
            onClick={() => {
              const link = document.createElement('a')
              link.href = url
              link.download = title
              link.click()
            }}
            variant="outline"
            className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Descargar
          </Button>
        </div>
      )}
    </div>
  )
}
