import { NextResponse } from "next/server"
import { auth } from "@/lib/auth-server"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

// GET - Obtener estadísticas generales
export async function GET() {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo el admin puede ver estadísticas
    const userIsAdmin = await isAdmin(session)
    if (!userIsAdmin) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    // Obtener estadísticas en paralelo
    const [
      totalUsers,
      totalProgress,
      completedProgress,
      usersWithProgress,
      sessionStats,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.progress.count(),
      prisma.progress.count({ where: { completed: true } }),
      prisma.user.count({
        where: {
          progress: {
            some: {},
          },
        },
      }),
      prisma.progress.groupBy({
        by: ["sessionId"],
        _count: {
          sessionId: true,
        },
        where: {
          completed: true,
        },
      }),
    ])

    // Calcular estadísticas de sesiones
    const sessionCompletion = Array.from({ length: 9 }, (_, i) => {
      const sessionId = i + 1
      const stats = sessionStats.find((s) => s.sessionId === sessionId)
      return {
        sessionId,
        completed: stats?._count.sessionId || 0,
      }
    })

    const averageProgress = totalUsers > 0
      ? Math.round((completedProgress / (totalUsers * 9)) * 100)
      : 0

    return NextResponse.json({
      totalUsers,
      totalProgress,
      completedProgress,
      usersWithProgress,
      usersWithoutProgress: totalUsers - usersWithProgress,
      averageProgress,
      sessionCompletion,
      completionRate: totalProgress > 0
        ? Math.round((completedProgress / totalProgress) * 100)
        : 0,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    )
  }
}


