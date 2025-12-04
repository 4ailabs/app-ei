"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

interface PDFSectionProps {
  pdfUrl?: string
  title?: string
  sessionId: number
}

export function PDFSection({ pdfUrl, title = "Manual de la Sesión", sessionId }: PDFSectionProps) {
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

  if (!pdfUrl) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">PDF no disponible</h3>
        <p className="text-gray-500 text-sm">El material PDF estará disponible próximamente</p>
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="p-4 bg-white rounded-xl shadow-sm">
        <FileText className="h-10 w-10 text-blue-600" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {viewed && (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          )}
        </div>
        <p className="text-sm text-gray-600">
          Descarga el manual completo de esta sesión en formato PDF
        </p>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all"
      >
        <Download className="mr-2 h-4 w-4" />
        Descargar PDF
      </Button>
    </div>
  )
}
