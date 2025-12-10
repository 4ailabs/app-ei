"use client"

import { Video } from "@/data/sessions"
import { Play, Clock } from "lucide-react"
import { useState } from "react"
import { getStreamEmbedUrl } from "@/lib/cloudflare-stream"

// Helper function to get Cloudflare Stream embed URL
function getCloudflareStreamUrl(streamId: string): string {
  // Usar la función de la librería con parámetros explícitos para prevenir autoplay
  return getStreamEmbedUrl(streamId, undefined, {
    autoplay: false,
    controls: true,
    preload: "none",
    muted: false
  })
}

interface VideoSectionProps {
  videos: Video[]
}

export function VideoSection({ videos }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0] || null)

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <Play className="h-12 w-12 text-[#9B9A97] dark:text-[#808080] mx-auto mb-3" />
        <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#E5E5E5] mb-1">No hay videos disponibles</h3>
        <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm">Los videos estarán disponibles próximamente</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {selectedVideo && (
        <div className="space-y-3">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1A1915] dark:bg-black shadow-lg">
            {selectedVideo.cloudflareStreamId ? (
              <iframe
                key={`cloudflare-${selectedVideo.cloudflareStreamId}`}
                src={getCloudflareStreamUrl(selectedVideo.cloudflareStreamId)}
                className="w-full h-full"
                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : selectedVideo.vimeoId ? (
              <iframe
                key={`vimeo-${selectedVideo.vimeoId}`}
                src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?title=0&byline=0&portrait=0&autoplay=0&muted=0`}
                className="w-full h-full"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
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
          <div className="px-1">
            <h3 className="font-bold text-[#1A1915] dark:text-[#E5E5E5]">{selectedVideo.title}</h3>
            {selectedVideo.description && (
              <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mt-1">{selectedVideo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Video List */}
      {videos.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
            Todos los videos ({videos.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  selectedVideo?.id === video.id
                    ? 'bg-[#1A1915] dark:bg-[#E5E5E5] text-white dark:text-[#1A1915] shadow-md'
                    : 'bg-[#F5F4F0] dark:bg-[#333333] hover:bg-[#ECEAE5] dark:hover:bg-[#4A4A4A] text-[#1A1915] dark:text-[#E5E5E5] border border-[#E5E4E0] dark:border-[#333333]'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedVideo?.id === video.id ? 'bg-white/20 dark:bg-black/20' : 'bg-[#E5E4E0] dark:bg-[#4A4A4A]'
                }`}>
                  <span className={`font-bold ${selectedVideo?.id === video.id ? 'text-white dark:text-[#1A1915]' : 'text-[#706F6C] dark:text-[#A0A0A0]'}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    selectedVideo?.id === video.id ? 'text-white dark:text-[#1A1915]' : 'text-[#1A1915] dark:text-[#E5E5E5]'
                  }`}>
                    {video.title}
                  </h4>
                  {video.duration && (
                    <div className={`flex items-center gap-1 text-sm mt-0.5 ${
                      selectedVideo?.id === video.id ? 'text-white/70 dark:text-[#1A1915]/70' : 'text-[#706F6C] dark:text-[#A0A0A0]'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  )}
                </div>
                <Play className={`h-5 w-5 flex-shrink-0 ${
                  selectedVideo?.id === video.id ? 'text-white dark:text-[#1A1915]' : 'text-[#9B9A97] dark:text-[#808080]'
                }`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
