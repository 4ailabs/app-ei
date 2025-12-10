"use client"

import { Video } from "@/data/sessions"
import { Play, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface VideoCardProps {
  video: Video
  index: number
  onPlay?: (video: Video) => void
  accentColor?: string
}

// Helper function to get Cloudflare Stream thumbnail URL
function getThumbnailUrl(streamId: string): string {
  // Usar el Customer Subdomain específico para thumbnails
  return `https://customer-qhobzy75u1p8j3tq.cloudflarestream.com/${streamId}/thumbnails/thumbnail.jpg?time=1s`
}

export function VideoCard({ video, index, onPlay, accentColor = "bg-blue-500" }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hasVideo = !!video.cloudflareStreamId || !!video.vimeoId
  const thumbnailUrl = video.cloudflareStreamId ? getThumbnailUrl(video.cloudflareStreamId) : null

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => hasVideo && onPlay?.(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                // Fallback si la imagen no carga
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <Play className="h-16 w-16 text-white/30" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-16 h-16 ${accentColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                isHovered ? "scale-110 opacity-100" : "scale-90 opacity-80"
              }`}
            >
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Video Number Badge */}
        <div className="absolute top-3 left-3">
          <div className={`w-10 h-10 ${accentColor} rounded-lg flex items-center justify-center font-bold text-white shadow-lg`}>
            {index + 1}
          </div>
        </div>

        {/* Status Badge */}
        {hasVideo && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-xs font-semibold text-white">{video.duration}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {video.description}
          </p>
        )}
      </div>
    </div>
  )
}

