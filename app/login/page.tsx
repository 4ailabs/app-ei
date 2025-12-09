"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Intentar login directamente con NextAuth
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      // Si el login fue exitoso
      if (result?.ok && !result?.error) {
        router.push("/")
        router.refresh()
        return
      }

      // Si hay un error, diagnosticar qué salió mal
      if (result?.error) {
        try {
          const diagnoseResponse = await fetch("/api/auth/diagnose", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })

          if (diagnoseResponse.ok) {
            const diagnosis = await diagnoseResponse.json()
            
            // Mostrar mensaje específico según el diagnóstico
            if (!diagnosis.userExists) {
              setError(`${diagnosis.message} ${diagnosis.action}`)
            } else if (!diagnosis.isApproved) {
              setError(`${diagnosis.message} ${diagnosis.action}`)
            } else if (!diagnosis.hasPassword) {
              setError(`${diagnosis.message} ${diagnosis.action}`)
            } else {
              // Usuario existe, está aprobado, pero la contraseña es incorrecta
              setError("La contraseña es incorrecta. Por favor, verifica e intenta de nuevo.")
            }
          } else {
            // Si el diagnóstico falla, mostrar error genérico
            setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.")
          }
        } catch (diagnoseError) {
          // Si hay error en el diagnóstico, mostrar error genérico
          setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.")
        }
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor, intenta de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF9F7] dark:bg-[#2F2F2F]">
      <Card className="w-full max-w-md border border-[#E5E4E0] dark:border-[#4A4A4A] shadow-lg bg-white dark:bg-[#393939] rounded-3xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#DA7756] dark:bg-[#ECECEC] rounded-2xl">
              <Zap className="h-10 w-10 text-white dark:text-[#2F2F2F]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-[#1A1915] dark:text-[#ECECEC]">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-base mt-2">
            <span className="font-semibold text-[#1A1915] dark:text-[#ECECEC]">Seminario Internacional</span>
            <br />
            <span className="text-[#706F6C] dark:text-[#B4B4B4]">Inteligencia Energética</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-xl text-red-700 dark:text-red-400 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl shadow-sm bg-[#F5F4F0]/50 dark:bg-[#393939] focus:bg-white dark:focus:bg-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#ECECEC]/50 focus:border-[#DA7756] dark:focus:border-[#ECECEC] transition-all duration-200 text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C]"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-[#1A1915] dark:text-[#ECECEC]">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl shadow-sm bg-[#F5F4F0]/50 dark:bg-[#393939] focus:bg-white dark:focus:bg-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#ECECEC]/50 focus:border-[#DA7756] dark:focus:border-[#ECECEC] transition-all duration-200 text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9B9A97] dark:text-[#8C8C8C] hover:text-[#706F6C] dark:hover:text-[#B4B4B4] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full py-6 font-semibold shadow-md hover:shadow-lg group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Iniciar Sesión
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E5E4E0] dark:border-[#4A4A4A] text-center space-y-3">
            <p className="text-sm text-[#9B9A97] dark:text-[#8C8C8C]">
              Acceso exclusivo para participantes del seminario
            </p>
            <p className="text-sm text-[#706F6C] dark:text-[#B4B4B4]">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-[#DA7756] dark:text-[#ECECEC] font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
