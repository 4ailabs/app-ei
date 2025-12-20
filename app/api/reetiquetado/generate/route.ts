import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { GoogleGenAI } from '@google/genai'
import { checkDailyRateLimit } from '@/lib/rate-limit'

// Límite: 5 transformaciones personalizadas por día por usuario
const DAILY_GENERATION_LIMIT = 5

// Modelo a usar (gemini-2.5-flash es el más nuevo y barato)
const MODEL_NAME = 'gemini-2.5-flash-preview-05-20'

const SYSTEM_PROMPT = `Eres un experto en neurociencia del lenguaje y psicología cognitiva. Tu tarea es transformar frases limitantes en frases empoderadoras usando la técnica de re-etiquetado.

REGLAS DE TRANSFORMACIÓN:
1. La nueva frase debe ser VERDADERA y CREÍBLE para quien la dice
2. Debe cambiar la interpretación, no negar la realidad
3. Debe activar la corteza prefrontal (pensamiento) en lugar de la amígdala (reacción)
4. Preferir frases que:
   - Sean temporales ("todavía", "por ahora") en lugar de permanentes
   - Sean específicas en lugar de globales
   - Externalicen la experiencia en lugar de identificarse con ella
   - Abran posibilidades en lugar de cerrarlas

CATEGORÍAS DISPONIBLES:
- Estado: Frases sobre cómo te sientes (estrés, ansiedad, miedo)
- Capacidad: Frases sobre lo que puedes o no hacer
- Identidad: Frases que definen quién eres
- Situación: Frases sobre problemas o circunstancias
- Obligación: Frases con "tengo que", "debería"

EJEMPLOS:
- "Soy ansioso" → "Practico ansiedad y puedo practicar calma" (Identidad → comportamiento modificable)
- "No puedo" → "Todavía no he encontrado cómo" (Temporal, abre búsqueda)
- "Es un problema" → "Es un desafío nuevo" (De amenaza a oportunidad)
- "Tengo que" → "Elijo" (De víctima a protagonista)

RESPONDE ÚNICAMENTE EN JSON VÁLIDO (sin markdown, sin backticks):
{
  "category": "Estado|Capacidad|Identidad|Situación|Obligación",
  "old": "la frase original del usuario",
  "new": "la frase transformada",
  "effect": "explicación breve del efecto neurobiológico (1-2 oraciones)"
}`

const getAiClient = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY not configured')
  }
  return new GoogleGenAI({ apiKey })
}

// Transformaciones de fallback cuando la IA no está disponible
const FALLBACK_TRANSFORMATIONS = [
  {
    patterns: ['no puedo', 'no soy capaz', 'es imposible'],
    category: 'Capacidad',
    new: 'Todavía no encontré cómo',
    effect: 'Temporal, abre posibilidades y activa modo búsqueda.'
  },
  {
    patterns: ['soy un', 'soy una', 'siempre soy'],
    category: 'Identidad',
    new: 'A veces experimento',
    effect: 'Separa la experiencia de tu identidad.'
  },
  {
    patterns: ['tengo que', 'debo', 'debería'],
    category: 'Obligación',
    new: 'Elijo',
    effect: 'De víctima a protagonista. Activa sensación de control.'
  },
  {
    patterns: ['estoy', 'me siento', 'tengo miedo'],
    category: 'Estado',
    new: 'Mi cuerpo está respondiendo',
    effect: 'Reconoces la función adaptativa de la respuesta.'
  },
  {
    patterns: ['problema', 'mal', 'terrible', 'horrible'],
    category: 'Situación',
    new: 'Es un desafío nuevo',
    effect: 'De amenaza sin solución a situación navegable.'
  }
]

function getFallbackTransformation(phrase: string): {
  category: string
  old: string
  new: string
  effect: string
} {
  const lowerPhrase = phrase.toLowerCase()

  for (const fallback of FALLBACK_TRANSFORMATIONS) {
    for (const pattern of fallback.patterns) {
      if (lowerPhrase.includes(pattern)) {
        return {
          category: fallback.category,
          old: phrase,
          new: fallback.new,
          effect: fallback.effect
        }
      }
    }
  }

  // Fallback genérico si no hay coincidencia
  return {
    category: 'Capacidad',
    old: phrase,
    new: 'Estoy aprendiendo a manejar esto',
    effect: 'Reencuadra la situación como proceso de aprendizaje.'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado. Debes iniciar sesión para usar esta función.' },
        { status: 401 }
      )
    }

    // Verificar límite diario
    const userId = session.user.id
    const rateLimit = checkDailyRateLimit(`reetiquetado:${userId}`, DAILY_GENERATION_LIMIT)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Has alcanzado el límite de ${DAILY_GENERATION_LIMIT} transformaciones personalizadas por día.`,
          resetAt: rateLimit.resetAt,
          remaining: 0
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': DAILY_GENERATION_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString()
          }
        }
      )
    }

    const { phrase } = await request.json() as { phrase: string }

    if (!phrase || phrase.trim().length === 0) {
      return NextResponse.json(
        { error: 'La frase es requerida' },
        { status: 400 }
      )
    }

    if (phrase.length > 200) {
      return NextResponse.json(
        { error: 'La frase es muy larga. Máximo 200 caracteres.' },
        { status: 400 }
      )
    }

    let transformation: {
      category: string
      old: string
      new: string
      effect: string
    }
    let usedAI = true

    try {
      const ai = getAiClient()

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ role: 'user', parts: [{ text: `Frase limitante: "${phrase.trim()}"` }] }],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      })

      const responseText = response.text || ''

      // Parsear respuesta JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        transformation = JSON.parse(jsonMatch[0])

        // Validar estructura
        if (!transformation.category || !transformation.old || !transformation.new || !transformation.effect) {
          throw new Error('Respuesta incompleta')
        }
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (aiError) {
      console.error('AI generation failed, using fallback:', aiError)
      transformation = getFallbackTransformation(phrase.trim())
      usedAI = false
    }

    return NextResponse.json({
      transformation: {
        id: `custom-${Date.now()}`,
        category: transformation.category,
        old: transformation.old,
        new: transformation.new,
        effect: transformation.effect,
        requiredReps: 3,
        isCustom: true,
        generatedByAI: usedAI
      },
      rateLimit: {
        remaining: rateLimit.remaining,
        limit: DAILY_GENERATION_LIMIT,
        resetAt: rateLimit.resetAt
      }
    })

  } catch (error: unknown) {
    console.error('Reetiquetado API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'Error de configuración del servicio.' },
        { status: 500 }
      )
    }

    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Servicio temporalmente no disponible. Intenta en unos minutos.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Error al generar la transformación. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
