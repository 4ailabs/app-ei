"use client"

import { signOut, useSession } from "next-auth/react"
import { Zap, LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF9F7] border-b border-[#E5E4E0]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-[#DA7756] rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#1A1915]">
                Inteligencia Energética
              </span>
              <span className="text-[10px] text-[#9B9A97] -mt-1 hidden sm:block">
                Seminario Internacional
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {session && (
              <>
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-[#706F6C] hover:bg-[#F5F4F0] hover:text-[#1A1915] transition-colors rounded-full"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </Link>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F5F4F0] rounded-full">
                  <div className="p-1 bg-[#DA7756] rounded-full">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1A1915] font-medium">
                    {session.user?.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    signOut({
                      callbackUrl: "/login",
                      redirect: true
                    }).catch((error) => {
                      console.error("Error al cerrar sesión:", error)
                      // Fallback: redirigir manualmente si signOut falla
                      if (typeof window !== "undefined") {
                        window.location.href = "/login"
                      }
                    })
                  }}
                  className="flex items-center gap-2 text-[#706F6C] hover:bg-[#F5F4F0] hover:text-[#1A1915] transition-colors rounded-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
