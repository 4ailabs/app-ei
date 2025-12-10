"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download } from "lucide-react"
import { toPng } from "html-to-image"

interface WindowOfToleranceCardProps {
  accentColor?: string
}

export function WindowOfToleranceCard({ accentColor = "#B8860B" }: WindowOfToleranceCardProps) {
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

  return (
    <div ref={cardRef} className="w-full bg-white dark:bg-[#252525] overflow-hidden border border-[#E5E4E0] dark:border-[#333333] rounded-xl">
      {/* Header */}
      <div className="relative px-10 py-8 rounded-t-xl" style={{ backgroundColor: accentColor, borderBottom: `3px solid ${accentColor}` }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1.5 font-serif tracking-tight">
              Mi Ventana de Tolerancia
            </h1>
            <p className="text-xs text-white/70 uppercase tracking-widest">Diagrama y Ejercicio de Autodiagnóstico</p>
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
            background: 'linear-gradient(90deg, #B8860B 33%, #1B6B4A 33%, #1B6B4A 66%, #4A5568 66%)'
          }}></div>
        </div>
        <p className="text-xs text-white/50 uppercase tracking-wide text-right mt-2">Material de Referencia</p>
      </div>

      {isExpanded && (
        <div className="flex-1 flex flex-col">
          {/* Intro Section */}
          <div className="px-10 py-6 border-b border-[#E5E4E0] dark:border-[#333333] bg-[#FAF9F7] dark:bg-[#1A1A1A]">
            <p className="text-[15px] text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed max-w-4xl">
              La Ventana de Tolerancia es el rango de activación fisiológica donde puedes funcionar de manera óptima: ni en hiperactivación ni en hipoactivación. <strong className="text-[#1a1a2e] dark:text-white font-semibold">Tu ventana puede expandirse con práctica sistemática.</strong>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Diagram Section */}
            <div className="px-10 py-8 border-r border-[#E5E4E0] dark:border-[#333333]">
              <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-5 pb-2.5 border-b border-[#E5E4E0] dark:border-[#333333] font-serif">
                Modelo de Zonas de Activación
              </h3>

              <div className="space-y-0">
                {/* Arrow container */}
                <div className="flex justify-between px-5 py-3 bg-white dark:bg-[#1A1A1A]">
                  <span className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0] flex items-center gap-1.5">
                    <span className="text-sm">↑</span> Hiperactivación
                  </span>
                  <span className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0] flex items-center gap-1.5">
                    Hipoactivación <span className="text-sm">↓</span>
                  </span>
                </div>

                {/* Hiperactivación Zone */}
                <div className="px-5 py-4 bg-[#FBF8F1] dark:bg-[#3A3320] border-l-4 border-[#B8860B]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B8860B] mb-1.5">Zona Superior</p>
                  <h4 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-2 font-serif">Hiperactivación (Simpático)</h4>
                  <div className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-normal">
                    <ul className="mt-1.5 space-y-0.5">
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Ansiedad, pánico, ira, agitación
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Pensamientos acelerados
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> "Demasiado encendido"
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Ventana de Tolerancia Zone */}
                <div className="px-5 py-6 bg-[#F0F7F4] dark:bg-[#1A3325] border-l-4 border-[#1B6B4A]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1B6B4A] mb-1.5">Zona Óptima</p>
                  <h4 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-2 font-serif">Ventana de Tolerancia</h4>
                  <div className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-normal">
                    <ul className="mt-1.5 space-y-0.5">
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Capacidad de pensar, sentir y actuar con flexibilidad
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Presencia y conexión con el momento
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Manejo adecuado del estrés moderado
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Hipoactivación Zone */}
                <div className="px-5 py-4 bg-[#F7F8F9] dark:bg-[#2A2A2A] border-l-4 border-[#4A5568]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4A5568] mb-1.5">Zona Inferior</p>
                  <h4 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-2 font-serif">Hipoactivación (Dorsal Vagal)</h4>
                  <div className="text-xs text-[#1A1915] dark:text-[#E5E5E5] leading-normal">
                    <ul className="mt-1.5 space-y-0.5">
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Entumecimiento, desconexión, colapso
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> Desesperanza, sensación de apagado
                      </li>
                      <li className="pl-3.5 relative">
                        <span className="absolute left-1 font-bold">·</span> "Demasiado apagado"
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Metaphor Box */}
              <div className="mt-6 p-5 bg-[#F5F4F0] dark:bg-[#2A2A2A] border border-[#E5E4E0] dark:border-[#333333] rounded-md">
                <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">Metáfora de la Temperatura</h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#B8860B] mt-1.5 flex-shrink-0"></div>
                    <div className="text-[#1A1915] dark:text-[#E5E5E5]">
                      <strong className="font-semibold">Agua muy caliente</strong> = Hiperactivación. Te quemas, saltas, necesitas salir.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#4A5568] mt-1.5 flex-shrink-0"></div>
                    <div className="text-[#1A1915] dark:text-[#E5E5E5]">
                      <strong className="font-semibold">Agua muy fría</strong> = Hipoactivación. Te congelas, te entumeces, no puedes moverte.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#1B6B4A] mt-1.5 flex-shrink-0"></div>
                    <div className="text-[#1A1915] dark:text-[#E5E5E5]">
                      <strong className="font-semibold">Temperatura perfecta</strong> = Ventana de Tolerancia. Puedes quedarte, funcionar bien.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Section */}
            <div className="px-10 py-8">
              <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-5 pb-2.5 border-b border-[#E5E4E0] dark:border-[#333333] font-serif">
                Ejercicio de Autodiagnóstico
              </h3>

              <div className="space-y-6">
                {/* Exercise 1 */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">1. Amplitud actual de mi ventana</h4>
                  <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0] mb-2">¿Qué tanta intensidad emocional puedo manejar sin perder claridad cognitiva?</p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 bg-gradient-to-r from-[#4A5568] via-[#1B6B4A] to-[#B8860B] rounded"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#706F6C] dark:text-[#A0A0A0] mb-2">
                    <span>1 — Muy estrecha</span>
                    <span>10 — Muy amplia</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-[#E5E4E0] dark:border-[#333333] rounded bg-[#FAF9F7] dark:bg-[#1A1A1A] text-[13px] mt-2 text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                    placeholder="Mi número: ___"
                  />
                </div>

                {/* Exercise 2 */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">2. Disparadores hacia hiperactivación</h4>
                  <textarea
                    className="w-full px-3 py-2.5 border border-[#E5E4E0] dark:border-[#333333] rounded bg-[#FAF9F7] dark:bg-[#1A1A1A] text-[13px] min-h-[60px] resize-y mt-2 text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                    placeholder="Situaciones que me aceleran / estresan / enojan..."
                  />
                </div>

                {/* Exercise 3 */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-2">3. Disparadores hacia hipoactivación</h4>
                  <textarea
                    className="w-full px-3 py-2.5 border border-[#E5E4E0] dark:border-[#333333] rounded bg-[#FAF9F7] dark:bg-[#1A1A1A] text-[13px] min-h-[60px] resize-y mt-2 text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                    placeholder="Situaciones que me apagan / desconectan / colapsan..."
                  />
                </div>

                {/* Exercise 4 */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">4. Factores que afectan mi ventana</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Expand Column */}
                    <div>
                      <h5 className="text-[11px] font-semibold mb-2.5 flex items-center gap-1.5 text-[#1B6B4A]">
                        Expanden (agrandan)
                      </h5>
                      <ul className="space-y-1">
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Sueño reparador
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Ejercicio regular
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Conexión social segura
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Prácticas de regulación
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Alimentación balanceada
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#1B6B4A] font-semibold">+</span> Tiempo en naturaleza
                        </li>
                      </ul>
                    </div>

                    {/* Contract Column */}
                    <div>
                      <h5 className="text-[11px] font-semibold mb-2.5 flex items-center gap-1.5 text-[#B8860B]">
                        Estrechan (reducen)
                      </h5>
                      <ul className="space-y-1">
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Privación de sueño
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Estrés crónico
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Aislamiento social
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Trauma no procesado
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Exceso de estimulantes
                        </li>
                        <li className="text-xs pl-[18px] relative text-[#1A1915] dark:text-[#E5E5E5]">
                          <span className="absolute left-0 text-[12px] text-[#B8860B] font-semibold">−</span> Sedentarismo
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-[#1a1a2e] dark:bg-[#1a1a2e] px-10 py-5 text-center">
            <p className="text-sm text-white/90 dark:text-white/90 leading-relaxed max-w-3xl mx-auto">
              El objetivo no es nunca salir de la ventana — eso es imposible. <strong className="text-white font-semibold">El objetivo es regresar más rápido cuando sales.</strong> Cada vez que te regulas conscientemente, le enseñas a tu sistema nervioso que puede manejar más.
            </p>
          </div>

          {/* Action Plan */}
          <div className="px-10 py-6 bg-[#FAF9F7] dark:bg-[#1A1A1A] border-t border-[#E5E4E0] dark:border-[#333333]">
            <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-4 text-center font-serif">
              Mi Plan de Expansión
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1B6B4A] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                  +
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5] block mb-1.5">
                    Una cosa que voy a AUMENTAR esta semana:
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded bg-white dark:bg-[#252525] text-[13px] text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B8860B] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                  −
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-[#1A1915] dark:text-[#E5E5E5] block mb-1.5">
                    Una cosa que voy a REDUCIR esta semana:
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded bg-white dark:bg-[#252525] text-[13px] text-[#1A1915] dark:text-[#E5E5E5] placeholder:text-[#9B9A97] dark:placeholder:text-[#666666]"
                    placeholder=""
                  />
                </div>
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
        </div>
      )}
    </div>
  )
}

