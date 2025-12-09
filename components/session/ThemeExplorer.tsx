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
      <Card className="bg-white dark:bg-[#393939] border-[#E5E4E0] dark:border-[#4A4A4A]">
        <CardHeader>
          <CardTitle className="text-[#1A1915] dark:text-[#ECECEC]">Temas</CardTitle>
          <CardDescription className="text-[#706F6C] dark:text-[#B4B4B4]">Los temas estarán disponibles próximamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {themes.map((theme) => (
          <AccordionItem
            key={theme.id}
            value={theme.id}
            className="border-b border-[#E5E4E0] dark:border-[#4A4A4A]"
          >
            <AccordionTrigger className="text-left font-semibold text-base py-4 text-[#1A1915] dark:text-[#ECECEC] hover:text-[#DA7756] dark:hover:text-[#ECECEC]">
              {theme.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 pb-4">
                <p className="text-[#706F6C] dark:text-[#B4B4B4] leading-relaxed">{theme.content}</p>
                {theme.subtopics && theme.subtopics.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-[#E5E4E0] dark:border-[#4A4A4A]">
                    {theme.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="space-y-2">
                        <h4 className="font-semibold text-[#1A1915] dark:text-[#ECECEC]">{subtopic.title}</h4>
                        <p className="text-[#706F6C] dark:text-[#B4B4B4] text-sm leading-relaxed">{subtopic.content}</p>
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
