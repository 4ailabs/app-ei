"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10"
        disabled
      >
        <Sun className="h-5 w-5 text-[#706F6C]" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full w-10 h-10 hover:bg-[#F5F4F0] dark:hover:bg-[#4A4A4A] transition-all"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-[#B4B4B4]" />
      ) : (
        <Sun className="h-5 w-5 text-[#706F6C]" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
