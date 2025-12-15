import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth-server"
import { isAdmin } from "@/lib/admin"
import { uploadVideoToStream, uploadVideoFromUrl } from "@/lib/cloudflare-stream"

/**
 * POST /api/videos/upload
 * Upload a video to Cloudflare Stream
 * 
 * Accepts:
 * - multipart/form-data with a 'file' field
 * - OR JSON with 'url' field to upload from URL
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo el admin puede subir videos
    const userIsAdmin = await isAdmin(session)
    if (!userIsAdmin) {
      return NextResponse.json({ error: "Acceso denegado. Solo administradores." }, { status: 403 })
    }

    const contentType = request.headers.get("content-type") || ""

    // Handle file upload (multipart/form-data)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file") as File | null
      const name = formData.get("name") as string | null
      const metadata = formData.get("metadata") as string | null

      if (!file) {
        return NextResponse.json({ error: "No se proporcionó un archivo" }, { status: 400 })
      }

      try {
        // Convert File to Buffer for upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const metadataObj = metadata ? JSON.parse(metadata) : {}
        if (name) {
          metadataObj.name = name
        }

        const result = await uploadVideoToStream(buffer, file.name, metadataObj)

        return NextResponse.json({
          success: true,
          video: {
            uid: result.result.uid,
            thumbnail: result.result.thumbnail,
            readyToStream: result.result.readyToStream,
            status: result.result.status,
            meta: result.result.meta,
            created: result.result.created,
            duration: result.result.duration,
            playback: result.result.playback,
          },
        })
      } catch (error: any) {
        console.error("Error uploading video:", error)
        return NextResponse.json(
          { error: `Error al subir video: ${error.message}` },
          { status: 500 }
        )
      }
    }

    // Handle URL upload (JSON)
    const body = await request.json()
    const { url, name, metadata } = body

    if (!url) {
      return NextResponse.json({ error: "No se proporcionó una URL" }, { status: 400 })
    }

    try {
      const metadataObj = metadata || {}
      if (name) {
        metadataObj.name = name
      }

      const result = await uploadVideoFromUrl(url, metadataObj)

      return NextResponse.json({
        success: true,
        video: {
          uid: result.result.uid,
          thumbnail: result.result.thumbnail,
          readyToStream: result.result.readyToStream,
          status: result.result.status,
          meta: result.result.meta,
          created: result.result.created,
          duration: result.result.duration,
          playback: result.result.playback,
        },
      })
    } catch (error: any) {
      console.error("Error uploading video from URL:", error)
      return NextResponse.json(
        { error: `Error al subir video desde URL: ${error.message}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Error in upload route:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

