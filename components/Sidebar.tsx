"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import {
  Layout,
  BookOpen,
  LogOut,
  User,
  Menu,
  X,
  Settings,
  Video,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useSidebar } from "@/components/providers/SidebarProvider"

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
          ? 'bg-[#DA7756] text-white shadow-md dark:bg-[#DA7756] dark:text-white'
          : 'text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#DA7756]/10 dark:hover:bg-[#DA7756]/10 hover:text-[#DA7756] dark:hover:text-[#DA7756] hover:-translate-y-1'
        } ${mobile ? 'min-h-[48px]' : ''}`}
    >
      <div className={active ? 'text-white dark:text-white' : ''}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  )

  return (
    <Link href={href} className="block group" onClick={onClick}>
      {content}
    </Link>
  )
}

        const ADMIN_EMAIL = "admin@seminario.com"

        export function Sidebar() {
          const pathname = usePathname()
          const { data: session } = useSession()
          const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
          const { isCollapsed: isDesktopCollapsed, toggleCollapsed } = useSidebar()

          const isAdmin = session?.user?.email === ADMIN_EMAIL

          const closeMobileMenu = () => {
            setIsMobileMenuOpen(false)
          }

          return (
            <>
              {/* Mobile Header */}
              <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#FAF9F7] dark:bg-[#1A1A1A] border-b border-[#E5E4E0] dark:border-[#333333] z-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                        alt="Inteligencia Energética"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1A1915] dark:text-[#E5E5E5]">Inteligencia Energética</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 rounded-lg hover:bg-[#E5E4E0] dark:hover:bg-[#252525] transition-colors text-[#1A1915] dark:text-[#E5E5E5]"
                    >
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>
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
              <aside className={`lg:hidden fixed top-0 left-0 h-full bg-[#F5F4F0] dark:bg-[#1A1A1A] w-80 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-8 pt-20 flex flex-col space-y-12 h-full">
                  <div className="flex items-center space-x-3 pb-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                        alt="Inteligencia Energética"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1A1915] dark:text-[#E5E5E5]">Inteligencia Energética</span>
                  </div>

                  <nav className="flex-grow">
                    <div className="space-y-4">
                      <h3 className="px-6 text-sm font-semibold text-[#9B9A97] dark:text-[#808080] uppercase tracking-wider">MENÚ</h3>
                      <div className="space-y-2">
                        <NavItem
                          icon={<Layout className="w-6 h-6" />}
                          label="Panel"
                          href="/"
                          active={pathname === '/'}
                          mobile={true}
                          onClick={closeMobileMenu}
                        />
                    <NavItem
                      icon={<BookOpen className="w-6 h-6" />}
                      label="Sesiones"
                      href="/sesiones"
                      active={pathname.startsWith('/sesiones')}
                      mobile={true}
                      onClick={closeMobileMenu}
                    />
                        <NavItem
                          icon={<Video className="w-6 h-6" />}
                          label="Seminario On Line"
                          href="/seminario-online"
                          active={pathname === '/seminario-online' || pathname?.startsWith('/seminario-online/')}
                          mobile={true}
                          onClick={closeMobileMenu}
                        />
                        {isAdmin && (
                          <NavItem
                            icon={<Settings className="w-6 h-6" />}
                            label="Administración"
                            href="/admin"
                            active={pathname === '/admin'}
                            mobile={true}
                            onClick={closeMobileMenu}
                          />
                        )}
                      </div>
                    </div>

                    {session && (
                      <div className="mt-12 space-y-4">
                        <h3 className="px-6 text-sm font-semibold text-[#9B9A97] dark:text-[#808080] uppercase tracking-wider">USUARIO</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4 px-6 py-3 text-[#706F6C] dark:text-[#A0A0A0]">
                            <div className="p-1 bg-[#DA7756] dark:bg-[#333333] rounded-full">
                              <User className="h-4 w-4 text-white dark:text-[#E5E5E5]" />
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
                            className="w-full flex items-center space-x-4 px-6 py-3 rounded-full text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#E5E4E0] dark:hover:bg-[#252525] hover:text-[#1A1915] dark:hover:text-[#E5E5E5] transition-colors justify-start"
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

              {/* Botón para colapsar/expandir - Siempre visible */}
              <button
                onClick={toggleCollapsed}
                className="hidden lg:flex fixed top-4 z-[60] p-2 rounded-lg bg-white dark:bg-[#252525] border border-[#E5E4E0] dark:border-[#333333] hover:bg-[#F5F4F0] dark:hover:bg-[#333333] transition-all duration-300 text-[#1A1915] dark:text-[#E5E5E5] shadow-lg hover:shadow-xl"
                style={{
                  left: isDesktopCollapsed ? '0.5rem' : '18.5rem'
                }}
                aria-label={isDesktopCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              >
                {isDesktopCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>

              {/* Desktop Sidebar */}
              <aside className={`hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-[#F5F4F0] dark:bg-[#1A1A1A] flex flex-col overflow-hidden border-r border-[#E5E4E0] dark:border-[#333333] transition-all duration-300 ${isDesktopCollapsed ? 'lg:w-0 border-r-0' : 'lg:w-80'}`}>
                <div className={`flex flex-col space-y-12 h-full p-8 transition-all duration-300 ${isDesktopCollapsed ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                        alt="Inteligencia Energética"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <span className="text-lg font-bold text-[#1A1915] dark:text-[#E5E5E5]">Inteligencia Energética</span>
                  </div>
                  <ThemeToggle />
                </div>

                <nav className={`flex-grow min-h-0 transition-all duration-300 ${isDesktopCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  <div className="space-y-4">
                    <h3 className="px-6 text-sm font-semibold text-[#9B9A97] dark:text-[#808080] uppercase tracking-wider">MENÚ</h3>
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
                        href="/sesiones"
                        active={pathname.startsWith('/sesiones')}
                      />
                      <NavItem
                        icon={<Video className="w-6 h-6" />}
                        label="Seminario On Line"
                        href="/seminario-online"
                        active={pathname === '/seminario-online' || pathname?.startsWith('/seminario-online/')}
                      />
                      {isAdmin && (
                        <NavItem
                          icon={<Settings className="w-6 h-6" />}
                          label="Administración"
                          href="/admin"
                          active={pathname === '/admin'}
                        />
                      )}
                    </div>
                  </div>

                  {session && (
                    <div className="mt-12 space-y-4">
                      <h3 className="px-6 text-sm font-semibold text-[#9B9A97] dark:text-[#808080] uppercase tracking-wider">USUARIO</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4 px-6 py-3 text-[#706F6C] dark:text-[#A0A0A0]">
                          <div className="p-1 bg-[#DA7756] dark:bg-[#333333] rounded-full">
                            <User className="h-4 w-4 text-white dark:text-[#E5E5E5]" />
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
                          className="w-full flex items-center space-x-4 px-6 py-3 rounded-full text-[#706F6C] dark:text-[#A0A0A0] hover:bg-[#E5E4E0] dark:hover:bg-[#252525] hover:text-[#1A1915] dark:hover:text-[#E5E5E5] transition-colors justify-start"
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
            </>
          )
        }
