import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Verificar que el usuario esté aprobado
        if (!user.approved) {
          return null // Retornar null para que NextAuth muestre error de credenciales
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días en segundos (sesión expira después de 30 días)
    updateAge: 24 * 60 * 60, // Actualizar sesión cada 24 horas
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 días en segundos
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" para iframes en producción
        path: "/",
        secure: process.env.NODE_ENV === "production", // Siempre true en producción (requerido para sameSite: "none")
        maxAge: 30 * 24 * 60 * 60, // 30 días para mejor persistencia
        // No especificar domain para que funcione en múltiples dominios
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.isAdmin = (user as any).isAdmin || false
      }
      // Siempre verificar el rol actual en la BD para mantenerlo actualizado
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { isAdmin: true }
          })
          if (dbUser) {
            token.isAdmin = dbUser.isAdmin
          }
        } catch (error) {
          console.error("Error refreshing admin status in JWT:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = (token.isAdmin as boolean) || false
      }
      return session
    }
  }
}
