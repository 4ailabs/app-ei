import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Esta ruta permite crear el primer administrador cuando no hay usuarios aprobados
// Solo funciona si no existe ningún usuario aprobado en el sistema

export async function POST(request: NextRequest) {
  try {
    // Verificar si ya existe algún administrador
    const adminCount = await prisma.user.count({
      where: { isAdmin: true }
    })

    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Ya existe al menos un administrador. Usa el panel de admin para gestionar usuarios." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password, name, setupKey } = body

    // Verificar clave de setup (variable de entorno opcional para mayor seguridad)
    const expectedKey = process.env.SETUP_KEY || "setup-admin-2024"
    if (setupKey !== expectedKey) {
      return NextResponse.json(
        { error: "Clave de setup inválida" },
        { status: 401 }
      )
    }

    // Validaciones
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      )
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números" },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    let user
    const hashedPassword = await bcrypt.hash(password, 10)

    if (existingUser) {
      // Actualizar usuario existente y convertirlo en admin
      user = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: name || existingUser.name,
          approved: true,
          isAdmin: true
        },
        select: { id: true, email: true, name: true, approved: true, isAdmin: true }
      })
    } else {
      // Crear nuevo usuario como administrador
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || "Administrador",
          approved: true,
          isAdmin: true
        },
        select: { id: true, email: true, name: true, approved: true, isAdmin: true }
      })
    }

    return NextResponse.json({
      message: "Administrador creado exitosamente. Ahora puedes iniciar sesión.",
      user
    })
  } catch (error: any) {
    console.error("Error en setup:", error)
    return NextResponse.json(
      { error: "Error al crear administrador" },
      { status: 500 }
    )
  }
}

// GET para verificar el estado del setup
export async function GET() {
  try {
    const adminCount = await prisma.user.count({
      where: { isAdmin: true }
    })

    return NextResponse.json({
      needsSetup: adminCount === 0,
      message: adminCount === 0
        ? "No hay administradores. Usa POST /api/setup para crear el primero."
        : "El sistema ya tiene administradores configurados."
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Error al verificar estado" },
      { status: 500 }
    )
  }
}
