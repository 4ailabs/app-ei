"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son requeridos")
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar")
      }

      // Si llegamos aquí, el registro fue exitoso
      // Limpiar formulario primero
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setError("")
      
      // Establecer éxito después de limpiar
      setSuccess(true)
    } catch (err: any) {
      setSuccess(false)
      setError(err.message || "Error al registrar. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F8FA]">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="p-4 bg-black rounded-2xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-black">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Regístrate para acceder al seminario
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="space-y-6 text-center py-8 transition-all duration-500 ease-in-out">
              <div className="flex justify-center">
                <div className="p-6 bg-green-100 rounded-full transition-transform duration-500 scale-100">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  ¡Registro Exitoso!
                </h3>
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium mb-2">
                    Tu cuenta ha sido creada exitosamente
                  </p>
                  <p className="text-sm text-gray-600">
                    Tu cuenta está pendiente de aprobación por un administrador. 
                    Recibirás un email cuando tu cuenta sea aprobada.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 mt-4">
                    Ir a Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 transition-all duration-300">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="text-black font-semibold hover:underline">
                    Inicia Sesión
                  </Link>
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Al registrarte, tu cuenta estará pendiente de aprobación por un administrador.
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

