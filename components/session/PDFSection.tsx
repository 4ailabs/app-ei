"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle2, Maximize2, ExternalLink, Presentation, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { PDF } from "@/data/sessions"

// Tipo flexible que acepta PDFs y slides
interface PDFOrSlide {
  id: string
  title: string
  url?: string
  description?: string
  pages?: number
  category?: string
  type?: 'slide'
}

// Función para convertir URL de Google Slides a formato embed
function getGoogleSlidesEmbedUrl(url: string): string | null {
  const googleSlidesRegex = /docs\.google\.com\/presentation\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/
  const match = url.match(googleSlidesRegex)
  if (match) {
    const presentationId = match[1]
    return `https://docs.google.com/presentation/d/${presentationId}/preview`
  }
  return null
}

// Función para detectar si es un PDF y obtener URL de visor
function getPdfViewerUrl(url: string): string | null {
  if (url.toLowerCase().endsWith('.pdf')) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  }
  return null
}

interface PDFSectionProps {
  pdfUrl?: string
  pdfs?: (PDF | PDFOrSlide)[]
  title?: string
  sessionId: number
}

export function PDFSection({ pdfUrl, pdfs, title = "Manual de la Sesión", sessionId }: PDFSectionProps) {
  const { data: session } = useSession()
  const [viewed, setViewed] = useState(false)
  const [expandedSlides, setExpandedSlides] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (viewed && session) {
      updateProgress("pdfViewed", true)
    }
  }, [viewed, session])

  const updateProgress = async (field: string, value: boolean) => {
    if (!session) return

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  // Si hay múltiples PDFs, mostrar lista
  if (pdfs && pdfs.length > 0) {
    // Determinar si son recursos adicionales basado en la categoría del primer PDF
    const isAdditionalResources = pdfs.some(pdf => pdf.category === "recursos_adicionales")
    // PDFs normales usan naranja (#DA7756), recursos adicionales usan verde (#2ca58d)
    const borderColor = isAdditionalResources
      ? "border-[#2ca58d]/40 dark:border-[#2ca58d]/50"
      : "border-[#DA7756]/40 dark:border-[#DA7756]/50"
    const iconBg = isAdditionalResources
      ? "bg-[#2ca58d]/10 dark:bg-[#2ca58d]/20"
      : "bg-[#DA7756]/10 dark:bg-[#DA7756]/20"
    const iconColor = isAdditionalResources
      ? "text-[#2ca58d]"
      : "text-[#DA7756]"

    return (
      <div className="space-y-3 sm:space-y-4">
        {pdfs.map((pdf) => {
          const isSlide = 'type' in pdf && pdf.type === 'slide'
          const googleSlidesUrl = pdf.url ? getGoogleSlidesEmbedUrl(pdf.url) : null
          const pdfViewerUrl = pdf.url ? getPdfViewerUrl(pdf.url) : null
          const embedUrl = googleSlidesUrl || pdfViewerUrl
          const isEmbeddable = isSlide && embedUrl !== null
          const isExpanded = expandedSlides[pdf.id] || false

          return (
            <div
              key={pdf.id}
              className={`bg-white dark:bg-[#252525] rounded-lg sm:rounded-xl border ${borderColor} hover:shadow-md transition-shadow overflow-hidden`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <div className={`flex-shrink-0 p-2 sm:p-3 ${iconBg} rounded-lg sm:rounded-xl`}>
                  {isSlide ? (
                    <Presentation className={`h-6 w-6 sm:h-8 sm:w-8 ${iconColor}`} />
                  ) : (
                    <FileText className={`h-6 w-6 sm:h-8 sm:w-8 ${iconColor}`} />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-sm sm:text-lg text-[#1A1915] dark:text-[#ECECEC] mb-0.5 sm:mb-1">{pdf.title}</h4>
                  <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4] mb-1.5 sm:mb-2 line-clamp-2">{pdf.description}</p>
                  {pdf.category && (
                    <span className="inline-block px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-[#DA7756]/10 dark:bg-[#DA7756]/20 text-[#DA7756]">
                      {pdf.category === "referencia" ? "Referencia" : pdf.category === "ejercicio" ? "Ejercicio" : pdf.category === "contenido_profundo" ? "Contenido Profundo" : "Recurso Adicional"}
                    </span>
                  )}
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                  {pdf.url ? (
                    <>
                      {isEmbeddable && (
                        <Button
                          onClick={() => setExpandedSlides(prev => ({ ...prev, [pdf.id]: !prev[pdf.id] }))}
                          variant="outline"
                          size="default"
                          className="w-full sm:w-auto text-sm"
                        >
                          <Maximize2 className="mr-2 h-4 w-4" />
                          {isExpanded ? 'Ocultar' : 'Ver aquí'}
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          setViewed(true)
                          window.location.href = pdf.url!
                        }}
                        variant="outline"
                        size="default"
                        className="w-full sm:w-auto text-sm"
                      >
                        {isSlide ? (
                          <Eye className="mr-2 h-4 w-4" />
                        ) : (
                          <ExternalLink className="mr-2 h-4 w-4" />
                        )}
                        {isEmbeddable ? 'Abrir' : isSlide ? 'Ver' : 'Descargar'}
                      </Button>
                    </>
                  ) : (
                    <Button disabled variant="outline" size="default" className="w-full sm:w-auto text-sm">
                      <Download className="mr-2 h-4 w-4" />
                      No disponible
                    </Button>
                  )}
                </div>
              </div>

              {/* Vista embebida para slides */}
              {isExpanded && embedUrl && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="relative w-full rounded-lg overflow-hidden border border-[#E5E4E0] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#2F2F2F]">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={embedUrl}
                        className="absolute top-0 left-0 w-full h-full min-h-[250px] sm:min-h-[400px]"
                        allowFullScreen
                        title={pdf.title}
                        loading="lazy"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Si solo hay un PDFUrl, mostrar el componente original
  if (!pdfUrl) {
    return (
      <div className="text-center py-6 sm:py-8">
        <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-2 sm:mb-3" />
        <h3 className="text-base sm:text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">PDF no disponible</h3>
        <p className="text-[#706F6C] dark:text-[#B4B4B4] text-xs sm:text-sm">El material PDF estará disponible próximamente</p>
      </div>
    )
  }

  const handleDownload = () => {
    if (pdfUrl) {
      setViewed(true)
      window.location.href = pdfUrl
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white dark:bg-[#252525] rounded-lg sm:rounded-xl border border-[#DA7756]/40 dark:border-[#DA7756]/50">
      <div className="p-3 sm:p-4 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 rounded-lg sm:rounded-xl">
        <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-[#DA7756]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
          <h3 className="text-sm sm:text-lg font-bold text-[#1A1915] dark:text-[#ECECEC]">{title}</h3>
          {viewed && (
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#2ca58d]" />
          )}
        </div>
        <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#B4B4B4]">
          Descarga el manual completo de esta sesión en formato PDF
        </p>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        className="w-full sm:w-auto text-sm"
      >
        <Download className="mr-2 h-4 w-4" />
        Descargar
      </Button>
    </div>
  )
}
