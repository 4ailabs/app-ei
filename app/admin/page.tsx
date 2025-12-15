import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-server"
import { isAdmin } from "@/lib/admin"
import { AdminPanel } from "@/components/admin/AdminPanel"
import { Navbar } from "@/components/Navbar"

export default async function AdminPage() {
  const session = await auth()

  // Protección: solo usuarios autenticados pueden acceder
  if (!session) {
    redirect("/login")
  }

  // Protección: solo el administrador puede acceder
  const userIsAdmin = await isAdmin(session)
  if (!userIsAdmin) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#1A1A1A]">
      <Navbar />
      <AdminPanel />
    </div>
  )
}

