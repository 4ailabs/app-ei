"use client"

import { useState } from "react"
import { User, Edit, Trash2, Search, Plus, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserData {
  id: string
  email: string
  name: string | null
  approved: boolean
  createdAt: string
  stats: {
    totalSessions: number
    completedSessions: number
    progressPercentage: number
    totalProgress: number
  }
}

interface UserTableProps {
  users: UserData[]
  onEdit: (user: UserData) => void
  onDelete: (userId: string) => void
  onCreate: () => void
  onSearch: (search: string) => void
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  onPageChange?: (page: number) => void
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  onCreate,
  onSearch,
  pagination,
  onPageChange,
}: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="bg-white dark:bg-[#252525] rounded-2xl shadow-sm border border-[#E5E4E0] dark:border-[#333333] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#E5E4E0] dark:border-[#333333]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1915] dark:text-[#E5E5E5]">Usuarios</h2>
            <p className="text-sm text-[#706F6C] dark:text-[#A0A0A0] mt-1">
              Gestiona los usuarios del seminario
            </p>
          </div>
          <Button
            onClick={onCreate}
            className="bg-[#DA7756] dark:bg-[#DA7756] text-white dark:text-white hover:bg-[#C4684A] dark:hover:bg-[#C4684A] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B9A97] dark:text-[#808080]" />
          <input
            type="text"
            placeholder="Buscar por email o nombre..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E4E0] dark:border-[#333333] rounded-lg bg-white dark:bg-[#1A1A1A] text-[#1A1915] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#DA7756] dark:focus:ring-[#DA7756] placeholder:text-[#9B9A97] dark:placeholder:text-[#808080]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F4F0] dark:bg-[#1A1A1A]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Progreso
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Sesiones
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Fecha Registro
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#706F6C] dark:text-[#A0A0A0] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#252525] divide-y divide-[#E5E4E0] dark:divide-[#333333]">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-12 w-12 text-[#9B9A97] dark:text-[#808080]" />
                    <p className="text-[#706F6C] dark:text-[#A0A0A0]">No se encontraron usuarios</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[#DA7756] dark:bg-[#DA7756] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#1A1915] dark:text-[#E5E5E5]">
                          {user.name || "Sin nombre"}
                        </div>
                        <div className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.approved ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#2ca58d]/10 dark:bg-[#3FBE9F]/20 text-[#2ca58d] dark:text-[#3FBE9F]">
                        <CheckCircle className="h-3 w-3" />
                        Aprobado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#DA7756]/10 dark:bg-[#DA7756]/20 text-[#DA7756] dark:text-[#E5E5E5]">
                        <XCircle className="h-3 w-3" />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#E5E4E0] dark:bg-[#333333] rounded-full h-2">
                        <div
                          className="bg-[#DA7756] dark:bg-[#DA7756] h-2 rounded-full transition-all"
                          style={{ width: `${user.stats.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                        {user.stats.progressPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#1A1915] dark:text-[#E5E5E5]">
                      {user.stats.completedSessions} / {user.stats.totalSessions}
                    </div>
                    <div className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">
                      {user.stats.totalProgress} registros
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#706F6C] dark:text-[#A0A0A0]">
                    {new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 text-[#706F6C] dark:text-[#A0A0A0] hover:text-[#DA7756] dark:hover:text-[#DA7756] hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-[#E5E4E0] dark:border-[#333333] flex items-center justify-between">
          <div className="text-sm text-[#706F6C] dark:text-[#A0A0A0]">
            Mostrando {((pagination.page - 1) * pagination.limit) + 1} -{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} de{" "}
            {pagination.total} usuarios
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="border-[#E5E4E0] dark:border-[#333333]"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="border-[#E5E4E0] dark:border-[#333333]"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


