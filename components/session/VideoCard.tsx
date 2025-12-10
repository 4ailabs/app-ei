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

export function VideoCard({ video, index, onPlay, accentColor = "bg-[#DA7756]" }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hasVideo = !!video.cloudflareStreamId || !!video.vimeoId
  const thumbnailUrl = video.cloudflareStreamId ? getThumbnailUrl(video.cloudflareStreamId) : null

  return (
    <div
      className="bg-white dark:bg-[#252525] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5E4E0] dark:border-[#333333] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => hasVideo && onPlay?.(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#1A1915] dark:bg-black overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2F2F2F] to-[#1A1915]">
            <Play className="h-10 w-10 sm:h-16 sm:w-16 text-white/30" />
          </div>
        )}

        {/* Play Button Overlay */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 ${accentColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                isHovered ? "scale-110 opacity-100" : "scale-90 opacity-80"
              }`}
            >
              <Play className="h-5 w-5 sm:h-8 sm:w-8 text-white ml-0.5 sm:ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Video Number Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 ${accentColor} rounded-md sm:rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-sm sm:text-base`}>
            {index + 1}
          </div>
        </div>

        {/* Status Badge */}
        {hasVideo && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <div className="bg-[#2ca58d] rounded-full p-1 sm:p-1.5 shadow-lg">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
              <span className="text-[10px] sm:text-xs font-semibold text-white">{video.duration}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-1 line-clamp-2 group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors text-sm sm:text-base">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-2 mt-1">
            {video.description}
          </p>
        )}
      </div>
    </div>
  )
}

