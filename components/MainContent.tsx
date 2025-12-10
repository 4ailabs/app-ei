"use client"

import { ReactNode } from "react"
import { useSidebar } from "@/components/providers/SidebarProvider"

export function MainContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <main
      className={`flex-1 p-2 lg:p-8 lg:mt-0 mt-16 transition-all duration-300 overflow-x-hidden ${
        isCollapsed ? 'lg:ml-0' : 'lg:ml-80'
      }`}
    >
      {children}
    </main>
  )
}
