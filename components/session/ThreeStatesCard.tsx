"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download, Circle, Zap, Moon } from "lucide-react"
import { toPng } from "html-to-image"

interface ThreeStatesCardProps {
  accentColor?: string
}

export function ThreeStatesCard({ accentColor = "#1B6B4A" }: ThreeStatesCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!cardRef.current) {
      alert('Error: No se puede acceder al elemento de la tarjeta')
      return
    }

    setIsDownloading(true)
    try {
      const wasExpanded = isExpanded
      if (!isExpanded) {
        setIsExpanded(true)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        filter: (node) => {
          if (node instanceof HTMLElement) {
            const isButton = node.tagName === 'BUTTON'
            const isInHeader = node.closest?.('[data-header-buttons]')
            if (isButton && isInHeader) return false
          }
          return true
        }
      })

      const link = document.createElement('a')
      link.download = 'los-3-estados-sistema-nervioso.png'
      link.href = dataUrl
      link.click()

      if (!wasExpanded) {
        setIsExpanded(false)
      }
    } catch (error) {
      console.error('Error al descargar la imagen:', error)
      alert(`Error al descargar la imagen. Por favor, intenta de nuevo.`)
    } finally {
      setIsDownloading(false)
    }
  }

  const states = [
    {
      id: "ventral",
      name: "Ventral Vagal",
      subtitle: "Seguridad y Conexión",
      icon: Circle,
      color: "#1B6B4A",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      experience: ["Calma con estado de alerta", "Presencia y conexión", "Claridad cognitiva", "Apertura hacia otros"],
      somatic: ["Respiración lenta y profunda", "Musculatura relajada", "Expresión facial dinámica", "Prosodia vocal variada"],
      cognitive: ["Capacidad de resolución", "Curiosidad activa", "Flexibilidad mental", "Acceso a creatividad"],
      intervention: "Estado óptimo. Registrar las sensaciones asociadas para facilitar el reconocimiento futuro. Desde este estado es posible realizar trabajo terapéutico profundo."
    },
    {
      id: "simpatico",
      name: "Simpático",
      subtitle: "Movilización Defensiva",
      icon: Zap,
      color: "#D97706",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-200 dark:border-amber-800",
      experience: ["Aceleración, ansiedad, irritabilidad", "Urgencia por actuar", "Dificultad para calmarse", "Hipervigilancia"],
      somatic: ["Taquicardia", "Respiración superficial y rápida", "Tensión en hombros y mandíbula", "Extremidades frías o sudorosas"],
      cognitive: ["Pensamiento acelerado", "Percepción de urgencia global", "Déficit atencional", "Sesgo hacia amenazas"],
      interventions: ["Respiración 4-7-8 (3 ciclos)", "Descarga motora (sacudir, caminar)", "Orientación sensorial 5-4-3-2-1", "Estímulo térmico frío en muñecas"]
    },
    {
      id: "dorsal",
      name: "Dorsal Vagal",
      subtitle: "Inmovilización Defensiva",
      icon: Moon,
      color: "#64748B",
      bgLight: "bg-slate-50 dark:bg-slate-900/30",
      borderColor: "border-slate-200 dark:border-slate-700",
      experience: ["Desconexión, entumecimiento", "Agotamiento, sensación de apagado", "Desesperanza", "Deseo de desaparecer"],
      somatic: ["Pesadez corporal, hipotonía", "Respiración muy superficial", "Mirada desenfocada", "Voz monótona o mutismo"],
      cognitive: ['"No tiene sentido"', '"No puedo hacer nada"', "Enlentecimiento cognitivo", "Despersonalización"],
      interventions: ["Movimiento suave (estiramientos)", "Estímulo térmico cálido", "Orientación verbal (nombrar objetos)", "Co-regulación (contacto social seguro)"]
    }
  ]

  return (
    <div ref={cardRef} className="w-full bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm">
      {/* Header */}
      <div
        className="px-5 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-[#FAFAF9] dark:hover:bg-[#2A2A2A] transition-colors"
        data-header-buttons
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <div className="flex gap-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                Los 3 Estados del Sistema Nervioso
              </h2>
              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                Teoría Polivagal Aplicada
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload()
              }}
              disabled={isDownloading}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors disabled:opacity-50"
              title="Descargar como imagen"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
              ) : (
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#E5E4E0] dark:border-[#333333]">
          {/* Intro */}
          <div className="px-5 sm:px-6 py-4 bg-[#FAFAF9] dark:bg-[#1F1F1F]">
            <p className="text-sm text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
              Tu sistema nervioso tiene tres estados diferenciados. <strong className="font-semibold">No estás "roto" — estás respondiendo.</strong> Reconocer en qué estado te encuentras es el primer paso para la autorregulación consciente.
            </p>
          </div>

          {/* States */}
          <div className="divide-y divide-[#E5E4E0] dark:divide-[#333333]">
            {states.map((state, index) => {
              const Icon = state.icon
              return (
                <div key={state.id} className="px-5 sm:px-6 py-5 sm:py-6">
                  {/* State Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: state.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${state.color}15`, color: state.color }}
                        >
                          Estado {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{state.name}</h3>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">{state.subtitle}</p>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Experiencia */}
                    <div className={`p-4 rounded-xl ${state.bgLight} ${state.borderColor} border`}>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                        Experiencia
                      </h4>
                      <ul className="space-y-1.5">
                        {state.experience.map((item, i) => (
                          <li key={i} className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: state.color }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Señales Somáticas */}
                    <div className={`p-4 rounded-xl ${state.bgLight} ${state.borderColor} border`}>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                        Señales Somáticas
                      </h4>
                      <ul className="space-y-1.5">
                        {state.somatic.map((item, i) => (
                          <li key={i} className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: state.color }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Señales Cognitivas */}
                    <div className={`p-4 rounded-xl ${state.bgLight} ${state.borderColor} border`}>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                        Señales Cognitivas
                      </h4>
                      <ul className="space-y-1.5">
                        {state.cognitive.map((item, i) => (
                          <li key={i} className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: state.color }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Intervention */}
                  <div
                    className="mt-4 p-4 rounded-xl border"
                    style={{
                      backgroundColor: `${state.color}08`,
                      borderColor: `${state.color}30`
                    }}
                  >
                    <h4
                      className="text-[11px] font-semibold uppercase tracking-wide mb-2"
                      style={{ color: state.color }}
                    >
                      Intervención
                    </h4>
                    {state.intervention ? (
                      <p className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                        {state.intervention}
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {state.interventions?.map((item, i) => (
                          <li key={i} className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] flex items-center gap-2">
                            <span style={{ color: state.color }}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="px-5 sm:px-6 py-5 bg-[#1A1915] dark:bg-[#0F0F0F]">
            <h3 className="text-sm font-semibold text-white mb-4 text-center">Síntesis Operativa</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-xs font-semibold text-white">Ventral Vagal</span>
                  <span className="text-[11px] text-white/60">Seguridad percibida → Mantener, anclar</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-xs font-semibold text-white">Simpático</span>
                  <span className="text-[11px] text-white/60">Activación excesiva → Reducir arousal</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-slate-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-xs font-semibold text-white">Dorsal Vagal</span>
                  <span className="text-[11px] text-white/60">Hipoactivación → Elevar energía</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-3 border-t border-[#E5E4E0] dark:border-[#333333] bg-[#FAFAF9] dark:bg-[#1F1F1F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0]">
              <strong className="text-[#1A1915] dark:text-[#E5E5E5]">Dr. Miguel Ojeda Rios</strong> · Seminario Internacional de Inteligencia Energética
            </div>
            <div className="text-[10px] text-[#706F6C] dark:text-[#A0A0A0]">
              inteligencia-energetica.com
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
