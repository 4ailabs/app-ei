import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { Sidebar } from "@/components/Sidebar"
import { Footer } from "@/components/Footer"

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Seminario Internacional - Inteligencia Energética",
  description: "Plataforma de aprendizaje para el Seminario Internacional de Inteligencia Energética",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen font-sans text-gray-900 flex flex-col bg-[#F7F8FA]`}>
        <SessionProvider>
          <div className="flex flex-1">
            {/* Sidebar (Desktop and Mobile) */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-0 p-2 lg:p-8 lg:mt-0 mt-16">
              {children}
            </main>
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
