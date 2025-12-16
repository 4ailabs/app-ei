"use client"

import { useState, useCallback, useEffect } from 'react'
import { ArrowLeft, GraduationCap, Mic, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Message, DayNumber } from '@/lib/maestro/types'
import { getSystemPromptForDay } from '@/lib/maestro/prompts'
import { ChatInterface } from '@/components/maestro/ChatInterface'
import { DaySelector } from '@/components/maestro/DaySelector'
import { LiveVoiceInterface } from '@/components/maestro/LiveVoiceInterface'
import { useSidebar } from '@/components/providers/SidebarProvider'

interface RateLimitInfo {
  remaining: number
  limit: number
  resetAt: number
}

// LocalStorage helpers
const STORAGE_KEY = 'maestro-chat-history'
const MAX_MESSAGES_PER_DAY = 100 // Limitar para no llenar el storage

function loadMessagesFromStorage(day: DayNumber): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const allHistory = JSON.parse(stored) as Record<string, Message[]>
    return allHistory[day.toString()] || []
  } catch {
    return []
  }
}

function saveMessagesToStorage(day: DayNumber, messages: Message[]) {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const allHistory = stored ? JSON.parse(stored) : {}
    // Limitar mensajes por día
    allHistory[day.toString()] = messages.slice(-MAX_MESSAGES_PER_DAY)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory))
  } catch (error) {
    console.error('Error saving chat history:', error)
  }
}

function clearMessagesFromStorage(day: DayNumber) {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    const allHistory = JSON.parse(stored)
    delete allHistory[day.toString()]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory))
  } catch (error) {
    console.error('Error clearing chat history:', error)
  }
}

export function MaestroClient() {
  const { isCollapsed } = useSidebar()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DayNumber>(1)
  const [showVoiceMode, setShowVoiceMode] = useState(false)
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Cargar historial al montar y cuando cambia el día
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage(selectedDay)
    setMessages(savedMessages)
    setIsHydrated(true)
  }, [selectedDay])

  // Guardar historial cuando cambian los mensajes
  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      saveMessagesToStorage(selectedDay, messages)
    }
  }, [messages, selectedDay, isHydrated])

  const handleSendMessage = useCallback(async (text: string) => {
    const trimmedText = text.trim()
    if (!trimmedText || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: trimmedText,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      const response = await fetch('/api/maestro/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedText,
          history: messages,
          day: selectedDay
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Si es error de rate limit, actualizar el estado
        if (response.status === 429 && data.remaining !== undefined) {
          setRateLimit({
            remaining: 0,
            limit: data.limit || 15,
            resetAt: data.resetAt
          })
        }
        throw new Error(data.error || 'Error al enviar mensaje')
      }

      // Actualizar info de rate limit desde la respuesta
      if (data.rateLimit) {
        setRateLimit(data.rateLimit)
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.response,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Error:', error)
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: 'model',
        text: '⚠️ Ocurrió un error al procesar tu mensaje. Por favor intenta de nuevo.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [messages, selectedDay, isLoading])

  const handleQuickAction = useCallback((action: string) => {
    handleSendMessage(action)
  }, [handleSendMessage])

  const handleRegenerateMessage = useCallback(async (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId)
    if (messageIndex <= 0) return

    const previousUserMessage = messages[messageIndex - 1]
    if (previousUserMessage.role !== 'user') return

    setIsLoading(true)

    try {
      const history = messages.slice(0, messageIndex - 1)
      const response = await fetch('/api/maestro/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: previousUserMessage.text,
          history,
          day: selectedDay
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al regenerar')
      }

      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[messageIndex] = {
          ...newMessages[messageIndex],
          text: data.response,
          timestamp: Date.now()
        }
        return newMessages
      })
    } catch (error) {
      console.error('Error regenerating:', error)
    } finally {
      setIsLoading(false)
    }
  }, [messages, selectedDay])

  const handleDayChange = useCallback((day: DayNumber) => {
    setSelectedDay(day)
    // Los mensajes se cargarán automáticamente por el useEffect
  }, [])

  const handleClearHistory = useCallback(() => {
    if (confirm('¿Estás seguro de que quieres borrar el historial de esta conversación?')) {
      clearMessagesFromStorage(selectedDay)
      setMessages([])
    }
  }, [selectedDay])

  const handleOpenVoice = useCallback(() => {
    setShowVoiceMode(true)
  }, [])

  const handleCloseVoice = useCallback(() => {
    setShowVoiceMode(false)
  }, [])

  // Show voice mode fullscreen
  if (showVoiceMode) {
    return (
      <LiveVoiceInterface
        onClose={handleCloseVoice}
        systemPrompt={getSystemPromptForDay(selectedDay)}
      />
    )
  }

  return (
    <div className={`fixed inset-0 flex flex-col bg-white dark:bg-[#1A1A1A] z-50 transition-all duration-300 pb-safe ${
      isCollapsed ? 'lg:left-0' : 'lg:left-80'
    }`}>
      {/* Header - con pt-safe para respetar el notch en iOS */}
      <header className="border-b border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#1A1A1A] shrink-0 z-20 pt-safe">
        <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-[#F5F4F0] dark:hover:bg-[#333333] transition-colors"
          >
            <ArrowLeft size={20} className="text-[#706F6C] dark:text-[#B4B4B4]" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#DA7756] rounded-lg flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-base text-[#1A1915] dark:text-[#ECECEC]">
                Maestro IA
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DaySelector selectedDay={selectedDay} onDayChange={handleDayChange} />
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-lg hover:bg-[#F5F4F0] dark:hover:bg-[#333333] transition-colors text-[#706F6C] dark:text-[#B4B4B4] hover:text-red-500 dark:hover:text-red-400"
              title="Borrar historial"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            onClick={handleOpenVoice}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#ea580c] hover:bg-[#dc4e04] text-white text-sm font-medium rounded-lg transition-colors"
            title="Iniciar sesión de voz"
          >
            <Mic size={16} />
            <span className="hidden sm:inline">Voz</span>
          </button>
        </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 overflow-hidden min-h-0">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onQuickAction={handleQuickAction}
          onRegenerateMessage={handleRegenerateMessage}
          selectedDay={selectedDay}
          rateLimit={rateLimit}
        />
      </main>
    </div>
  )
}
