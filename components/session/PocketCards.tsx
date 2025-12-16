"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Download, CreditCard, Wind, Zap, Eye, Target, Brain, Anchor } from "lucide-react"
import { toPng } from "html-to-image"

interface PocketCardsProps {
  accentColor?: string
}

export function PocketCards({ accentColor = "#DA7756" }: PocketCardsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
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

      const cardWidth = 428
      const cardHeight = Math.round(cardWidth * 53.98 / 85.6)

      const [frontUrl, backUrl] = await Promise.all([
        toPng(frontRef, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          width: cardWidth,
          height: cardHeight,
          style: { width: `${cardWidth}px`, height: `${cardHeight}px` }
        }),
        toPng(backRef, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          width: cardWidth,
          height: cardHeight,
          style: { width: `${cardWidth}px`, height: `${cardHeight}px` }
        })
      ])

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('No se pudo crear el contexto del canvas')

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

      const gap = 20
      canvas.width = frontImg.width + backImg.width + gap
      canvas.height = Math.max(frontImg.height, backImg.height)

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(frontImg, 0, 0)
      ctx.drawImage(backImg, frontImg.width + gap, 0)

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

  const pocketCards = [
    {
      id: "T1",
      title: "Respiración 4-7-8",
      icon: Wind,
      color: "#2563EB",
      front: {
        title: "Respiración 4-7-8",
        content: (
          <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/80 flex items-center justify-center text-white text-xl font-bold">4</div>
              <span className="text-[8px] mt-1 opacity-80">Inhala</span>
            </div>
            <span className="text-white/50">→</span>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/80 flex items-center justify-center text-white text-xl font-bold">7</div>
              <span className="text-[8px] mt-1 opacity-80">Retén</span>
            </div>
            <span className="text-white/50">→</span>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center text-white text-xl font-bold">8</div>
              <span className="text-[8px] mt-1 opacity-80">Exhala</span>
            </div>
          </div>
        )
      },
      back: {
        title: "INHALA 4 · RETÉN 7 · EXHALA 8",
        description: "Úsala cuando sientas ansiedad subiendo. Repite 3-4 ciclos completos."
      }
    },
    {
      id: "T2",
      title: "Los 3 Estados",
      icon: Zap,
      color: "#1A1915",
      front: {
        title: "Los 3 Estados",
        content: (
          <div className="flex justify-around items-center w-full">
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="9" cy="10" r="1.5" fill="white"/>
                  <circle cx="15" cy="10" r="1.5" fill="white"/>
                </svg>
              </div>
              <span className="text-[8px] opacity-80">Ventral</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
                </svg>
              </div>
              <span className="text-[8px] opacity-80">Simpático</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-slate-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="10" x2="10" y2="10" stroke="white" strokeWidth="2"/>
                  <line x1="14" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-[8px] opacity-80">Dorsal</span>
            </div>
          </div>
        )
      },
      back: {
        columns: [
          { title: "Ventral", color: "#1B6B4A", items: ["Calmado", "Presente", "Conectado"] },
          { title: "Simpático", color: "#D97706", items: ["Acelerado", "Ansioso", "Irritable"] },
          { title: "Dorsal", color: "#64748B", items: ["Desconectado", "Entumecido", "Sin energía"] }
        ]
      }
    },
    {
      id: "T3",
      title: "Orientación 5-4-3-2-1",
      icon: Eye,
      color: "#0891B2",
      front: {
        title: "Orientación 5-4-3-2-1",
        content: (
          <div className="flex flex-col gap-1 w-full px-4">
            {[
              { num: "5", text: "cosas que veo" },
              { num: "4", text: "cosas que oigo" },
              { num: "3", text: "cosas que toco" },
              { num: "2", text: "cosas que huelo" },
              { num: "1", text: "cosa que saboreo" }
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-2 bg-white/15 rounded-lg py-1.5 px-3">
                <span className="text-sm font-bold w-5">{item.num}</span>
                <span className="text-[9px] uppercase tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        )
      },
      back: {
        icon: Anchor,
        title: "Para anclarte al presente",
        description: "Usa esta técnica cuando tu mente esté atrapada en preocupaciones o durante momentos de ansiedad."
      }
    },
    {
      id: "T4",
      title: "Las 4 Palancas",
      icon: Target,
      color: "#D97706",
      front: {
        title: "Las 4 Palancas del Estado",
        content: (
          <div className="grid grid-cols-2 gap-2 w-full px-4">
            <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
              <Wind className="w-4 h-4 mb-1" />
              <span className="text-[8px] uppercase tracking-wide font-medium">Fisiología</span>
            </div>
            <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
              <Target className="w-4 h-4 mb-1" />
              <span className="text-[8px] uppercase tracking-wide font-medium">Enfoque</span>
            </div>
            <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mb-1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="text-[8px] uppercase tracking-wide font-medium">Lenguaje</span>
            </div>
            <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center p-2">
              <Brain className="w-4 h-4 mb-1" />
              <span className="text-[8px] uppercase tracking-wide font-medium">Imaginación</span>
            </div>
          </div>
        )
      },
      back: {
        items: [
          { label: "Fisiología:", desc: "Respiración 4-7-8, postura erguida" },
          { label: "Enfoque:", desc: '"¿Qué quiero NOTAR hoy?"' },
          { label: "Lenguaje:", desc: '"Estoy eligiendo..." en lugar de "Tengo que..."' },
          { label: "Imaginación:", desc: "Visualiza el resultado deseado" }
        ]
      }
    },
    {
      id: "T5",
      title: "Pregunta del Enfoque",
      icon: Brain,
      color: "#6366F1",
      front: {
        title: "Pregunta del Enfoque",
        content: (
          <div className="text-center">
            <p className="text-xl font-semibold leading-tight">¿Qué quiero<br />NOTAR hoy?</p>
          </div>
        )
      },
      back: {
        icon: Brain,
        title: "Lo que buscas, encuentras.",
        description: "Tu Sistema de Activación Reticular (SRA) busca lo que le instruyes."
      }
    },
    {
      id: "T6",
      title: "Mi Ancla de Recurso",
      icon: Anchor,
      color: "#1B6B4A",
      front: {
        title: "Mi Ancla de Recurso",
        content: (
          <div className="flex flex-col gap-2 w-full px-3">
            <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <div className="flex-1">
                <div className="text-[7px] uppercase tracking-wide opacity-80">Una persona segura</div>
                <div className="border-b border-dotted border-white/50 h-3 mt-1"></div>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div className="flex-1">
                <div className="text-[7px] uppercase tracking-wide opacity-80">Un lugar de calma</div>
                <div className="border-b border-dotted border-white/50 h-3 mt-1"></div>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg py-2.5 px-3 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <div className="flex-1">
                <div className="text-[7px] uppercase tracking-wide opacity-80">Una cualidad propia</div>
                <div className="border-b border-dotted border-white/50 h-3 mt-1"></div>
              </div>
            </div>
          </div>
        )
      },
      back: {
        title: "Cuando me desregule",
        description: "Accedo a mis recursos: persona, lugar, cualidad. Respiro y me anclo."
      }
    }
  ]

  return (
    <div className="w-full bg-white dark:bg-[#252525] rounded-2xl border border-[#E5E4E0] dark:border-[#333333] overflow-hidden shadow-sm">
      {/* Header */}
      <div
        className="px-5 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-[#FAFAF9] dark:hover:bg-[#2A2A2A] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: accentColor }} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1915] dark:text-[#E5E5E5]">
                Tarjetas de Bolsillo
              </h2>
              <p className="text-xs sm:text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                6 tarjetas descargables para imprimir
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#E5E4E0] dark:border-[#333333]">
          {/* Intro */}
          <div className="px-5 sm:px-6 py-4 bg-[#FAFAF9] dark:bg-[#1F1F1F]">
            <p className="text-sm text-[#1A1915] dark:text-[#E5E5E5] leading-relaxed">
              Descarga estas tarjetas tamaño billetera para tenerlas siempre a mano. <strong className="font-semibold">Imprímelas a doble cara</strong> y llévalas contigo como recordatorios rápidos.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="divide-y divide-[#E5E4E0] dark:divide-[#333333]">
            {pocketCards.map((card) => {
              const Icon = card.icon
              const isCardExpanded = expandedCards.has(card.id)

              return (
                <div key={card.id}>
                  {/* Card Header */}
                  <div
                    className="px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between cursor-pointer hover:bg-[#FAFAF9] dark:hover:bg-[#2A2A2A] transition-colors"
                    onClick={() => toggleCard(card.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: card.color }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#706F6C] dark:text-[#A0A0A0]">
                          {card.id}
                        </span>
                        <h3 className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">{card.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(card.id)
                        }}
                        disabled={isDownloading === card.id}
                        className="p-1.5 hover:bg-[#F5F4F0] dark:hover:bg-[#333333] rounded-lg transition-colors disabled:opacity-50"
                        title="Descargar tarjeta"
                      >
                        <Download className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                      </button>
                      {isCardExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#706F6C] dark:text-[#A0A0A0]" />
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  {isCardExpanded && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Front */}
                        <div
                          ref={(el) => { cardRefs.current[`${card.id}-front`] = el }}
                          className="rounded-xl p-5 text-white flex flex-col items-center justify-center aspect-[85.6/53.98] relative"
                          style={{ background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)` }}
                        >
                          <span className="absolute top-2 right-3 text-[8px] opacity-50">{card.id}</span>
                          <div className="text-[11px] font-semibold tracking-wider uppercase mb-4 text-center">
                            {card.front.title}
                          </div>
                          {card.front.content}
                          <div className="absolute bottom-1.5 right-2 text-[5px] opacity-40">inteligencia-energetica.com</div>
                        </div>

                        {/* Back */}
                        <div
                          ref={(el) => { cardRefs.current[`${card.id}-back`] = el }}
                          className="bg-[#FAFAF9] dark:bg-[#1F1F1F] rounded-xl p-5 flex flex-col items-center justify-center aspect-[85.6/53.98] text-center relative border border-[#E5E4E0] dark:border-[#333333]"
                        >
                          {card.back.icon && (
                            <card.back.icon className="w-6 h-6 mb-3 text-[#1A1915] dark:text-[#E5E5E5]" />
                          )}
                          {card.back.title && (
                            <div className="text-sm font-semibold text-[#1A1915] dark:text-[#E5E5E5] mb-2" style={{ color: card.back.icon ? undefined : card.color }}>
                              {card.back.title}
                            </div>
                          )}
                          {card.back.description && (
                            <div className="text-[10px] text-[#706F6C] dark:text-[#A0A0A0] leading-relaxed">
                              {card.back.description}
                            </div>
                          )}
                          {card.back.columns && (
                            <div className="flex w-full h-full">
                              {card.back.columns.map((col, i) => (
                                <div key={i} className="flex-1 p-2 border-l-2 first:border-l-0" style={{ borderColor: col.color }}>
                                  <div className="text-[8px] font-semibold uppercase tracking-wide mb-2" style={{ color: col.color }}>{col.title}</div>
                                  <div className="text-[8px] text-[#1A1915] dark:text-[#E5E5E5] leading-tight">
                                    {col.items.map((item, j) => <div key={j}>{item}</div>)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {card.back.items && (
                            <div className="w-full text-left space-y-2">
                              {card.back.items.map((item, i) => (
                                <div key={i} className="flex gap-2 text-[9px]">
                                  <span className="font-semibold text-[#1A1915] dark:text-[#E5E5E5] min-w-[70px]" style={{ color: card.color }}>{item.label}</span>
                                  <span className="text-[#706F6C] dark:text-[#A0A0A0]">{item.desc}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="absolute bottom-1.5 right-2 text-[5px] opacity-40 text-[#706F6C]">inteligencia-energetica.com</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-3 border-t border-[#E5E4E0] dark:border-[#333333] bg-[#FAFAF9] dark:bg-[#1F1F1F]">
            <p className="text-[11px] text-[#706F6C] dark:text-[#A0A0A0] text-center">
              Tamaño de tarjeta: 85.6 × 54 mm (formato estándar de tarjeta de crédito)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
