"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download, Wind, Heart, Eye, Hand } from "lucide-react"
import { toPng } from "html-to-image"

interface RegulationToolsCardProps {
  accentColor?: string
}

export function RegulationToolsCard({ accentColor = "#2563EB" }: RegulationToolsCardProps) {
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
      link.download = 'herramientas-de-regulacion.png'
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

  const techniques = [
    {
      id: "respiracion",
      name: "Respiración 4-7-8",
      subtitle: "Activación parasimpática",
      icon: Wind,
      color: "#2563EB",
      bgClass: "bg-blue-50 dark:bg-blue-950/20",
      borderClass: "border-blue-200 dark:border-blue-800",
      mechanism: "La exhalación prolongada activa el nervio vago, funcionando como freno natural del sistema nervioso simpático.",
      steps: [
        "Inhalar por nariz contando hasta 4",
        "Retener el aire contando hasta 7",
        "Exhalar por boca contando hasta 8",
        "Repetir 3-4 ciclos completos"
      ],
      indications: ["Previo a situaciones estresantes", "Ansiedad en ascenso", "Dificultad para conciliar sueño"]
    },
    {
      id: "mariposa",
      name: "Abrazo de Mariposa",
      subtitle: "Estimulación bilateral",
      icon: Heart,
      color: "#7C3AED",
      bgClass: "bg-violet-50 dark:bg-violet-950/20",
      borderClass: "border-violet-200 dark:border-violet-800",
      mechanism: "La estimulación bilateral alternada facilita la integración interhemisférica y el procesamiento emocional.",
      steps: [
        "Cruzar brazos sobre el pecho (manos en clavículas)",
        "Alternar toques suaves: derecha, izquierda",
        "Mantener ritmo lento (1 toque/segundo)",
        "Continuar 30-60 segundos"
      ],
      indications: ["Angustia o ansiedad aguda", "Previo a conversaciones difíciles", "Necesidad de auto-consuelo"]
    },
    {
      id: "orientacion",
      name: "Orientación 5-4-3-2-1",
      subtitle: "Anclaje sensorial",
      icon: Eye,
      color: "#0891B2",
      bgClass: "bg-cyan-50 dark:bg-cyan-950/20",
      borderClass: "border-cyan-200 dark:border-cyan-800",
      mechanism: "El uso sistemático de los cinco sentidos reorienta la atención al momento presente, interrumpiendo rumiación y disociación.",
      steps: [
        "5 cosas que puedes VER",
        "4 cosas que puedes ESCUCHAR",
        "3 cosas que puedes TOCAR/SENTIR",
        "2 cosas que puedes OLER",
        "1 cosa que puedes SABOREAR"
      ],
      indications: ["Mente atrapada en preocupaciones", "Durante o después de flashbacks", "Sensación de disociación"]
    },
    {
      id: "contacto",
      name: "Contacto Tranquilizador",
      subtitle: "Activación de seguridad",
      icon: Hand,
      color: "#D97706",
      bgClass: "bg-amber-50 dark:bg-amber-950/20",
      borderClass: "border-amber-200 dark:border-amber-800",
      mechanism: "El tacto afectivo libera oxitocina y envía señales de seguridad al sistema límbico, facilitando la regulación descendente.",
      options: [
        { name: "Mano en corazón", desc: "Sentir calor y latido" },
        { name: "Mano en abdomen", desc: "Sentir movimiento respiratorio" },
        { name: "Auto-abrazo", desc: "Brazos cruzados, apretar suave" },
        { name: "Sostener rostro", desc: "Manos en mejillas, respirar" }
      ],
      indications: ["Necesidad de consuelo inmediato", "Despertar de pesadillas", "Ritual previo al sueño"]
    }
  ]

  const quickGuide = [
    { trigger: "Ansiedad subiendo", technique: "Respiración 4-7-8", color: "#2563EB" },
    { trigger: "Angustia / necesito calmarme", technique: "Abrazo de Mariposa", color: "#7C3AED" },
    { trigger: "Atrapado en pensamientos", technique: "Orientación 5-4-3-2-1", color: "#0891B2" },
    { trigger: "Necesito contención", technique: "Contacto Tranquilizador", color: "#D97706" }
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
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 rounded-sm bg-blue-500"></div>
                <div className="w-2 h-2 rounded-sm bg-violet-500"></div>
                <div className="w-2 h-2 rounded-sm bg-cyan-500"></div>
                <div className="w-2 h-2 rounded-sm bg-amber-500"></div>
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                Herramientas de Regulación
              </h2>
              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                Las 4 Técnicas Fundamentales
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
              Estas cuatro técnicas constituyen el kit básico de autorregulación del sistema nervioso. <strong className="font-semibold">Practícalas en estado de calma</strong> para que estén disponibles automáticamente cuando las necesites.
            </p>
          </div>

          {/* Techniques Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-[#E5E4E0] dark:divide-[#333333]">
            {techniques.map((technique, index) => {
              const Icon = technique.icon
              const isLeftColumn = index % 2 === 0
              return (
                <div
                  key={technique.id}
                  className={`px-5 sm:px-6 py-5 sm:py-6 ${isLeftColumn ? 'lg:border-r border-[#E5E4E0] dark:border-[#333333]' : ''}`}
                >
                  {/* Technique Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: technique.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${technique.color}15`, color: technique.color }}
                        >
                          Técnica {index + 1}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#1A1915] dark:text-[#E5E5E5]">{technique.name}</h3>
                      <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">{technique.subtitle}</p>
                    </div>
                  </div>

                  {/* Mechanism */}
                  <div className="mb-4">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">
                      Mecanismo
                    </h4>
                    <p className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                      {technique.mechanism}
                    </p>
                  </div>

                  {/* Steps or Options */}
                  <div className={`p-4 rounded-xl ${technique.bgClass} border ${technique.borderClass} mb-4`}>
                    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">
                      {technique.steps ? 'Protocolo' : 'Opciones'}
                    </h4>
                    {technique.steps ? (
                      <ul className="space-y-1.5">
                        {technique.steps.map((step, i) => (
                          <li key={i} className="text-[13px] text-[#1A1915] dark:text-[#E5E5E5] flex items-start gap-2">
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: technique.color }}
                            >
                              {technique.id === "orientacion" ? technique.steps[i].charAt(0) : i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {technique.options?.map((option, i) => (
                          <div
                            key={i}
                            className="p-2.5 bg-white dark:bg-[#252525] rounded-lg border border-[#E5E4E0] dark:border-[#333333]"
                          >
                            <span className="block text-[11px] font-semibold" style={{ color: technique.color }}>
                              {option.name}
                            </span>
                            <span className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0]">
                              {option.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Indications */}
                  <div>
                    <h4
                      className="text-[11px] font-semibold uppercase tracking-wide mb-2"
                      style={{ color: technique.color }}
                    >
                      Cuándo usarla
                    </h4>
                    <ul className="space-y-1">
                      {technique.indications.map((indication, i) => (
                        <li key={i} className="text-[12px] text-[#706F6C] dark:text-[#A0A0A0] flex items-center gap-1.5">
                          <span style={{ color: technique.color }}>→</span>
                          {indication}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Guide */}
          <div className="px-5 sm:px-6 py-5 bg-[#1A1915] dark:bg-[#0F0F0F]">
            <h3 className="text-sm font-semibold text-white mb-4 text-center">Guía Rápida de Selección</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickGuide.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/5 rounded-xl"
                >
                  <p className="text-[11px] text-white/60 mb-1">{item.trigger}</p>
                  <p className="text-xs font-semibold text-white">{item.technique}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Section */}
          <div className="px-5 sm:px-6 py-4 bg-[#FAFAF9] dark:bg-[#1F1F1F] border-t border-[#E5E4E0] dark:border-[#333333]">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3 text-center">
              Mi Práctica Personal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              <div>
                <label className="text-xs text-[#706F6C] dark:text-[#A0A0A0] block mb-1.5">
                  La técnica que mejor me funciona:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#252525] text-sm text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97]"
                  placeholder="Ej: Respiración 4-7-8"
                />
              </div>
              <div>
                <label className="text-xs text-[#706F6C] dark:text-[#A0A0A0] block mb-1.5">
                  Voy a practicarla diariamente a las:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#252525] text-sm text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97]"
                  placeholder="Ej: 7:00 am"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-3 border-t border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#252525] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
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
