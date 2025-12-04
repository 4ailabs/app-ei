"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import {
  Layout,
  BookOpen,
  LogOut,
  User,
  Zap,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  mobile?: boolean
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active, mobile = false, onClick }) => {
  const content = (
    <div
      className={`flex items-center space-x-4 px-6 py-3 rounded-full text-sm lg:text-base transition-all duration-300 transform ${active
          ? 'bg-black text-white shadow-md'
          : 'text-gray-500 hover:bg-gray-200 hover:-translate-y-1'
        } ${mobile ? 'min-h-[48px]' : ''}`}
    >
      <div className={active ? 'text-white' : ''}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  )

  if (onClick) {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
        className="block"
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileNavigation = (href: string) => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-black rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold">Inteligencia Energética</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-[#F7F8FA] w-80 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-8 pt-20 flex flex-col space-y-12 h-full">
          <div className="flex items-center space-x-3 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold">Inteligencia Energética</span>
          </div>

          <nav className="flex-grow">
            <div className="space-y-4">
              <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">MENÚ</h3>
              <div className="space-y-2">
                <NavItem
                  icon={<Layout className="w-6 h-6" />}
                  label="Panel"
                  href="/"
                  active={pathname === '/'}
                  mobile={true}
                  onClick={() => handleMobileNavigation('/')}
                />
                <NavItem
                  icon={<BookOpen className="w-6 h-6" />}
                  label="Sesiones"
                  href="/sesiones/1"
                  active={pathname.startsWith('/sesiones')}
                  mobile={true}
                  onClick={() => handleMobileNavigation('/sesiones/1')}
                />
              </div>
            </div>

            {session && (
              <div className="mt-12 space-y-4">
                <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">USUARIO</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 px-6 py-3 text-gray-500">
                    <div className="p-1 bg-black rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">{session.user?.email?.split('@')[0]}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      setIsMobileMenuOpen(false)
                      try {
                        await signOut({ redirect: false })
                        window.location.href = "/login"
                      } catch (error) {
                        console.error("Error al cerrar sesión:", error)
                        window.location.href = "/login"
                      }
                    }}
                    className="w-full flex items-center space-x-4 px-6 py-3 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-colors justify-start"
                  >
                    <LogOut className="w-6 h-6" />
                    <span>Salir</span>
                  </Button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:relative top-0 left-0 h-full bg-[#F7F8FA] p-8 flex flex-col space-y-12">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-black rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-bold">Inteligencia Energética</span>
        </div>

        <nav className="flex-grow">
          <div className="space-y-4">
            <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">MENÚ</h3>
            <div className="space-y-2">
              <NavItem
                icon={<Layout className="w-6 h-6" />}
                label="Panel"
                href="/"
                active={pathname === '/'}
              />
              <NavItem
                icon={<BookOpen className="w-6 h-6" />}
                label="Sesiones"
                href="/sesiones/1"
                active={pathname.startsWith('/sesiones')}
              />
            </div>
          </div>

          {session && (
            <div className="mt-12 space-y-4">
              <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">USUARIO</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4 px-6 py-3 text-gray-500">
                  <div className="p-1 bg-black rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{session.user?.email?.split('@')[0]}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    try {
                      await signOut({ redirect: false })
                      window.location.href = "/login"
                    } catch (error) {
                      console.error("Error al cerrar sesión:", error)
                      window.location.href = "/login"
                    }
                  }}
                  className="w-full flex items-center space-x-4 px-6 py-3 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-colors justify-start"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Salir</span>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
