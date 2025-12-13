export interface VideoSeminarioOnline {
  id: string
  title: string
  cloudflareStreamId?: string
  duration?: string
  description?: string
  order: number // Orden dentro del día
}

export interface AudioSeminarioOnline {
  id: string
  title: string
  audioUrl: string
  backgroundVideoId?: string // ID de Cloudflare Stream para video de fondo
  duration?: string
  description?: string
  order: number // Orden dentro del día
}

// Video de ambiente compartido para los audios del seminario
export const SEMINARIO_BACKGROUND_VIDEO_ID = "cab0ffefc4cee4a08a7f4bf41a78b7bc"

export interface DiaSeminarioOnline {
  day: number // 1, 2, o 3
  title: string // Ej: "Día 1: Introducción"
  date?: string // Fecha del seminario (opcional)
  videos: VideoSeminarioOnline[] // Videos recuperados
  audios: AudioSeminarioOnline[] // Audios del seminario
}

export const seminarioOnline: DiaSeminarioOnline[] = [
  {
    day: 1,
    title: "Día 1 - Sesión 1",
    date: undefined,
    videos: [
      {
        id: "sp-v1-1",
        title: "Día 1 Módulo 1",
        cloudflareStreamId: "e9d4fc13a2baa8b792331d2e3db6a4bd",
        order: 1,
        description: "Primera parte del seminario"
      }
    ],
    audios: [
      {
        id: "sp-d1-a1",
        title: "Bienvenida y Contrato",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%201.1%20Bienvenida%20y%20Contrato%20R.wav",
        order: 1,
        description: "Audio de bienvenida al seminario y establecimiento del contrato"
      },
      {
        id: "sp-d1-a2",
        title: "Neurocepción y 3 Estados",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%201.2%20Neurocepcion%20y%203%20estados%20R.wav",
        order: 2,
        description: "Introducción a la neurocepción y los tres estados del sistema nervioso"
      },
      {
        id: "sp-d1-a3",
        title: "La Ventana de Tolerancia",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%201.3%20La%20ventana%20de%20Tolerancia%20R.wav",
        order: 3,
        description: "Concepto y aplicación de la ventana de tolerancia"
      },
      {
        id: "sp-d1-a4",
        title: "Herramientas de Regulación",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%201.4%20Herramientas%20de%20regulacion%20R.wav",
        order: 4,
        description: "Técnicas y herramientas para la autorregulación"
      },
      {
        id: "sp-d1-a5",
        title: "La Arquitectura de la Supervivencia",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%202.1%20La%20arquitectura%20de%20la%20supervivencia%20R.wav",
        order: 5,
        description: "Cómo está diseñado nuestro sistema de supervivencia"
      },
      {
        id: "sp-d1-a6",
        title: "El Cóctel de la Supervivencia",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%202.2%20El%20coctel%20de%20la%20supervivencia%20R.wav",
        order: 6,
        description: "Los componentes químicos de la respuesta de supervivencia"
      },
      {
        id: "sp-d1-a7",
        title: "Las Cuatro Palancas (1ª Parte)",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%203.2%20Las%20cuatro%20palancas%201a%20parte%20R.wav",
        order: 7,
        description: "Primera parte sobre las cuatro palancas de regulación"
      },
      {
        id: "sp-d1-a8",
        title: "Las Cuatro Palancas (2ª Parte)",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%203.2%20Las%20cuatro%20palancas%202a%20pate%20R.wav",
        order: 8,
        description: "Segunda parte sobre las cuatro palancas de regulación"
      },
      {
        id: "sp-d1-a9",
        title: "Sufrimiento y Trauma (1ª Parte)",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%204.1%20Sufrimiento%20y%20trauma%201a%20parte%20R.wav",
        order: 9,
        description: "Primera parte sobre sufrimiento y trauma"
      },
      {
        id: "sp-d1-a10",
        title: "Sufrimiento y Trauma (2ª Parte)",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%204.1%20Sufrimiento%20y%20trauma%202a%20parte%20R.wav",
        order: 10,
        description: "Segunda parte sobre sufrimiento y trauma"
      },
      {
        id: "sp-d1-a11",
        title: "Patrones Antiguos",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%204.2%20Patrones%20antiguos%20R.wav",
        order: 11,
        description: "Exploración de los patrones antiguos de supervivencia"
      },
      {
        id: "sp-d1-a12",
        title: "Tu Nueva Historia",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%204.3%20Tu%20nueva%20historia%20R.wav",
        order: 12,
        description: "Construyendo tu nueva narrativa personal"
      },
      {
        id: "sp-d1-a13",
        title: "Audio Guiado para Workbook 1",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%20guiado%20para%20workbook%201R.wav",
        order: 13,
        description: "Ejercicio guiado para completar el workbook - Parte 1"
      },
      {
        id: "sp-d1-a14",
        title: "Audio Guiado para Workbook 2",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%20guiado%20para%20workboom%202R.wav",
        order: 14,
        description: "Ejercicio guiado para completar el workbook - Parte 2"
      },
      {
        id: "sp-d1-a15",
        title: "Audio Guiado para Workbook 3",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%20guiado%20para%20workbook%203R.wav",
        order: 15,
        description: "Ejercicio guiado para completar el workbook - Parte 3"
      },
      {
        id: "sp-d1-a16",
        title: "Audio Guiado para Workbook 4",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%20guiado%20para%20workbook%204R.wav",
        order: 16,
        description: "Ejercicio guiado para completar el workbook - Parte 4"
      },
      {
        id: "sp-d1-a17",
        title: "Audio Guía para Terapeutas",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Audio%20guia%20para%20terapeutas%20R.wav",
        order: 17,
        description: "Guía especializada para terapeutas y profesionales"
      }
    ]
  },
  {
    day: 2,
    title: "Día 2 - Sesión 2",
    videos: [],
    audios: []
  },
  {
    day: 3,
    title: "Día 3 - Sesión 3",
    videos: [],
    audios: []
  }
]

