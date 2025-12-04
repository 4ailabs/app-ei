"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserFormProps {
  user?: {
    id: string
    email: string
    name: string | null
    approved?: boolean
  } | null
  onClose: () => void
  onSave: () => void
}

export function UserForm({ user, onClose, onSave }: UserFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [approved, setApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isEdit = !!user

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setName(user.name || "")
      setApproved(user.approved ?? false)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("El email es requerido")
      return
    }

    if (!isEdit && !password) {
      setError("La contraseña es requerida para nuevos usuarios")
      return
    }

    if (password && password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password && password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const url = isEdit ? `/api/users/${user.id}` : "/api/users"
      const method = isEdit ? "PUT" : "POST"

      const body: any = { email, name: name || null }
      if (password) body.password = password
      if (isEdit) body.approved = approved

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar usuario")
      }

      onSave()
      onClose()
    } catch (err: any) {
      setError(err.message || "Error al guardar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">
            {isEdit ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isEdit}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="usuario@ejemplo.com"
            />
            {isEdit && (
              <p className="mt-1 text-xs text-gray-500">
                El email no se puede modificar
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEdit ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña *"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isEdit}
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          {password && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
          )}

          {isEdit && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="approved"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="approved" className="text-sm font-medium text-gray-700 cursor-pointer">
                Usuario aprobado (puede iniciar sesión)
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

