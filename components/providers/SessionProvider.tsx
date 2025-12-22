"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider
      refetchInterval={5 * 60} // Refrescar sesión cada 5 minutos
      refetchOnWindowFocus={true} // Refrescar cuando la ventana recupera el foco
    >
      {children}
    </NextAuthSessionProvider>
  )
}
