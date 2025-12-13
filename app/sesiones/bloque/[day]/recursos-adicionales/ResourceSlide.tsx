"use client"

import { useState } from "react"
import { Presentation, ExternalLink, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceSlideProps {
  id: string
  title: string
  url: string
  description?: string
}

// Función para convertir URL de Google Slides a formato embed
function getGoogleSlidesEmbedUrl(url: string): string | null {
  // Detectar si es un enlace de Google Slides
  // Soporta múltiples formatos:
  // - /d/ID/edit
  // - /d/ID/preview
  // - /d/e/ID/...
  const googleSlidesRegex = /docs\.google\.com\/presentation\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/
  const match = url.match(googleSlidesRegex)
  
  if (match) {
    const presentationId = match[1]
    // Intentar primero con el formato de preview (más compatible)
    // Si no funciona, el usuario puede usar el enlace de publicación
    return `https://docs.google.com/presentation/d/${presentationId}/preview`
  }
  
  return null
}

export function ResourceSlide({ title, url, description }: ResourceSlideProps) {
  const [showEmbed, setShowEmbed] = useState(false)
  const embedUrl = getGoogleSlidesEmbedUrl(url)
  const isGoogleSlides = embedUrl !== null

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
        <div className="space-y-3 sm:space-y-4">
          {/* Botones de acción */}
          {isGoogleSlides && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setShowEmbed(!showEmbed)}
                variant="outline"
                className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <Maximize2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {showEmbed ? 'Ocultar presentación' : 'Ver presentación embebida'}
              </Button>
            </div>
          )}
          {!isGoogleSlides && (
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

          {/* Vista embebida de Google Slides */}
          {showEmbed && embedUrl && (
            <div className="relative w-full rounded-lg overflow-hidden border border-[#E5E4E0] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#2F2F2F]">
              <div className="relative" style={{ paddingBottom: '56.25%', minHeight: '500px' }}> {/* 16:9 aspect ratio */}
                <iframe
                  src={embedUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={title}
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
