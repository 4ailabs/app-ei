import { auth } from "@/lib/auth-server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id },
    })

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching progress" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { sessionId, pdfViewed, videosViewed, audiosViewed, themesViewed, completed } = body

    // Primero intentar encontrar un registro existente
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: session.user.id,
        sessionId: parseInt(sessionId),
      },
    })

    let progress
    if (existingProgress) {
      // Si existe, actualizar
      progress = await prisma.progress.update({
        where: { id: existingProgress.id },
        data: {
          pdfViewed: pdfViewed ?? undefined,
          videosViewed: videosViewed ?? undefined,
          audiosViewed: audiosViewed ?? undefined,
          themesViewed: themesViewed ?? undefined,
          completed: completed ?? undefined,
        },
      })
    } else {
      // Si no existe, crear
      progress = await prisma.progress.create({
        data: {
          userId: session.user.id,
          sessionId: parseInt(sessionId),
          pdfViewed: pdfViewed ?? false,
          videosViewed: videosViewed ?? false,
          audiosViewed: audiosViewed ?? false,
          themesViewed: themesViewed ?? false,
          completed: completed ?? false,
        },
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json(
      { error: "Error updating progress" },
      { status: 500 }
    )
  }
}
