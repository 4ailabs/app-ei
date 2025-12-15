import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { SidebarProvider } from "@/components/providers/SidebarProvider"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Sidebar } from "@/components/Sidebar"
import { MainContent } from "@/components/MainContent"
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen font-sans text-[#1A1915] dark:text-[#E5E5E5] flex flex-col bg-[#FAF9F7] dark:bg-[#1A1A1A]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <SidebarProvider>
              <div className="flex min-h-screen">
                {/* Sidebar (Desktop and Mobile) */}
                <Sidebar />

                {/* Main Content */}
                <MainContent>
                  {children}
                </MainContent>
              </div>
              <Footer />
            </SidebarProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
