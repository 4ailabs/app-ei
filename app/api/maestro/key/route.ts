import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { checkBiweeklyRateLimit } from '@/lib/rate-limit'

// Límite de sesiones de voz: 2 cada 15 días
const BIWEEKLY_VOICE_SESSION_LIMIT = 2

/**
 * Endpoint seguro para obtener API key de Gemini
 *
 * IMPORTANTE: Este endpoint expone la API key al cliente porque Gemini Live
 * requiere una conexión WebSocket directa desde el navegador. Para mitigar
 * el riesgo, implementamos:
 *
 * 1. Autenticación requerida
 * 2. Rate limiting: máximo 2 sesiones cada 15 días por usuario
 * 3. Logging de acceso
 * 4. Duración máxima de sesión: 5 minutos (controlado en cliente)
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

    const userId = session.user.id

    // Verificar que el usuario tenga email válido
    if (!session.user.email) {
      return NextResponse.json(
        { error: 'Usuario no válido' },
        { status: 403 }
      )
    }

    // Rate limiting quincenal: máximo 2 sesiones cada 15 días
    const rateLimit = checkBiweeklyRateLimit(
      `voice-session:${userId}`,
      BIWEEKLY_VOICE_SESSION_LIMIT
    )

    if (!rateLimit.allowed) {
      const daysUntilReset = Math.ceil((rateLimit.resetAt - Date.now()) / (24 * 60 * 60 * 1000))

      console.warn(`[VOICE_LIMIT] Usuario ${userId} alcanzó límite de sesiones de voz`)
      return NextResponse.json(
        {
          error: `Has alcanzado el límite de ${BIWEEKLY_VOICE_SESSION_LIMIT} sesiones de voz cada 15 días. Podrás usar esta función nuevamente en ${daysUntilReset} día${daysUntilReset === 1 ? '' : 's'}.`,
          resetAt: rateLimit.resetAt,
          remaining: 0,
          limit: BIWEEKLY_VOICE_SESSION_LIMIT
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': BIWEEKLY_VOICE_SESSION_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString()
          }
        }
      )
    }

    // Logging de acceso (para monitoreo)
    console.log(`[VOICE_SESSION] Usuario ${userId} (${session.user.email}) inició sesión de voz. Restantes: ${rateLimit.remaining}`)

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      console.error('[ERROR] GOOGLE_GEMINI_API_KEY no configurada')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Retornar API key con información de límites
    return NextResponse.json(
      {
        apiKey,
        // Duración máxima de sesión en segundos (5 minutos)
        maxDurationSeconds: 5 * 60,
        // Información de rate limiting para el cliente
        rateLimit: {
          remaining: rateLimit.remaining,
          limit: BIWEEKLY_VOICE_SESSION_LIMIT,
          resetAt: rateLimit.resetAt
        }
      },
      {
        headers: {
          'X-RateLimit-Limit': BIWEEKLY_VOICE_SESSION_LIMIT.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString(),
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
