import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth-server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// GET - Obtener un usuario específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    // Obtener progreso del usuario
    const progress = await prisma.progress.findMany({
      where: { userId: id },
      select: {
        sessionId: true,
        completed: true,
        pdfViewed: true,
        videosViewed: true,
        audiosViewed: true,
        themesViewed: true,
      },
    })

    const completedSessions = progress.filter((p) => p.completed).length
    const totalSessions = 9

    return NextResponse.json({
      ...user,
      stats: {
        totalSessions,
        completedSessions,
        progressPercentage: totalSessions > 0 
          ? Math.round((completedSessions / totalSessions) * 100) 
          : 0,
        progress,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    )
  }
}

// PUT - Actualizar usuario
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { email, password, name, approved } = body

    const updateData: any = {}
    
    if (email) updateData.email = email
    if (name !== undefined) updateData.name = name
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    if (approved !== undefined) updateData.approved = approved

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ user, message: "Usuario actualizado exitosamente" })
  } catch (error: any) {
    console.error("Error updating user:", error)
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "El email ya está en uso" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar usuario
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params

    // No permitir eliminar tu propio usuario
    if (session.user.id === id) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propio usuario" },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Usuario eliminado exitosamente" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    )
  }
}


