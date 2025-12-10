"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Lock, User, Key, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [setupKey, setSetupKey] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si necesita setup
    fetch("/api/setup")
      .then(res => res.json())
      .then(data => setNeedsSetup(data.needsSetup))
      .catch(() => setNeedsSetup(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, setupKey }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear administrador")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (needsSetup === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] dark:bg-[#1A1A1A]">
        <div className="animate-spin h-8 w-8 border-4 border-[#DA7756] border-t-transparent rounded-full" />
      </div>
    )
  }

  if (needsSetup === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF9F7] dark:bg-[#1A1A1A]">
        <Card className="w-full max-w-md shadow-lg border border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#252525] rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#2ca58d]/20 dark:bg-[#2ca58d]/20 rounded-2xl">
                <CheckCircle className="h-8 w-8 text-[#2ca58d]" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Sistema Configurado</CardTitle>
            <CardDescription className="text-[#706F6C] dark:text-[#A0A0A0]">
              Ya existe al menos un administrador en el sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button className="bg-[#DA7756] text-white hover:bg-[#C4684A]">
                Ir a Iniciar Sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF9F7] dark:bg-[#1A1A1A]">
        <Card className="w-full max-w-md shadow-lg border border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#252525] rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#2ca58d]/20 dark:bg-[#2ca58d]/20 rounded-2xl">
                <CheckCircle className="h-8 w-8 text-[#2ca58d]" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-[#2ca58d]">
              ¡Administrador Creado!
            </CardTitle>
            <CardDescription className="text-[#706F6C] dark:text-[#A0A0A0]">
              Redirigiendo al login...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <Card className="w-full max-w-md shadow-lg border border-[#E5E4E0] dark:border-[#333333] bg-white dark:bg-[#252525] rounded-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                alt="Inteligencia Energética"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Configuración Inicial</CardTitle>
          <CardDescription className="text-[#706F6C] dark:text-[#A0A0A0]">
            Crea el primer administrador del sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="p-3 bg-[#DA7756]/10 dark:bg-[#DA7756]/20 border border-[#DA7756]/20 dark:border-[#DA7756]/30 rounded-xl">
              <p className="text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                <strong>Nota:</strong> Esta página solo funciona cuando no hay administradores en el sistema.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl bg-white dark:bg-[#393939] text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#DA7756]/50 focus:border-[#DA7756]"
                  placeholder="Administrador"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl bg-white dark:bg-[#393939] text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#DA7756]/50 focus:border-[#DA7756]"
                  placeholder="admin@ejemplo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">Contraseña *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl bg-white dark:bg-[#393939] text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#DA7756]/50 focus:border-[#DA7756]"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C]">
                Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">Clave de Setup *</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B9A97] dark:text-[#8C8C8C]" />
                <input
                  type="password"
                  value={setupKey}
                  onChange={(e) => setSetupKey(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E4E0] dark:border-[#4A4A4A] rounded-xl bg-white dark:bg-[#393939] text-[#1A1915] dark:text-[#ECECEC] placeholder-[#9B9A97] dark:placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#DA7756]/50 dark:focus:ring-[#DA7756]/50 focus:border-[#DA7756]"
                  placeholder="Clave de configuración"
                />
              </div>
              <p className="text-xs text-[#9B9A97] dark:text-[#8C8C8C]">
                Clave por defecto: setup-admin-2024
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#DA7756] text-white hover:bg-[#C4684A] py-3 rounded-xl"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Administrador"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
