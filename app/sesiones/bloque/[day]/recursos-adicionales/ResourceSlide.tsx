"use client"

import { useState } from "react"
import { Presentation, ExternalLink, Maximize2 } from "lucide-react"
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

// Función para detectar si es un PDF y obtener URL de visor
function getPdfViewerUrl(url: string): string | null {
  // Detectar si es un PDF por la extensión
  if (url.toLowerCase().endsWith('.pdf')) {
    // Usar Google Docs Viewer para embeber PDFs
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  }
  return null
}

export function ResourceSlide({ title, url, description }: ResourceSlideProps) {
  const [showEmbed, setShowEmbed] = useState(false)
  const googleSlidesUrl = getGoogleSlidesEmbedUrl(url)
  const pdfViewerUrl = getPdfViewerUrl(url)
  const embedUrl = googleSlidesUrl || pdfViewerUrl
  const isEmbeddable = embedUrl !== null

  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#E5E4E0] dark:border-[#333333]">
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-[#F5F4F0] dark:bg-[#333333] rounded-lg sm:rounded-xl flex-shrink-0">
          <Presentation className="h-5 w-5 sm:h-6 sm:w-6 text-[#706F6C] dark:text-[#A0A0A0]" />
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
          {/* Botones de acción - simplificado a 2 botones */}
          <div className="flex flex-col sm:flex-row gap-2">
            {isEmbeddable && (
              <Button
                onClick={() => setShowEmbed(!showEmbed)}
                variant="outline"
                className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <Maximize2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {showEmbed ? 'Ocultar' : 'Ver aquí'}
              </Button>
            )}
            <Button
              onClick={() => window.open(url, "_blank")}
              variant="outline"
              className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Abrir
            </Button>
          </div>

          {/* Vista embebida (Google Slides o PDF) */}
          {showEmbed && embedUrl && (
            <div className="relative w-full rounded-lg overflow-hidden border border-[#E5E4E0] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#2F2F2F]">
              {/* Aspect ratio container - altura mínima adaptada a móvil */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedUrl}
                  className="absolute top-0 left-0 w-full h-full min-h-[250px] sm:min-h-[400px]"
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
