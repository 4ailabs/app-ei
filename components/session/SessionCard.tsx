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
  compact?: boolean
}

const sessionColors = [
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" },
  { accent: "bg-gray-100", text: "text-gray-700", button: "bg-black hover:bg-gray-800" }
]

export function SessionCard({ session, progress, index = 0, compact = false }: SessionCardProps) {
  const colors = sessionColors[index % sessionColors.length]

  // Compact mode: simplified card for accordion view
  if (compact) {
    return (
      <Link href={`/sesiones/${session.id}`} className="block">
        <div className="bg-[#F5F4F0] dark:bg-[#252525] hover:bg-white dark:hover:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              {session.moduleNumber && (
                <span className="text-xs font-bold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold mb-2 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors line-clamp-2">
              {session.title}
            </h3>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/sesiones/${session.id}`} className="block h-full">
      <div className="bg-white dark:bg-[#252525] hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
        {/* Session Image */}
        {session.imageUrl && (
          <div className="relative h-48 lg:h-56 overflow-hidden">
            <img
              src={session.imageUrl}
              alt={session.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wide px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm inline-block">
                Día {session.day}
              </span>
              {session.moduleNumber && (
                <span className="text-xs font-semibold text-white uppercase tracking-wide px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm inline-block">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-4 lg:p-6 flex flex-col flex-grow min-h-0">
          {!session.imageUrl && (
            <div className="flex items-center gap-3 mb-3 flex-shrink-0">
              <span className="text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide px-2.5 py-1 rounded-md bg-[#F5F4F0] dark:bg-[#333333]">
                Día {session.day}
              </span>
              {session.moduleNumber && (
                <span className="text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide px-2.5 py-1 rounded-md bg-[#E5E4E0] dark:bg-[#4A4A4A]">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
          )}

          <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors flex-shrink-0">{session.title}</h3>
          <p className="text-[#706F6C] dark:text-[#A0A0A0] text-xs lg:text-sm mb-4 lg:mb-6 flex-grow line-clamp-3 min-h-0">{session.description}</p>

          <div className="border-t border-[#E5E4E0] dark:border-[#333333] pt-4 lg:pt-6 flex justify-end items-center flex-shrink-0 mt-auto">
            <div className="text-[#1A1915] dark:text-[#E5E5E5] hover:text-[#DA7756] dark:hover:text-[#DA7756] transition-all duration-300 group-hover:translate-x-1">
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
