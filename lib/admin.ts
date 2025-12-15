import { auth } from "./auth-server"
import { prisma } from "./prisma"

/**
 * Verifica si el usuario actual es administrador
 * @param session - La sesión del usuario (opcional, se obtiene automáticamente si no se proporciona)
 * @returns true si el usuario es administrador, false en caso contrario
 */
export async function isAdmin(session?: any): Promise<boolean> {
  let currentSession = session
  
  if (!currentSession) {
    currentSession = await auth()
  }
  
  if (!currentSession?.user?.id) {
    return false
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentSession.user.id },
      select: { isAdmin: true }
    })

    return user?.isAdmin ?? false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

/**
 * Verifica si un email específico pertenece a un administrador
 * @param email - El email a verificar
 * @returns true si el usuario con ese email es administrador
 */
export async function isAdminByEmail(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { isAdmin: true }
    })

    return user?.isAdmin ?? false
  } catch (error) {
    console.error("Error checking admin status by email:", error)
    return false
  }
}

