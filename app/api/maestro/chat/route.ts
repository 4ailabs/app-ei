import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { GoogleGenAI } from '@google/genai'
import { getSystemPromptForDay } from '@/lib/maestro/prompts'
import { Message, DayNumber } from '@/lib/maestro/types'

const getAiClient = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY not configured')
  }
  return new GoogleGenAI({ apiKey })
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado. Debes iniciar sesión.' },
        { status: 401 }
      )
    }
    const { message, history, day } = await request.json() as {
      message: string
      history: Message[]
      day: DayNumber
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (message.length > 4000) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 4000 characters.' },
        { status: 400 }
      )
    }

    const ai = getAiClient()
    const systemPrompt = getSystemPromptForDay(day || 1)

    // Build conversation history
    const contents = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }],
    }))

    // Add current message
    contents.push({
      role: 'user' as const,
      parts: [{ text: message }],
    })

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    })

    const responseText = response.text || 'Lo siento, tuve un problema pensando en esa respuesta. ¿Podrías intentar de nuevo?'

    return NextResponse.json({ response: responseText })
  } catch (error: unknown) {
    console.error('Maestro API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Handle specific error types
    if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'Error de configuración. Contacta al administrador.' },
        { status: 500 }
      )
    }

    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Límite de solicitudes excedido. Espera un momento.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Error al procesar tu mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
