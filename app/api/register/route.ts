import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido" },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    let existingUser
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      })
    } catch (dbError: any) {
      console.error("Error checking existing user:", dbError)
      // Si es un error de conexión, intentar reconectar
      if (dbError.code === "P1001" || dbError.code === "P1017") {
        return NextResponse.json(
          { error: "Error de conexión a la base de datos. Por favor, intenta de nuevo." },
          { status: 500 }
        )
      }
      throw dbError
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    // Hashear contraseña
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (hashError) {
      console.error("Error hashing password:", hashError)
      return NextResponse.json(
        { error: "Error al procesar la contraseña" },
        { status: 500 }
      )
    }

    // Crear usuario (approved = false por defecto)
    let user
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          approved: false, // Usuario pendiente de aprobación
        },
        select: {
          id: true,
          email: true,
          name: true,
          approved: true,
        },
      })
    } catch (createError: any) {
      console.error("Error creating user:", createError)
      
      // Manejar errores específicos de Prisma
      if (createError.code === "P2002") {
        return NextResponse.json(
          { error: "El email ya está registrado" },
          { status: 400 }
        )
      }
      
      if (createError.code === "P1001" || createError.code === "P1017") {
        return NextResponse.json(
          { error: "Error de conexión a la base de datos. Por favor, intenta de nuevo." },
          { status: 500 }
        )
      }
      
      throw createError
    }

    return NextResponse.json(
      {
        message: "Registro exitoso. Tu cuenta está pendiente de aprobación por un administrador.",
        user,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error registering user:", error)
    
    // Proporcionar más detalles del error en desarrollo
    const errorMessage = process.env.NODE_ENV === "development" 
      ? error.message || "Error al registrar usuario"
      : "Error al registrar usuario. Por favor, intenta de nuevo."
    
    return NextResponse.json(
      { 
        error: errorMessage,
        ...(process.env.NODE_ENV === "development" && { 
          details: error.stack,
          code: error.code 
        })
      },
      { status: 500 }
    )
  }
}

