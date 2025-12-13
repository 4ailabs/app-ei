"use client"

import { useState, useCallback } from 'react'
import { ArrowLeft, GraduationCap, Mic } from 'lucide-react'
import Link from 'next/link'
import { Message, DayNumber } from '@/lib/maestro/types'
import { getSystemPromptForDay } from '@/lib/maestro/prompts'
import { ChatInterface } from '@/components/maestro/ChatInterface'
import { DaySelector } from '@/components/maestro/DaySelector'
import { LiveVoiceInterface } from '@/components/maestro/LiveVoiceInterface'

export default function MaestroPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DayNumber>(1)
  const [showVoiceMode, setShowVoiceMode] = useState(false)

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
        throw new Error(data.error || 'Error al enviar mensaje')
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
    setMessages([])
  }, [])

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
        selectedDay={selectedDay}
        systemPrompt={getSystemPromptForDay(selectedDay)}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1A1A1A]">
      {/* Header */}
      <header className="h-14 border-b border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#1A1A1A] flex items-center justify-between px-4 shrink-0 z-20">
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
          <button
            onClick={handleOpenVoice}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#ea580c] hover:bg-[#dc4e04] text-white text-sm font-medium rounded-lg transition-colors"
            title="Iniciar sesión de voz"
          >
            <Mic size={16} />
            <span className="hidden sm:inline">Voz</span>
          </button>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 overflow-hidden">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onQuickAction={handleQuickAction}
          onRegenerateMessage={handleRegenerateMessage}
          selectedDay={selectedDay}
        />
      </main>
    </div>
  )
}
