"use client"

import { Session } from "@/data/sessions"
import Link from "next/link"

interface SessionCardProps {
  session: Session
  progress?: {
    completed: boolean
    pdfViewed: boolean
    videosViewed: boolean
    audiosViewed: boolean
    themesViewed: boolean
  }
  index?: number
}

const sessionColors = [
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" }
]

export function SessionCard({ session, progress, index = 0 }: SessionCardProps) {
  const completionPercentage = progress
    ? Math.round(
      ((Number(progress.pdfViewed) +
        Number(progress.videosViewed) +
        Number(progress.audiosViewed) +
        Number(progress.themesViewed)) /
        4) *
      100
    )
    : 0

  const colors = sessionColors[index % sessionColors.length]

  return (
    <Link href={`/sesiones/${session.id}`} className="block">
      <div className="bg-white hover:bg-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-200">
        {/* Session Image */}
        {session.imageUrl && (
          <div className="relative h-48 lg:h-56 overflow-hidden">
            <img
              src={session.imageUrl}
              alt={session.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wide px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm inline-block">
                Bloque {session.day}
              </span>
            </div>
          </div>
        )}

        <div className="p-4 lg:p-6 flex flex-col flex-grow">
          {!session.imageUrl && (
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide px-2.5 py-1 rounded-md bg-gray-100">
                Bloque {session.day}
              </span>
              {progress?.completed && (
                <span className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-md">
                  Completado
                </span>
              )}
            </div>
          )}

          <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3 text-black">{session.title}</h3>
          <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-6 flex-grow line-clamp-3">{session.description}</p>

          {/* Progress Section */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-xs lg:text-sm">
              <span className="text-gray-500">Progreso</span>
              <span className={`font-bold ${completionPercentage === 100 ? 'text-green-600' : 'text-black'}`}>
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${completionPercentage === 100
                  ? 'bg-green-600'
                  : 'bg-black'
                  }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4 lg:pt-6 flex justify-between items-center">
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 text-xs lg:text-sm">
              <p className="text-gray-500">
                Material: <span className="text-black font-bold">
                  {[progress?.pdfViewed, progress?.videosViewed, progress?.audiosViewed, progress?.themesViewed].filter(Boolean).length}/4
                </span>
              </p>
              <p className="text-gray-500">
                Estado: <span className="text-black font-bold">
                  {progress?.completed ? 'Completado' : 'En progreso'}
                </span>
              </p>
            </div>
            <div className="text-black hover:text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
              <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
