"use client"

import { Play } from "lucide-react"

// Helper function to get Cloudflare Stream embed URL
function getCloudflareStreamUrl(streamId: string): string {
  // Usar directamente iframe.videodelivery.net que es el formato estándar
  // Este formato no requiere Account ID y funciona con cualquier video de Cloudflare Stream
  // NO incluir autoplay - Cloudflare Stream no reproduce automáticamente por defecto
  return `https://iframe.videodelivery.net/${streamId}?muted=false&preload=none&controls=true`
}

const PROMO_VIDEO_ID = "39f53dd7e006eb1ea5de4f0493d35ee3"

export function PromoVideo() {
  const videoUrl = getCloudflareStreamUrl(PROMO_VIDEO_ID)

  return (
    <div className="bg-white dark:bg-[#252525] p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Play className="h-4 w-4 text-[#DA7756] dark:text-[#ECECEC]" />
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-[#1A1915] dark:text-[#ECECEC]">Video de Introducción</h2>
      </div>
      <div
        className="aspect-video w-full rounded-lg overflow-hidden bg-[#F5F4F0] dark:bg-[#252525]"
      >
        {videoUrl ? (
          <iframe
            key={`promo-${PROMO_VIDEO_ID}`}
            src={videoUrl}
            width="100%"
            height="100%"
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Video de Introducción"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 opacity-50" />
              <p className="text-xs sm:text-sm opacity-70">Video próximamente</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-[#706F6C] dark:text-[#A0A0A0] mt-2 text-xs">
        Descubre los fundamentos de la Inteligencia Energética.
      </p>
    </div>
  )
}

