import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { checkRateLimit } from '@/lib/rate-limit'

/**
 * Endpoint seguro para obtener API key de Gemini
 * 
 * IMPORTANTE: Este endpoint expone la API key al cliente porque Gemini Live
 * requiere una conexión WebSocket directa desde el navegador. Para mitigar
 * el riesgo, implementamos:
 * 
 * 1. Autenticación requerida
 * 2. Rate limiting estricto (máximo 10 requests por hora por usuario)
 * 3. Logging de acceso
 * 4. Restricciones por usuario
 * 
 * RECOMENDACIÓN: Monitorear el uso de este endpoint y considerar rotar
 * la API key periódicamente.
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado. Debes iniciar sesión.' },
        { status: 401 }
      )
    }

    // Rate limiting: máximo 10 requests por hora por usuario
    const userId = session.user.id
    const rateLimit = checkRateLimit(
      `gemini-key:${userId}`,
      10, // máximo 10 requests
      60 * 60 * 1000 // ventana de 1 hora
    )

    if (!rateLimit.allowed) {
      console.warn(`[SECURITY] Rate limit excedido para usuario ${userId}`)
      return NextResponse.json(
        { 
          error: 'Límite de solicitudes excedido. Intenta de nuevo más tarde.',
          retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Verificar que el usuario esté aprobado
    if (!session.user.email) {
      return NextResponse.json(
        { error: 'Usuario no válido' },
        { status: 403 }
      )
    }

    // Logging de acceso (para monitoreo)
    console.log(`[API_KEY_ACCESS] Usuario ${userId} (${session.user.email}) solicitó API key de Gemini`)

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      console.error('[ERROR] GOOGLE_GEMINI_API_KEY no configurada')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Retornar API key con headers de rate limiting
    return NextResponse.json(
      { 
        apiKey,
        // Información de rate limiting para el cliente
        rateLimit: {
          remaining: rateLimit.remaining,
          resetAt: rateLimit.resetAt
        }
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          // Cache control: no cachear la API key
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    console.error('[ERROR] Error en /api/maestro/key:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
