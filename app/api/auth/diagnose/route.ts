import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkRateLimit, getClientIP } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: máximo 10 intentos por IP cada 5 minutos
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(
      `diagnose:${clientIP}`,
      10, // máximo 10 requests
      5 * 60 * 1000 // ventana de 5 minutos
    )

    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
      return NextResponse.json(
        {
          error: `Demasiados intentos. Intenta de nuevo en ${resetIn} segundos.`
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      )
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
        password: true, // Necesitamos verificar si tiene contraseña
      },
    })

    // Diagnóstico completo
    const diagnosis = {
      userExists: !!user,
      hasPassword: user ? !!user.password : false,
      isApproved: user ? user.approved : false,
      message: "",
      action: "",
    }

    if (!user) {
      diagnosis.message = "El email no está registrado en el sistema."
      diagnosis.action = "Regístrate o verifica que el email sea correcto."
    } else if (!user.password) {
      diagnosis.message = "El usuario no tiene contraseña configurada."
      diagnosis.action = "Contacta al administrador para configurar tu contraseña."
    } else if (!user.approved) {
      diagnosis.message = "Tu cuenta está pendiente de aprobación."
      diagnosis.action = "Contacta al administrador para que apruebe tu cuenta."
    } else {
      diagnosis.message = "El usuario existe y está aprobado. La contraseña podría ser incorrecta."
      diagnosis.action = "Verifica que la contraseña sea correcta."
    }

    // En producción, no exponer información sensible que permita enumerar usuarios
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({
        message: diagnosis.message,
        action: diagnosis.action,
      })
    }

    // En desarrollo, incluir información adicional para debugging
    return NextResponse.json({
      ...diagnosis,
      userEmail: user?.email,
      userName: user?.name,
    })
  } catch (error: any) {
    console.error("Error diagnosing user:", error)
    
    if (error.code === "P1001" || error.code === "P1017") {
      return NextResponse.json(
        {
          error: "Error de conexión a la base de datos",
          message: "No se pudo conectar a la base de datos. Verifica la configuración.",
          action: "Contacta al administrador del sistema.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: "Error al diagnosticar usuario",
        message: "Ocurrió un error inesperado.",
        action: "Intenta de nuevo más tarde.",
      },
      { status: 500 }
    )
  }
}

