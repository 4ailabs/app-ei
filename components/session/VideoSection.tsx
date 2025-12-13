"use client"

import { Video } from "@/data/sessions"
import { Play, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { AudioVisualizer } from "./AudioVisualizer"

// Helper function to get Cloudflare Stream embed URL
function getCloudflareStreamUrl(streamId: string): string {
  // Usar el Customer Subdomain específico de la cuenta de Cloudflare Stream
  // Este formato es más confiable para cuentas con subdominio personalizado
  return `https://customer-qhobzy75u1p8j3tq.cloudflarestream.com/${streamId}/iframe`
}

interface VideoSectionProps {
  videos: Video[]
}

export function VideoSection({ videos }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0] || null)

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 sm:h-10 sm:w-10 text-[#9B9A97] dark:text-[#808080]" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">No hay videos disponibles</h3>
        <p className="text-[#706F6C] dark:text-[#A0A0A0] text-sm sm:text-base max-w-md mx-auto">
          Los videos de esta sección estarán disponibles próximamente.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Video Player */}
      {selectedVideo && (
        <div className="space-y-4 sm:space-y-6">
          {/* Video Container */}
          <div className="aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#1A1915] dark:bg-black shadow-xl ring-1 ring-black/5">
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
            ) : selectedVideo.audioUrl ? (
              <div className="w-full h-full">
                <AudioVisualizer
                  audioUrl={selectedVideo.audioUrl}
                  title={selectedVideo.title}
                  description={selectedVideo.description}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm opacity-70">Video próximamente</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="px-1 sm:px-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
              {selectedVideo.duration && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F4F0] dark:bg-[#333333] rounded-full flex-shrink-0">
                  <Clock className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                  <span className="text-sm font-medium text-[#706F6C] dark:text-[#A0A0A0]">{selectedVideo.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video List */}
      {videos.length > 1 && (
        <div className="space-y-4 sm:space-y-5">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E4E0] dark:border-[#333333]">
            <h4 className="text-sm sm:text-base font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
              Todos los videos
            </h4>
            <span className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] bg-[#F5F4F0] dark:bg-[#333333] px-2.5 py-1 rounded-full">
              {videos.length} videos
            </span>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {videos.map((video, index) => {
              const isSelected = selectedVideo?.id === video.id
              const hasVideo = video.cloudflareStreamId || video.vimeoId

              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#DA7756] text-white shadow-lg scale-[1.02]'
                      : 'bg-white dark:bg-[#2A2A2A] hover:bg-[#FAF9F7] dark:hover:bg-[#333333] text-[#1A1915] dark:text-[#E5E5E5] border border-[#E5E4E0] dark:border-[#333333] hover:border-[#DA7756]/30 dark:hover:border-[#DA7756]/30 hover:shadow-md'
                  }`}
                >
                  {/* Video Number / Play Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756]/10 dark:group-hover:bg-[#DA7756]/20'
                  }`}>
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <span className={`font-bold text-lg ${hasVideo ? 'text-[#DA7756]' : 'text-[#9B9A97] dark:text-[#808080]'}`}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className={`font-semibold text-sm sm:text-base mb-1 line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-[#1A1915] dark:text-[#E5E5E5]'
                    }`}>
                      {video.title}
                    </h5>
                    <div className="flex items-center gap-3">
                      {video.duration && (
                        <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                          isSelected ? 'text-white/80' : 'text-[#706F6C] dark:text-[#A0A0A0]'
                        }`}>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{video.duration}</span>
                        </div>
                      )}
                      {!hasVideo && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white/80' : 'bg-[#F5F4F0] dark:bg-[#333333] text-[#9B9A97] dark:text-[#808080]'
                        }`}>
                          Próximamente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-[#F5F4F0] dark:bg-[#333333] group-hover:bg-[#DA7756] group-hover:text-white'
                  }`}>
                    <Play className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isSelected ? 'text-white' : 'text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-white'
                    }`} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Single video info message */}
      {videos.length === 1 && (
        <div className="text-center pt-4 border-t border-[#E5E4E0] dark:border-[#333333]">
          <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
            Este módulo contiene un video de formación
          </p>
        </div>
      )}
    </div>
  )
}
