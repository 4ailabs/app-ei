"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download } from "lucide-react"
import { toPng } from "html-to-image"

interface RegulationToolsCardProps {
  accentColor?: string
}

export function RegulationToolsCard({ accentColor = "#2563EB" }: RegulationToolsCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!cardRef.current) {
      alert('Error: No se puede acceder al elemento de la tarjeta')
      return
    }

    setIsDownloading(true)
    try {
      // Asegurar que la tarjeta esté expandida antes de capturar
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
          // Excluir botones de la captura
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

  return (
    <div ref={cardRef} className="w-full bg-white dark:bg-[#252525] overflow-hidden border border-[#E5E4E0] dark:border-[#333333] rounded-xl">
      {/* Header */}
      <div className="relative px-10 py-7 rounded-t-xl" style={{ backgroundColor: accentColor, borderBottom: `3px solid ${accentColor}` }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1.5 font-serif tracking-tight">
              Herramientas de Regulación
            </h1>
            <p className="text-[13px] text-white/70 uppercase tracking-wider">Las 4 Técnicas Fundamentales</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload()
              }}
              disabled={isDownloading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              title="Descargar como imagen"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? 'Descargando...' : 'Descargar'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title={isExpanded ? "Colapsar" : "Expandir"}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
        {/* Gradient line */}
        <div className="absolute bottom-0 left-10 right-10 h-[3px]">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(90deg, #2563EB 25%, #7C3AED 25%, #7C3AED 50%, #0891B2 50%, #0891B2 75%, #B8860B 75%)'
          }}></div>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Intro Section */}
          <div className="px-10 py-5 border-b border-[#E5E4E0] dark:border-[#333333] bg-[#FAF9F7] dark:bg-[#1A1A1A]">
            <p className="text-sm text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
              Estas cuatro técnicas constituyen el kit básico de autorregulación del sistema nervioso. <strong className="text-[#1a1a2e] dark:text-white font-semibold">Practícalas en estado de calma</strong> para que estén disponibles automáticamente cuando las necesites.
            </p>
          </div>

          {/* Techniques Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Técnica 1: Respiración 4-7-8 */}
            <div className="px-7 py-6 border-b border-[#E5E4E0] dark:border-[#333333] lg:border-r lg:border-b relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#2563EB]">
              <div className="mb-4">
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#2563EB] mb-1.5">Técnica I</p>
                <h3 className="text-xl font-semibold text-[#1a1a2e] dark:text-white mb-1 font-serif">Respiración 4-7-8</h3>
                <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] italic">Activación del sistema parasimpático</p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Mecanismo</h4>
                <p className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                  La exhalación prolongada activa el nervio vago, funcionando como freno natural del sistema nervioso simpático.
                </p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Protocolo</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#2563EB]">1.</span> Inhalar por nariz contando hasta 4
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#2563EB]">2.</span> Retener el aire contando hasta 7
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#2563EB]">3.</span> Exhalar por boca contando hasta 8
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#2563EB]">4.</span> Repetir 3-4 ciclos completos
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-[#EFF6FF] dark:bg-[#1A2A4A] rounded-md mt-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#2563EB] mb-1.5">Indicaciones</h4>
                <ul className="space-y-0.5">
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#2563EB]">→</span> Previo a situaciones estresantes
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#2563EB]">→</span> Ansiedad en ascenso
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#2563EB]">→</span> Dificultad para conciliar sueño
                  </li>
                </ul>
              </div>
            </div>

            {/* Técnica 2: Abrazo de Mariposa */}
            <div className="px-7 py-6 border-b border-[#E5E4E0] dark:border-[#333333] lg:border-b-0 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#7C3AED]">
              <div className="mb-4">
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#7C3AED] mb-1.5">Técnica II</p>
                <h3 className="text-xl font-semibold text-[#1a1a2e] dark:text-white mb-1 font-serif">Abrazo de Mariposa</h3>
                <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] italic">Estimulación bilateral y auto-contención</p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Mecanismo</h4>
                <p className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                  La estimulación bilateral alternada facilita la integración interhemisférica y el procesamiento emocional.
                </p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Protocolo</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#7C3AED]">1.</span> Cruzar brazos sobre el pecho (manos en clavículas)
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#7C3AED]">2.</span> Alternar toques suaves: derecha, izquierda
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#7C3AED]">3.</span> Mantener ritmo lento (1 toque/segundo)
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#7C3AED]">4.</span> Continuar 30-60 segundos
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-[#F5F3FF] dark:bg-[#2A1A3A] rounded-md mt-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#7C3AED] mb-1.5">Indicaciones</h4>
                <ul className="space-y-0.5">
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#7C3AED]">→</span> Angustia o ansiedad aguda
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#7C3AED]">→</span> Previo a conversaciones difíciles
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#7C3AED]">→</span> Necesidad de auto-consuelo discreto
                  </li>
                </ul>
              </div>
            </div>

            {/* Técnica 3: Orientación 5-4-3-2-1 */}
            <div className="px-7 py-6 border-b border-[#E5E4E0] dark:border-[#333333] lg:border-r lg:border-b-0 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#0891B2]">
              <div className="mb-4">
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#0891B2] mb-1.5">Técnica III</p>
                <h3 className="text-xl font-semibold text-[#1a1a2e] dark:text-white mb-1 font-serif">Orientación 5-4-3-2-1</h3>
                <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] italic">Anclaje sensorial al presente</p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Mecanismo</h4>
                <p className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                  El uso sistemático de los cinco sentidos reorienta la atención al momento presente, interrumpiendo rumiación y disociación.
                </p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Protocolo</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#0891B2]">5</span> cosas que puedes VER (nombrarlas)
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#0891B2]">4</span> cosas que puedes ESCUCHAR
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#0891B2]">3</span> cosas que puedes TOCAR/SENTIR
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#0891B2]">2</span> cosas que puedes OLER
                  </li>
                  <li className="text-xs text-[#1A1915] dark:text-[#E5E5E5] pl-6 relative leading-normal">
                    <span className="absolute left-0 font-semibold text-[11px] text-[#0891B2]">1</span> cosa que puedes SABOREAR
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-[#ECFEFF] dark:bg-[#1A3A3A] rounded-md mt-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#0891B2] mb-1.5">Indicaciones</h4>
                <ul className="space-y-0.5">
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#0891B2]">→</span> Mente atrapada en preocupaciones
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#0891B2]">→</span> Durante o después de flashbacks
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#0891B2]">→</span> Sensación de disociación
                  </li>
                </ul>
              </div>
            </div>

            {/* Técnica 4: Contacto Tranquilizador */}
            <div className="px-7 py-6 border-b-0 border-[#E5E4E0] dark:border-[#333333] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#B8860B]">
              <div className="mb-4">
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#B8860B] mb-1.5">Técnica IV</p>
                <h3 className="text-xl font-semibold text-[#1a1a2e] dark:text-white mb-1 font-serif">Contacto Tranquilizador</h3>
                <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] italic">Activación de seguridad mediante tacto</p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Mecanismo</h4>
                <p className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
                  El tacto afectivo libera oxitocina y envía señales de seguridad al sistema límbico, facilitando la regulación descendente.
                </p>
              </div>

              <div className="mb-3.5 last:mb-0">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">Opciones</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-[11px] p-2.5 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded border border-[#E5E4E0] dark:border-[#333333]">
                    <strong className="block text-[11px] text-[#B8860B] mb-0.5">A. Mano en corazón</strong>
                    Sentir calor y latido
                  </div>
                  <div className="text-[11px] p-2.5 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded border border-[#E5E4E0] dark:border-[#333333]">
                    <strong className="block text-[11px] text-[#B8860B] mb-0.5">B. Mano en abdomen</strong>
                    Sentir movimiento respiratorio
                  </div>
                  <div className="text-[11px] p-2.5 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded border border-[#E5E4E0] dark:border-[#333333]">
                    <strong className="block text-[11px] text-[#B8860B] mb-0.5">C. Auto-abrazo</strong>
                    Brazos cruzados, apretar suave
                  </div>
                  <div className="text-[11px] p-2.5 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded border border-[#E5E4E0] dark:border-[#333333]">
                    <strong className="block text-[11px] text-[#B8860B] mb-0.5">D. Sostener rostro</strong>
                    Manos en mejillas, respirar
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FBF8F1] dark:bg-[#3A3320] rounded-md mt-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-[#B8860B] mb-1.5">Indicaciones</h4>
                <ul className="space-y-0.5">
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#B8860B]">→</span> Necesidad de consuelo inmediato
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#B8860B]">→</span> Despertar de pesadillas
                  </li>
                  <li className="text-[11px] pl-3.5 relative text-[#1A1915] dark:text-[#E5E5E5]">
                    <span className="absolute left-0 text-[10px] text-[#B8860B]">→</span> Ritual previo al sueño
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-[#1a1a2e] dark:bg-[#1a1a2e] px-10 py-6">
            <h3 className="text-base font-semibold text-white mb-4 text-center font-serif">
              Guía Rápida de Selección
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white/8 dark:bg-white/8 rounded-md border-l-[3px] border-[#2563EB]">
                <p className="text-[11px] text-white/70 dark:text-white/70 mb-1.5 leading-snug">Ansiedad subiendo</p>
                <p className="text-xs font-semibold text-white">Respiración 4-7-8</p>
              </div>
              <div className="p-3.5 bg-white/8 dark:bg-white/8 rounded-md border-l-[3px] border-[#7C3AED]">
                <p className="text-[11px] text-white/70 dark:text-white/70 mb-1.5 leading-snug">Angustia / necesito calmarme</p>
                <p className="text-xs font-semibold text-white">Abrazo de Mariposa</p>
              </div>
              <div className="p-3.5 bg-white/8 dark:bg-white/8 rounded-md border-l-[3px] border-[#0891B2]">
                <p className="text-[11px] text-white/70 dark:text-white/70 mb-1.5 leading-snug">Atrapado en pensamientos</p>
                <p className="text-xs font-semibold text-white">Orientación 5-4-3-2-1</p>
              </div>
              <div className="p-3.5 bg-white/8 dark:bg-white/8 rounded-md border-l-[3px] border-[#B8860B]">
                <p className="text-[11px] text-white/70 dark:text-white/70 mb-1.5 leading-snug">Necesito contención</p>
                <p className="text-xs font-semibold text-white">Contacto Tranquilizador</p>
              </div>
            </div>
          </div>

          {/* Practice Section */}
          <div className="px-10 py-5 bg-[#FAF9F7] dark:bg-[#1A1A1A] border-t border-[#E5E4E0] dark:border-[#333333]">
            <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-3 text-center font-serif">
              Mi Práctica Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[600px] mx-auto">
              <div>
                <label className="text-xs font-medium text-[#1A1915] dark:text-[#E5E5E5] block mb-1.5">
                  La técnica que mejor me funciona:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-[#E5E4E0] dark:border-[#333333] rounded bg-white dark:bg-[#252525] text-[13px] text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                  placeholder=""
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#1A1915] dark:text-[#E5E5E5] block mb-1.5">
                  Voy a practicarla diariamente a las:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-[#E5E4E0] dark:border-[#333333] rounded bg-white dark:bg-[#252525] text-[13px] text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-4 border-t border-[#E5E4E0] dark:border-[#333333] flex justify-between items-center bg-white dark:bg-[#252525]">
            <div className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0]">
              <strong className="text-[#1A1915] dark:text-[#E5E5E5] font-semibold">Dr. Miguel Ojeda Rios</strong> · Seminario Internacional de Inteligencia Energética
            </div>
            <div className="text-[10px] text-[#706F6C] dark:text-[#A0A0A0] text-right">
              <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5]">Instituto Centro Bioenergética</span><br />
              inteligencia-energetica.com
            </div>
          </div>
        </>
      )}
    </div>
  )
}

