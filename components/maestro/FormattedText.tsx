"use client"

import React from 'react'

interface FormattedTextProps {
  text: string
  className?: string
}

export function FormattedText({ text, className = '' }: FormattedTextProps) {
  const processText = (inputText: string) => {
    const lines = inputText.split('\n')
    const elements: React.ReactElement[] = []
    let inCodeBlock = false
    let codeLines: string[] = []
    let listItems: React.ReactElement[] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-1.5 my-3 ml-1">
            {listItems}
          </ul>
        )
        listItems = []
      }
    }

    const processInlineFormatting = (text: string) => {
      const parts: (string | React.ReactElement)[] = []
      let remaining = text
      let key = 0

      while (remaining.length > 0) {
        // Bold **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
        if (boldMatch && boldMatch.index !== undefined) {
          if (boldMatch.index > 0) {
            parts.push(remaining.substring(0, boldMatch.index))
          }
          parts.push(
            <strong key={`bold-${key++}`} className="font-semibold text-[#1A1915] dark:text-[#ECECEC]">
              {boldMatch[1]}
            </strong>
          )
          remaining = remaining.substring(boldMatch.index + boldMatch[0].length)
          continue
        }

        // Italic *text*
        const italicMatch = remaining.match(/\*(.+?)\*/)
        if (italicMatch && italicMatch.index !== undefined) {
          if (italicMatch.index > 0) {
            parts.push(remaining.substring(0, italicMatch.index))
          }
          parts.push(
            <em key={`italic-${key++}`} className="italic text-[#1A1915] dark:text-[#B4B4B4]">
              {italicMatch[1]}
            </em>
          )
          remaining = remaining.substring(italicMatch.index + italicMatch[0].length)
          continue
        }

        // Inline code `code`
        const codeMatch = remaining.match(/`(.+?)`/)
        if (codeMatch && codeMatch.index !== undefined) {
          if (codeMatch.index > 0) {
            parts.push(remaining.substring(0, codeMatch.index))
          }
          parts.push(
            <code key={`code-${key++}`} className="px-1.5 py-0.5 bg-[#F5F4F0] dark:bg-[#333333] text-[#1A1915] dark:text-[#ECECEC] rounded text-sm font-mono">
              {codeMatch[1]}
            </code>
          )
          remaining = remaining.substring(codeMatch.index + codeMatch[0].length)
          continue
        }

        parts.push(remaining)
        break
      }

      return <>{parts}</>
    }

    lines.forEach((line, lineIndex) => {
      // Code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${lineIndex}`} className="bg-[#1A1915] dark:bg-[#1a1a1a] text-[#ECECEC] p-4 rounded-lg overflow-x-auto my-3 text-sm font-mono border border-transparent dark:border-[#333333]">
              <code>{codeLines.join('\n')}</code>
            </pre>
          )
          codeLines = []
          inCodeBlock = false
        } else {
          flushList()
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        codeLines.push(line)
        return
      }

      // Headers
      const h1Match = line.match(/^# (.+)/)
      if (h1Match) {
        flushList()
        elements.push(
          <h1 key={`h1-${lineIndex}`} className="text-2xl font-bold text-[#1A1915] dark:text-[#ECECEC] mt-6 mb-3">
            {processInlineFormatting(h1Match[1])}
          </h1>
        )
        return
      }

      const h2Match = line.match(/^## (.+)/)
      if (h2Match) {
        flushList()
        elements.push(
          <h2 key={`h2-${lineIndex}`} className="text-xl font-semibold text-[#1A1915] dark:text-[#ECECEC] mt-5 mb-2">
            {processInlineFormatting(h2Match[1])}
          </h2>
        )
        return
      }

      const h3Match = line.match(/^### (.+)/)
      if (h3Match) {
        flushList()
        elements.push(
          <h3 key={`h3-${lineIndex}`} className="text-lg font-semibold text-[#1A1915] dark:text-[#ECECEC] mt-4 mb-2">
            {processInlineFormatting(h3Match[1])}
          </h3>
        )
        return
      }

      // Lists
      const bulletMatch = line.match(/^[\s]*[-•*]\s+(.+)/)
      const numberedMatch = line.match(/^[\s]*\d+\.\s+(.+)/)

      if (bulletMatch || numberedMatch) {
        const content = bulletMatch ? bulletMatch[1] : numberedMatch![1]
        listItems.push(
          <li key={`li-${lineIndex}`} className="flex items-start text-[#706F6C] dark:text-[#B4B4B4]">
            <span className="mr-2 text-[#DA7756] select-none mt-0.5">•</span>
            <span className="flex-1">{processInlineFormatting(content)}</span>
          </li>
        )
        return
      } else {
        flushList()
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<div key={`empty-${lineIndex}`} className="h-3" />)
        return
      }

      // Regular paragraphs
      elements.push(
        <p key={`p-${lineIndex}`} className="leading-7 mb-3 text-[#706F6C] dark:text-[#B4B4B4]">
          {processInlineFormatting(line)}
        </p>
      )
    })

    flushList()
    return elements
  }

  return (
    <div className={`w-full text-[#706F6C] dark:text-[#B4B4B4] ${className}`}>
      {processText(text)}
    </div>
  )
}
