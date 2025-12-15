import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth-server"
import { isAdmin } from "@/lib/admin"
import { getVideoDetails } from "@/lib/cloudflare-stream"

/**
 * GET /api/videos/[uid]
 * Get details of a specific video
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo el admin puede ver detalles de videos
    const userIsAdmin = await isAdmin(session)
    if (!userIsAdmin) {
      return NextResponse.json({ error: "Acceso denegado. Solo administradores." }, { status: 403 })
    }

    const { uid } = await params

    if (!uid) {
      return NextResponse.json({ error: "No se proporcionó el UID del video" }, { status: 400 })
    }

    const video = await getVideoDetails(uid)

    return NextResponse.json({
      success: true,
      video,
    })
  } catch (error: any) {
    console.error("Error fetching video:", error)
    return NextResponse.json(
      { error: `Error al obtener video: ${error.message}` },
      { status: 500 }
    )
  }
}

