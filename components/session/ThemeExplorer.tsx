"use client"

import { Theme } from "@/data/sessions"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ThemeExplorerProps {
  themes: Theme[]
}

export function ThemeExplorer({ themes }: ThemeExplorerProps) {
  if (themes.length === 0) {
    return (
      <Card className="bg-white dark:bg-[#393939] border-[#E5E4E0] dark:border-[#4A4A4A] rounded-lg sm:rounded-xl">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-[#1A1915] dark:text-[#ECECEC] text-base sm:text-lg">Temas</CardTitle>
          <CardDescription className="text-[#706F6C] dark:text-[#B4B4B4] text-xs sm:text-sm">Los temas estarán disponibles próximamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {themes.map((theme) => (
          <AccordionItem
            key={theme.id}
            value={theme.id}
            className="border-b border-[#E5E4E0] dark:border-[#4A4A4A]"
          >
            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base py-3 sm:py-4 text-[#1A1915] dark:text-[#ECECEC] hover:text-[#DA7756] dark:hover:text-[#ECECEC]">
              {theme.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 sm:space-y-4 pt-2 pb-3 sm:pb-4">
                <p className="text-[#706F6C] dark:text-[#B4B4B4] leading-relaxed text-xs sm:text-sm">{theme.content}</p>
                {theme.subtopics && theme.subtopics.length > 0 && (
                  <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 pl-3 sm:pl-4 border-l-2 border-[#E5E4E0] dark:border-[#4A4A4A]">
                    {theme.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="space-y-1.5 sm:space-y-2">
                        <h4 className="font-semibold text-[#1A1915] dark:text-[#ECECEC] text-sm sm:text-base">{subtopic.title}</h4>
                        <p className="text-[#706F6C] dark:text-[#B4B4B4] text-xs sm:text-sm leading-relaxed">{subtopic.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
