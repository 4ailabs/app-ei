"use client"

import { ImageIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceImageProps {
  id: string
  title: string
  url: string
  description?: string
}

export function ResourceImage({ title, url, description }: ResourceImageProps) {
  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#E5E4E0] dark:border-[#333333]">
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg sm:rounded-xl flex-shrink-0">
          <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base sm:text-lg text-[#1A1915] dark:text-[#ECECEC] mb-1 break-words">{title}</h4>
          {description && (
            <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4] mb-2 sm:mb-3">{description}</p>
          )}
        </div>
      </div>
      {url && (
        <div className="relative aspect-video bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-lg overflow-hidden mb-3 sm:mb-4">
          <img
            src={url}
            alt={title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      {url && (
        <Button
          onClick={() => window.location.href = url}
          variant="outline"
          className="w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4 py-2"
        >
          <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Ver imagen completa
        </Button>
      )}
    </div>
  )
}
