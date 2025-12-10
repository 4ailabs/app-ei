"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { getStreamEmbedUrl } from "@/lib/cloudflare-stream"
import { Button } from "@/components/ui/button"

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
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <div className="lg:col-span-2 bg-white dark:bg-[#252525] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#E5E4E0] dark:border-[#DA7756]/30">
        <div className="flex items-center gap-2 mb-4">
          <Play className="h-5 w-5 text-[#DA7756] dark:text-[#ECECEC]" />
          <h2 className="text-xl lg:text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC]">Video Promocional</h2>
        </div>
        <div 
          onClick={() => setShowVideo(true)}
          className="aspect-video bg-gradient-to-br from-[#DA7756]/20 to-[#C4684A]/30 dark:from-[#333333]/30 dark:to-[#252525]/40 rounded-2xl flex items-center justify-center relative overflow-hidden group border border-[#E5E4E0] dark:border-[#DA7756]/30 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-white dark:bg-[#252525] dark:border dark:border-[#DA7756]/30 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
              <Play className="h-8 w-8 text-[#DA7756] dark:text-[#ECECEC] ml-1" />
            </div>
            <p className="text-[#1A1915] dark:text-[#ECECEC] font-semibold">Ver Video de Introducción</p>
            <p className="text-[#706F6C] dark:text-[#B4B4B4] text-sm mt-1">Conoce más sobre el seminario</p>
          </div>
        </div>
        <p className="text-[#706F6C] dark:text-[#A0A0A0] mt-4 text-sm">
          Descubre los fundamentos de la Inteligencia Energética y cómo este seminario transformará tu práctica profesional.
        </p>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-[#1A1915]/80 dark:bg-[#000000]/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#252525] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-[#252525] border-b border-[#E5E4E0] dark:border-[#333333] p-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Video de Introducción</h2>
              <Button
                variant="ghost"
                onClick={() => setShowVideo(false)}
                className="hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video Player */}
            <div className="p-6">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1A1915] dark:bg-black shadow-lg">
                <iframe
                  key={`promo-${PROMO_VIDEO_ID}`}
                  src={getCloudflareStreamUrl(PROMO_VIDEO_ID)}
                  className="w-full h-full"
                  allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ border: "none" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

