"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    // Marcar como visto cuando se descarga
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
      <Card>
        <CardHeader>
          <CardTitle>Material PDF</CardTitle>
          <CardDescription>El material PDF estará disponible próximamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank")
      setViewed(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          {title}
          {viewed && <CheckCircle2 className="h-5 w-5 text-green-600" />}
        </CardTitle>
        <CardDescription>
          Descarga el manual completo de esta sesión en formato PDF
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleDownload} size="sm" className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Descargar PDF
        </Button>
      </CardContent>
    </Card>
  )
}
