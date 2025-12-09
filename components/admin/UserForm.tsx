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
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#252525] rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#E5E4E0] dark:border-[#333333] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">
            {isEdit ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#706F6C] dark:text-[#A0A0A0]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5] mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isEdit}
              className={`w-full px-4 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#1A1A1A] text-[#1A1915] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#DA7756] dark:focus:ring-[#DA7756] placeholder:text-[#9B9A97] dark:placeholder:text-[#808080] ${
                isEdit ? "bg-[#F5F4F0] dark:bg-[#2A2A2A] cursor-not-allowed" : ""
              }`}
              placeholder="usuario@ejemplo.com"
            />
            {isEdit && (
              <p className="mt-1 text-xs text-[#706F6C] dark:text-[#A0A0A0]">
                El email no se puede modificar
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5] mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#1A1A1A] text-[#1A1915] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#DA7756] dark:focus:ring-[#DA7756] placeholder:text-[#9B9A97] dark:placeholder:text-[#808080]"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5] mb-2">
              {isEdit ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña *"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isEdit}
              minLength={6}
              className="w-full px-4 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#1A1A1A] text-[#1A1915] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#DA7756] dark:focus:ring-[#DA7756] placeholder:text-[#9B9A97] dark:placeholder:text-[#808080]"
              placeholder="••••••••"
            />
          </div>

          {password && (
            <div>
              <label className="block text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5] mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#1A1A1A] text-[#1A1915] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#DA7756] dark:focus:ring-[#DA7756] placeholder:text-[#9B9A97] dark:placeholder:text-[#808080]"
                placeholder="••••••••"
              />
            </div>
          )}

          {isEdit && (
            <div className="flex items-center gap-3 p-4 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded-lg">
              <input
                type="checkbox"
                id="approved"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="h-4 w-4 text-[#DA7756] dark:text-[#DA7756] border-[#E5E4E0] dark:border-[#333333] rounded focus:ring-[#DA7756] dark:focus:ring-[#DA7756]"
              />
              <label htmlFor="approved" className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5] cursor-pointer">
                Usuario aprobado (puede iniciar sesión)
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#E5E4E0] dark:border-[#333333]"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white hover:bg-[#C4684A] dark:hover:bg-[#C4684A]"
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

