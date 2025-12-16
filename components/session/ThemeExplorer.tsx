"use client"

import { useState } from "react"
import { Theme } from "@/data/sessions"
import { ChevronDown, ChevronUp, BookOpen, ChevronRight } from "lucide-react"

interface ThemeExplorerProps {
  themes: Theme[]
}

export function ThemeExplorer({ themes }: ThemeExplorerProps) {
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set())

  const toggleTheme = (themeId: string) => {
    const newExpanded = new Set(expandedThemes)
    if (newExpanded.has(themeId)) {
      newExpanded.delete(themeId)
    } else {
      newExpanded.add(themeId)
    }
    setExpandedThemes(newExpanded)
  }

  if (themes.length === 0) {
    return (
      <div className="text-center py-12 bg-[#F5F4F0] dark:bg-[#2F2F2F] rounded-2xl border border-dashed border-[#E5E4E0] dark:border-[#4A4A4A]">
        <BookOpen className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">No hay temas disponibles</h3>
        <p className="text-[#706F6C] dark:text-[#B4B4B4]">Los temas para esta sesión estarán disponibles próximamente.</p>
      </div>
    )
  }

  // Single accent color for sober design
  const accentColor = "#DA7756"

  return (
    <div className="space-y-4">
      {themes.map((theme, index) => {
        const isExpanded = expandedThemes.has(theme.id)

        return (
          <div
            key={theme.id}
            className="bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm"
          >
            {/* Theme Header */}
            <div
              className="px-5 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-[#FAFAF9] dark:hover:bg-[#2A2A2A] transition-colors"
              onClick={() => toggleTheme(theme.id)}
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]"
                >
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-1">
                    {theme.title}
                  </h3>
                  <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] line-clamp-2">
                    {theme.content}
                  </p>
                  {theme.subtopics && theme.subtopics.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F4F0] dark:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]">
                        {theme.subtopics.length} subtema{theme.subtopics.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Toggle */}
                <button className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t border-[#E5E4E0] dark:border-[#333333]">
                {/* Full Description */}
                <div className="px-5 sm:px-6 py-4 bg-[#FAFAF9] dark:bg-[#1F1F1F]">
                  <p className="text-sm text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                    {theme.content}
                  </p>
                </div>

                {/* Subtopics */}
                {theme.subtopics && theme.subtopics.length > 0 && (
                  <div className="px-5 sm:px-6 py-5 space-y-3">
                    {theme.subtopics.map((subtopic, subIndex) => (
                      <div
                        key={subtopic.id}
                        className="p-4 rounded-xl bg-[#F5F4F0] dark:bg-[#1F1F1F] border border-[#E5E4E0] dark:border-[#333333]"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: accentColor }}
                          >
                            {String.fromCharCode(65 + subIndex)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-2">
                              {subtopic.title}
                            </h4>
                            <p className="text-[13px] text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                              {subtopic.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Summary Footer */}
      <div className="mt-6 p-4 bg-[#F5F4F0] dark:bg-[#1F1F1F] rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
              <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{themes.length}</span> tema{themes.length > 1 ? 's' : ''} en esta sesión
            </span>
          </div>
          <button
            onClick={() => {
              if (expandedThemes.size === themes.length) {
                setExpandedThemes(new Set())
              } else {
                setExpandedThemes(new Set(themes.map(t => t.id)))
              }
            }}
            className="text-xs font-medium text-[#DA7756] hover:text-[#c56a4d] transition-colors"
          >
            {expandedThemes.size === themes.length ? 'Colapsar todos' : 'Expandir todos'}
          </button>
        </div>
      </div>
    </div>
  )
}
