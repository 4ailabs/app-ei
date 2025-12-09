import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth-server"
import { listVideos, getVideoDetails, deleteVideo } from "@/lib/cloudflare-stream"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@seminario.com"

/**
 * GET /api/videos
 * List all videos from Cloudflare Stream
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo el admin puede listar videos
    if (session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Acceso denegado. Solo administradores." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined

    const videos = await listVideos({ search, limit })

    return NextResponse.json({
      success: true,
      videos,
    })
  } catch (error: any) {
    console.error("Error listing videos:", error)
    return NextResponse.json(
      { error: `Error al listar videos: ${error.message}` },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/videos?uid=<video_uid>
 * Delete a video from Cloudflare Stream
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo el admin puede eliminar videos
    if (session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Acceso denegado. Solo administradores." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const uid = searchParams.get("uid")

    if (!uid) {
      return NextResponse.json({ error: "No se proporcionó el UID del video" }, { status: 400 })
    }

    await deleteVideo(uid)

    return NextResponse.json({
      success: true,
      message: "Video eliminado exitosamente",
    })
  } catch (error: any) {
    console.error("Error deleting video:", error)
    return NextResponse.json(
      { error: `Error al eliminar video: ${error.message}` },
      { status: 500 }
    )
  }
}

