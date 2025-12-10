"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { PDF } from "@/data/sessions"

interface PDFSectionProps {
  pdfUrl?: string
  pdfs?: PDF[]
  title?: string
  sessionId: number
}

export function PDFSection({ pdfUrl, pdfs, title = "Manual de la Sesión", sessionId }: PDFSectionProps) {
  const { data: session } = useSession()
  const [viewed, setViewed] = useState(false)

  useEffect(() => {
    if (viewed && session) {
      updateProgress("pdfViewed", true)
    }
  }, [viewed, session])

  const updateProgress = async (field: string, value: boolean) => {
    if (!session) return

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  // Si hay múltiples PDFs, mostrar lista
  if (pdfs && pdfs.length > 0) {
    return (
      <div className="space-y-4">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-bold text-lg text-[#1A1915] dark:text-[#ECECEC] mb-1">{pdf.title}</h4>
              <p className="text-sm text-[#706F6C] dark:text-[#B4B4B4] mb-2">{pdf.description}</p>
              {pdf.category && (
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {pdf.category === "referencia" ? "Referencia" : pdf.category === "ejercicio" ? "Ejercicio" : "Contenido Profundo"}
                </span>
              )}
            </div>
            <div className="flex-shrink-0">
              {pdf.url ? (
                <Button
                  onClick={() => {
                    window.open(pdf.url, "_blank")
                    setViewed(true)
                  }}
                  variant="outline"
                  size="default"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              ) : (
                <Button disabled variant="outline" size="default">
                  <Download className="mr-2 h-4 w-4" />
                  No disponible
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Si solo hay un PDFUrl, mostrar el componente original
  if (!pdfUrl) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-[#9B9A97] dark:text-[#8C8C8C] mx-auto mb-3" />
        <h3 className="text-lg font-medium text-[#1A1915] dark:text-[#ECECEC] mb-1">PDF no disponible</h3>
        <p className="text-[#706F6C] dark:text-[#B4B4B4] text-sm">El material PDF estará disponible próximamente</p>
      </div>
    )
  }

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank")
      setViewed(true)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
      <div className="p-4 bg-white dark:bg-[#393939] rounded-xl shadow-sm">
        <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-[#1A1915] dark:text-[#ECECEC]">{title}</h3>
          {viewed && (
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          )}
        </div>
        <p className="text-sm text-[#706F6C] dark:text-[#B4B4B4]">
          Descarga el manual completo de esta sesión en formato PDF
        </p>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        className="w-full sm:w-auto"
      >
        <Download className="mr-2 h-4 w-4" />
        Descargar
      </Button>
    </div>
  )
}
