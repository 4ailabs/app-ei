import { Zap, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#F7F8FA] border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Inteligencia Energética</p>
              <p className="text-xs text-gray-500">Seminario Internacional</p>
            </div>
          </div>

          {/* Center Section - Copyright */}
          <div className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} Inteligencia Energética - Todos los derechos reservados
          </div>

          {/* Right Section - Links */}
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <a
              href="mailto:contacto@seminario.com"
              className="hover:text-black transition-colors flex items-center space-x-1"
            >
              <Mail className="w-3 h-3" />
              <span>Contacto</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
