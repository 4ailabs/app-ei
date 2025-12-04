import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-server"
import { AdminPanel } from "@/components/admin/AdminPanel"
import { Navbar } from "@/components/Navbar"

const ADMIN_EMAIL = "admin@seminario.com"

export default async function AdminPage() {
  const session = await auth()

  // Protección: solo usuarios autenticados pueden acceder
  if (!session) {
    redirect("/login")
  }

  // Protección: solo el administrador puede acceder
  if (session.user?.email !== ADMIN_EMAIL) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AdminPanel />
    </div>
  )
}

