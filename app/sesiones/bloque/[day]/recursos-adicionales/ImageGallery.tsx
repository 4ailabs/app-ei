"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react"
import { ImageCategory } from "@/data/sessions"

interface GalleryImage {
  id: string
  title: string
  url: string
  description?: string
  category?: ImageCategory
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

// Configuración de categorías - solo títulos, iconos grises consistentes
const categoryConfig: Record<ImageCategory, { title: string }> = {
  sistema_nervioso: { title: "Sistema Nervioso" },
  ventana_tolerancia: { title: "Ventana de Tolerancia" },
  respiracion: { title: "Técnicas de Respiración" },
  palancas: { title: "Las 4 Palancas" },
  neuroplasticidad: { title: "Neuroplasticidad" },
  recursos: { title: "Recursos y Conceptos" },
  tecnicas: { title: "Técnicas Adicionales" }
}

// Orden de las categorías
const categoryOrder: ImageCategory[] = [
  "sistema_nervioso",
  "ventana_tolerancia",
  "respiracion",
  "palancas",
  "neuroplasticidad",
  "recursos",
  "tecnicas"
]

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Agrupar imágenes por categoría
  const imagesByCategory = images.reduce((acc, img) => {
    const cat = img.category || "recursos"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(img)
    return acc
  }, {} as Record<ImageCategory, GalleryImage[]>)

  // Todas las imágenes en orden plano para navegación
  const allImages = categoryOrder.flatMap(cat => imagesByCategory[cat] || [])

  const openLightbox = (image: GalleryImage) => {
    const index = allImages.findIndex(img => img.id === image.id)
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : allImages.length - 1
    setSelectedIndex(newIndex)
    setSelectedImage(allImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = selectedIndex < allImages.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(newIndex)
    setSelectedImage(allImages[newIndex])
  }

  // Manejar teclas del teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {categoryOrder.map(category => {
        const categoryImages = imagesByCategory[category]
        if (!categoryImages || categoryImages.length === 0) return null

        const config = categoryConfig[category]

        return (
          <div key={category} className="space-y-3 sm:space-y-4">
            {/* Category Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h3 className="text-sm sm:text-base font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                {config.title}
              </h3>
              <span className="text-xs text-[#706F6C] dark:text-[#A0A0A0] bg-[#F5F4F0] dark:bg-[#333333] px-2 py-0.5 rounded-full">
                {categoryImages.length}
              </span>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {categoryImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => openLightbox(image)}
                  className="group relative aspect-[4/3] bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-lg sm:rounded-xl overflow-hidden border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756] dark:hover:border-[#DA7756] transition-all duration-200 hover:shadow-md"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 dark:bg-[#333333]/90 rounded-full p-1.5 sm:p-2">
                      <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5 text-[#1A1915] dark:text-[#E5E5E5]" />
                    </div>
                  </div>
                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 sm:p-2">
                    <p className="text-[10px] sm:text-xs text-white font-medium line-clamp-2">
                      {image.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button - ajustado para móvil */}
          <button
            onClick={closeLightbox}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Navigation buttons - ocultos en móvil muy pequeño, visible en sm+ */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Image container - mejor para móvil */}
          <div
            className="w-full h-full flex flex-col items-center justify-center px-12 sm:px-16 py-16 sm:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image info - compacto en móvil */}
            <div className="mt-3 sm:mt-4 text-center max-w-2xl px-4">
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-xs sm:text-sm text-white/80 hidden sm:block">
                  {selectedImage.description}
                </p>
              )}
              <div className="flex items-center justify-center gap-3 mt-2 sm:mt-3">
                <p className="text-xs text-white/60">
                  {selectedIndex + 1} de {allImages.length}
                </p>
                <a
                  href={selectedImage.url}
                  download={`${selectedImage.title}.png`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-xs text-white/80 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Descargar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
