"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { toPng } from "html-to-image"

interface WindowOfToleranceCardProps {
  accentColor?: string
}

export function WindowOfToleranceCard({ accentColor = "#B8860B" }: WindowOfToleranceCardProps) {
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
      link.download = 'mi-ventana-de-tolerancia.png'
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

  const zones = [
    {
      id: "hiper",
      name: "Hiperactivación",
      subtitle: "Simpático",
      icon: TrendingUp,
      color: "#D97706",
      bgClass: "bg-amber-50 dark:bg-amber-950/20",
      borderClass: "border-amber-200 dark:border-amber-800",
      symptoms: ["Ansiedad, pánico, ira, agitación", "Pensamientos acelerados", '"Demasiado encendido"']
    },
    {
      id: "ventana",
      name: "Ventana de Tolerancia",
      subtitle: "Zona Óptima",
      icon: Minus,
      color: "#1B6B4A",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/20",
      borderClass: "border-emerald-200 dark:border-emerald-800",
      symptoms: ["Capacidad de pensar, sentir y actuar con flexibilidad", "Presencia y conexión con el momento", "Manejo adecuado del estrés moderado"]
    },
    {
      id: "hipo",
      name: "Hipoactivación",
      subtitle: "Dorsal Vagal",
      icon: TrendingDown,
      color: "#64748B",
      bgClass: "bg-slate-50 dark:bg-slate-950/20",
      borderClass: "border-slate-200 dark:border-slate-700",
      symptoms: ["Entumecimiento, desconexión, colapso", "Desesperanza, sensación de apagado", '"Demasiado apagado"']
    }
  ]

  const expandFactors = [
    "Sueño reparador",
    "Ejercicio regular",
    "Conexión social segura",
    "Prácticas de regulación",
    "Alimentación balanceada",
    "Tiempo en naturaleza"
  ]

  const contractFactors = [
    "Privación de sueño",
    "Estrés crónico",
    "Aislamiento social",
    "Trauma no procesado",
    "Exceso de estimulantes",
    "Sedentarismo"
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
              <div className="flex flex-col gap-0.5 items-center">
                <div className="w-4 h-0.5 bg-amber-500 rounded"></div>
                <div className="w-6 h-1 bg-emerald-500 rounded"></div>
                <div className="w-4 h-0.5 bg-slate-500 rounded"></div>
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                Mi Ventana de Tolerancia
              </h2>
              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                Diagrama y Ejercicio de Autodiagnóstico
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
              La Ventana de Tolerancia es el rango de activación fisiológica donde puedes funcionar de manera óptima. <strong className="font-semibold">Tu ventana puede expandirse con práctica sistemática.</strong>
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E4E0] dark:divide-[#333333]">
            {/* Diagram Section */}
            <div className="px-5 sm:px-6 py-5 sm:py-6">
              <h3 className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-4">
                Modelo de Zonas de Activación
              </h3>

              {/* Visual Diagram */}
              <div className="space-y-2">
                {zones.map((zone) => {
                  const Icon = zone.icon
                  return (
                    <div
                      key={zone.id}
                      className={`p-4 rounded-xl ${zone.bgClass} border ${zone.borderClass}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: zone.color }}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                              {zone.name}
                            </h4>
                            <span
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${zone.color}15`, color: zone.color }}
                            >
                              {zone.subtitle}
                            </span>
                          </div>
                          <ul className="space-y-0.5">
                            {zone.symptoms.map((symptom, i) => (
                              <li key={i} className="text-xs text-[#706F6C] dark:text-[#A0A0A0] flex items-start gap-1.5">
                                <span className="text-[10px]" style={{ color: zone.color }}>•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Metaphor */}
              <div className="mt-4 p-4 bg-[#F5F4F0] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
                <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                  Metáfora de la Temperatura
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></span>
                    <span><strong>Agua muy caliente</strong> = Te quemas, necesitas salir</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span><strong>Temperatura perfecta</strong> = Puedes quedarte, funcionar bien</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="w-3 h-3 rounded-full bg-slate-500 flex-shrink-0"></span>
                    <span><strong>Agua muy fría</strong> = Te congelas, no puedes moverte</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Factors Section */}
            <div className="px-5 sm:px-6 py-5 sm:py-6">
              <h3 className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-4">
                Factores que Afectan tu Ventana
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Expand Column */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                  <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">+</span>
                    Expanden
                  </h4>
                  <ul className="space-y-1.5">
                    {expandFactors.map((factor, i) => (
                      <li key={i} className="text-xs text-[#1A1915] dark:text-[#E5E5E5] flex items-center gap-1.5">
                        <span className="text-emerald-500 text-[10px]">+</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contract Column */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">−</span>
                    Estrechan
                  </h4>
                  <ul className="space-y-1.5">
                    {contractFactors.map((factor, i) => (
                      <li key={i} className="text-xs text-[#1A1915] dark:text-[#E5E5E5] flex items-center gap-1.5">
                        <span className="text-amber-500 text-[10px]">−</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plan */}
              <div className="mt-4 p-4 bg-[#F5F4F0] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E4E0] dark:border-[#333333]">
                <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                  Mi Plan de Expansión
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#706F6C] dark:text-[#A0A0A0] block mb-1.5">
                      Una cosa que voy a AUMENTAR esta semana:
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#252525] text-sm text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97]"
                      placeholder="Ej: Caminar 20 minutos al día"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#706F6C] dark:text-[#A0A0A0] block mb-1.5">
                      Una cosa que voy a REDUCIR esta semana:
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#252525] text-sm text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97]"
                      placeholder="Ej: Uso de redes sociales antes de dormir"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concept */}
          <div className="px-5 sm:px-6 py-4 bg-[#1A1915] dark:bg-[#0F0F0F]">
            <p className="text-sm text-white/90 text-center leading-relaxed">
              El objetivo no es nunca salir de la ventana — eso es imposible. <strong className="text-white font-semibold">El objetivo es regresar más rápido cuando sales.</strong>
            </p>
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
