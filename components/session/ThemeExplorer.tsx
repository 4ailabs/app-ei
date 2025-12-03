"use client"

import { Theme } from "@/data/sessions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ThemeExplorerProps {
  themes: Theme[]
}

export function ThemeExplorer({ themes }: ThemeExplorerProps) {
  if (themes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Temas</CardTitle>
          <CardDescription>Los temas estarán disponibles próximamente</CardDescription>
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
            className="border-b border-gray-200"
          >
            <AccordionTrigger className="text-left font-semibold text-base py-4">
              {theme.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 pb-4">
                <p className="text-gray-700 leading-relaxed">{theme.content}</p>
                {theme.subtopics && theme.subtopics.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                    {theme.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="space-y-2">
                        <h4 className="font-semibold text-gray-900">{subtopic.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{subtopic.content}</p>
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
