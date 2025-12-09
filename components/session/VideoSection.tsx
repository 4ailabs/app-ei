"use client"

import { Video } from "@/data/sessions"
import { Play, Clock } from "lucide-react"
import { useState } from "react"

// Helper function to get Cloudflare Stream embed URL
function getCloudflareStreamUrl(streamId: string): string {
  // Formato correcto para iframe embed de Cloudflare Stream
  // Parámetros adicionales para mejor rendimiento y reducir errores
  const url = `https://iframe.videodelivery.net/${streamId}?preload=metadata&autoplay=false`
  return url
}

interface VideoSectionProps {
  videos: Video[]
}

export function VideoSection({ videos }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0] || null)

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <Play className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No hay videos disponibles</h3>
        <p className="text-gray-500 text-sm">Los videos estarán disponibles próximamente</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {selectedVideo && (
        <div className="space-y-3">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg">
            {selectedVideo.cloudflareStreamId ? (
              <iframe
                src={getCloudflareStreamUrl(selectedVideo.cloudflareStreamId)}
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : selectedVideo.vimeoId ? (
              <iframe
                src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?title=0&byline=0&portrait=0`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
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
            <h3 className="font-bold text-gray-900">{selectedVideo.title}</h3>
            {selectedVideo.description && (
              <p className="text-sm text-gray-600 mt-1">{selectedVideo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Video List */}
      {videos.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Todos los videos ({videos.length})
          </p>
          <div className="grid gap-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  selectedVideo?.id === video.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedVideo?.id === video.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  <span className={`font-bold ${selectedVideo?.id === video.id ? 'text-white' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    selectedVideo?.id === video.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {video.title}
                  </h4>
                  {video.duration && (
                    <div className={`flex items-center gap-1 text-sm mt-0.5 ${
                      selectedVideo?.id === video.id ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  )}
                </div>
                <Play className={`h-5 w-5 flex-shrink-0 ${
                  selectedVideo?.id === video.id ? 'text-white' : 'text-gray-400'
                }`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
