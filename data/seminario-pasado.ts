export interface VideoSeminarioPasado {
  id: string
  title: string
  cloudflareStreamId?: string
  duration?: string
  description?: string
  order: number // Orden dentro del día (1-4)
}

export interface DiaSeminarioPasado {
  day: number // 1, 2, o 3
  title: string // Ej: "Día 1: Introducción"
  date?: string // Fecha del seminario (opcional)
  videos: VideoSeminarioPasado[]
}

export const seminarioPasado: DiaSeminarioPasado[] = [
  {
    day: 1,
    title: "Día 1 - Sesión 1",
    date: undefined, // Puedes agregar la fecha si la tienes
    videos: [
      {
        id: "sp-d1-v1",
        title: "Video 1",
        order: 1,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d1-v2",
        title: "Video 2",
        order: 2,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d1-v3",
        title: "Video 3",
        order: 3,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d1-v4",
        title: "Video 4",
        order: 4,
        duration: undefined,
        description: undefined
      }
    ]
  },
  {
    day: 2,
    title: "Día 2 - Sesión 2",
    videos: [
      {
        id: "sp-d2-v1",
        title: "Video 1",
        order: 1,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d2-v2",
        title: "Video 2",
        order: 2,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d2-v3",
        title: "Video 3",
        order: 3,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d2-v4",
        title: "Video 4",
        order: 4,
        duration: undefined,
        description: undefined
      }
    ]
  },
  {
    day: 3,
    title: "Día 3 - Sesión 3",
    videos: [
      {
        id: "sp-d3-v1",
        title: "Video 1",
        order: 1,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d3-v2",
        title: "Video 2",
        order: 2,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d3-v3",
        title: "Video 3",
        order: 3,
        duration: undefined,
        description: undefined
      },
      {
        id: "sp-d3-v4",
        title: "Video 4",
        order: 4,
        duration: undefined,
        description: undefined
      }
    ]
  }
]

