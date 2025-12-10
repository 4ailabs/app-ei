"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download, Anchor, Wind, Target, MessageCircle, Brain, User, MapPin, Sparkles } from "lucide-react"
import { toPng } from "html-to-image"

interface PocketCardsProps {
  accentColor?: string
}

export function PocketCards({ accentColor = "#DA7756" }: PocketCardsProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(["T1", "T2", "T3", "T4", "T5", "T6"]))
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  const handleDownload = async (cardId: string) => {
    // Descargar ambas tarjetas (frente y reverso) como una imagen combinada
    const frontRef = cardRefs.current[`${cardId}-front`]
    const backRef = cardRefs.current[`${cardId}-back`]
    
    if (!frontRef || !backRef) {
      alert('Error: No se puede acceder a las tarjetas')
      return
    }

    setIsDownloading(cardId)
    try {
      const wasExpanded = expandedCards.has(cardId)
      if (!wasExpanded) {
        setExpandedCards(new Set([...expandedCards, cardId]))
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Capturar ambas tarjetas con tamaño fijo para impresión
      // 428px x 270px mantiene la proporción 85.6/53.98 de tarjeta de crédito
      const cardWidth = 428
      const cardHeight = Math.round(cardWidth * 53.98 / 85.6) // ~270px

      const [frontUrl, backUrl] = await Promise.all([
        toPng(frontRef, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          width: cardWidth,
          height: cardHeight,
          style: {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          }
        }),
        toPng(backRef, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          width: cardWidth,
          height: cardHeight,
          style: {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          }
        })
      ])

      // Crear un canvas combinado
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('No se pudo crear el contexto del canvas')
      }

      // Cargar las imágenes
      const frontImg = new Image()
      const backImg = new Image()
      
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          frontImg.onload = () => resolve()
          frontImg.onerror = reject
          frontImg.src = frontUrl
        }),
        new Promise<void>((resolve, reject) => {
          backImg.onload = () => resolve()
          backImg.onerror = reject
          backImg.src = backUrl
        })
      ])

      // Configurar el canvas para ambas tarjetas (lado a lado)
      const gap = 20
      canvas.width = frontImg.width + backImg.width + gap
      canvas.height = Math.max(frontImg.height, backImg.height)
      
      // Dibujar las imágenes
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(frontImg, 0, 0)
      ctx.drawImage(backImg, frontImg.width + gap, 0)

      // Descargar
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `tarjeta-${cardId.toLowerCase()}.png`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        }
      })

      if (!wasExpanded) {
        setExpandedCards(new Set(expandedCards))
      }
    } catch (error) {
      console.error('Error al descargar la imagen:', error)
      alert('Error al descargar la imagen. Por favor, intenta de nuevo.')
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* T1: Respiración 4-7-8 */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#1a1a2e] dark:border-[#1a1a2e] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#1a1a2e" }}
          data-header-buttons
          onClick={() => toggleCard("T1")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T1 — Respiración 4-7-8</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T1")
              }}
              disabled={isDownloading === "T1"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T1") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T1") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T1-front"] = el }} className="w-full max-w-[428px]">
                {/* T1 Front */}
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] rounded-lg p-6 text-white flex flex-col items-center justify-center aspect-[85.6/53.98] relative w-full">
                  <span className="absolute top-2 right-3 text-[7px] opacity-50 tracking-wide">T1</span>
                  <div className="font-serif text-sm font-semibold tracking-wider uppercase mb-4">Respiración 4-7-8</div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[rgba(27,107,74,0.8)] flex items-center justify-center font-serif text-lg font-bold mb-2">4</div>
                      <div className="text-[7px] uppercase tracking-wide opacity-80">Inhala</div>
                    </div>
                    <span className="text-xs opacity-50">→</span>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[rgba(217,119,6,0.8)] flex items-center justify-center font-serif text-lg font-bold mb-2">7</div>
                      <div className="text-[7px] uppercase tracking-wide opacity-80">Retén</div>
                    </div>
                    <span className="text-xs opacity-50">→</span>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[rgba(99,102,241,0.8)] flex items-center justify-center font-serif text-lg font-bold mb-2">8</div>
                      <div className="text-[7px] uppercase tracking-wide opacity-80">Exhala</div>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T1-back"] = el }} className="w-full max-w-[428px]">
                {/* T1 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-6 flex flex-col items-center justify-center aspect-[85.6/53.98] text-center w-full relative">
                  <div className="font-serif text-xl font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] mb-4 tracking-widest">INHALA 4 · RETÉN 7 · EXHALA 8</div>
                  <div className="text-[9px] text-[#706F6C] dark:text-[#A0A0A0] border-t border-[#E5E4E0] dark:border-[#4A4A4A] pt-3">
                    Úsala cuando sientas ansiedad subiendo.<br />Repite 3-4 ciclos completos.
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T2: Los 3 Estados */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#1a1a2e] dark:border-[#1a1a2e] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#1a1a2e" }}
          data-header-buttons
          onClick={() => toggleCard("T2")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T2 — Los 3 Estados</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T2")
              }}
              disabled={isDownloading === "T2"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T2") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T2") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T2-front"] = el }} className="w-full max-w-[428px]">
                {/* T2 Front */}
                <div className="bg-[#1a1a2e] rounded-lg p-5 text-white flex flex-col aspect-[85.6/53.98] relative w-full">
                  <div className="font-serif text-[11px] font-semibold tracking-wider uppercase text-center mb-3">Los 3 Estados</div>
                  <div className="flex justify-around items-center flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-11 h-11 rounded-full bg-[#1B6B4A] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="2" fill="none"/>
                          <circle cx="9" cy="10" r="1.5" fill="white"/>
                          <circle cx="15" cy="10" r="1.5" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-[6.5px] uppercase tracking-wide opacity-90">Ventral</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-11 h-11 rounded-full bg-[#D97706] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-[6.5px] uppercase tracking-wide opacity-90">Simpático</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-11 h-11 rounded-full bg-[#64748B] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                          <line x1="8" y1="10" x2="10" y2="10" stroke="white" strokeWidth="2"/>
                          <line x1="14" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2"/>
                          <line x1="8" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span className="text-[6.5px] uppercase tracking-wide opacity-90">Dorsal</span>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T2-back"] = el }} className="w-full max-w-[428px]">
                {/* T2 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-4 flex flex-col aspect-[85.6/53.98] text-[7px] relative w-full">
                  <div className="flex flex-1">
                    <div className="flex-1 p-2 border-l-2 border-[#1B6B4A] pl-2 first:border-l-0">
                      <div className="text-[6px] font-semibold uppercase tracking-wide mb-2 text-[#1B6B4A]">Ventral</div>
                      <div className="text-[#1A1915] dark:text-[#E5E5E5] leading-tight text-[6.5px]">
                        Calmado<br />Presente<br />Conectado<br />Claridad mental
                      </div>
                    </div>
                    <div className="flex-1 p-2 border-l-2 border-[#D97706] pl-2">
                      <div className="text-[6px] font-semibold uppercase tracking-wide mb-2 text-[#D97706]">Simpático</div>
                      <div className="text-[#1A1915] dark:text-[#E5E5E5] leading-tight text-[6.5px]">
                        Acelerado<br />Ansioso<br />Irritable<br />Pensamientos rápidos
                      </div>
                    </div>
                    <div className="flex-1 p-2 border-l-2 border-[#64748B] pl-2">
                      <div className="text-[6px] font-semibold uppercase tracking-wide mb-2 text-[#706F6C]">Dorsal</div>
                      <div className="text-[#1A1915] dark:text-[#E5E5E5] leading-tight text-[6.5px]">
                        Desconectado<br />Entumecido<br />Sin energía<br />"No tiene caso"
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T3: 5-4-3-2-1 */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#0891B2] dark:border-[#0891B2] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#0891B2" }}
          data-header-buttons
          onClick={() => toggleCard("T3")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T3 — Orientación 5-4-3-2-1</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T3")
              }}
              disabled={isDownloading === "T3"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T3") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T3") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T3-front"] = el }} className="w-full max-w-[428px]">
                {/* T3 Front */}
                <div className="bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-lg p-5 text-white flex flex-col items-center justify-center aspect-[85.6/53.98] relative w-full">
                  <div className="font-serif text-xs font-semibold tracking-wider uppercase mb-3">Orientación 5-4-3-2-1</div>
                  <div className="flex flex-col gap-1.5 w-full">
                    {[
                      { num: "5", text: "cosas que veo" },
                      { num: "4", text: "cosas que oigo" },
                      { num: "3", text: "cosas que toco" },
                      { num: "2", text: "cosas que huelo" },
                      { num: "1", text: "cosa que saboreo" }
                    ].map((item) => (
                      <div key={item.num} className="flex items-center gap-2 bg-white/15 rounded-lg py-1.5 px-3">
                        <span className="font-serif text-sm font-bold w-5">{item.num}</span>
                        <span className="text-[8px] uppercase tracking-wide">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T3-back"] = el }} className="w-full max-w-[428px]">
                {/* T3 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-6 flex flex-col items-center justify-center aspect-[85.6/53.98] text-center relative w-full">
                  <Anchor className="w-6 h-6 mb-3 text-[#1a1a2e] dark:text-[#E5E5E5]" />
                  <div className="font-serif text-sm font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] mb-2">Para anclarte al presente</div>
                  <div className="text-[8px] text-[#706F6C] dark:text-[#A0A0A0]">
                    Usa esta técnica cuando tu mente<br />esté atrapada en preocupaciones<br />o durante momentos de ansiedad.
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T4: Las 4 Palancas */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#B8860B] dark:border-[#B8860B] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#B8860B" }}
          data-header-buttons
          onClick={() => toggleCard("T4")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T4 — Las 4 Palancas del Estado</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T4")
              }}
              disabled={isDownloading === "T4"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T4") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T4") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T4-front"] = el }} className="w-full max-w-[428px]">
                {/* T4 Front */}
                <div className="bg-gradient-to-br from-[#B8860B] to-[#9A7209] rounded-lg p-4 text-white flex flex-col aspect-[85.6/53.98] relative w-full">
                  <div className="font-serif text-[11px] font-semibold tracking-wider uppercase text-center mb-2">Las 4 Palancas del Estado</div>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
                      <Wind className="w-3.5 h-3.5 mb-1" />
                      <span className="text-[7px] uppercase tracking-wide font-medium">Fisiología</span>
                    </div>
                    <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
                      <Target className="w-3.5 h-3.5 mb-1" />
                      <span className="text-[7px] uppercase tracking-wide font-medium">Enfoque</span>
                    </div>
                    <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
                      <MessageCircle className="w-3.5 h-3.5 mb-1" />
                      <span className="text-[7px] uppercase tracking-wide font-medium">Lenguaje</span>
                    </div>
                    <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
                      <Brain className="w-3.5 h-3.5 mb-1" />
                      <span className="text-[7px] uppercase tracking-wide font-medium">Imaginación</span>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T4-back"] = el }} className="w-full max-w-[428px]">
                {/* T4 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-4 flex flex-col aspect-[85.6/53.98] text-[7px] relative w-full">
                  {[
                    { label: "Fisiología:", desc: "Respiración 4-7-8, postura erguida" },
                    { label: "Enfoque:", desc: "¿Qué quiero NOTAR hoy?" },
                    { label: "Lenguaje:", desc: '"Estoy eligiendo..." en lugar de "Tengo que..."' },
                    { label: "Imaginación:", desc: "Visualiza el resultado deseado" }
                  ].map((tool, idx, arr) => (
                    <div key={idx} className={`flex gap-2 mb-2.5 pb-2 ${idx < arr.length - 1 ? 'border-b border-[#E5E4E0] dark:border-[#4A4A4A]' : ''}`}>
                      <span className="font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] min-w-[18mm] text-[6.5px]">{tool.label}</span>
                      <span className="text-[#1A1915] dark:text-[#A0A0A0] text-[6.5px] leading-tight">{tool.desc}</span>
                    </div>
                  ))}
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T5: Pregunta del Enfoque */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#6366F1] dark:border-[#6366F1] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#6366F1" }}
          data-header-buttons
          onClick={() => toggleCard("T5")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T5 — Pregunta del Enfoque</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T5")
              }}
              disabled={isDownloading === "T5"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T5") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T5") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T5-front"] = el }} className="w-full max-w-[428px]">
                {/* T5 Front */}
                <div className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-lg p-6 text-white flex flex-col items-center justify-center aspect-[85.6/53.98] text-center relative w-full">
                  <div className="text-[7px] uppercase tracking-widest opacity-80 mb-3">Pregunta del Enfoque</div>
                  <div className="font-serif text-base font-semibold leading-tight">¿Qué quiero<br />NOTAR hoy?</div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T5-back"] = el }} className="w-full max-w-[428px]">
                {/* T5 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-5 flex flex-col items-center justify-center aspect-[85.6/53.98] text-center relative w-full">
                  <Brain className="w-5 h-5 mb-3 text-[#1a1a2e] dark:text-[#E5E5E5]" />
                  <div className="text-[9px] text-[#1A1915] dark:text-[#E5E5E5] leading-tight mb-3">
                    Tu Sistema de Activación Reticular (SRA) busca lo que le instruyes.
                  </div>
                  <div className="font-serif text-[11px] font-semibold text-[#6366F1] dark:text-[#818CF8]">Lo que buscas, encuentras.</div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* T6: Mi Ancla de Recurso */}
      <div className="bg-white dark:bg-[#252525] rounded-xl border border-[#E5E4E0] dark:border-[#333333] shadow-sm overflow-hidden">
        <div 
          className="border-b-3 border-[#1B6B4A] dark:border-[#1B6B4A] p-4 flex items-center justify-between cursor-pointer"
          style={{ borderBottomColor: "#1B6B4A" }}
          data-header-buttons
          onClick={() => toggleCard("T6")}
        >
          <h3 className="font-serif text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">T6 — Mi Ancla de Recurso</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload("T6")
              }}
              disabled={isDownloading === "T6"}
              className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors"
              title="Descargar tarjeta"
            >
              <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
            </button>
            {expandedCards.has("T6") ? (
              <ChevronUp className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </div>
        </div>

        {expandedCards.has("T6") && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={(el) => { cardRefs.current["T6-front"] = el }} className="w-full max-w-[428px]">
                {/* T6 Front */}
                <div className="bg-[#1B6B4A] rounded-lg p-4 text-white flex flex-col aspect-[85.6/53.98] relative w-full">
                  <div className="font-serif text-[11px] font-semibold tracking-wide uppercase text-center mb-3">Mi Ancla de Recurso</div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <div className="flex-1">
                        <div className="text-[6px] uppercase tracking-wide opacity-80">Una persona segura</div>
                        <div className="border-b border-dotted border-white/50 h-4 mt-1"></div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <div className="flex-1">
                        <div className="text-[6px] uppercase tracking-wide opacity-80">Un lugar de calma</div>
                        <div className="border-b border-dotted border-white/50 h-4 mt-1"></div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      <div className="flex-1">
                        <div className="text-[6px] uppercase tracking-wide opacity-80">Una cualidad propia</div>
                        <div className="border-b border-dotted border-white/50 h-4 mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight">inteligencia-energetica.com</div>
                </div>
              </div>
              <div ref={(el) => { cardRefs.current["T6-back"] = el }} className="w-full max-w-[428px]">
                {/* T6 Back */}
                <div className="bg-[#FDFBF7] dark:bg-[#2A2A2A] rounded-lg p-5 flex flex-col items-center justify-center aspect-[85.6/53.98] text-center relative w-full">
                  <div className="text-[7px] uppercase tracking-wide text-[#706F6C] dark:text-[#A0A0A0] mb-3">Cuando me desregule</div>
                  <div className="font-serif text-[13px] font-semibold text-[#1B6B4A] dark:text-[#3FBE9F] leading-tight">
                    Accedo a mis recursos:<br />persona, lugar, cualidad.<br />Respiro y me anclo.
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[4px] opacity-40 tracking-tight text-[#706F6C] dark:text-[#808080]">inteligencia-energetica.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

