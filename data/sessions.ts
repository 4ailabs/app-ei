export interface Session {
  id: number
  title: string
  description: string
  day: number
  moduleNumber?: number
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
  vimeoId?: string
  cloudflareStreamId?: string
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
  category?: "referencia" | "ejercicio" | "contenido_profundo"
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
    imageUrl: "/images/sessions/session-1.png",
    pdfUrl: "",
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
        vimeoId: "",
        duration: "6-8 min",
        description: "Concepto de Siegel, metáfora de la ducha, qué la expande y qué la estrecha"
      },
      {
        id: "v1-3",
        title: "Neurocepción: Tu Detector de Amenazas",
        vimeoId: "",
        duration: "5-7 min",
        description: "Cómo el cuerpo detecta peligro antes que la mente consciente"
      },
      {
        id: "v1-4",
        title: "Demo: Respiración 4-7-8",
        vimeoId: "",
        duration: "4 min",
        description: "Demostración práctica con guía visual de tiempos"
      },
      {
        id: "v1-5",
        title: "Demo: Abrazo de Mariposa",
        vimeoId: "",
        duration: "3 min",
        description: "Demostración de la técnica bilateral"
      },
      {
        id: "v1-6",
        title: "Demo: Orientación 5-4-3-2-1",
        vimeoId: "",
        duration: "4 min",
        description: "Ejercicio de anclaje sensorial"
      }
    ],
    audios: [
      // Prácticas de Regulación (uso diario)
      {
        id: "a1-1",
        title: "Respiración 4-7-8 (versión corta)",
        url: "",
        duration: "3 min",
        description: "3 ciclos con guía de voz",
        category: "regulacion"
      },
      {
        id: "a1-2",
        title: "Respiración 4-7-8 (versión extendida)",
        url: "",
        duration: "8 min",
        description: "10 ciclos con música suave",
        category: "regulacion"
      },
      {
        id: "a1-3",
        title: "Abrazo de Mariposa Guiado",
        url: "",
        duration: "5 min",
        description: "Estimulación bilateral con visualización",
        category: "regulacion"
      },
      {
        id: "a1-4",
        title: "Orientación 5-4-3-2-1",
        url: "",
        duration: "6 min",
        description: "Anclaje sensorial completo",
        category: "regulacion"
      },
      {
        id: "a1-5",
        title: "Regulación de Emergencia",
        url: "",
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
            content: "Estado de conexión social, calma y presencia. Aquí es donde ocurre el aprendizaje, la creatividad y la conexión genuina."
          },
          {
            id: "t1-1-2",
            title: "Simpático (Lucha o Huida)",
            content: "Estado de activación ante amenazas percibidas. Aumento del ritmo cardíaco, respiración acelerada, tensión muscular."
          },
          {
            id: "t1-1-3",
            title: "Dorsal Vagal (Colapso)",
            content: "Estado de inmovilización o apagado. Desconexión, entumecimiento, sensación de estar 'fuera del cuerpo'."
          }
        ]
      },
      {
        id: "t1-2",
        title: "La Ventana de Tolerancia",
        content: "Concepto desarrollado por Dan Siegel que describe el rango óptimo de activación donde podemos funcionar efectivamente.",
        subtopics: [
          {
            id: "t1-2-1",
            title: "Zona Óptima",
            content: "Dentro de la ventana: claridad mental, capacidad de respuesta, conexión con otros."
          },
          {
            id: "t1-2-2",
            title: "Hiperactivación",
            content: "Por encima de la ventana: ansiedad, pánico, reactividad excesiva."
          },
          {
            id: "t1-2-3",
            title: "Hipoactivación",
            content: "Por debajo de la ventana: depresión, desconexión, entumecimiento."
          }
        ]
      },
      {
        id: "t1-3",
        title: "Neurocepción",
        content: "El proceso inconsciente por el cual nuestro sistema nervioso evalúa constantemente el entorno en busca de señales de seguridad o peligro."
      },
      {
        id: "t1-4",
        title: "Técnicas de Regulación",
        content: "Herramientas prácticas para volver a la ventana de tolerancia.",
        subtopics: [
          {
            id: "t1-4-1",
            title: "Respiración 4-7-8",
            content: "Inhala por 4 segundos, retén por 7, exhala por 8. Activa el sistema parasimpático."
          },
          {
            id: "t1-4-2",
            title: "Abrazo de Mariposa",
            content: "Cruzar los brazos sobre el pecho y alternar golpecitos. Estimulación bilateral para calmar."
          },
          {
            id: "t1-4-3",
            title: "Orientación 5-4-3-2-1",
            content: "5 cosas que ves, 4 que oyes, 3 que tocas, 2 que hueles, 1 que saboreas. Anclaje al presente."
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
    apps: []
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
    imageUrl: "/images/sessions/session-2.png",
    pdfUrl: "",
    videos: [
      {
        id: "v2-1",
        title: "¿Qué es un Recurso?",
        vimeoId: "",
        duration: "6-8 min",
        description: "Definición, tipos (externos/internos), por qué son esenciales"
      },
      {
        id: "v2-2",
        title: "El Poder de la Pendulación",
        vimeoId: "",
        duration: "5-7 min",
        description: "Concepto de Levine, oscilación entre trauma y recurso"
      },
      {
        id: "v2-3",
        title: "Neuroplasticidad: Tu Cerebro Puede Cambiar",
        vimeoId: "",
        duration: "8-10 min",
        description: "Evidencia científica (taxistas, meditadores), esperanza fundamentada"
      },
      {
        id: "v2-4",
        title: "Los 3 Componentes del Cambio",
        vimeoId: "",
        duration: "5-6 min",
        description: "Cesar patrón antiguo + Practicar nuevo + Repetir consistentemente"
      },
      {
        id: "v2-5",
        title: "¿Cuánto Tiempo Toma Cambiar?",
        vimeoId: "",
        duration: "4-5 min",
        description: "66 días mínimo, 100-150 días para patrones arraigados"
      }
    ],
    audios: [
      // Meditaciones especializadas para recursos
      {
        id: "a2-1",
        title: "Accediendo a Mis Recursos",
        url: "",
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
        content: "Un recurso es cualquier cosa que te ayuda a sentirte más seguro, conectado o capaz de manejar el estrés.",
        subtopics: [
          {
            id: "t2-1-1",
            title: "Recursos Externos",
            content: "Personas de confianza, lugares seguros, objetos significativos, mascotas."
          },
          {
            id: "t2-1-2",
            title: "Recursos Internos",
            content: "Cualidades personales, memorias positivas, habilidades, logros."
          }
        ]
      },
      {
        id: "t2-2",
        title: "Pendulación",
        content: "Técnica de Peter Levine que consiste en oscilar la atención entre sensaciones de malestar y sensaciones de recurso/bienestar."
      },
      {
        id: "t2-3",
        title: "Neuroplasticidad",
        content: "La capacidad del cerebro para reorganizarse formando nuevas conexiones neuronales a lo largo de la vida.",
        subtopics: [
          {
            id: "t2-3-1",
            title: "Evidencia Científica",
            content: "Estudios con taxistas de Londres (hipocampo más grande), meditadores (cambios en la amígdala)."
          },
          {
            id: "t2-3-2",
            title: "Lo que practicas se fortalece",
            content: "Las neuronas que se disparan juntas, se conectan juntas (Ley de Hebb)."
          }
        ]
      },
      {
        id: "t2-4",
        title: "Los 3 Componentes del Cambio",
        content: "Para cambiar un patrón necesitas: 1) Cesar el patrón antiguo, 2) Practicar el nuevo patrón, 3) Repetir consistentemente."
      },
      {
        id: "t2-5",
        title: "Tiempo para el Cambio",
        content: "La investigación muestra que se necesitan mínimo 66 días para formar un nuevo hábito, y 100-150 días para patrones más arraigados."
      }
    ],
    protocols: [
      {
        id: "p2-1",
        title: "Mi Mapa de Recursos (Plantilla)",
        description: "Formato completo para identificar recursos",
        pdfUrl: ""
      },
      {
        id: "p2-2",
        title: "Plan de Cambio Neuroplástico",
        description: "Plantilla: patrón antiguo → patrón nuevo → práctica",
        pdfUrl: ""
      },
      {
        id: "p2-3",
        title: "Neuroplasticidad — La Ciencia del Cambio",
        description: "Evidencia científica con referencias",
        pdfUrl: ""
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
        vimeoId: "",
        duration: "5-6 min",
        description: "Estados cambian en minutos, rasgos en meses — diferencia crítica"
      },
      {
        id: "v3-2",
        title: "Palanca 1: Fisiología",
        vimeoId: "",
        duration: "8-10 min",
        description: "Respiración, postura, movimiento, temperatura con demos"
      },
      {
        id: "v3-3",
        title: "Palanca 2: Enfoque (El SRA)",
        vimeoId: "",
        duration: "6-8 min",
        description: "Sistema Reticular Activador, cómo programar tu filtro"
      },
      {
        id: "v3-4",
        title: "Palanca 3: Lenguaje",
        vimeoId: "",
        duration: "6-8 min",
        description: "Re-etiquetado, estudio de Jamieson, ejemplos prácticos"
      },
      {
        id: "v3-5",
        title: "Palanca 4: Imaginación",
        vimeoId: "",
        duration: "6-8 min",
        description: "Ensayo mental, protocolo de visualización efectiva"
      },
      {
        id: "v3-6",
        title: "Combinando las 4 Palancas",
        vimeoId: "",
        duration: "5-6 min",
        description: "Ejemplos de combinaciones para situaciones específicas"
      }
    ],
    audios: [
      {
        id: "a3-1",
        title: "Las 4 Palancas en Acción",
        url: "",
        duration: "12 min",
        description: "Recorrido por las 4 palancas en secuencia",
        category: "meditacion"
      },
      // Rituales matutinos
      {
        id: "a3-2",
        title: "Ritual 1: Priming de Regulación",
        url: "",
        duration: "5 min",
        description: "Respiración + Gratitud + Intención",
        category: "ritual_matutino"
      },
      {
        id: "a3-3",
        title: "Ritual 2: Priming de Recursos",
        url: "",
        duration: "10 min",
        description: "Movimiento + Respiración + Gratitud + Visualización + Intención",
        category: "ritual_matutino"
      },
      {
        id: "a3-4",
        title: "Ritual Completo Mañana",
        url: "",
        duration: "15 min",
        description: "Combinación de Ritual 1 y 2",
        category: "ritual_matutino"
      }
    ],
    themes: [
      {
        id: "t3-1",
        title: "Estados vs Rasgos",
        content: "Los estados son temporales y pueden cambiar en minutos. Los rasgos son patrones estables que toman meses en modificarse. Trabajamos primero con estados para eventualmente cambiar rasgos."
      },
      {
        id: "t3-2",
        title: "Palanca 1: Fisiología",
        content: "Tu cuerpo influye directamente en tu estado emocional y mental.",
        subtopics: [
          {
            id: "t3-2-1",
            title: "Respiración",
            content: "La única función autónoma que podemos controlar voluntariamente. Exhalar largo activa el parasimpático."
          },
          {
            id: "t3-2-2",
            title: "Postura",
            content: "Postura expansiva aumenta testosterona y reduce cortisol. Postura cerrada hace lo opuesto."
          },
          {
            id: "t3-2-3",
            title: "Movimiento",
            content: "El movimiento cambia la química del cerebro. Sacudir, saltar, bailar liberan tensión."
          },
          {
            id: "t3-2-4",
            title: "Temperatura",
            content: "Agua fría activa el sistema nervioso simpático de forma controlada, aumentando resiliencia."
          }
        ]
      },
      {
        id: "t3-3",
        title: "Palanca 2: Enfoque (SRA)",
        content: "El Sistema Reticular Activador filtra la información que llega a tu consciencia. Aquello en lo que te enfocas, se expande.",
        subtopics: [
          {
            id: "t3-3-1",
            title: "Pregunta del Enfoque",
            content: "'¿Qué quiero NOTAR hoy?' - Esta pregunta programa tu SRA para buscar lo que deseas."
          }
        ]
      },
      {
        id: "t3-4",
        title: "Palanca 3: Lenguaje",
        content: "Las palabras que usas moldean tu experiencia. El re-etiquetado cambia cómo procesas las emociones.",
        subtopics: [
          {
            id: "t3-4-1",
            title: "Re-etiquetado",
            content: "Cambiar 'estoy ansioso' por 'estoy emocionado' (estudio de Jamieson) mejora el rendimiento."
          }
        ]
      },
      {
        id: "t3-5",
        title: "Palanca 4: Imaginación",
        content: "El cerebro no distingue claramente entre experiencia real e imaginada. La visualización crea circuitos neuronales.",
        subtopics: [
          {
            id: "t3-5-1",
            title: "Ensayo Mental",
            content: "Visualizar una acción activa las mismas áreas cerebrales que realizarla físicamente."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p3-1",
        title: "Las 4 Palancas — Referencia Rápida",
        description: "Resumen visual de las 4 palancas",
        pdfUrl: ""
      },
      {
        id: "p3-2",
        title: "Re-etiquetado de Lenguaje",
        description: "Tabla de conversiones (limitante → empoderador)",
        pdfUrl: ""
      },
      {
        id: "p3-3",
        title: "Los Rituales de Consolidación",
        description: "Guía completa de los 3 rituales",
        pdfUrl: ""
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
    imageUrl: "/images/sessions/session-4.png",
    pdfUrl: "",
    videos: [
      {
        id: "v4-1",
        title: "Tus Patrones Tuvieron Sentido",
        vimeoId: "",
        duration: "8-10 min",
        description: "Validación compasiva, función original de patrones defensivos"
      },
      {
        id: "v4-2",
        title: "Del Juicio a la Compasión",
        vimeoId: "",
        duration: "5-7 min",
        description: "Por qué juzgarte no funciona, neurobiología de la autocompasión"
      },
      {
        id: "v4-3",
        title: "Reescribiendo Tu Historia",
        vimeoId: "",
        duration: "8-10 min",
        description: "De víctima a héroe, ejercicio guiado"
      },
      {
        id: "v4-4",
        title: "El Compromiso de 90 Días",
        vimeoId: "",
        duration: "5-6 min",
        description: "Cómo estructurar tu práctica post-seminario"
      }
    ],
    audios: [
      {
        id: "a4-1",
        title: "Regreso a Ventral Vagal",
        url: "",
        duration: "10 min",
        description: "Para cuando estás en simpático o dorsal",
        category: "meditacion"
      },
      {
        id: "a4-2",
        title: "Mi Nueva Historia",
        url: "",
        duration: "15 min",
        description: "Visualización del héroe del viaje",
        category: "meditacion"
      },
      // Rituales nocturnos
      {
        id: "a4-3",
        title: "Cierre Diario de 5 Minutos",
        url: "",
        duration: "5 min",
        description: "Revisión, gratitud, intención mañana",
        category: "ritual_nocturno"
      },
      {
        id: "a4-4",
        title: "Regulación Pre-Sueño",
        url: "",
        duration: "10 min",
        description: "Relajación progresiva + respiración",
        category: "ritual_nocturno"
      }
    ],
    themes: [
      {
        id: "t4-1",
        title: "Tus Patrones Tuvieron Sentido",
        content: "Cada patrón que desarrollaste fue una respuesta inteligente a las circunstancias que enfrentaste. No estás roto, tu sistema nervioso te protegió de la mejor manera que pudo."
      },
      {
        id: "t4-2",
        title: "Del Juicio a la Compasión",
        content: "La autocrítica activa el sistema de amenaza, haciendo más difícil el cambio. La autocompasión activa el sistema de cuidado, facilitando la regulación y el cambio.",
        subtopics: [
          {
            id: "t4-2-1",
            title: "Neurobiología de la Autocompasión",
            content: "La autocompasión reduce el cortisol y activa la oxitocina, creando un estado óptimo para el cambio."
          }
        ]
      },
      {
        id: "t4-3",
        title: "Reescribiendo Tu Historia",
        content: "Puedes cambiar la narrativa de tu vida: de víctima de las circunstancias a héroe de tu propio viaje de transformación.",
        subtopics: [
          {
            id: "t4-3-1",
            title: "El Viaje del Héroe",
            content: "Tu historia incluye desafíos, mentores, pruebas y transformación. Tú eres el protagonista."
          },
          {
            id: "t4-3-2",
            title: "Mi pasado no es mi destino",
            content: "Lo que te pasó no define quién puedes llegar a ser. Tú escribes los próximos capítulos."
          }
        ]
      },
      {
        id: "t4-4",
        title: "El Compromiso de 90 Días",
        content: "Para consolidar los cambios del seminario, se recomienda un compromiso de práctica diaria durante 90 días.",
        subtopics: [
          {
            id: "t4-4-1",
            title: "Estructura del Compromiso",
            content: "Ritual matutino + práctica de regulación durante el día + ritual nocturno."
          }
        ]
      }
    ],
    protocols: [
      {
        id: "p4-1",
        title: "Mi Nueva Historia (Guía de Escritura)",
        description: "Estructura para reescribir narrativa personal",
        pdfUrl: ""
      },
      {
        id: "p4-2",
        title: "Tracker de 90 Días",
        description: "Calendario de seguimiento con checkboxes",
        pdfUrl: ""
      },
      {
        id: "p4-3",
        title: "Diario de Regulación Semanal",
        description: "Formato para registrar práctica y observaciones",
        pdfUrl: ""
      },
      {
        id: "p4-4",
        title: "Teoría Polivagal — Guía Completa",
        description: "Porges explicado para no-profesionales",
        pdfUrl: ""
      },
      {
        id: "p4-5",
        title: "Factores que Expanden/Estrechan la Ventana",
        description: "Lista detallada con recomendaciones",
        pdfUrl: ""
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
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p5-1",
        title: "Protocolo TRSB Completo",
        description: "Guía paso a paso para aplicar la técnica TRSB.",
        pdfUrl: ""
      }
    ],
    apps: []
  },
  {
    id: 6,
    title: "PONS - Procesamiento Ocular Neural Somático",
    description: "Método de procesamiento a través de movimientos oculares y conexión somática.",
    day: 3,
    imageUrl: "/images/sessions/session-6.png",
    pdfUrl: "",
    videos: [],
    audios: [],
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
    imageUrl: "/images/sessions/session-8.png",
    pdfUrl: "",
    videos: [],
    audios: [],
    themes: [],
    protocols: [
      {
        id: "p8-1",
        title: "Guía de la Pregunta del Milagro",
        description: "Cómo aplicar esta poderosa técnica de visualización.",
        pdfUrl: ""
      }
    ],
    apps: []
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
    id: 12,
    title: "LSP Insight System",
    description: "Sistema de insight profundo para el autoconocimiento y transformación personal.",
    day: 9,
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
