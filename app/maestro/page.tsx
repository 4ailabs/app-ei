import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { MaestroClient } from "@/components/maestro/MaestroClient"

export default async function MaestroPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <MaestroClient />
}
