"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ThreeStatesCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-[#252525] rounded-2xl shadow-lg overflow-hidden border border-[#E5E4E0] dark:border-[#333333]">
      {/* Header */}
      <div 
        className="relative bg-gradient-to-r from-[#1a365d] to-[#2d3748] px-8 py-7 text-center overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">
              Los 3 Estados del Sistema Nervioso
            </h1>
            <p className="text-sm text-white/85">Tarjeta de Referencia Rápida</p>
          </div>
          <button className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-white" />
            ) : (
              <ChevronDown className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Intro Box */}
          <div className="mx-5 mt-5 p-4 rounded-lg bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] dark:from-[#2A2A2A] dark:to-[#1F1F1F] border-l-4 border-[#6366F1]">
            <p className="text-sm text-[#4B5563] dark:text-[#A0A0A0] leading-relaxed">
              Tu sistema nervioso tiene 3 estados. No estás "roto" — estás respondiendo. Reconocer en qué estado estás es el primer paso para regularte.
            </p>
          </div>

          {/* States Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {/* Estado 1: Ventral Vagal */}
        <div className="rounded-xl overflow-hidden border border-[#E5E4E0] dark:border-[#333333]">
          <div className="bg-gradient-to-br from-[#2D8659] to-[#1E5C3D] px-4 py-5 text-center text-white">
            <p className="text-xs font-bold opacity-70 tracking-wide mb-2">ESTADO 1</p>
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center border-2 border-white/80 rounded-full">
              <div className="w-3 h-3 bg-white/90 rounded-full"></div>
            </div>
            <h2 className="text-lg font-semibold mb-1 font-serif">Ventral Vagal</h2>
            <p className="text-xs uppercase tracking-wider opacity-85 font-semibold">Seguridad y Conexión</p>
          </div>
          <div className="bg-[#E8F5EE] dark:bg-[#2A2A2A] p-4 space-y-3">
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Cómo se siente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Calmado pero alerta</li>
                <li className="pl-4 relative">• Presente y conectado</li>
                <li className="pl-4 relative">• Capaz de pensar con claridad</li>
                <li className="pl-4 relative">• Abierto a los demás</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en el cuerpo</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Respiración lenta y profunda</li>
                <li className="pl-4 relative">• Hombros relajados</li>
                <li className="pl-4 relative">• Rostro expresivo</li>
                <li className="pl-4 relative">• Voz con variación de tono</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en la mente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Puedo resolver problemas</li>
                <li className="pl-4 relative">• Me siento curioso</li>
                <li className="pl-4 relative">• Puedo ver opciones</li>
                <li className="pl-4 relative">• Tengo acceso a mi creatividad</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-lg p-3 border border-[#E5E4E0] dark:border-[#333333]">
              <h3 className="text-xs uppercase tracking-wide text-[#2D8659] dark:text-[#2D8659] mb-2 font-bold">Qué hacer</h3>
              <p className="text-xs text-[#1F2937] dark:text-[#E5E5E5] leading-relaxed">
                ¡Disfrútalo! Este es tu estado óptimo. Nota cómo se siente para reconocerlo. Desde aquí puedes hacer trabajo profundo.
              </p>
            </div>
          </div>
        </div>

        {/* Estado 2: Simpático */}
        <div className="rounded-xl overflow-hidden border border-[#E5E4E0] dark:border-[#333333]">
          <div className="bg-gradient-to-br from-[#D97706] to-[#B45309] px-4 py-5 text-center text-white">
            <p className="text-xs font-bold opacity-70 tracking-wide mb-2">ESTADO 2</p>
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[9px] border-r-[9px] border-b-[16px] border-transparent border-b-white/90"></div>
            </div>
            <h2 className="text-lg font-semibold mb-1 font-serif">Simpático</h2>
            <p className="text-xs uppercase tracking-wider opacity-85 font-semibold">Pelea o Huida</p>
          </div>
          <div className="bg-[#FEF3E2] dark:bg-[#2A2A2A] p-4 space-y-3">
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Cómo se siente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Acelerado, ansioso, irritable</li>
                <li className="pl-4 relative">• Necesidad de actuar YA</li>
                <li className="pl-4 relative">• Dificultad para calmarse</li>
                <li className="pl-4 relative">• Hipervigilante</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en el cuerpo</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Corazón acelerado</li>
                <li className="pl-4 relative">• Respiración rápida y superficial</li>
                <li className="pl-4 relative">• Tensión en hombros y mandíbula</li>
                <li className="pl-4 relative">• Manos frías o sudorosas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en la mente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Pensamientos acelerados</li>
                <li className="pl-4 relative">• Todo parece urgente</li>
                <li className="pl-4 relative">• Dificultad para concentrarse</li>
                <li className="pl-4 relative">• Veo amenazas por todos lados</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-lg p-3 border border-[#E5E4E0] dark:border-[#333333]">
              <h3 className="text-xs uppercase tracking-wide text-[#D97706] dark:text-[#D97706] mb-2 font-bold">Qué hacer</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-5 relative"><span className="absolute left-1 text-[#D97706]">→</span> Respiración 4-7-8 (3 ciclos)</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#D97706]">→</span> Movimiento físico (sacudir)</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#D97706]">→</span> Orientación 5-4-3-2-1</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#D97706]">→</span> Agua fría en muñecas/cara</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Estado 3: Dorsal Vagal */}
        <div className="rounded-xl overflow-hidden border border-[#E5E4E0] dark:border-[#333333]">
          <div className="bg-gradient-to-br from-[#4B5563] to-[#374151] px-4 py-5 text-center text-white">
            <p className="text-xs font-bold opacity-70 tracking-wide mb-2">ESTADO 3</p>
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <div className="w-7 h-7 bg-white/90 rounded"></div>
            </div>
            <h2 className="text-lg font-semibold mb-1 font-serif">Dorsal Vagal</h2>
            <p className="text-xs uppercase tracking-wider opacity-85 font-semibold">Colapso o Congelamiento</p>
          </div>
          <div className="bg-[#F3F4F6] dark:bg-[#2A2A2A] p-4 space-y-3">
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Cómo se siente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Desconectado, entumecido</li>
                <li className="pl-4 relative">• Sin energía, "apagado"</li>
                <li className="pl-4 relative">• Desesperanza</li>
                <li className="pl-4 relative">• Querer desaparecer</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en el cuerpo</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• Cuerpo pesado, sin fuerza</li>
                <li className="pl-4 relative">• Respiración muy superficial</li>
                <li className="pl-4 relative">• Mirada perdida</li>
                <li className="pl-4 relative">• Voz monótona o sin hablar</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#A0A0A0] mb-2 font-bold">Señales en la mente</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-4 relative">• "No tiene caso"</li>
                <li className="pl-4 relative">• "No puedo hacer nada"</li>
                <li className="pl-4 relative">• Dificultad para pensar</li>
                <li className="pl-4 relative">• Sensación de irrealidad</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-lg p-3 border border-[#E5E4E0] dark:border-[#333333]">
              <h3 className="text-xs uppercase tracking-wide text-[#4B5563] dark:text-[#4B5563] mb-2 font-bold">Qué hacer</h3>
              <ul className="space-y-1 text-xs text-[#1F2937] dark:text-[#E5E5E5]">
                <li className="pl-5 relative"><span className="absolute left-1 text-[#4B5563]">→</span> Movimiento suave (estirar)</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#4B5563]">→</span> Contacto con agua tibia</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#4B5563]">→</span> Nombrar objetos en voz alta</li>
                <li className="pl-5 relative"><span className="absolute left-1 text-[#4B5563]">→</span> Llamar a alguien seguro</li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-[#F8FAFC] dark:bg-[#1A1A1A] px-5 py-4 border-t border-[#E5E4E0] dark:border-[#333333]">
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#E5E5E5] mb-3 text-center font-serif">
          Resumen Rápido
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#333333]">
            <div className="w-9 h-9 rounded-full bg-[#2D8659] flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <div className="text-xs leading-snug">
              <strong className="block text-[#2D8659] dark:text-[#2D8659] text-sm mb-0.5">Ventral Vagal</strong>
              Seguro y conectado → Disfrutar, trabajar, conectar
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#333333]">
            <div className="w-9 h-9 rounded-full bg-[#D97706] flex items-center justify-center flex-shrink-0">
              <div className="w-0 h-0 border-l-2 border-r-2 border-b-[7px] border-transparent border-b-white"></div>
            </div>
            <div className="text-xs leading-snug">
              <strong className="block text-[#D97706] dark:text-[#D97706] text-sm mb-0.5">Simpático</strong>
              Activado, ansioso → Bajar la activación
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#333333]">
            <div className="w-9 h-9 rounded-full bg-[#4B5563] flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-white rounded"></div>
            </div>
            <div className="text-xs leading-snug">
              <strong className="block text-[#4B5563] dark:text-[#4B5563] text-sm mb-0.5">Dorsal Vagal</strong>
              Apagado, colapsado → Subir energía suavemente
            </div>
          </div>
        </div>
        </div>
        </>
      )}

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2d3748] px-5 py-3 text-center">
        <p className="text-xs text-white/70 tracking-wide">
          Seminario Internacional de Inteligencia Energética • Dr. Miguel Ojeda Rios • Instituto Centro Bioenergética
        </p>
      </div>
    </div>
  )
}

