"use client"

import { useState, useEffect, useRef } from 'react'
import { Send, User, GraduationCap, Copy, RotateCw, ChevronDown, Check } from 'lucide-react'
import { Message, DayNumber } from '@/lib/maestro/types'
import { DAY_CONFIGS } from '@/lib/maestro/constants'
import { FormattedText } from './FormattedText'

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (text: string) => void
  isLoading: boolean
  onQuickAction: (action: string) => void
  onRegenerateMessage?: (messageId: string) => void
  selectedDay: DayNumber
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  onQuickAction,
  onRegenerateMessage,
  selectedDay
}: ChatInterfaceProps) {
  const dayConfig = DAY_CONFIGS[selectedDay]
  const [inputText, setInputText] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const MAX_MESSAGE_LENGTH = 4000

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    setShowScrollButton(false)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `Hace ${minutes}m`
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputText.trim()

    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH || isLoading) return

    onSendMessage(trimmed)
    setInputText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  // Welcome Screen - Claude style
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#0f0f0f] overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full text-center px-4">
            <div className="w-16 h-16 bg-[#ea580c] rounded-lg flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={32} className="text-white" />
            </div>

            <h1 className="text-3xl font-semibold text-gray-900 dark:text-[#e8e8e8] mb-4">
              ¿En qué puedo ayudarte?
            </h1>

            <p className="text-base text-gray-600 dark:text-[#b4b4b4] mb-8 max-w-lg mx-auto">
              Pregunta sobre los contenidos del seminario, solicita ejercicios prácticos o profundiza en cualquier concepto de {dayConfig.name}.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => onQuickAction('¿Qué es la ventana de tolerancia?')}
                className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
              >
                Ventana de tolerancia
              </button>
              <button
                onClick={() => onQuickAction('Guíame en respiración 4-7-8')}
                className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
              >
                Respiración 4-7-8
              </button>
              <button
                onClick={() => onQuickAction('Explícame las 4 palancas del estado')}
                className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
              >
                4 Palancas
              </button>
            </div>
          </div>
        </div>

        {/* Input Area - Claude style */}
        <div className="shrink-0 border-t border-gray-200 dark:border-[#2a2a2a] bg-[#fafafa] dark:bg-[#1a1a1a]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
            <div className="relative rounded-xl border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#212121] focus-within:border-gray-400 dark:focus-within:border-[#4a4a4a] transition-all">
              <textarea
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                className="w-full px-4 py-3 pr-24 bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-40 text-base text-gray-900 dark:text-[#e8e8e8] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
                rows={1}
                maxLength={MAX_MESSAGE_LENGTH}
              />

              <div className="absolute right-2 bottom-2">
                <button
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isLoading}
                  className={`p-2 rounded-lg transition-all ${
                    inputText.trim() && !isLoading
                      ? 'bg-[#ea580c] hover:bg-[#dc4e04] text-white'
                      : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-400 dark:text-[#737373] cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#0f0f0f] relative isolate">
      {/* Messages Area - Claude style */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="space-y-6 sm:space-y-8">
            {messages.map((msg) => (
              <div key={msg.id} className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-[#DA7756]' : 'bg-[#ea580c]'
                  }`}>
                    {msg.role === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <GraduationCap size={16} className="text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className={`text-sm sm:text-base leading-7 ${
                      msg.role === 'user' ? 'text-gray-900 dark:text-[#e8e8e8]' : 'text-gray-800 dark:text-[#d4d4d4]'
                    }`}>
                      <FormattedText text={msg.text} />
                    </div>

                    {/* Action Buttons - Claude style */}
                    <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-[#b4b4b4] hover:text-gray-700 dark:hover:text-[#e8e8e8] transition-colors"
                        title="Copiar"
                      >
                        {copiedId === msg.id ? (
                          <Check size={14} className="text-green-600 dark:text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      {msg.role === 'model' && onRegenerateMessage && (
                        <button
                          onClick={() => onRegenerateMessage(msg.id)}
                          disabled={isLoading}
                          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-[#b4b4b4] hover:text-gray-700 dark:hover:text-[#e8e8e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Regenerar"
                        >
                          <RotateCw size={14} />
                        </button>
                      )}
                      <span className="text-xs text-gray-400 dark:text-[#737373] ml-2">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator - Claude style */}
            {isLoading && (
              <div className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#ea580c] flex items-center justify-center">
                    <GraduationCap size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 py-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div ref={messagesEndRef} />

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-[#e8e8e8] p-2.5 rounded-full shadow-md transition-colors z-20"
            aria-label="Ir al final"
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* Input Area - Claude style */}
      <div className="shrink-0 border-t border-gray-200 dark:border-[#2a2a2a] bg-[#fafafa] dark:bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          {/* Quick Actions - Claude style */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <button
              onClick={() => onQuickAction('Hazme un quiz')}
              className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
            >
              Quiz
            </button>
            <button
              onClick={() => onQuickAction('Profundiza más')}
              className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
            >
              Profundizar
            </button>
            <button
              onClick={() => onQuickAction('Dame un ejemplo')}
              className="px-3 py-1.5 bg-white dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-[#e8e8e8] text-sm rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] whitespace-nowrap transition-all"
            >
              Ejemplo
            </button>
          </div>

          {/* Input Container - Claude style */}
          <div className="relative rounded-xl border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#212121] focus-within:border-gray-400 dark:focus-within:border-[#4a4a4a] transition-all">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="w-full px-4 py-3 pr-24 bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-40 text-base text-gray-900 dark:text-[#e8e8e8] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH}
            />

            <div className="absolute right-2 bottom-2">
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim() || isLoading}
                className={`p-2 rounded-lg transition-all ${
                  inputText.trim() && !isLoading
                    ? 'bg-[#ea580c] hover:bg-[#dc4e04] text-white'
                    : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-400 dark:text-[#737373] cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
