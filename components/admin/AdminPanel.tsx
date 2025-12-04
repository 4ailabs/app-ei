"use client"

import { useState, useEffect } from "react"
import { UserTable } from "./UserTable"
import { UserForm } from "./UserForm"
import { StatsPanel } from "./StatsPanel"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface User {
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

interface Stats {
  totalUsers: number
  usersWithProgress: number
  usersWithoutProgress: number
  averageProgress: number
  completionRate: number
  sessionCompletion: Array<{
    sessionId: number
    completed: number
  }>
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      })
      if (search) params.append("search", search)

      const response = await fetch(`/api/users?${params}`)
      if (!response.ok) throw new Error("Error al cargar usuarios")

      const data = await response.json()
      setUsers(data.users)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      if (!response.ok) throw new Error("Error al cargar estadísticas")

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchUsers(), fetchStats()])
      setLoading(false)
    }
    loadData()
  }, [page])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1)
      fetchUsers()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  const handleCreate = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al eliminar usuario")
      }

      // Recargar datos
      fetchUsers()
      fetchStats()
    } catch (error: any) {
      alert(error.message || "Error al eliminar usuario")
    }
  }

  const handleSave = () => {
    fetchUsers()
    fetchStats()
  }

  const handleRefresh = () => {
    setLoading(true)
    Promise.all([fetchUsers(), fetchStats()]).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Panel de Administración</h1>
            <p className="text-gray-600 mt-1">
              Gestiona usuarios y visualiza estadísticas del seminario
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-gray-300 flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>

        {/* Stats */}
        <StatsPanel stats={stats} loading={loading} />

        {/* Users Table */}
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={setSearch}
          pagination={pagination}
          onPageChange={setPage}
        />

        {/* Form Modal */}
        {showForm && (
          <UserForm
            user={editingUser}
            onClose={() => {
              setShowForm(false)
              setEditingUser(null)
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}

