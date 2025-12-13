import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'

export async function GET() {
  // Verificar autenticación
  const session = await auth()
  
  if (!session) {
    return NextResponse.json(
      { error: 'No autorizado. Debes iniciar sesión.' },
      { status: 401 }
    )
  }

  // Return the API key for client-side Gemini Live connection
  // Note: This is required because Gemini Live API needs direct client connection
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  return NextResponse.json({ apiKey })
}
