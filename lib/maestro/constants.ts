import { Topic, Exercise, DayNumber, DayConfig } from './types'

export const DAY_CONFIGS: Record<DayNumber, DayConfig> = {
  1: {
    number: 1,
    name: 'Día 1',
    title: 'ESTABILIZACIÓN',
    description: 'Neurobiología y Regulación',
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'bg-blue-500',
      badgeText: 'text-white'
    }
  },
  2: {
    number: 2,
    name: 'Día 2',
    title: 'TRANSFORMACIÓN',
    description: 'Trabajo Profundo de Raíz',
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      gradient: 'from-orange-500 to-amber-500',
      badge: 'bg-orange-500',
      badgeText: 'text-white'
    }
  },
  3: {
    number: 3,
    name: 'Día 3',
    title: 'INTEGRACIÓN',
    description: 'Protocolos, Excepciones y Consolidación',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      gradient: 'from-purple-500 to-violet-500',
      badge: 'bg-purple-500',
      badgeText: 'text-white'
    }
  }
}

// --- DAY 1 CONTENT ---
export const TOPICS_DAY1: Topic[] = [
  {
    id: 'neurobiology',
    title: '1. Neurobiología de la Regulación',
    description: 'El cerebro triuno, Teoría Polivagal y los 3 estados.',
    subtopics: ['El cerebro triuno', 'Teoría Polivagal', 'Los 3 estados del sistema nervioso', 'Neurocepción', 'Co-regulación']
  },
  {
    id: 'window',
    title: '2. La Ventana de Tolerancia',
    description: 'Entendiendo tus rangos de activación óptima.',
    subtopics: ['Qué es la ventana', 'Hiperactivación vs Hipoactivación', 'Factores que expanden/estrechan', 'Cómo medir tu ventana']
  },
  {
    id: 'techniques',
    title: '3. Técnicas de Regulación',
    description: 'Herramientas prácticas para volver a la calma.',
    subtopics: ['Respiración 4-7-8', 'Abrazo de mariposa', 'Orientación 5-4-3-2-1', 'Contacto tranquilizador']
  },
  {
    id: 'levers',
    title: '4. Las 4 Palancas del Estado',
    description: 'Cómo cambiar tu estado en el momento presente.',
    subtopics: ['Fisiología', 'Enfoque (SRA)', 'Lenguaje', 'Imaginación']
  },
  {
    id: 'neuroplasticity',
    title: '5. Neuroplasticidad',
    description: 'La ciencia del cambio cerebral.',
    subtopics: ['Regla de Hebb', 'Componentes del cambio', 'Mito de los 21 días', 'Compromiso de 90 días']
  },
  {
    id: 'resources',
    title: '6. Recursos Personales',
    description: 'Anclas de seguridad internas y externas.',
    subtopics: ['Personas seguras', 'Lugares de paz', 'Kit de emergencia', 'Memorias de capacidad']
  },
  {
    id: 'rituals',
    title: '7. Rituales de Consolidación',
    description: 'Estructurando la práctica diaria.',
    subtopics: ['Ritual matutino', 'Pausas de regulación', 'Ritual nocturno']
  }
]

export const EXERCISES_DAY1: Exercise[] = [
  { id: 'breathing', title: 'Respiración 4-7-8', category: 'Regulación', prompt: 'Guíame paso a paso en el ejercicio de respiración 4-7-8.' },
  { id: 'grounding', title: 'Orientación 5-4-3-2-1', category: 'Regulación', prompt: 'Ayúdame a hacer el ejercicio de orientación 5-4-3-2-1 para anclarme.' },
  { id: 'butterfly', title: 'Abrazo de Mariposa', category: 'Regulación', prompt: 'Explícame y guíame en el abrazo de mariposa.' },
  { id: 'physiology', title: 'Cambio de Fisiología', category: 'Palancas', prompt: 'Guíame en un ejercicio rápido para cambiar mi estado usando la palanca de Fisiología.' },
  { id: 'language', title: 'Re-etiquetado', category: 'Palancas', prompt: 'Ayúdame a practicar el re-etiquetado de una emoción difícil.' },
  { id: 'resource_kit', title: 'Crear Kit de Emergencia', category: 'Recursos', prompt: 'Ayúdame a diseñar mi kit de emergencia de recursos personales.' },
  { id: 'morning_ritual', title: 'Diseñar Ritual Matutino', category: 'Integración', prompt: 'Ayúdame a diseñar un ritual matutino de 10 minutos.' },
]

// --- DAY 2 CONTENT ---
export const TOPICS_DAY2: Topic[] = [
  {
    id: 'trsb',
    title: '1. TRSB: Técnica de Reprocesamiento',
    description: 'Procesamiento somato-cognitivo bilateral de memorias.',
    subtopics: ['Las 8 fases de TRSB', 'Tríada cognitiva', 'NAE y VCA', 'Estimulación bilateral', 'Protocolo Mensaje Somático']
  },
  {
    id: 'pons',
    title: '2. PONS: Procesamiento Ocular',
    description: 'Acceso a memorias a través del sistema visual-somático.',
    subtopics: ['Las 4 fases de PONS', 'Búsqueda del punto ocular', 'Material preverbal', 'Residuos somáticos', 'Cuándo usar PONS vs TRSB']
  },
  {
    id: 'context',
    title: '3. Context Engineering',
    description: 'Sistema de diagnóstico del inconsciente biológico.',
    subtopics: ['Las 7 fases', '4 niveles temporales', '13 hologramas', 'Frase terapéutica', 'Síntoma primario vs secundario']
  },
  {
    id: 'integration',
    title: '4. Integración y Procesamiento',
    description: 'Cómo procesar material profundo de forma segura.',
    subtopics: ['Preparación', 'Recursos necesarios', 'Señales de procesamiento', 'Autocuidado post-sesión', 'Cuándo parar']
  }
]

export const EXERCISES_DAY2: Exercise[] = [
  { id: 'prep', title: 'Preparación para Procesamiento', category: 'Seguridad', prompt: 'Guíame por la verificación de seguridad antes de trabajo profundo.' },
  { id: 'triada', title: 'Construcción de Tríada Cognitiva', category: 'TRSB', prompt: 'Ayúdame a identificar mi memoria, creencia limitante y creencia adaptativa.' },
  { id: 'trsb_basic', title: 'Ciclo TRSB Básico', category: 'TRSB', prompt: 'Guíame paso a paso en un ciclo básico de TRSB con material de baja intensidad.' },
  { id: 'somatic_message', title: 'Protocolo Mensaje Somático', category: 'TRSB', prompt: 'Mi activación no baja, ayúdame a escuchar el mensaje de mi cuerpo.' },
  { id: 'pons_search', title: 'Búsqueda de Punto Ocular', category: 'PONS', prompt: 'Guíame para encontrar mi punto de activación ocular para PONS.' },
  { id: 'closure', title: 'Cierre de Sesión', category: 'Seguridad', prompt: 'Ayúdame a cerrar apropiadamente después de trabajo profundo.' },
]

// --- DAY 3 CONTENT ---
export const TOPICS_DAY3: Topic[] = [
  {
    id: 'protocolos',
    title: '1. Los 4 Protocolos de Liberación',
    description: 'Alpha, Beta, Gamma, Delta según nivel de trabajo.',
    subtopics: ['Protocolo ALPHA (Soma)', 'Protocolo BETA (Psique)', 'Protocolo GAMMA (Tribu)', 'Protocolo DELTA (Espíritu)', 'Secuencia de aplicación']
  },
  {
    id: 'excepciones',
    title: '2. Las 7 Excepciones',
    description: 'Condiciones que bloquean las intervenciones.',
    subtopics: ['Ganancia secundaria', 'Trauma no procesado', 'Identidad congelada', 'Protectores activos', 'Fuera de ventana', 'Apego dañado', 'Sensibilización central']
  },
  {
    id: 'miracle',
    title: '3. Miracle Question',
    description: 'Técnica de soluciones focalizadas para visión futura.',
    subtopics: ['Las 6 fases', 'Setup del milagro', 'Descubrimiento personal y relacional', 'Identificar excepciones', 'Escala de progreso']
  },
  {
    id: 'lsp',
    title: '4. LSP Insight System',
    description: 'Construcción metafórica con piezas.',
    subtopics: ['Situación actual', 'Situación deseada', 'El puente', 'Caminata del cambio', 'Neurociencia del LSP']
  },
  {
    id: '90dias',
    title: '5. Programa de 90 Días',
    description: 'Estructura para integración y consolidación.',
    subtopics: ['Semanas 1-3: Estabilización', 'Semanas 4-6: Reprocesamiento', 'Semanas 7-9: Liberación PONS', 'Semanas 10-12: Integración', 'Rituales de mantenimiento']
  }
]

export const EXERCISES_DAY3: Exercise[] = [
  { id: 'exceptions', title: 'Identificar Excepciones', category: 'Diagnóstico', prompt: 'Ayúdame a identificar si hay excepciones bloqueando mi progreso.' },
  { id: 'gamma', title: 'Protocolo Gamma', category: 'Protocolos', prompt: 'Guíame en el Protocolo Gamma para patrones transgeneracionales.' },
  { id: 'miracle_q', title: 'Miracle Question Completa', category: 'Miracle', prompt: 'Guíame paso a paso por la Pregunta del Milagro completa.' },
  { id: 'resource_vis', title: 'Visualización de Recurso', category: 'Miracle', prompt: 'Ayúdame a fortalecer mi lugar seguro y crear un ancla.' },
  { id: 'morning_vis', title: 'Visualización Matutina', category: 'Integración', prompt: 'Guíame en una visualización rápida para preparar mi día.' },
  { id: '90day_plan', title: 'Diseñar Plan de 90 Días', category: 'Integración', prompt: 'Ayúdame a diseñar mi programa personal de 90 días.' },
]

// Helper functions
export const getTopicsForDay = (day: DayNumber): Topic[] => {
  switch (day) {
    case 1: return TOPICS_DAY1
    case 2: return TOPICS_DAY2
    case 3: return TOPICS_DAY3
  }
}

export const getExercisesForDay = (day: DayNumber): Exercise[] => {
  switch (day) {
    case 1: return EXERCISES_DAY1
    case 2: return EXERCISES_DAY2
    case 3: return EXERCISES_DAY3
  }
}
