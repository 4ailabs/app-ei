export interface Message {
  id: string
  role: 'user' | 'model'
  text: string
  timestamp: number
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  lastModified: number
}

export type ViewState = 'chat' | 'topics' | 'exercises' | 'saved' | 'about' | 'overview'

export interface Topic {
  id: string
  title: string
  description: string
  subtopics: string[]
}

export interface Exercise {
  id: string
  title: string
  category: string
  prompt: string
}

export type DayNumber = 1 | 2 | 3

export interface DayConfig {
  number: DayNumber
  name: string
  title: string
  description: string
  colors: {
    primary: string
    secondary: string
    gradient: string
    badge: string
    badgeText: string
  }
}
