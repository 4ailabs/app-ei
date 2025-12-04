import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        approved: true,
      },
    })

    if (!user) {
      return NextResponse.json({ approved: false, exists: false })
    }

    return NextResponse.json({
      approved: user.approved,
      exists: true,
    })
  } catch (error) {
    console.error("Error checking user:", error)
    return NextResponse.json(
      { error: "Error al verificar usuario" },
      { status: 500 }
    )
  }
}

