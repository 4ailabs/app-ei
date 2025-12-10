"use client"

import { Play } from "lucide-react"
import { getStreamEmbedUrl } from "@/lib/cloudflare-stream"

// Helper function to get Cloudflare Stream embed URL
function getCloudflareStreamUrl(streamId: string): string {
  try {
    return getStreamEmbedUrl(streamId, undefined, {
      autoplay: false,
      controls: true,
      preload: "none",
      muted: false
    })
  } catch (error) {
    // Fallback: usar iframe.videodelivery.net que no requiere Account ID
    return `https://iframe.videodelivery.net/${streamId}?preload=none&autoplay=false&controls=true&muted=false`
  }
}

const PROMO_VIDEO_ID = "39f53dd7e006eb1ea5de4f0493d35ee3"

export function PromoVideo() {
  const videoUrl = getCloudflareStreamUrl(PROMO_VIDEO_ID)

  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#252525] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#DA7756]/30">
      <div className="flex items-center gap-2 mb-4">
        <Play className="h-5 w-5 text-[#DA7756] dark:text-[#ECECEC]" />
        <h2 className="text-xl lg:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Video Promocional</h2>
      </div>
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1A1915] dark:bg-black shadow-lg border border-[#E5E4E0] dark:border-[#DA7756]/30">
        {videoUrl ? (
          <iframe
            key={`promo-${PROMO_VIDEO_ID}`}
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Video Promocional"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-3 opacity-50" />
              <p className="text-sm opacity-70">Video próximamente</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-[#706F6C] dark:text-[#A0A0A0] mt-4 text-sm">
        Descubre los fundamentos de la Inteligencia Energética y cómo este seminario transformará tu práctica profesional.
      </p>
    </div>
  )
}

