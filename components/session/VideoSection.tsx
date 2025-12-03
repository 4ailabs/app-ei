"use client"

import { Video } from "@/data/sessions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { useEffect, useRef } from "react"

interface VideoSectionProps {
  videos: Video[]
}

export function VideoSection({ videos }: VideoSectionProps) {
  if (videos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Videos de Formación</CardTitle>
          <CardDescription>Los videos estarán disponibles próximamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Videos de Formación</h2>
        <p className="text-gray-600 mb-6">
          Accede a los videos formativos de esta sesión
        </p>
      </div>
      <div className="grid gap-6">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-600" />
                {video.title}
              </CardTitle>
              {video.description && (
                <CardDescription>{video.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
