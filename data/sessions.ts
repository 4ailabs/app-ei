export interface Session {
  id: number
  title: string
  description: string
  day: number
  imageUrl?: string
  pdfUrl?: string
  videos: Video[]
  audios: Audio[]
  themes: Theme[]
  protocols: Protocol[]
  apps: AppLink[]
}

export interface Video {
  id: string
  title: string
  vimeoId: string
  description?: string
}

export interface Audio {
  id: string
  title: string
  url: string
  description?: string
}

export interface Theme {
  id: string
  title: string
  content: string
  subtopics?: Subtopic[]
}

export interface Subtopic {
  id: string
  title: string
  content: string
}

export interface Protocol {
  id: string
  title: string
  description: string
  pdfUrl?: string
}

export interface AppLink {
  id: string
  name: string
  description: string
  url: string
  iconName: string
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "Fundamentos de Regulación",
    description: "Bases teóricas y prácticas para la regulación del sistema nervioso y energético.",
    day: 1,
    imageUrl: "/images/sessions/session-1.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p1-1",
        title: "Protocolo de Regulación Básica",
        description: "Pasos fundamentales para regular el sistema nervioso.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 2,
    title: "TRSB - Técnica de Reprocesamiento Somato-Cognitivo Bilateral",
    description: "Técnica avanzada para el procesamiento de traumas y bloqueos emocionales.",
    day: 2,
    imageUrl: "/images/sessions/session-2.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p2-1",
        title: "Protocolo TRSB Completo",
        description: "Guía paso a paso para aplicar la técnica TRSB.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 3,
    title: "PONS - Procesamiento Ocular Neural Somático",
    description: "Método de procesamiento a través de movimientos oculares y conexión somática.",
    day: 3,
    imageUrl: "/images/sessions/session-3.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p3-1",
        title: "Protocolo PONS",
        description: "Instrucciones para la aplicación del procesamiento ocular.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 4,
    title: "Context Engineering (Las 7 Fases)",
    description: "Ingeniería del contexto para optimizar el entorno y la respuesta energética.",
    day: 4,
    imageUrl: "/images/sessions/session-4.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p4-1",
        title: "Las 7 Fases del Context Engineering",
        description: "Guía completa de las 7 fases para transformar tu contexto.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 5,
    title: "Miracle Question (La Pregunta del Milagro)",
    description: "Técnica de proyección para identificar objetivos y soluciones ideales.",
    day: 5,
    imageUrl: "/images/sessions/session-5.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p5-1",
        title: "Guía de la Pregunta del Milagro",
        description: "Cómo aplicar esta poderosa técnica de visualización.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 6,
    title: "Los 4 Protocolos (Alpha, Beta, Gamma, Delta)",
    description: "Protocolos específicos para diferentes estados y necesidades energéticas.",
    day: 6,
    imageUrl: "/images/sessions/session-6.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p6-1",
        title: "Protocolo Alpha",
        description: "Estado de relajación profunda y creatividad.",
        pdfUrl: "#"
      },
      {
        id: "p6-2",
        title: "Protocolo Beta",
        description: "Estado de alerta y concentración activa.",
        pdfUrl: "#"
      },
      {
        id: "p6-3",
        title: "Protocolo Gamma",
        description: "Estado de máximo rendimiento cognitivo.",
        pdfUrl: "#"
      },
      {
        id: "p6-4",
        title: "Protocolo Delta",
        description: "Estado de regeneración profunda y sanación.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 7,
    title: "El Poder de los Rituales (Los 3 Elementos)",
    description: "Estructura y aplicación de rituales para potenciar la intención y manifestación.",
    day: 7,
    imageUrl: "/images/sessions/session-7.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p7-1",
        title: "Los 3 Elementos del Ritual",
        description: "Guía para crear rituales efectivos y transformadores.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 8,
    title: "Las 7 Excepciones",
    description: "Identificación y manejo de excepciones en el proceso de cambio y transformación.",
    day: 8,
    imageUrl: "/images/sessions/session-8.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p8-1",
        title: "Guía de las 7 Excepciones",
        description: "Cómo identificar y trabajar con las excepciones al patrón.",
        pdfUrl: "#"
      }
    ],
    apps: []
  },
  {
    id: 9,
    title: "LSP Insight System",
    description: "Sistema de insight profundo para el autoconocimiento y transformación personal.",
    day: 9,
    imageUrl: "/images/sessions/session-9.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p9-1",
        title: "Manual LSP Insight",
        description: "Guía completa del sistema LSP para insights profundos.",
        pdfUrl: "#"
      }
    ],
    apps: [
      {
        id: "a9-1",
        name: "LSP Insight App",
        description: "Aplicación para trabajar con el sistema LSP.",
        url: "#",
        iconName: "Zap"
      }
    ]
  }
]
