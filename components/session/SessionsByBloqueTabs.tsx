"use client"

import { useState } from "react"
import { Session } from "@/data/sessions"
import { SessionCard } from "./SessionCard"
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface BloqueData {
  id: number
  title: string
  shortTitle: string
  description: string
  intro: string
  sessions: Session[]
}

interface SessionsByBloqueTabsProps {
  bloquesData: BloqueData[]
}

export function SessionsByBloqueTabs({ bloquesData }: SessionsByBloqueTabsProps) {
  const [activeBloque, setActiveBloque] = useState(1)

  const currentBloque = bloquesData.find(b => b.id === activeBloque) || bloquesData[0]

  const goToPrevious = () => {
    const currentIndex = bloquesData.findIndex(b => b.id === activeBloque)
    if (currentIndex > 0) {
      setActiveBloque(bloquesData[currentIndex - 1].id)
    }
  }

  const goToNext = () => {
    const currentIndex = bloquesData.findIndex(b => b.id === activeBloque)
    if (currentIndex < bloquesData.length - 1) {
      setActiveBloque(bloquesData[currentIndex + 1].id)
    }
  }

  const currentIndex = bloquesData.findIndex(b => b.id === activeBloque)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < bloquesData.length - 1

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm border border-[#E5E4E0] dark:border-[#333333]">
        {/* Mobile: Dropdown-style with arrows */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <button
            onClick={goToPrevious}
            disabled={!hasPrevious}
            className="p-2 rounded-lg bg-[#F5F4F0] dark:bg-[#333333] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E5E4E0] dark:hover:bg-[#404040] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#706F6C] dark:text-[#A0A0A0]" />
          </button>

          <div className="flex-1 text-center">
            <div className="bg-[#DA7756] text-white px-4 py-2 rounded-xl">
              <span className="font-bold text-sm">Bloque {activeBloque}</span>
              <span className="block text-xs opacity-90">{currentBloque.shortTitle}</span>
            </div>
          </div>

          <button
            onClick={goToNext}
            disabled={!hasNext}
            className="p-2 rounded-lg bg-[#F5F4F0] dark:bg-[#333333] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E5E4E0] dark:hover:bg-[#404040] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#706F6C] dark:text-[#A0A0A0]" />
          </button>
        </div>

        {/* Desktop: Horizontal tabs */}
        <div className="hidden sm:flex flex-wrap gap-1.5 lg:gap-2">
          {bloquesData.map((bloque) => (
            <button
              key={bloque.id}
              onClick={() => setActiveBloque(bloque.id)}
              className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                activeBloque === bloque.id
                  ? "bg-[#DA7756] text-white shadow-sm"
                  : "bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#E5E4E0] dark:hover:bg-[#404040] hover:text-[#1A1915] dark:hover:text-[#E5E5E5]"
              }`}
            >
              <span className="font-bold">{bloque.id}</span>
              <span className="hidden lg:inline">{bloque.shortTitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bloque Header - IMPROVED */}
      <div className="bloque-header bg-white dark:bg-[#252525] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border-2 border-[#DA7756] dark:border-[#DA7756]">
        <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bloque-number w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl text-white flex-shrink-0">
            {currentBloque.id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5] mb-2">
                  {currentBloque.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#DA7756] dark:text-[#DA7756] font-medium mb-1">
                  {currentBloque.description}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 px-3 py-1.5 rounded-lg flex-shrink-0">
                <GraduationCap className="h-4 w-4 text-[#DA7756]" />
                <span className="text-sm font-semibold text-[#DA7756]">
                  {currentBloque.sessions.length} sesiones
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="pt-4 sm:pt-5 mb-5 sm:mb-6 border-t border-[#E5E4E0] dark:border-[#333333]">
          <p className="text-sm sm:text-base text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
            {currentBloque.intro}
          </p>
        </div>

        {/* Progress Bar - NEW */}
        <div className="flex items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-[#E5E4E0] dark:border-[#333333]">
          <div className="flex-1">
            <div className="bloque-progress-bar">
              <div
                className="bloque-progress-fill"
                style={{ width: `${(currentIndex + 1) / bloquesData.length * 100}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] whitespace-nowrap">
            Bloque {currentBloque.id} de {bloquesData.length}
          </span>
        </div>

        {/* Mobile session count */}
        <div className="flex sm:hidden items-center gap-2 mt-4 pt-3">
          <GraduationCap className="h-4 w-4 text-[#DA7756]" />
          <span className="text-sm font-semibold text-[#DA7756]">
            {currentBloque.sessions.length} sesiones en este bloque
          </span>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {currentBloque.sessions.map((session, index) => (
          <div
            key={session.id}
            className="animate-fade-in-up h-full"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <SessionCard
              session={session}
              progress={undefined}
              index={index}
              compact={false}
            />
          </div>
        ))}

        {/* Recursos Adicionales - Solo para Bloque 1 */}
        {currentBloque.id === 1 && (
          <div
            className="animate-fade-in-up h-full"
            style={{ animationDelay: `${currentBloque.sessions.length * 50}ms` }}
          >
            <Link href={`/sesiones/bloque/${currentBloque.id}/recursos-adicionales`} className="block h-full">
              <div className="bg-white dark:bg-[#252525] hover:bg-[#FAF9F7] dark:hover:bg-[#2A2A2A] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#E5E4E0] dark:border-[#333333] h-full">
                <div className="p-4 sm:p-5 lg:p-8 flex flex-col flex-grow min-h-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wide px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#F5F4F0] dark:bg-[#333333]">
                      Material Extra
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1.5 sm:mb-2 lg:mb-3 text-[#1A1915] dark:text-[#E5E5E5] group-hover:text-[#DA7756] dark:group-hover:text-[#DA7756] transition-colors flex-shrink-0">
                    Recursos Adicionales
                  </h3>
                  <p className="text-[#706F6C] dark:text-[#A0A0A0] text-[11px] sm:text-xs lg:text-sm mb-4 sm:mb-5 lg:mb-7 flex-grow line-clamp-2 sm:line-clamp-3 min-h-0">
                    Material complementario: videos, PDFs, audios, diagramas e imágenes.
                  </p>

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
          </div>
        )}
      </div>

      {/* Quick Navigation Footer - IMPROVED */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 pt-6 sm:pt-8 border-t border-[#E5E4E0] dark:border-[#333333]">
        <button
          onClick={goToPrevious}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            hasPrevious
              ? "bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#E5E4E0] dark:hover:bg-[#404040] hover:text-[#1A1915] dark:hover:text-[#E5E5E5]"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Bloque {hasPrevious ? bloquesData[currentIndex - 1]?.id : ""}</span>
          <span className="sm:hidden">Anterior</span>
        </button>

        {/* Progress Indicators - IMPROVED */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            {bloquesData.map((bloque) => (
              <button
                key={bloque.id}
                onClick={() => setActiveBloque(bloque.id)}
                className={`progress-dot w-2.5 h-2.5 rounded-full transition-all ${
                  activeBloque === bloque.id
                    ? "progress-dot-active w-8"
                    : "progress-dot-inactive"
                }`}
                aria-label={`Ir al bloque ${bloque.id}`}
                title={`Bloque ${bloque.id}: ${bloque.shortTitle}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] ml-2">
            {currentIndex + 1}/{bloquesData.length}
          </span>
        </div>

        <button
          onClick={goToNext}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            hasNext
              ? "bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#E5E4E0] dark:hover:bg-[#404040] hover:text-[#1A1915] dark:hover:text-[#E5E5E5]"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="hidden sm:inline">Bloque {hasNext ? bloquesData[currentIndex + 1]?.id : ""}</span>
          <span className="sm:hidden">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
