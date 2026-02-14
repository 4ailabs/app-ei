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

export function SessionCard({ session, progress, index = 0, compact = false }: SessionCardProps) {

  // Compact mode: simplified card for accordion view
  if (compact) {
    return (
      <Link href={`/sesiones/${session.id}`} className="block">
        <div className="bg-[#F5F4F0] dark:bg-[#252525] hover:bg-white dark:hover:bg-[#2A2A2A] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              {session.moduleNumber && (
                <span className="text-[10px] sm:text-xs font-bold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors line-clamp-2">
              {session.title}
            </h3>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/sesiones/${session.id}`} className="block h-full">
      <div className="bg-white dark:bg-[#252525] hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
        {/* Session Image */}
        {session.imageUrl && (
          <div className="relative h-36 sm:h-48 lg:h-56 overflow-hidden">
            <img
              src={session.imageUrl}
              alt={session.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex flex-wrap gap-1.5 sm:gap-2">
              <span className="session-badge text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg inline-block">
                Día {session.day}
              </span>
              {session.moduleNumber && (
                <span className="session-badge text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg inline-block">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-5 lg:p-8 flex flex-col flex-grow min-h-0">
          {!session.imageUrl && (
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-shrink-0">
              <span className="session-badge text-[10px] sm:text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5] uppercase tracking-wide px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                Día {session.day}
              </span>
              {session.moduleNumber && (
                <span className="session-badge text-[10px] sm:text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5] uppercase tracking-wide px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                  Módulo {session.moduleNumber}
                </span>
              )}
            </div>
          )}

          <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1.5 sm:mb-2 lg:mb-3 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors flex-shrink-0">{session.title}</h3>
          <p className="text-[#706F6C] dark:text-[#A0A0A0] text-[11px] sm:text-xs lg:text-sm mb-4 sm:mb-5 lg:mb-7 flex-grow line-clamp-2 sm:line-clamp-3 min-h-0">{session.description}</p>

          <div className="border-t border-[#E5E4E0] dark:border-[#333333] pt-4 sm:pt-5 lg:pt-8 flex justify-end items-center flex-shrink-0 mt-auto">
            <div className="text-[#1A1915] dark:text-[#E5E5E5] hover:text-[#DA7756] dark:hover:text-[#DA7756] transition-all duration-300 group-hover:translate-x-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
