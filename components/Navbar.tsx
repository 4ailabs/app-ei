"use client"

import { signOut, useSession } from "next-auth/react"
import { Zap, LogOut, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-black rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-black">
                Inteligencia Energética
              </span>
              <span className="text-[10px] text-gray-500 -mt-1 hidden sm:block">
                Seminario Internacional
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {session && (
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                  <div className="p-1 bg-black rounded-full">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {session.user?.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors rounded-full"
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
