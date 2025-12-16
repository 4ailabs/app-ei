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

export interface SlideSeminarioOnline {
  id: string
  title: string
  url: string
  description?: string
  order: number
}

// Video de ambiente compartido para los audios del seminario
export const SEMINARIO_BACKGROUND_VIDEO_ID = "cab0ffefc4cee4a08a7f4bf41a78b7bc"

export interface DiaSeminarioOnline {
  day: number // 1, 2, o 3
  title: string // Ej: "Día 1: Introducción"
  date?: string // Fecha del seminario (opcional)
  videos: VideoSeminarioOnline[] // Videos recuperados
  audios: AudioSeminarioOnline[] // Audios del seminario
  slides?: SlideSeminarioOnline[] // Slides/presentaciones del día
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
        cloudflareStreamId: "aefa8bea28f24c1b5d7bf14d5d04c3ec",
        order: 1,
        description: "Primera parte del seminario"
      }
    ],
    slides: [
      {
        id: "sp-s1-1",
        title: "Sesión 1: Seguridad y Ventana de Tolerancia",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Pdfs%20dia%201/Sesion1_Seguridad_Ventana_Tolerancia.pptx.pdf",
        description: "Presentación sobre seguridad y ventana de tolerancia",
        order: 1
      },
      {
        id: "sp-s1-2",
        title: "Sesión 2: Cerebro Reactivo y Recursos",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Pdfs%20dia%201/Sesion2_Cerebro_Reactivo_Recursos.pptx.pdf",
        description: "Presentación del módulo de cerebro reactivo y recursos",
        order: 2
      },
      {
        id: "sp-s1-3",
        title: "Sesión 3: Estados Óptimos y Las 4 Palancas",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Pdfs%20dia%201/Sesion3_Estados_Optimos_4_Palancas.pptx.pdf",
        description: "Presentación del módulo de estados óptimos y las 4 palancas",
        order: 3
      },
      {
        id: "sp-s1-4",
        title: "Sesión 4: Sufrimiento, Patrones y Nueva Historia",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Pdfs%20dia%201/Sesion4_Sufrimiento_Patrones_Nueva_Historia.pptx.pdf",
        description: "Presentación del módulo de transformación narrativa",
        order: 4
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
    audios: [
      {
        id: "sp-d2-a1",
        title: "Regulación y Estado Óptimo",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%200%20Regulacion%20y%20estado%20optimo%20R.wav",
        order: 1,
        description: "Audio de regulación para alcanzar el estado óptimo"
      },
      {
        id: "sp-d2-a2",
        title: "TRSB 1.1 - Apertura",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20TRSB%201.1%20Apertura%20R.wav",
        order: 2,
        description: "Apertura de la técnica TRSB"
      },
      {
        id: "sp-d2-a3",
        title: "Protocolo TRSB 1.2",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20protocolo%20TRSB%201.2%20R.wav",
        order: 3,
        description: "Protocolo guiado de TRSB"
      },
      {
        id: "sp-d2-a4",
        title: "Práctica Grupal TRSB 1.3",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20practica%20grupal%20TRSB%201.3%20R.wav",
        order: 4,
        description: "Práctica grupal guiada de TRSB"
      },
      {
        id: "sp-d2-a5",
        title: "PONS Fundamentos 1.4",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20PONS%20fundamentos%201.4%20R.wav",
        order: 5,
        description: "Fundamentos de la técnica PONS"
      },
      {
        id: "sp-d2-a6",
        title: "PONS Protocolo 1.5",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20PONS%20protocolo%201.5%20R.wav",
        order: 6,
        description: "Protocolo guiado de PONS"
      },
      {
        id: "sp-d2-a7",
        title: "PONS Cierre 1.6",
        audioUrl: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Seminario%20On%20line/Dia%202%20audios%20TRSB%20y%20PONS/Audios%20espan%CC%83ol%20dia%202%20TRSN%20y%20PONS/Audio%20PONS%20cierre%201.6%20R.wav",
        order: 7,
        description: "Cierre de la sesión PONS"
      }
    ]
  },
  {
    day: 3,
    title: "Día 3 - Sesión 3",
    videos: [],
    audios: []
  }
]

