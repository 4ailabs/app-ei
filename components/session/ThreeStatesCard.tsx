"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ThreeStatesCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#252525] overflow-hidden border border-[#E2E8F0] dark:border-[#333333] rounded-lg">
      {/* Header */}
      <div 
        className="relative bg-[#1a1a2e] dark:bg-[#1a1a2e] px-10 py-8 cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1.5 font-serif tracking-tight">
              Los 3 Estados del Sistema Nervioso
            </h1>
            <p className="text-xs text-white/70 uppercase tracking-widest">Teoría Polivagal Aplicada</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50 uppercase tracking-wide">Material de Referencia</p>
            <button className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
        {/* Gradient line at bottom - 3 colors representing the 3 states */}
        <div className="absolute bottom-0 left-10 right-10 h-0.5">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(to right, #1B6B4A 0%, #1B6B4A 33%, #B8860B 33%, #B8860B 66%, #4A5568 66%, #4A5568 100%)'
          }}></div>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Intro Section */}
          <div className="px-10 py-6 border-b border-[#E2E8F0] dark:border-[#333333] bg-[#FAFBFC] dark:bg-[#1A1A1A]">
            <p className="text-[15px] text-[#2D3748] dark:text-[#E5E5E5] leading-relaxed max-w-3xl">
              Tu sistema nervioso tiene tres estados diferenciados. <strong className="text-[#1a1a2e] dark:text-[#E5E5E5] font-semibold">No estás "roto" — estás respondiendo.</strong> Reconocer en qué estado te encuentras es el primer paso para la autorregulación consciente.
            </p>
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Estado 1: Ventral Vagal */}
            <div className="border-r border-[#E2E8F0] dark:border-[#333333] last:border-r-0">
              <div className="relative pt-6 pb-5 px-6 text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B6B4A]"></div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1B6B4A] dark:text-[#1B6B4A] mb-3">Estado I</p>
                <h2 className="text-2xl font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] mb-1 font-serif">Ventral Vagal</h2>
                <p className="text-xs text-[#718096] dark:text-[#A0A0A0] font-medium">Seguridad y Conexión</p>
              </div>
              <div className="px-6 pb-6 space-y-5">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Experiencia subjetiva</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Calma con estado de alerta
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Presencia y conexión
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Claridad cognitiva
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Apertura hacia otros
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales somáticas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Respiración lenta y profunda
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Musculatura relajada
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Expresión facial dinámica
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Prosodia vocal variada
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales cognitivas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Capacidad de resolución
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Curiosidad activa
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Flexibilidad mental
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#1B6B4A] opacity-40"></span>
                      Acceso a creatividad
                    </li>
                  </ul>
                </div>
                <div className="bg-[#F0F7F4] dark:bg-[#1A1A1A] rounded-md p-4 mt-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#1B6B4A] dark:text-[#1B6B4A] mb-2.5">Intervención</h4>
                  <p className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] leading-relaxed">
                    Estado óptimo. Registrar las sensaciones asociadas para facilitar el reconocimiento futuro. Desde este estado es posible realizar trabajo terapéutico profundo.
                  </p>
                </div>
              </div>
            </div>

            {/* Estado 2: Simpático */}
            <div className="border-r border-[#E2E8F0] dark:border-[#333333] last:border-r-0">
              <div className="relative pt-6 pb-5 px-6 text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8860B]"></div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#B8860B] dark:text-[#B8860B] mb-3">Estado II</p>
                <h2 className="text-2xl font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] mb-1 font-serif">Simpático</h2>
                <p className="text-xs text-[#718096] dark:text-[#A0A0A0] font-medium">Movilización Defensiva</p>
              </div>
              <div className="px-6 pb-6 space-y-5">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Experiencia subjetiva</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Aceleración, ansiedad, irritabilidad
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Urgencia por actuar
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Dificultad para calmarse
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Hipervigilancia
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales somáticas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Taquicardia
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Respiración superficial y rápida
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Tensión en hombros y mandíbula
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Extremidades frías o sudorosas
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales cognitivas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Pensamiento acelerado
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Percepción de urgencia global
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Déficit atencional
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"></span>
                      Sesgo hacia amenazas
                    </li>
                  </ul>
                </div>
                <div className="bg-[#FBF8F1] dark:bg-[#1A1A1A] rounded-md p-4 mt-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#B8860B] dark:text-[#B8860B] mb-2.5">Intervención</h4>
                  <ul className="space-y-1 text-[13px] text-[#2D3748] dark:text-[#E5E5E5]">
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#B8860B] font-semibold">→</span> Respiración 4-7-8 (3 ciclos)</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#B8860B] font-semibold">→</span> Descarga motora (sacudir, caminar)</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#B8860B] font-semibold">→</span> Orientación sensorial 5-4-3-2-1</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#B8860B] font-semibold">→</span> Estímulo térmico frío en muñecas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Estado 3: Dorsal Vagal */}
            <div className="border-r border-[#E2E8F0] dark:border-[#333333] last:border-r-0">
              <div className="relative pt-6 pb-5 px-6 text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#4A5568]"></div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4A5568] dark:text-[#4A5568] mb-3">Estado III</p>
                <h2 className="text-2xl font-semibold text-[#1a1a2e] dark:text-[#E5E5E5] mb-1 font-serif">Dorsal Vagal</h2>
                <p className="text-xs text-[#718096] dark:text-[#A0A0A0] font-medium">Inmovilización Defensiva</p>
              </div>
              <div className="px-6 pb-6 space-y-5">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Experiencia subjetiva</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Desconexión, entumecimiento
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Agotamiento, sensación de apagado
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Desesperanza
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Deseo de desaparecer
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales somáticas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Pesadez corporal, hipotonía
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Respiración muy superficial
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Mirada desenfocada
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Voz monótona o mutismo
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] dark:text-[#A0A0A0] mb-2.5 pb-1.5 border-b border-[#E2E8F0] dark:border-[#333333]">Señales cognitivas</h3>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      "No tiene sentido"
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      "No puedo hacer nada"
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Enlentecimiento cognitivo
                    </li>
                    <li className="text-[13px] text-[#2D3748] dark:text-[#E5E5E5] pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#4A5568] opacity-40"></span>
                      Despersonalización
                    </li>
                  </ul>
                </div>
                <div className="bg-[#F7F8F9] dark:bg-[#1A1A1A] rounded-md p-4 mt-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[#4A5568] dark:text-[#4A5568] mb-2.5">Intervención</h4>
                  <ul className="space-y-1 text-[13px] text-[#2D3748] dark:text-[#E5E5E5]">
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#4A5568] font-semibold">→</span> Movimiento suave (estiramientos)</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#4A5568] font-semibold">→</span> Estímulo térmico cálido</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#4A5568] font-semibold">→</span> Orientación verbal (nombrar objetos)</li>
                    <li className="pl-5 relative"><span className="absolute left-0 text-[#4A5568] font-semibold">→</span> Co-regulación (contacto social seguro)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-[#1a1a2e] dark:bg-[#1a1a2e] px-10 py-6">
            <h3 className="text-base font-semibold text-white mb-4 text-center font-serif">Síntesis Operativa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/8 rounded-md border-l-4 border-[#1B6B4A]">
                <div>
                  <span className="block text-xs font-semibold text-white mb-0.5">Ventral Vagal</span>
                  <span className="text-[11px] text-white/70 leading-snug">Seguridad percibida → Mantener, anclar, trabajar</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/8 rounded-md border-l-4 border-[#B8860B]">
                <div>
                  <span className="block text-xs font-semibold text-white mb-0.5">Simpático</span>
                  <span className="text-[11px] text-white/70 leading-snug">Activación excesiva → Reducir arousal</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/8 rounded-md border-l-4 border-[#4A5568]">
                <div>
                  <span className="block text-xs font-semibold text-white mb-0.5">Dorsal Vagal</span>
                  <span className="text-[11px] text-white/70 leading-snug">Hipoactivación → Elevar energía gradualmente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-4 border-t border-[#E2E8F0] dark:border-[#333333] bg-[#FAFBFC] dark:bg-[#1A1A1A] flex justify-between items-center">
            <div className="text-[11px] text-[#718096] dark:text-[#A0A0A0]">
              <strong className="text-[#2D3748] dark:text-[#E5E5E5] font-semibold">Dr. Miguel Ojeda Rios</strong> · Seminario Internacional de Inteligencia Energética
            </div>
            <div className="text-[10px] text-[#718096] dark:text-[#A0A0A0] text-right">
              <span className="font-semibold text-[#2D3748] dark:text-[#E5E5E5]">Instituto Centro Bioenergética</span><br />
              inteligencia-energetica.com
            </div>
          </div>
        </>
      )}
    </div>
  )
}
