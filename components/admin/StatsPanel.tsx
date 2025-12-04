"use client"

import { Users, TrendingUp, CheckCircle, Clock } from "lucide-react"

interface StatsData {
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

interface StatsPanelProps {
  stats: StatsData | null
  loading?: boolean
}

export function StatsPanel({ stats, loading }: StatsPanelProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-black rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-black mb-1">
            {stats.totalUsers}
          </div>
          <div className="text-sm text-gray-600">Total Usuarios</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-black mb-1">
            {stats.usersWithProgress}
          </div>
          <div className="text-sm text-gray-600">Con Progreso</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-black mb-1">
            {stats.usersWithoutProgress}
          </div>
          <div className="text-sm text-gray-600">Sin Progreso</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-black mb-1">
            {stats.averageProgress}%
          </div>
          <div className="text-sm text-gray-600">Progreso Promedio</div>
        </div>
      </div>

      {/* Session Completion Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-black mb-6">
          Completación por Sesión
        </h3>
        <div className="space-y-4">
          {stats.sessionCompletion.map((session) => {
            const maxCompleted = Math.max(
              ...stats.sessionCompletion.map((s) => s.completed),
              1
            )
            const percentage = (session.completed / maxCompleted) * 100

            return (
              <div key={session.sessionId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Sesión {session.sessionId}
                  </span>
                  <span className="text-gray-600">
                    {session.completed} usuarios
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

