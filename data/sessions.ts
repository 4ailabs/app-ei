export type ImageCategory =
  | "sistema_nervioso"
  | "ventana_tolerancia"
  | "respiracion"
  | "palancas"
  | "neuroplasticidad"
  | "recursos"
  | "tecnicas"

export interface AdditionalImage {
  id: string
  title: string
  url: string
  description?: string
  type: 'image'
  category?: ImageCategory
}

export interface AdditionalDiagram {
  id: string
  title: string
  url: string
  description?: string
  type: 'diagram'
}

export interface AdditionalSlide {
  id: string
  title: string
  url: string
  description?: string
  type: 'slide'
}

export type AdditionalResource = 
  | PDF 
  | (Audio & { type: 'audio' })
  | (Video & { type: 'video' })
  | AdditionalImage
  | AdditionalDiagram
  | AdditionalSlide

export interface Session {
  id: number
  title: string
  description: string
  day: number
  moduleNumber?: number
  imageUrl?: string
  pdfUrl?: string
  pdfs?: PDF[]
  additionalResources?: AdditionalResource[]
  videos: Video[]
  audios: Audio[]
  themes: Theme[]
  protocols: Protocol[]
  apps: AppLink[]
}

export interface Video {
  id: string
  title: string
  vimeoId?: string
  cloudflareStreamId?: string
  audioUrl?: string // URL del audio cuando no hay video disponible
  duration?: string
  description?: string
}

export interface Audio {
  id: string
  title: string
  url: string
  duration?: string
  description?: string
  category?: "regulacion" | "ritual_matutino" | "ritual_nocturno" | "meditacion"
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

export interface PDF {
  id: string
  title: string
  pages: number
  description: string
  url?: string
  category?: "referencia" | "ejercicio" | "contenido_profundo" | "recursos_adicionales"
  type?: 'slide'
}

export const sessions: Session[] = [
  // ========================================
  // DÍA 1 - MÓDULO 1: NEUROBIOLOGÍA DE LA REGULACIÓN
  // ========================================
  {
    id: 1,
    title: "Neurobiología de la Regulación",
    description: "Bases científicas del sistema nervioso: los 3 estados, la ventana de tolerancia y técnicas de regulación.",
    day: 1,
    moduleNumber: 1,
    imageUrl: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Neurobiologia%20de%20la%20regulacion%20main.png",
    pdfUrl: "",
    pdfs: [
      {
        id: "pdf1-1",
        title: "Guía: Factores Ventana de Tolerancia",
        pages: 0,
        description: "Factores que expanden y estrechan tu ventana de tolerancia",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Guia_Factores_Ventana_Tolerancia.pdf",
        category: "referencia"
      },
      {
        id: "pdf1-2",
        title: "Guía: Neuroplasticidad",
        pages: 0,
        description: "Cómo el cerebro puede cambiar a través de la práctica",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Guia_Neuroplasticidad.pdf",
        category: "contenido_profundo"
      },
      {
        id: "pdf1-3",
        title: "Guía: Rituales de Consolidación",
        pages: 0,
        description: "Rituales para consolidar el aprendizaje",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Guia_Rituales_Consolidacion.pdf",
        category: "ejercicio"
      },
      {
        id: "pdf1-4",
        title: "Guía: Teoría Polivagal",
        pages: 0,
        description: "Fundamentos teóricos del sistema nervioso autónomo",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Guia_Teoria_Polivagal.pdf",
        category: "contenido_profundo"
      }
    ],
    videos: [
      {
        id: "v1-1",
        title: "Los 3 Estados del Sistema Nervioso",
        cloudflareStreamId: "5d21d898f778e84d5b552556e4f6e8a4",
        duration: "8-10 min",
        description: "Explicación visual de Ventral Vagal, Simpático y Dorsal Vagal con animaciones"
      },
      {
        id: "v1-2",
        title: "La Ventana de Tolerancia",
        cloudflareStreamId: "73d9614ce90c487e197cc102ed8a2349",
        duration: "6-8 min",
        description: "Concepto de Siegel, metáfora de la ducha, qué la expande y qué la estrecha"
      },
      {
        id: "v1-3",
        title: "Neurocepción: Tu Detector de Amenazas",
        cloudflareStreamId: "db032792094ecf9a419471c2a3a6862d",
        duration: "5-7 min",
        description: "Cómo el cuerpo detecta peligro antes que la mente consciente"
      },
      {
        id: "v1-4",
        title: "Demo: Respiración 4-7-8",
        cloudflareStreamId: "648221a175d90d561c2b79f5580985ae",
        duration: "4 min",
        description: "Demostración práctica con guía visual de tiempos"
      },
      {
        id: "v1-5",
        title: "Demo: Abrazo de Mariposa",
        cloudflareStreamId: "10253381886f7cd3058820aa31dec182",
        duration: "3 min",
        description: "Demostración de la técnica bilateral"
      },
      {
        id: "v1-6",
        title: "Demo: Orientación 5-4-3-2-1",
        cloudflareStreamId: "98a16e5c61298a25d712da965eb8e847",
        duration: "4 min",
        description: "Ejercicio de anclaje sensorial"
      }
    ],
    audios: [
      // Prácticas de Regulación (uso diario)
      {
        id: "a1-1",
        title: "Respiración 4-7-8 (versión corta)",
        url: "/Audios/A1%20—%20RESPIRACIÓN%204-7-8%20CORTA.wav",
        duration: "3 min",
        description: "3 ciclos con guía de voz",
        category: "regulacion"
      },
      {
        id: "a1-2",
        title: "Respiración 4-7-8 (versión extendida)",
        url: "/Audios/A2%20—%20RESPIRACIÓN%204-7-8%20EXTENDIDA.wav",
        duration: "8 min",
        description: "10 ciclos con música suave",
        category: "regulacion"
      },
      {
        id: "a1-3",
        title: "Abrazo de Mariposa Guiado",
        url: "/Audios/A3%20—%20ABRAZO%20DE%20MARIPOSA%20GUIADO%20.wav",
        duration: "5 min",
        description: "Estimulación bilateral con visualización",
        category: "regulacion"
      },
      {
        id: "a1-4",
        title: "Orientación 5-4-3-2-1",
        url: "/Audios/A4%20—%20ORIENTACIÓN%205-4-3-2-1.wav",
        duration: "6 min",
        description: "Anclaje sensorial completo",
        category: "regulacion"
      },
      {
        id: "a1-5",
        title: "Regulación de Emergencia",
        url: "/Audios/A5%20—%20REGULACIÓN%20DE%20EMERGENCIA%20.wav",
        duration: "2 min",
        description: "Para momentos de crisis, muy directivo",
        category: "regulacion"
      }
    ],
    themes: [
      {
        id: "t1-1",
        title: "Los 3 Estados del Sistema Nervioso",
        content: "El sistema nervioso autónomo opera en tres estados principales según la Teoría Polivagal de Stephen Porges.",
        subtopics: [
          {
            id: "t1-1-1",
            title: "Ventral Vagal (Seguridad)",
            content: "Estado de conexión social, calma y presencia. Aquí es donde ocurre el aprendizaje, la creatividad y la conexión genuina. Respiración profunda, ritmo cardíaco flexible, rostro expresivo, voz con variación de tono."
          },
          {
            id: "t1-1-2",
            title: "Simpático (Lucha o Huida)",
            content: "Estado de activación ante amenazas percibidas. Aumento del ritmo cardíaco, respiración acelerada, tensión muscular, pensamientos rápidos, irritabilidad, sensación de urgencia."
          },
          {
            id: "t1-1-3",
            title: "Dorsal Vagal (Colapso)",
            content: "Estado de inmovilización o apagado. Desconexión, entumecimiento, sensación de estar 'fuera del cuerpo', fatiga extrema, desesperanza, dificultad para actuar aunque se quiera."
          }
        ]
      },
      {
        id: "t1-2",
        title: "La Ventana de Tolerancia",
        content: "La ventana de tolerancia es el rango óptimo de activación donde podemos funcionar efectivamente, manejar el estrés y mantener la conexión con nosotros mismos y con otros.",
        subtopics: [
          {
            id: "t1-2-1",
            title: "Zona de Hiperactivación (Arriba)",
            content: "Cuando salimos por arriba de la ventana: ansiedad, pánico, pensamientos acelerados, irritabilidad. El sistema simpático está sobreactivado. Nos sentimos \"demasiado encendidos\"."
          },
          {
            id: "t1-2-2",
            title: "Zona Óptima (Dentro de la Ventana)",
            content: "Capacidad de pensar, sentir y actuar con flexibilidad. Podemos manejar el estrés sin perder la regulación. Aquí ocurre el aprendizaje, la toma de decisiones sabias y la transformación."
          },
          {
            id: "t1-2-3",
            title: "Zona de Hipoactivación (Abajo)",
            content: "Cuando salimos por abajo de la ventana: entumecimiento, desconexión, fatiga extrema, sensación de vacío. El sistema dorsal vagal domina. Nos sentimos \"demasiado apagados\"."
          },
          {
            id: "t1-2-4",
            title: "Expansión de la Ventana",
            content: "La ventana es ampliable con práctica. El sueño, ejercicio, conexión social y técnicas de regulación la expanden. El estrés crónico, el aislamiento y el trauma no procesado la estrechan."
          }
        ]
      },
      {
        id: "t1-3",
        title: "Neurocepción",
        content: "Término acuñado por Stephen Porges para describir cómo nuestro sistema nervioso evalúa constantemente el nivel de seguridad o amenaza, sin que seamos conscientes de ello.",
        subtopics: [
          {
            id: "t1-3-1",
            title: "Detección Automática",
            content: "La neurocepción ocurre por debajo del nivel consciente, en milisegundos. Tu sistema nervioso escanea continuamente señales de seguridad y peligro en el ambiente, en otras personas y en tu propio cuerpo."
          },
          {
            id: "t1-3-2",
            title: "Señales que Evalúa",
            content: "Tono de voz, expresiones faciales, posturas corporales, proximidad física, sonidos del ambiente, iluminación, predictibilidad del entorno y cualquier elemento que pueda indicar seguridad o amenaza."
          },
          {
            id: "t1-3-3",
            title: "Neurocepción Desajustada",
            content: "Experiencias traumáticas pueden \"descalibrar\" la neurocepción: detectar peligro donde no existe (hipervigilancia) o no detectar amenazas reales (disociación crónica)."
          },
          {
            id: "t1-3-4",
            title: "Recalibración",
            content: "La neurocepción puede recalibrarse mediante experiencias repetidas de seguridad, co-regulación con personas seguras, y prácticas que envían señales de seguridad al sistema nervioso."
          }
        ]
      },
      {
        id: "t1-4",
        title: "Técnicas de Regulación",
        content: "Herramientas prácticas para regresar a la ventana de tolerancia cuando nos desregulamos, o para mantenernos en estado ventral vagal.",
        subtopics: [
          {
            id: "t1-4-1",
            title: "Respiración 4-7-8",
            content: "Inhala contando 4, retén contando 7, exhala contando 8. La exhalación prolongada activa el nervio vago y el sistema parasimpático. Usar ante ansiedad o antes de situaciones estresantes. Repetir 3-4 ciclos."
          },
          {
            id: "t1-4-2",
            title: "Orientación 5-4-3-2-1",
            content: "Nombra 5 cosas que ves, 4 que oyes, 3 que tocas, 2 que hueles, 1 que saboreas. Ancla la atención al presente e interrumpe la rumiación mental, la ansiedad anticipatoria o los estados disociativos."
          },
          {
            id: "t1-4-3",
            title: "Abrazo de Mariposa",
            content: "Cruza los brazos sobre el pecho con las manos en las clavículas. Alterna golpecitos suaves derecha-izquierda a ritmo lento (1 por segundo). La estimulación bilateral facilita el procesamiento emocional y la auto-contención."
          },
          {
            id: "t1-4-4",
            title: "Contacto Tranquilizador",
            content: "Mano en el corazón, mano en el abdomen, o auto-abrazo. El contacto afectivo libera oxitocina y envía señales de seguridad al sistema límbico. Útil para momentos de angustia, al despertar de pesadillas o antes de dormir."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p1-1",
        title: "Los 3 Estados — Tarjeta de Referencia",
        description: "Tabla visual: estado, señales, qué hacer",
        pdfUrl: ""
      },
      {
        id: "p1-2",
        title: "Mi Ventana de Tolerancia",
        description: "Diagrama + ejercicio de autodiagnóstico",
        pdfUrl: ""
      },
      {
        id: "p1-3",
        title: "Herramientas de Regulación — Guía Rápida",
        description: "Las 4 técnicas con instrucciones paso a paso",
        pdfUrl: ""
      }
    ],
    additionalResources: [
      {
        id: "ar1-1",
        title: "Diálogo 1: Identificando el Estado del Sistema Nervioso",
        url: "/Audios/DIÁLOGO%201%20IDENTIFICANDO%20EL%20ESTADO%20DEL%20SISTEMA%20NERVIOSO%20.wav",
        duration: "",
        description: "Diálogo guiado para identificar el estado actual del sistema nervioso",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-1b",
        title: "Diálogo 2: Trabajando con Recursos",
        url: "/Audios/DIÁLOGO%202%20TRABAJANDO%20CON%20RECURSOS.wav",
        duration: "",
        description: "Diálogo guiado para trabajar con recursos",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-2",
        title: "Diálogo 3: Pendulación en Práctica",
        url: "/Audios/DIÁLOGO%203%20PENDULACIÓN%20EN%20PRÁCTICA.wav",
        duration: "",
        description: "Práctica guiada de pendulación entre estados",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-3",
        title: "Diálogo 4: Re-etiquetando el Lenguaje",
        url: "/Audios/DIÁLOGO%204%20RE-ETIQUETANDO%20EL%20LENGUAJE.wav",
        duration: "",
        description: "Guía para transformar el lenguaje interno",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-4",
        title: "Diálogo 5: Validando Patrones Defensivos",
        url: "/Audios/DIÁLOGO%205%20VALIDANDO%20PATRONES%20DEFENSIVOS%20.wav",
        duration: "",
        description: "Exploración compasiva de los patrones defensivos",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-5",
        title: "Diálogo 6: Aplicando las 4 Palancas",
        url: "/Audios/DIÁLOGO%206%20APLICANDO%20LAS%204%20PALANCAS.wav",
        duration: "",
        description: "Práctica guiada de las 4 palancas del estado",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-6",
        title: "Diálogo 7: Reescribiendo la Historia Personal",
        url: "",
        duration: "",
        description: "Guía para transformar la narrativa personal",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-7",
        title: "Diálogo 8: Cierre de Sesión con Integración",
        url: "",
        duration: "",
        description: "Cierre guiado e integración de la sesión",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-8",
        title: "Ritual 1: Priming de Regulación",
        url: "/Audios/A6%20—%20RITUAL%20PRIMING%20DE%20REGULACIÓN.wav",
        duration: "5 min",
        description: "Respiración + Gratitud + Intención",
        category: "ritual_matutino",
        type: "audio" as const
      },
      {
        id: "ar1-9",
        title: "Ritual 2: Priming de Recursos (10 min) — Parte 1",
        url: "/Audios/A7%20—%20RITUAL%20PRIMING%20DE%20RECURSOS%20(10%20min)%20—%20Parte%201.wav",
        duration: "10 min",
        description: "Movimiento + Respiración + Gratitud + Visualización + Intención",
        category: "ritual_matutino",
        type: "audio" as const
      },
      {
        id: "ar1-9b",
        title: "Ritual 2: Priming de Recursos (10 min) — Parte 2",
        url: "/Audios/A7%20—%20RITUAL%20PRIMING%20DE%20RECURSOS%20(10%20min)%20—%20Parte%202.wav",
        duration: "10 min",
        description: "Movimiento + Respiración + Gratitud + Visualización + Intención",
        category: "ritual_matutino",
        type: "audio" as const
      },
      {
        id: "ar1-10",
        title: "Ritual Completo Mañana",
        url: "",
        duration: "15 min",
        description: "Combinación de Ritual 1 y 2",
        category: "ritual_matutino",
        type: "audio" as const
      },
      {
        id: "ar1-11",
        title: "Regreso a Ventral Vagal (10 min) — Parte 1",
        url: "/Audios/A13%20—%20REGRESO%20A%20VENTRAL%20VAGAL%20(10%20min)%20—%20Parte%201%20.wav",
        duration: "10 min",
        description: "Para cuando estás en simpático o dorsal",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-11b",
        title: "Regreso a Ventral Vagal (10 min) — Parte 2",
        url: "/Audios/A13%20—%20REGRESO%20A%20VENTRAL%20VAGAL%20(10%20min)%20—%20Parte%202.wav",
        duration: "10 min",
        description: "Para cuando estás en simpático o dorsal",
        category: "meditacion",
        type: "audio" as const
      },
      {
        id: "ar1-12",
        title: "Cierre Diario de 5 Minutos",
        url: "/Audios/A9%20—%20CIERRE%20DIARIO%20(5%20min).wav",
        duration: "5 min",
        description: "Revisión, gratitud, intención mañana",
        category: "ritual_nocturno",
        type: "audio" as const
      },
      {
        id: "ar1-13",
        title: "Regulación Pre-Sueño (10 min) — Parte 1",
        url: "/Audios/A10%20—%20REGULACIÓN%20PRE-SUEÑO%20(10%20min)%20—%20Parte%201%20.wav",
        duration: "10 min",
        description: "Relajación progresiva + respiración",
        category: "ritual_nocturno",
        type: "audio" as const
      },
      {
        id: "ar1-13b",
        title: "Regulación Pre-Sueño (10 min) — Parte 2",
        url: "/Audios/A10%20—%20REGULACIÓN%20PRE-SUEÑO%20(10%20min)%20—%20Parte%202%20.wav",
        duration: "10 min",
        description: "Relajación progresiva + respiración",
        category: "ritual_nocturno",
        type: "audio" as const
      },
      // =============================================
      // GALERÍA DE IMÁGENES - BLOQUE 1
      // Organizadas por tema para mejor comprensión
      // =============================================

      // --- SISTEMA NERVIOSO (Los 3 Estados) ---
      {
        id: "img-sn-1",
        title: "Los Tres Estados del Sistema Nervioso",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Los%20tres%20estados%20del%20sistema%20nervioso.png",
        description: "Diagrama visual de los tres estados del sistema nervioso autónomo según la Teoría Polivagal",
        type: "image" as const,
        category: "sistema_nervioso"
      },
      {
        id: "img-sn-2",
        title: "Los Tres Estados - Cerebro",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Los%20tres%20estados%20del%20sistema%20nervioso%20cerebro.png",
        description: "Representación cerebral de los estados del sistema nervioso",
        type: "image" as const,
        category: "sistema_nervioso"
      },
      {
        id: "img-sn-3",
        title: "Los Tres Estados - Círculo",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Los%20tres%20estados%20del%20sistema%20nervioso%20circulo.png",
        description: "Diagrama circular de los estados del sistema nervioso",
        type: "image" as const,
        category: "sistema_nervioso"
      },
      {
        id: "img-sn-4",
        title: "Los Tres Estados - Columnas",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Los%20tres%20estafos%20del%20sistema%20nervioso%20columnas.png",
        description: "Comparación de los tres estados en formato columna",
        type: "image" as const,
        category: "sistema_nervioso"
      },

      // --- TÉCNICAS DE RESPIRACIÓN ---
      {
        id: "img-resp478-1",
        title: "Respiración 4-7-8 - Tarjeta",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%204-7-8%20card.png",
        description: "Tarjeta de referencia rápida para la técnica 4-7-8",
        type: "image" as const,
        category: "respiracion"
      },
      {
        id: "img-resp478-2",
        title: "Respiración 4-7-8 - Círculo",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%204-7-8%20circulo%20.png",
        description: "Guía visual circular para la respiración 4-7-8",
        type: "image" as const,
        category: "respiracion"
      },
      {
        id: "img-resp478-3",
        title: "Respiración 4-7-8 - Columnas",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%204-7-8%20columnas.png",
        description: "Pasos de la técnica 4-7-8 en formato columna",
        type: "image" as const,
        category: "respiracion"
      },
      {
        id: "img-resp478-4",
        title: "Respiración 4-7-8 - Práctica de Ciclos",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%204-7-8%20practica%20ciclos.png",
        description: "Guía para practicar múltiples ciclos de respiración 4-7-8",
        type: "image" as const,
        category: "respiracion"
      },
      {
        id: "img-respcuad-1",
        title: "Respiración Cuadrada",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%20cuadrada.png",
        description: "Técnica de respiración cuadrada (box breathing)",
        type: "image" as const,
        category: "respiracion"
      },
      {
        id: "img-respcuad-2",
        title: "Respiración Cuadrada - Variante",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Respiracion%20cuadrada%202.png",
        description: "Variante de la técnica de respiración cuadrada",
        type: "image" as const,
        category: "respiracion"
      },

      // --- LAS 4 PALANCAS ---
      {
        id: "img-palancas-1",
        title: "Las 4 Palancas del Estado",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Las%204%20palancas%20del%20estado.png",
        description: "Las cuatro palancas para cambiar el estado emocional",
        type: "image" as const,
        category: "palancas"
      },
      {
        id: "img-palancas-2",
        title: "Las 4 Palancas - Progresivo",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Las%204%20palancas%20de%20estado%20progresivo.png",
        description: "Aplicación progresiva de las 4 palancas",
        type: "image" as const,
        category: "palancas"
      },
      {
        id: "img-palancas-3",
        title: "Tarjeta Las 4 Palancas",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Tarjeta%20las%204%20palancas.png",
        description: "Tarjeta de referencia rápida de las 4 palancas",
        type: "image" as const,
        category: "palancas"
      },
      {
        id: "img-enfoque-1",
        title: "Tarjeta de Enfoque",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Tarjeta%20enfoque.png",
        description: "Tarjeta sobre el enfoque como palanca de cambio",
        type: "image" as const,
        category: "palancas"
      },

      // --- NEUROPLASTICIDAD ---
      {
        id: "img-neuro-1",
        title: "Neuroplasticidad - Cerebros",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Neuroplasticidad%20cerebros%20.png",
        description: "Visualización de cómo el cerebro puede cambiar",
        type: "image" as const,
        category: "neuroplasticidad"
      },
      {
        id: "img-neuro-2",
        title: "Ciclo de Neuroplasticidad",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Ciclo%20de%20neuroplasticidad.png",
        description: "El ciclo de cambio neural: práctica, repetición y consolidación",
        type: "image" as const,
        category: "neuroplasticidad"
      },

      // --- RECURSOS Y CONCEPTOS ---
      {
        id: "img-recursos-1",
        title: "Mapa de Recursos Amplio",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Mapa%20de%20recursos%20amplio.png",
        description: "Mapa visual de recursos internos y externos",
        type: "image" as const,
        category: "recursos"
      },
      {
        id: "img-narrativa-1",
        title: "Narrativa Víctima vs Héroe",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Narrativa%20victima%20heroe.png",
        description: "Transformación de la narrativa personal",
        type: "image" as const,
        category: "recursos"
      },
      {
        id: "img-pendulacion-1",
        title: "Pendulación - Esferas",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Pendulacion%20esferas.png",
        description: "Concepto de pendulación de Peter Levine",
        type: "image" as const,
        category: "recursos"
      },
      {
        id: "img-balanza-1",
        title: "Balanza",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Balanza.png",
        description: "Concepto de equilibrio entre estados",
        type: "image" as const,
        category: "recursos"
      },

      // --- TÉCNICAS ADICIONALES ---
      {
        id: "img-mariposa-1",
        title: "Alas de Mariposa",
        url: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Alas%20de%20mariposa.png",
        description: "Técnica del Abrazo de Mariposa para autorregulación",
        type: "image" as const,
        category: "tecnicas"
      },

    ],
    apps: [
      {
        id: "app1-1",
        name: "Respiración Guiada",
        description: "Patrones de respiración para regular el sistema nervioso: 4-7-8, Box Breathing y más.",
        url: "/protocols/respiracion-guiada-app.html",
        iconName: "Activity"
      },
      {
        id: "app1-2",
        name: "Check-in de Estado",
        description: "Identifica si estás en Ventral, Simpático o Dorsal y recibe recomendaciones personalizadas.",
        url: "/protocols/checkin-estado-app.html",
        iconName: "Gauge"
      }
    ]
  },

  // ========================================
  // DÍA 1 - MÓDULO 2: RECURSOS Y NEUROPLASTICIDAD
  // ========================================
  {
    id: 2,
    title: "Recursos y Neuroplasticidad",
    description: "Descubre tus recursos internos y externos, y cómo el cerebro puede cambiar a través de la práctica consistente.",
    day: 1,
    moduleNumber: 2,
    imageUrl: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Recursos%20y%20neuroplasticidad%20main%20.png",
    pdfUrl: "",
    videos: [
      {
        id: "v2-1",
        title: "¿Qué es un Recurso?",
        cloudflareStreamId: "9f1d411a40f52d0830e8209354c7acb1",
        duration: "6-8 min",
        description: "Definición, tipos (externos/internos), por qué son esenciales"
      },
      {
        id: "v2-2",
        title: "El Poder de la Pendulación",
        cloudflareStreamId: "bf052866998835c00cbe73c675074606",
        duration: "5-7 min",
        description: "Concepto de Levine, oscilación entre trauma y recurso"
      },
      {
        id: "v2-3",
        title: "Neuroplasticidad: Tu Cerebro Puede Cambiar",
        cloudflareStreamId: "414ee803dc2be95cf69578295a8a62d2",
        duration: "8-10 min",
        description: "Evidencia científica (taxistas, meditadores), esperanza fundamentada"
      },
      {
        id: "v2-4",
        title: "Los 3 Componentes del Cambio",
        cloudflareStreamId: "626fc389f087e61f95b4c7211bd9d83c",
        duration: "5-6 min",
        description: "Cesar patrón antiguo + Practicar nuevo + Repetir consistentemente"
      },
      {
        id: "v2-5",
        title: "¿Cuánto Tiempo Toma Cambiar?",
        cloudflareStreamId: "c8c8d9ea11e009a08491c7e64e988a6e",
        duration: "4-5 min",
        description: "66 días mínimo, 100-150 días para patrones arraigados"
      }
    ],
    audios: [
      // Meditaciones especializadas para recursos
      {
        id: "a2-1",
        title: "Accediendo a Mis Recursos (12 min) — Parte 1",
        url: "/Audios/A11%20—%20ACCEDIENDO%20A%20MIS%20RECURSOS%20(12%20min)%20—%20Parte%201%20.wav",
        duration: "12 min",
        description: "Visualización guiada de personas, lugares, cualidades",
        category: "meditacion"
      },
      {
        id: "a2-1b",
        title: "Accediendo a Mis Recursos (12 min) — Parte 2",
        url: "/Audios/A11%20—%20ACCEDIENDO%20A%20MIS%20RECURSOS%20(12%20min)%20—%20Parte%202%20.wav",
        duration: "12 min",
        description: "Visualización guiada de personas, lugares, cualidades",
        category: "meditacion"
      },
      {
        id: "a2-2",
        title: "Expandiendo Mi Ventana",
        url: "",
        duration: "15 min",
        description: "Práctica de titulación segura",
        category: "meditacion"
      }
    ],
    themes: [
      {
        id: "t2-1",
        title: "¿Qué es un Recurso?",
        content: "Un recurso es cualquier cosa que te ayuda a regresar a un estado de regulación, seguridad y presencia. Los recursos son el fundamento del trabajo terapéutico seguro.",
        subtopics: [
          {
            id: "t2-1-1",
            title: "Tipos de Recursos",
            content: "Recursos externos: personas seguras, lugares de calma, objetos significativos, música, naturaleza. Recursos internos: cualidades propias, memorias positivas, sensaciones de bienestar, habilidades desarrolladas."
          },
          {
            id: "t2-1-2",
            title: "Características de un Buen Recurso",
            content: "Debe generar sensaciones de calma, seguridad o fortaleza en el cuerpo. No debe tener \"contaminación\" emocional (asociaciones negativas mezcladas). Debe ser accesible mentalmente cuando lo necesites."
          },
          {
            id: "t2-1-3",
            title: "Construcción de Recursos",
            content: "Antes de trabajar con material difícil, siempre construimos recursos. Esto crea una \"base segura\" a la cual regresar. Sin recursos suficientes, el trabajo profundo puede ser retraumatizante en lugar de sanador."
          },
          {
            id: "t2-1-4",
            title: "Tu Ancla de Recurso",
            content: "Identifica: 1 persona segura, 1 lugar de calma, 1 cualidad propia que te sostiene. Práctica acceder a ellos cuando estés tranquilo para que estén disponibles cuando los necesites."
          }
        ]
      },
      {
        id: "t2-2",
        title: "Pendulación",
        content: "La pendulación es el movimiento natural entre estados de activación y calma. Es el ritmo fundamental de un sistema nervioso saludable.",
        subtopics: [
          {
            id: "t2-2-1",
            title: "El Concepto",
            content: "Así como un péndulo oscila entre dos puntos, tu sistema nervioso está diseñado para moverse entre activación y descanso. El problema no es activarse, sino quedarse \"atorado\" en un estado."
          },
          {
            id: "t2-2-2",
            title: "Pendulación Natural",
            content: "Un sistema nervioso regulado puede activarse ante un estresor y luego regresar a la calma. La activación tiene un pico y luego desciende. Este ciclo completo es salud."
          },
          {
            id: "t2-2-3",
            title: "Pendulación Interrumpida",
            content: "El trauma interrumpe la pendulación. El sistema se queda en activación crónica (ansiedad constante) o en desactivación crónica (depresión, desconexión). No completa el ciclo."
          },
          {
            id: "t2-2-4",
            title: "Restaurar la Pendulación",
            content: "El trabajo terapéutico busca restaurar la capacidad de pendular: tocar brevemente la activación, regresar a recurso, tocar de nuevo, regresar. Gradualmente, el sistema reaprende que puede activarse y volver a la calma."
          }
        ]
      },
      {
        id: "t2-3",
        title: "Neuroplasticidad",
        content: "La capacidad del cerebro para cambiar su estructura y función en respuesta a la experiencia, el aprendizaje y el entorno. Tu cerebro puede cambiar a cualquier edad.",
        subtopics: [
          {
            id: "t2-3-1",
            title: "El Descubrimiento",
            content: "Durante décadas se creyó que el cerebro adulto era fijo. La neurociencia moderna demostró lo contrario: el cerebro cambia constantemente en respuesta a lo que hacemos, pensamos y experimentamos."
          },
          {
            id: "t2-3-2",
            title: "El Principio Fundamental",
            content: "\"Las neuronas que disparan juntas, se conectan juntas\" (Regla de Hebb). Cada vez que activas un patrón, fortaleces esa conexión. Lo que practicas se vuelve más automático."
          },
          {
            id: "t2-3-3",
            title: "La Otra Cara",
            content: "\"Las neuronas que dejan de disparar juntas, se desconectan.\" Lo que no practicas se debilita. Esto significa que los patrones antiguos pueden desvanecerse si dejas de activarlos."
          },
          {
            id: "t2-3-4",
            title: "Implicación Práctica",
            content: "Tus patrones actuales no son tu destino. Son simplemente los circuitos más practicados. Puedes construir nuevos circuitos con práctica intencional y consistente."
          }
        ]
      },
      {
        id: "t2-4",
        title: "Los 3 Componentes del Cambio",
        content: "Para cambiar un patrón neurológicamente, necesitas tres elementos trabajando juntos. Omitir cualquiera reduce significativamente la efectividad.",
        subtopics: [
          {
            id: "t2-4-1",
            title: "Componente 1: Cesar el Patrón Antiguo",
            content: "Cada vez que activas el patrón antiguo, lo refuerzas. Cada vez que lo interrumpes conscientemente, lo debilitas. La clave es \"atrapar\" el patrón en el momento y elegir no completarlo."
          },
          {
            id: "t2-4-2",
            title: "Componente 2: Practicar el Patrón Nuevo",
            content: "No basta con dejar de hacer lo viejo. Necesitas practicar activamente lo nuevo. Define claramente qué harás diferente. Practica primero en situaciones de baja intensidad."
          },
          {
            id: "t2-4-3",
            title: "Componente 3: Repetir Consistentemente",
            content: "El cambio neuroplástico requiere repetición sostenida. Las conexiones nuevas son frágiles al principio. Se fortalecen con cada repetición. La consistencia importa más que la intensidad."
          },
          {
            id: "t2-4-4",
            title: "La Fórmula",
            content: "Cesar + Practicar + Repetir = Cambio Neuroplástico. Los tres componentes son necesarios. Dos de tres no es suficiente."
          }
        ]
      },
      {
        id: "t2-5",
        title: "Tiempo para el Cambio",
        content: "¿Cuánto tiempo toma realmente cambiar un patrón? La ciencia tiene respuestas más precisas de lo que pensamos.",
        subtopics: [
          {
            id: "t2-5-1",
            title: "El Mito de los 21 Días",
            content: "La creencia popular de que toma 21 días formar un hábito no tiene base científica sólida. Proviene de una observación anecdótica mal interpretada."
          },
          {
            id: "t2-5-2",
            title: "Lo que Dice la Investigación",
            content: "El estudio de Phillippa Lally (University College London) encontró que el tiempo promedio para automatizar un nuevo comportamiento es de 66 días, con un rango de 18 a 254 días según la complejidad."
          },
          {
            id: "t2-5-3",
            title: "Factores que Influyen",
            content: "Patrones simples cambian más rápido. Patrones con carga emocional o trauma toman más tiempo. La consistencia acelera el proceso. Las recaídas son normales y no reinician el contador."
          },
          {
            id: "t2-5-4",
            title: "Expectativa Realista",
            content: "Para patrones emocionales arraigados: mínimo 90 días de práctica consistente. Óptimo: 6 meses para consolidación sólida. Después: mantenimiento con práctica regular pero menos frecuente."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p2-1",
        title: "Mi Mapa de Recursos (Plantilla)",
        description: "Formato completo para identificar recursos",
        pdfUrl: "/protocols/workbooks-p6-p10.html#mi-mapa-recursos"
      },
      {
        id: "p2-2",
        title: "Plan de Cambio Neuroplástico",
        description: "Plantilla: patrón antiguo → patrón nuevo → práctica",
        pdfUrl: "/protocols/plan-cambio-neuroplastico.html"
      },
      {
        id: "p2-3",
        title: "Neuroplasticidad — La Ciencia del Cambio",
        description: "Evidencia científica con referencias",
        pdfUrl: "/protocols/neuroplasticidad-ciencia-cambio.html"
      }
    ],
    apps: []
  },

  // ========================================
  // DÍA 1 - MÓDULO 3: LAS 4 PALANCAS DEL ESTADO
  // ========================================
  {
    id: 3,
    title: "Las 4 Palancas del Estado",
    description: "Domina las cuatro palancas que controlan tu estado: Fisiología, Enfoque, Lenguaje e Imaginación.",
    day: 1,
    moduleNumber: 3,
    imageUrl: "/images/sessions/session-3.png",
    pdfUrl: "",
    videos: [
      {
        id: "v3-1",
        title: "Estados vs Rasgos",
        cloudflareStreamId: "558c0d3a0484083dcff827fa61fcec38",
        duration: "5-6 min",
        description: "Estados cambian en minutos, rasgos en meses — diferencia crítica"
      },
      {
        id: "v3-2",
        title: "Palanca 1: Fisiología",
        cloudflareStreamId: "ec409f149cc0045ad10ae321edde698d",
        duration: "8-10 min",
        description: "Respiración, postura, movimiento, temperatura con demos"
      },
      {
        id: "v3-3",
        title: "Palanca 2: Enfoque (El SRA)",
        cloudflareStreamId: "dd39ec616742bc6abecb4be733e1b140",
        duration: "6-8 min",
        description: "Sistema Reticular Activador, cómo programar tu filtro"
      },
      {
        id: "v3-4",
        title: "Palanca 3: Lenguaje",
        cloudflareStreamId: "e27493f845e2f8f09fa5afdcea4c5e4f",
        duration: "6-8 min",
        description: "Re-etiquetado, estudio de Jamieson, ejemplos prácticos"
      },
      {
        id: "v3-5",
        title: "Palanca 4: Imaginación",
        cloudflareStreamId: "7d349e93eeb97190cfe5fb06bc106847",
        duration: "6-8 min",
        description: "Ensayo mental, protocolo de visualización efectiva"
      },
      {
        id: "v3-6",
        title: "Combinando las 4 Palancas",
        cloudflareStreamId: "c957c1ef212ea3bd6d1a98788ba0a76f",
        duration: "5-6 min",
        description: "Ejemplos de combinaciones para situaciones específicas"
      }
    ],
    audios: [
      {
        id: "a3-1",
        title: "Las 4 Palancas en Acción (12 min) — Parte 1",
        url: "/Audios/A15%20—%20LAS%204%20PALANCAS%20EN%20ACCIÓN%20(12%20min)%20—%20Parte%201.wav",
        duration: "12 min",
        description: "Recorrido por las 4 palancas en secuencia",
        category: "meditacion"
      },
      {
        id: "a3-1b",
        title: "Las 4 Palancas en Acción (12 min) — Parte 2",
        url: "/Audios/A15%20—%20LAS%204%20PALANCAS%20EN%20ACCIÓN%20(12%20min)%20—%20Parte%202%20.wav",
        duration: "12 min",
        description: "Recorrido por las 4 palancas en secuencia",
        category: "meditacion"
      }
    ],
    themes: [
      {
        id: "t3-1",
        title: "Estados vs Rasgos",
        content: "Distinción fundamental: los estados son temporales y modificables; los rasgos parecen fijos pero son estados que se han vuelto habituales.",
        subtopics: [
          {
            id: "t3-1-1",
            title: "¿Qué es un Estado?",
            content: "Un estado es una configuración temporal de tu sistema nervioso, mente y cuerpo. Incluye tu nivel de energía, emociones, pensamientos y sensaciones físicas en un momento dado. Los estados cambian constantemente."
          },
          {
            id: "t3-1-2",
            title: "¿Qué es un Rasgo?",
            content: "Un rasgo es un patrón de estados que se ha repetido tanto que parece parte de tu personalidad. \"Soy ansioso\" es en realidad \"paso mucho tiempo en estados de ansiedad\"."
          },
          {
            id: "t3-1-3",
            title: "La Buena Noticia",
            content: "Si los rasgos son estados habituados, entonces son modificables. No estás condenado a \"ser\" de cierta manera. Puedes cambiar los estados que practicas y, con el tiempo, cambiar lo que parece ser tu personalidad."
          },
          {
            id: "t3-1-4",
            title: "Implicación Práctica",
            content: "En lugar de intentar cambiar \"quién eres\", enfócate en cambiar los estados que habitas momento a momento. Con suficiente repetición, los nuevos estados se convertirán en nuevos rasgos."
          }
        ]
      },
      {
        id: "t3-2",
        title: "Palanca 1: Fisiología",
        content: "Tu cuerpo afecta tu mente. Cambiar tu fisiología es la forma más rápida y directa de cambiar tu estado interno.",
        subtopics: [
          {
            id: "t3-2-1",
            title: "El Principio",
            content: "El estado de tu cuerpo envía señales constantes a tu cerebro. Respiración agitada = señal de peligro. Respiración lenta = señal de seguridad. Tu cerebro responde a estas señales ajustando tu estado emocional."
          },
          {
            id: "t3-2-2",
            title: "Herramientas Fisiológicas",
            content: "Respiración: 4-7-8 para calmar, respiración rápida para energizar. Postura: erguida para confianza, relajada para calma. Movimiento: sacudir para liberar tensión, caminar para procesar. Temperatura: frío para activar, calor para calmar."
          },
          {
            id: "t3-2-3",
            title: "Por Qué Funciona",
            content: "La conexión cuerpo-mente es bidireccional. No solo las emociones afectan al cuerpo; el cuerpo afecta las emociones. Puedes \"hackear\" tu estado emocional a través de tu fisiología."
          },
          {
            id: "t3-2-4",
            title: "Aplicación",
            content: "Antes de una situación estresante: postura erguida + respiración lenta. Cuando sientes ansiedad subiendo: 3 ciclos de 4-7-8. Cuando te sientes \"atorado\": movimiento físico, aunque sea una caminata corta."
          }
        ]
      },
      {
        id: "t3-3",
        title: "Palanca 2: Enfoque (SRA)",
        content: "Aquello en lo que te enfocas se expande. Tu Sistema de Activación Reticular determina qué notas y qué ignoras de la realidad.",
        subtopics: [
          {
            id: "t3-3-1",
            title: "¿Qué es el SRA?",
            content: "El Sistema de Activación Reticular es una estructura en el tronco cerebral que actúa como filtro. De los millones de bits de información disponibles, selecciona qué llega a tu consciencia basándose en tus \"instrucciones\"."
          },
          {
            id: "t3-3-2",
            title: "Cómo Funciona",
            content: "Si compras un auto rojo, de pronto ves autos rojos por todas partes. No es que haya más; es que tu SRA los está filtrando hacia tu consciencia. Lo mismo ocurre con problemas, oportunidades, o lo que sea que busques."
          },
          {
            id: "t3-3-3",
            title: "La Pregunta del Enfoque",
            content: "\"¿Qué quiero NOTAR hoy?\" es una instrucción directa a tu SRA. Si le dices que busque evidencia de que eres capaz, la encontrará. Si le dices que busque amenazas, también las encontrará."
          },
          {
            id: "t3-3-4",
            title: "Aplicación",
            content: "Cada mañana, establece una intención de enfoque. \"Hoy noto momentos de conexión.\" \"Hoy noto mis pequeños logros.\" \"Hoy noto señales de que estoy progresando.\" Tu realidad experimentada cambiará."
          }
        ]
      },
      {
        id: "t3-4",
        title: "Palanca 3: Lenguaje",
        content: "Las palabras que usas moldean tu experiencia interna. El lenguaje no solo describe la realidad; la crea.",
        subtopics: [
          {
            id: "t3-4-1",
            title: "El Principio",
            content: "Tu diálogo interno es una narración constante que interpreta tu experiencia. Las palabras que eliges activan diferentes redes neuronales y producen diferentes estados emocionales."
          },
          {
            id: "t3-4-2",
            title: "Lenguaje que Desempodera",
            content: "\"Tengo que...\" (obligación, presión). \"No puedo...\" (impotencia). \"Siempre me pasa...\" (fatalismo). \"Soy un/una...\" (identidad fija). \"Es terrible...\" (catastrofización)."
          },
          {
            id: "t3-4-3",
            title: "Lenguaje que Empodera",
            content: "\"Elijo...\" (agencia). \"Estoy aprendiendo a...\" (proceso). \"En este momento...\" (temporalidad). \"Estoy experimentando...\" (distancia saludable). \"Es un desafío que puedo manejar...\" (capacidad)."
          },
          {
            id: "t3-4-4",
            title: "Aplicación",
            content: "Detecta tu lenguaje habitual. Cuando te escuches usando lenguaje desempoderador, reformula conscientemente. \"Tengo que ir\" → \"Elijo ir porque valoro...\". Con práctica, el nuevo lenguaje se vuelve automático."
          }
        ]
      },
      {
        id: "t3-5",
        title: "Palanca 4: Imaginación",
        content: "Tu cerebro no diferencia completamente entre experiencia real y experiencia vividamente imaginada. La visualización activa las mismas redes neuronales que la experiencia.",
        subtopics: [
          {
            id: "t3-5-1",
            title: "La Ciencia",
            content: "Estudios con atletas muestran que la práctica mental activa las mismas áreas cerebrales que la práctica física. Imaginar un movimiento fortalece los circuitos neuronales de ese movimiento."
          },
          {
            id: "t3-5-2",
            title: "Implicación",
            content: "Si imaginas repetidamente escenarios negativos (preocupación), estás \"practicando\" esos circuitos. Si imaginas escenarios positivos (visualización), estás fortaleciendo circuitos de éxito y bienestar."
          },
          {
            id: "t3-5-3",
            title: "Visualización Efectiva",
            content: "Debe ser vívida y multisensorial: qué ves, oyes, sientes en el cuerpo. Debe incluir emoción: cómo te sientes en ese escenario. Debe ser en primera persona: vivirlo, no observarlo desde afuera."
          },
          {
            id: "t3-5-4",
            title: "Aplicación",
            content: "Visualiza tu día saliendo bien cada mañana. Antes de situaciones desafiantes, visualízate manejándolas con calma y competencia. Imagina tu \"yo del futuro\" que ya tiene los patrones que quieres desarrollar."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p3-1",
        title: "Las 4 Palancas — Referencia Rápida",
        description: "Resumen visual de las 4 palancas",
        pdfUrl: "/protocols/las-4-palancas.html"
      },
      {
        id: "p3-2",
        title: "Re-etiquetado de Lenguaje",
        description: "Tabla de conversiones (limitante → empoderador)",
        pdfUrl: "/protocols/re-etiquetado-lenguaje.html"
      },
      {
        id: "p3-3",
        title: "Los Rituales de Consolidación",
        description: "Guía completa de los 3 rituales",
        pdfUrl: "/protocols/rituales-consolidacion.html"
      }
    ],
    apps: []
  },

  // ========================================
  // DÍA 1 - MÓDULO 4: SUFRIMIENTO Y NUEVA HISTORIA
  // ========================================
  {
    id: 4,
    title: "Sufrimiento y Nueva Historia",
    description: "Transforma tu narrativa personal: del juicio a la compasión, de víctima a héroe de tu propia historia.",
    day: 1,
    moduleNumber: 4,
    imageUrl: "https://pub-4e8440b7b5814f1497b4c7191ca36e31.r2.dev/Bloque%201/Sufrimiento%20y%20nueva%20historia%20main.png",
    pdfUrl: "",
    videos: [
      {
        id: "v4-1",
        title: "Tus Patrones Tuvieron Sentido",
        cloudflareStreamId: "4467f5d9d8825d962c1366f56b56a19b",
        duration: "8-10 min",
        description: "Validación compasiva, función original de patrones defensivos"
      },
      {
        id: "v4-2",
        title: "Del Juicio a la Compasión",
        cloudflareStreamId: "8b7d9f747c2f6b5cd78e8ce1a5f97227",
        duration: "5-7 min",
        description: "Por qué juzgarte no funciona, neurobiología de la autocompasión"
      },
      {
        id: "v4-3",
        title: "Reescribiendo Tu Historia",
        cloudflareStreamId: "82f0207e965a695eae5203fe8d35bf81",
        duration: "8-10 min",
        description: "De víctima a héroe, ejercicio guiado"
      },
      {
        id: "v4-4",
        title: "El Compromiso de 90 Días",
        cloudflareStreamId: "72656f961b831b021b161b6cd4fea1ef",
        duration: "5-6 min",
        description: "Cómo estructurar tu práctica post-seminario"
      }
    ],
    audios: [
      {
        id: "a4-1",
        title: "Mi Nueva Historia (15 min) — Parte 1",
        url: "/Audios/A14%20—%20MI%20NUEVA%20HISTORIA%20(15%20min)%20—%20Parte%201%20.wav",
        duration: "15 min",
        description: "Visualización del héroe del viaje",
        category: "meditacion"
      },
      {
        id: "a4-1b",
        title: "Mi Nueva Historia (15 min) — Parte 2",
        url: "/Audios/A14%20—%20MI%20NUEVA%20HISTORIA%20(15%20min)%20—%20Parte%202.wav",
        duration: "15 min",
        description: "Visualización del héroe del viaje",
        category: "meditacion"
      }
    ],
    themes: [
      {
        id: "t4-1",
        title: "Tus Patrones Tuvieron Sentido",
        content: "Cada patrón que desarrollaste, incluso los que hoy te limitan, tuvo una función protectora o adaptativa en algún momento de tu historia.",
        subtopics: [
          {
            id: "t4-1-1",
            title: "El Principio",
            content: "Tu sistema nervioso es increíblemente inteligente. Nunca desarrolla patrones al azar. Cada respuesta automática, cada defensa, cada \"problema\" fue una solución a algo en algún momento."
          },
          {
            id: "t4-1-2",
            title: "Ejemplos",
            content: "La hipervigilancia que hoy te agota fue la forma en que un niño sobrevivió en un ambiente impredecible. La desconexión emocional que hoy te aísla fue la forma de sobrevivir dolor que era demasiado grande. El perfeccionismo que hoy te paraliza fue la forma de obtener aprobación que necesitabas."
          },
          {
            id: "t4-1-3",
            title: "Por Qué Importa",
            content: "Cuando entiendes que tus patrones tuvieron sentido, puedes dejar de juzgarte por ellos. El juicio mantiene los patrones en su lugar. La comprensión compasiva permite que evolucionen."
          },
          {
            id: "t4-1-4",
            title: "El Siguiente Paso",
            content: "Una vez que honras la función original del patrón, puedes preguntarte: \"¿Sigue siendo necesario hoy? ¿Hay una forma más actualizada de cuidarme?\" Desde ahí, el cambio es posible."
          }
        ]
      },
      {
        id: "t4-2",
        title: "Del Juicio a la Compasión",
        content: "El juicio hacia ti mismo mantiene los patrones en su lugar. La compasión crea el espacio seguro necesario para que el cambio ocurra.",
        subtopics: [
          {
            id: "t4-2-1",
            title: "El Ciclo del Juicio",
            content: "Noto un patrón que no me gusta → Me juzgo por tenerlo → El juicio activa estrés → El estrés estrecha mi ventana de tolerancia → Tengo menos recursos para cambiar → El patrón se mantiene → Me juzgo más. Es un ciclo que se perpetúa."
          },
          {
            id: "t4-2-2",
            title: "El Ciclo de la Compasión",
            content: "Noto un patrón que no me gusta → Reconozco que tuvo sentido → Me trato con amabilidad → La amabilidad activa seguridad → Mi ventana se expande → Tengo más recursos para elegir diferente → El cambio es posible."
          },
          {
            id: "t4-2-3",
            title: "Auto-Compasión no es Autoindulgencia",
            content: "Ser compasivo contigo mismo no significa justificar todo ni evitar la responsabilidad. Significa tratarte como tratarías a alguien que amas: con firmeza amable, no con crueldad."
          },
          {
            id: "t4-2-4",
            title: "Práctica",
            content: "Cuando notes autocrítica, pregunta: \"¿Cómo le hablaría a un amigo querido en esta situación?\" Luego háblate a ti mismo de esa manera. La neuroplasticidad funciona en ambas direcciones: también puedes fortalecer circuitos de autocompasión."
          }
        ]
      },
      {
        id: "t4-3",
        title: "Reescribiendo Tu Historia",
        content: "Tu pasado no cambia, pero la historia que cuentas sobre él sí puede cambiar. Y la historia que cuentas moldea tu presente y tu futuro.",
        subtopics: [
          {
            id: "t4-3-1",
            title: "Narrativa e Identidad",
            content: "Todos tenemos una \"historia de vida\" que nos contamos. Esta narrativa define quiénes creemos ser, qué creemos merecer, y qué creemos posible. Pero la historia no es el pasado; es una interpretación del pasado."
          },
          {
            id: "t4-3-2",
            title: "Historias Limitantes",
            content: "\"Vengo de una familia disfuncional, por eso soy así.\" \"Me traumatizaron, nunca podré superarlo.\" \"Siempre he sido ansioso, es parte de quien soy.\" Estas historias pueden ser \"verdaderas\" y aun así ser prisiones."
          },
          {
            id: "t4-3-3",
            title: "Reescritura",
            content: "No se trata de negar lo que pasó, sino de encontrar una narrativa que incluya los hechos pero también incluya tu capacidad de crecer, aprender y transformarte. \"Viví cosas difíciles Y estoy desarrollando nuevas capacidades.\""
          },
          {
            id: "t4-3-4",
            title: "Tu Nueva Historia",
            content: "¿Qué historia quieres contar sobre tu vida? ¿Una donde eres víctima permanente de tus circunstancias, o una donde eres el protagonista de una transformación? Tú eliges qué historia practicar."
          }
        ]
      },
      {
        id: "t4-4",
        title: "El Compromiso de 90 Días",
        content: "90 días es el período óptimo para consolidar cambios neuroplásticos significativos. Es el marco temporal del seminario para crear transformación real y medible.",
        subtopics: [
          {
            id: "t4-4-1",
            title: "¿Por Qué 90 Días?",
            content: "La investigación sugiere 66 días promedio para automatizar un patrón. 90 días da margen para consolidación adicional y variabilidad individual. Es suficiente para crear cambios estructurales medibles en el cerebro."
          },
          {
            id: "t4-4-2",
            title: "La Estructura",
            content: "Semanas 1-3: Establecer los rituales básicos (matutino, pausas, nocturno). Semanas 4-9: Profundizar la práctica, aplicar en situaciones reales. Semanas 10-13: Consolidar, ajustar, preparar para mantenimiento autónomo."
          },
          {
            id: "t4-4-3",
            title: "El Compromiso",
            content: "No es un compromiso de perfección, sino de consistencia. Habrá días difíciles. Habrá \"fallas\". El compromiso es retomar siempre, sin juicio. 5 minutos todos los días supera 1 hora una vez a la semana."
          },
          {
            id: "t4-4-4",
            title: "Lo que es Posible",
            content: "En 90 días de práctica consistente puedes: expandir significativamente tu ventana de tolerancia, instalar nuevos patrones de respuesta, cambiar tu relación con pensamientos y emociones difíciles, crear una base sólida para bienestar sostenido."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p4-1",
        title: "Mi Nueva Historia (Guía de Escritura)",
        description: "Estructura para reescribir narrativa personal",
        pdfUrl: "/protocols/mi-nueva-historia.html"
      },
      {
        id: "p4-2",
        title: "Tracker de 90 Días",
        description: "Calendario de seguimiento con checkboxes",
        pdfUrl: "/protocols/tracker-90-dias.html"
      },
      {
        id: "p4-3",
        title: "Diario de Regulación Semanal",
        description: "Formato para registrar práctica y observaciones",
        pdfUrl: "/protocols/diario-regulacion-semanal.html"
      }
    ],
    apps: []
  },

  // ========================================
  // DÍA 2+ - SESIONES ADICIONALES (estructura base)
  // ========================================
  {
    id: 5,
    title: "TRSB - Técnica de Reprocesamiento Somato-Cognitivo Bilateral",
    description: "Técnica avanzada para el procesamiento de traumas y bloqueos emocionales.",
    day: 2,
    imageUrl: "/images/sessions/session-5.png",
    pdfUrl: "",
    videos: [
      {
        id: "v5-1",
        title: "Reprocesar Memorias",
        cloudflareStreamId: "6127012ce947bc8a1d2486f425cc3e7d",
        description: "Cómo reprocesar memorias con la técnica TRSB"
      },
      {
        id: "v5-2",
        title: "El Mensaje Somático",
        cloudflareStreamId: "3cc17c711633d2e2debd3d0bc658b065",
        description: "Entendiendo los mensajes del cuerpo durante el reprocesamiento"
      },
      {
        id: "v5-3",
        title: "Midiendo el Cambio Emocional",
        cloudflareStreamId: "d7c99a8485e46dc61f0212147c4a956f",
        description: "Cómo medir y evaluar los cambios emocionales durante el proceso TRSB"
      },
      {
        id: "v5-4",
        title: "El Lenguaje Somático del Cuerpo",
        cloudflareStreamId: "d702292c14fff67fb02f0395f1dbab4d",
        description: "Cómo interpretar las señales somáticas durante el procesamiento"
      },
      {
        id: "v5-5",
        title: "El Procesamiento Adaptativo",
        cloudflareStreamId: "4f5b9f0f7477e435e4130546c67e1287",
        description: "Técnicas de procesamiento adaptativo para diferentes situaciones"
      },
      {
        id: "v5-6",
        title: "El Abrazo de Mariposa",
        cloudflareStreamId: "6e148b1712d829a27ceddaa1cdb5ead6",
        description: "Técnica de estimulación bilateral con el abrazo de mariposa"
      },
      {
        id: "v5-7",
        title: "Las 8 Fases de TRSB",
        cloudflareStreamId: "3efe181881684eeeabc780a36d11a564",
        description: "Explicación detallada de las 8 fases del proceso TRSB"
      },
      {
        id: "v5-8",
        title: "La Tríada Cognitiva",
        cloudflareStreamId: "440bd86dbdc4fd895510997a3b56e0a3",
        description: "Trabajo con la tríada cognitiva en el proceso TRSB"
      }
    ],
    audios: [
      {
        id: "a5-1",
        title: "Preparación para Procesamiento",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A1%20%E2%80%94%20PREPARACIO%CC%81N%20PARA%20PROCESAMIENTO.wav",
        description: "Audio guiado para preparar el sistema nervioso antes del procesamiento TRSB",
        category: "regulacion"
      },
      {
        id: "a5-2",
        title: "Ciclo TRSB Guiado — Intensidad Baja (Parte 1)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A2%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20BAJA%20Parte%201%20%20.wav",
        description: "Primera parte del ciclo TRSB con intensidad baja para principiantes",
        category: "regulacion"
      },
      {
        id: "a5-3",
        title: "Ciclo TRSB Guiado — Intensidad Baja (Parte 2)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A3%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20BAJA%20Parte%202%20.wav",
        description: "Segunda parte del ciclo TRSB con intensidad baja",
        category: "regulacion"
      },
      {
        id: "a5-4",
        title: "Ciclo TRSB Guiado — Intensidad Media (Parte 1)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A3%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20MEDIA%20%20Parte%201.wav",
        description: "Primera parte del ciclo TRSB con intensidad media",
        category: "regulacion"
      },
      {
        id: "a5-5",
        title: "Ciclo TRSB Guiado — Intensidad Media (Parte 2)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A3%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20MEDIA%20Parte%202.wav",
        description: "Segunda parte del ciclo TRSB con intensidad media",
        category: "regulacion"
      },
      {
        id: "a5-6",
        title: "Ciclo TRSB Guiado — Intensidad Media (Parte 3)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A3%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20MEDIA%20Parte%203.wav",
        description: "Tercera parte del ciclo TRSB con intensidad media",
        category: "regulacion"
      },
      {
        id: "a5-7",
        title: "Ciclo TRSB Guiado — Intensidad Media (Parte 4)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A3%20%E2%80%94%20CICLO%20TRSB%20GUIADO%20%E2%80%94%20INTENSIDAD%20MEDIA%20Parte%204.wav",
        description: "Cuarta parte del ciclo TRSB con intensidad media",
        category: "regulacion"
      },
      {
        id: "a5-8",
        title: "Regulación Post-Procesamiento",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A6%20%E2%80%94%20REGULACIO%CC%81N%20POST-PROCESAMIENTO.wav",
        description: "Audio para regular el sistema nervioso después del procesamiento TRSB",
        category: "regulacion"
      },
      {
        id: "a5-9",
        title: "Integración Cuerpo-Mente Post-TRSB",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A13%20%E2%80%94%20INTEGRACIO%CC%81N%20CUERPO-MENTE%20POST-TRSB.wav",
        description: "Práctica de integración somática después del trabajo de procesamiento",
        category: "meditacion"
      },
      {
        id: "a5-10",
        title: "Cierre de Sesión de Procesamiento",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A15%20%E2%80%94%20CIERRE%20DE%20SESIO%CC%81N%20DE%20PROCESAMIENTO%20.wav",
        description: "Audio guiado para cerrar de manera segura una sesión de procesamiento",
        category: "regulacion"
      },
      {
        id: "a5-11",
        title: "Ritual Nocturno Post-Procesamiento (Parte 1)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A16%20%E2%80%94%20RITUAL%20NOCTURNO%20POST-PROCESAMIENTO%20Parte%201%20.wav",
        description: "Primera parte del ritual nocturno para después de una sesión de procesamiento",
        category: "ritual_nocturno"
      },
      {
        id: "a5-12",
        title: "Ritual Nocturno Post-Procesamiento (Parte 2)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/TRSB/A16%20%E2%80%94%20RITUAL%20NOCTURNO%20POST-PROCESAMIENTO%20Parte%202%20.wav",
        description: "Segunda parte del ritual nocturno post-procesamiento",
        category: "ritual_nocturno"
      }
    ],
    themes: [
      {
        id: "t5-1",
        title: "Fundamentos de TRSB",
        content: "TRSB (Técnica de Reprocesamiento Somato-Cognitivo Bilateral) es una técnica avanzada para procesar traumas y bloqueos emocionales a través de la integración de cuerpo, mente y estimulación bilateral.",
        subtopics: [
          {
            id: "t5-1-1",
            title: "¿Qué es el Reprocesamiento?",
            content: "El reprocesamiento es la capacidad del cerebro de tomar memorias disfuncionales almacenadas y procesarlas hacia una resolución adaptativa. Las memorias traumáticas se almacenan de forma fragmentada y desorganizada; el reprocesamiento las integra de forma coherente."
          },
          {
            id: "t5-1-2",
            title: "El Mensaje Somático",
            content: "El cuerpo guarda la puntuación del trauma. Las sensaciones físicas son la puerta de entrada al procesamiento. Aprender a \"leer\" el cuerpo permite acceder a información que la mente consciente ha bloqueado."
          },
          {
            id: "t5-1-3",
            title: "Estimulación Bilateral",
            content: "La estimulación alternada de ambos hemisferios cerebrales facilita la integración de memorias. Puede ser visual (movimientos oculares), auditiva (sonidos alternados) o táctil (tapping o abrazo de mariposa)."
          },
          {
            id: "t5-1-4",
            title: "Escalas NEA y NCI",
            content: "NEA (Nivel de Estrés Actual): Mide la activación actual del sistema nervioso de 0-10. NCI (Nivel de Creencia Inicial): Mide cuánto cree la persona en la cognición negativa de 0-10. Ambas se usan para monitorear el progreso durante la sesión."
          }
        ]
      },
      {
        id: "t5-2",
        title: "Las 8 Fases de TRSB",
        content: "El proceso TRSB sigue una estructura de 8 fases que garantizan un procesamiento seguro y efectivo. Cada fase tiene un objetivo específico y criterios de completitud.",
        subtopics: [
          {
            id: "t5-2-1",
            title: "Fase 1: Preparación",
            content: "Objetivo: Establecer seguridad y recursos. Se explica el proceso, se identifican recursos de regulación, y se practica la técnica de parada segura. Duración recomendada: 5-10 minutos."
          },
          {
            id: "t5-2-2",
            title: "Fase 2: Identificación del Blanco",
            content: "Objetivo: Seleccionar la memoria o situación a procesar. Se identifica la imagen más perturbadora, la cognición negativa asociada, las emociones presentes y las sensaciones corporales. Se toma el NEA inicial."
          },
          {
            id: "t5-2-3",
            title: "Fase 3: Activación",
            content: "Objetivo: Activar la red de memoria. El cliente trae a la mente la imagen, la cognición negativa, la emoción y nota dónde lo siente en el cuerpo. Se mantiene una activación moderada (NEA 5-7)."
          },
          {
            id: "t5-2-4",
            title: "Fase 4: Procesamiento",
            content: "Objetivo: Procesar el material activado. Se aplica estimulación bilateral mientras el cliente observa lo que emerge sin juzgar. Sets de 30-60 segundos con pausas para reportar. Esta es la fase más larga del proceso."
          },
          {
            id: "t5-2-5",
            title: "Fase 5: Instalación de Recurso",
            content: "Objetivo: Fortalecer la cognición positiva. Se identifica una creencia positiva deseada y se instala con estimulación bilateral. Se busca que el NCI de la cognición positiva llegue a 6-7 o más."
          },
          {
            id: "t5-2-6",
            title: "Fase 6: Escaneo Corporal",
            content: "Objetivo: Verificar integración somática. Se escanea el cuerpo en busca de tensiones residuales. Si aparece malestar, se procesa con sets adicionales hasta lograr neutralidad corporal."
          },
          {
            id: "t5-2-7",
            title: "Fase 7: Cierre",
            content: "Objetivo: Estabilizar y cerrar la sesión. Se guía al cliente de vuelta al presente, se utilizan técnicas de grounding, y se revisa el estado actual. Si el procesamiento está incompleto, se contiene de forma segura."
          },
          {
            id: "t5-2-8",
            title: "Fase 8: Reevaluación",
            content: "Objetivo: Evaluar el trabajo realizado. Se revisa el blanco original al inicio de la siguiente sesión. Se verifica si se mantienen los cambios y si es necesario procesamiento adicional."
          }
        ]
      },
      {
        id: "t5-3",
        title: "El Abrazo de Mariposa",
        content: "Técnica de auto-estimulación bilateral desarrollada por Lucina Artigas. Permite al cliente aplicar estimulación bilateral de forma autónoma.",
        subtopics: [
          {
            id: "t5-3-1",
            title: "La Técnica",
            content: "Cruzar los brazos sobre el pecho, con las manos sobre los hombros opuestos. Alternar el tapping derecha-izquierda a un ritmo constante y cómodo. Mantener los ojos cerrados o con mirada suave hacia abajo."
          },
          {
            id: "t5-3-2",
            title: "Cuándo Usarlo",
            content: "Durante el procesamiento como forma de estimulación bilateral. Como técnica de auto-regulación entre sesiones. En momentos de activación emocional intensa para volver a la ventana de tolerancia."
          },
          {
            id: "t5-3-3",
            title: "Precauciones",
            content: "No usar cuando la activación es demasiado alta (NEA > 8). No usar como forma de evitar sentir emociones. Si aparece material muy intenso, detenerse y usar técnicas de grounding primero."
          }
        ]
      },
      {
        id: "t5-4",
        title: "La Tríada Cognitiva",
        content: "En TRSB trabajamos con tres elementos cognitivos interconectados que sostienen el trauma y que se transforman durante el procesamiento.",
        subtopics: [
          {
            id: "t5-4-1",
            title: "Cognición Negativa",
            content: "La creencia disfuncional sobre uno mismo que se formó durante el trauma. Ejemplos: \"Soy impotente\", \"No soy suficiente\", \"Estoy en peligro\", \"Soy culpable\". Siempre comienza con \"Yo soy...\" o \"Yo estoy...\""
          },
          {
            id: "t5-4-2",
            title: "Cognición Positiva",
            content: "La creencia adaptativa deseada que reemplazará a la negativa. Debe ser realista y alcanzable. Ejemplos: \"Tengo opciones\", \"Soy suficiente tal como soy\", \"Estoy seguro ahora\", \"Hice lo mejor que pude\"."
          },
          {
            id: "t5-4-3",
            title: "El Puente Afectivo",
            content: "La conexión emocional y somática entre la cognición negativa y las experiencias que la crearon. Permite acceder a memorias relacionadas que comparten la misma creencia disfuncional."
          }
        ]
      },
      {
        id: "t5-5",
        title: "Monitoreo y Seguridad",
        content: "El monitoreo constante durante TRSB es esencial para mantener la seguridad del proceso y guiar las intervenciones.",
        subtopics: [
          {
            id: "t5-5-1",
            title: "Señales de Progreso",
            content: "NEA disminuye gradualmente. Aparecen asociaciones nuevas y conexiones inesperadas. El cliente reporta cambios en la imagen o la emoción. Surge material adaptativo espontáneamente."
          },
          {
            id: "t5-5-2",
            title: "Señales de Alerta",
            content: "NEA se mantiene muy alto (>8) por varios sets. El cliente se disocia o se desconecta. Aparece material abrumador sin procesamiento. El cliente no puede seguir las instrucciones."
          },
          {
            id: "t5-5-3",
            title: "Intervenciones de Seguridad",
            content: "Técnica de parada segura: detenerse y regresar al recurso. Grounding: 5-4-3-2-1 o contacto con el presente. Contención: imaginar guardar el material en un contenedor seguro. Regulación: respiración, orientación al ambiente."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p5-1",
        title: "Manual Profesional TRSB Completo",
        description: "Manual completo con la guía paso a paso para aplicar la técnica TRSB.",
        pdfUrl: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Dia%202/TRSB/Manual_Profesional_TRSB_Completo.docx.pdf"
      },
      {
        id: "p5-2",
        title: "Dashboard de Sesión TRSB",
        description: "Panel interactivo con las 8 fases de TRSB para guiar sesiones de procesamiento.",
        pdfUrl: "/protocols/trsb-session-dashboard.html"
      }
    ],
    apps: [
      {
        id: "app5-1",
        name: "Abrazo de Mariposa",
        description: "Práctica guiada de estimulación bilateral con vibración, timer y registro de NEA.",
        url: "/protocols/abrazo-mariposa-app.html",
        iconName: "Heart"
      }
    ]
  },
  {
    id: 6,
    title: "PONS - Procesamiento Ocular Neural Somático",
    description: "Método de procesamiento a través de movimientos oculares y conexión somática.",
    day: 3,
    imageUrl: "/images/sessions/session-6.png",
    pdfUrl: "",
    videos: [
      {
        id: "v6-1",
        title: "Barrido Ocular – Guía Práctica",
        cloudflareStreamId: "f34dcfb2e6305e6953a8b2c0d8e243f3",
        description: "Guía práctica para realizar el barrido ocular en PONS"
      },
      {
        id: "v6-2",
        title: "PONS – Dónde Miras Cuando Sientes",
        cloudflareStreamId: "00b46ad65b474ddcad5473a4652925d0",
        description: "Conexión entre la mirada y las sensaciones en el procesamiento PONS"
      },
      {
        id: "v6-3",
        title: "PONS – Memoria Somática",
        cloudflareStreamId: "7d83136c989fad0d1185ecb3481e40a7",
        description: "Trabajo con la memoria somática en el método PONS"
      },
      {
        id: "v6-4",
        title: "Las 4 Fases de PONS",
        cloudflareStreamId: "7b9ab96278a87f4d807694dc1490a222",
        description: "Explicación de las 4 fases del procesamiento PONS"
      }
    ],
    audios: [
      {
        id: "a6-1",
        title: "PONS Autoguiado — Práctica Básica (Parte 1)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/PONS/A4%20%E2%80%94%20PONS%20AUTOGUIADO%20%E2%80%94%20PRA%CC%81CTICA%20BA%CC%81SICA%20%20Parte%201.wav",
        description: "Primera parte de la práctica básica autoguiada de PONS",
        category: "regulacion"
      },
      {
        id: "a6-2",
        title: "PONS Autoguiado — Práctica Básica (Parte 2)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/PONS/A4%20%E2%80%94%20PONS%20AUTOGUIADO%20%E2%80%94%20PRA%CC%81CTICA%20BA%CC%81SICA%20Parte%202.wav",
        description: "Segunda parte de la práctica básica autoguiada de PONS",
        category: "regulacion"
      },
      {
        id: "a6-3",
        title: "PONS Autoguiado — Práctica Extendida (Parte 1)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/PONS/A5%20%E2%80%94%20PONS%20AUTOGUIADO%20%E2%80%94%20PRA%CC%81CTICA%20EXTENDIDA%20Parte%201.wav",
        description: "Primera parte de la práctica extendida autoguiada de PONS",
        category: "regulacion"
      },
      {
        id: "a6-4",
        title: "PONS Autoguiado — Práctica Extendida (Parte 2)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/PONS/A5%20%E2%80%94%20PONS%20AUTOGUIADO%20%E2%80%94%20PRA%CC%81CTICA%20EXTENDIDA%20Parte%202.wav",
        description: "Segunda parte de la práctica extendida autoguiada de PONS",
        category: "regulacion"
      },
      {
        id: "a6-5",
        title: "PONS Autoguiado — Práctica Extendida (Parte 3)",
        url: "https://pub-5117fbee94844f5a8a08f061ad7ff61c.r2.dev/Audios/PONS/A5%20%E2%80%94%20PONS%20AUTOGUIADO%20%E2%80%94%20PRA%CC%81CTICA%20EXTENDIDA%20Parte%203.wav",
        description: "Tercera parte de la práctica extendida autoguiada de PONS",
        category: "regulacion"
      }
    ],
    themes: [],
    protocols: [
      {
        id: "p6-1",
        title: "Protocolo PONS",
        description: "Instrucciones para la aplicación del procesamiento ocular.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 7,
    title: "Context Engineering (Las 7 Fases)",
    description: "Ingeniería del contexto para optimizar el entorno y la respuesta energética.",
    day: 4,
    imageUrl: "/images/sessions/session-7.png",
    pdfUrl: "",
    additionalResources: [
      {
        id: "ar7-1",
        title: "Escucha Somática Profunda",
        url: "https://pub-f760be6c1ddb422a99ca68e9b005fd5e.r2.dev/Dia%202/ESCUCHA%20SOMATICA%20PROFUNDA/Escucha%20somatica%20profunda%20pptx.pdf",
        description: "Guía de escucha somática profunda para la conexión mente-cuerpo",
        type: "slide"
      }
    ],
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p7-1",
        title: "Las 7 Fases del Context Engineering",
        description: "Guía completa de las 7 fases para transformar tu contexto.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 8,
    title: "Miracle Question (La Pregunta del Milagro)",
    description: "Técnica de proyección para identificar objetivos y soluciones ideales.",
    day: 5,
    imageUrl: "",
    pdfUrl: "",
    pdfs: [
      {
        id: "slide8-1",
        title: "Manual Profesional — Slides",
        url: "/protocols/pregunta-milagro-slides.html",
        description: "25 slides interactivas con el manual completo: metodología, fases, neurobiología y guía práctica.",
        pages: 25,
        category: "contenido_profundo",
        type: "slide"
      }
    ],
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p8-1",
        title: "La Pregunta del Milagro — Protocolo",
        description: "Guía completa paso a paso basada en la metodología de Steve de Shazer.",
        pdfUrl: "/protocols/pregunta-milagro.html"
      }
    ],
    apps: [
      {
        id: "app8-1",
        name: "Pregunta del Milagro",
        description: "Práctica guiada con audio para visualizar tu futuro ideal.",
        url: "/protocols/pregunta-milagro-app.html",
        iconName: "Sparkles"
      },
      {
        id: "app8-2",
        name: "Formulario del Milagro",
        description: "Registro de sesiones con seguimiento para terapeutas.",
        url: "/protocols/pregunta-milagro-formulario-app.html",
        iconName: "MessageSquare"
      }
    ]
  },
  {
    id: 9,
    title: "Los 4 Protocolos (Alpha, Beta, Gamma, Delta)",
    description: "Protocolos específicos para diferentes estados y necesidades energéticas.",
    day: 6,
    imageUrl: "/images/sessions/session-9.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p9-1",
        title: "Protocolo Alpha",
        description: "Estado de relajación profunda y creatividad.",
        pdfUrl: ""
      },
      {
        id: "p9-2",
        title: "Protocolo Beta",
        description: "Estado de alerta y concentración activa.",
        pdfUrl: ""
      },
      {
        id: "p9-3",
        title: "Protocolo Gamma",
        description: "Estado de máximo rendimiento cognitivo.",
        pdfUrl: ""
      },
      {
        id: "p9-4",
        title: "Protocolo Delta",
        description: "Estado de regeneración profunda y sanación.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 10,
    title: "El Poder de los Rituales (Los 3 Elementos)",
    description: "Estructura y aplicación de rituales para potenciar la intención y manifestación.",
    day: 7,
    imageUrl: "/images/sessions/session-10.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p10-1",
        title: "Los 3 Elementos del Ritual",
        description: "Guía para crear rituales efectivos y transformadores.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 11,
    title: "Las 7 Excepciones",
    description: "Identificación y manejo de excepciones en el proceso de cambio y transformación.",
    day: 8,
    imageUrl: "/images/sessions/session-11.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p11-1",
        title: "Guía de las 7 Excepciones",
        description: "Cómo identificar y trabajar con las excepciones al patrón.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 13,
    title: "Las Tres Decisiones Conscientes",
    description: "Las tres decisiones fundamentales que transforman tu vida y determinan tu experiencia.",
    day: 9,
    imageUrl: "/images/sessions/session-13.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p13-1",
        title: "Guía de las Tres Decisiones Conscientes",
        description: "Cómo aplicar las tres decisiones conscientes en tu vida diaria.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 12,
    title: "LSP Insight System",
    description: "Sistema de insight profundo para el autoconocimiento y transformación personal.",
    day: 10,
    imageUrl: "/images/sessions/session-12.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p12-1",
        title: "Manual LSP Insight",
        description: "Guía completa del sistema LSP para insights profundos.",
        pdfUrl: ""
      }
    ],
    apps: [
      {
        id: "app12-1",
        name: "LSP Insight App",
        description: "Aplicación para trabajar con el sistema LSP.",
        url: "",
        iconName: "Zap"
      }
    ]
  }
]
