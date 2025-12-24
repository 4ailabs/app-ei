import Image from "next/image"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#F5F4F0] dark:bg-[#1A1A1A] border-t border-[#E5E4E0] dark:border-[#333333] mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="https://framerusercontent.com/images/GVNBR2YhOqppm6eb9Xjat6VYn4.png?width=1024&height=1024"
                alt="Inteligencia Energética"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-[#1A1915] dark:text-[#E5E5E5] text-sm">Inteligencia Energética</p>
              <p className="text-xs text-[#706F6C] dark:text-[#A0A0A0]">Seminario Internacional</p>
            </div>
          </div>

          {/* Center Section - Copyright */}
          <div className="text-xs text-[#706F6C] dark:text-[#A0A0A0] text-center">
            <p>Dr. Miguel Ojeda Rios</p>
            <p className="mt-1">© {new Date().getFullYear()} Inteligencia Energética - Todos los derechos reservados</p>
          </div>

          {/* Right Section - Links */}
          <div className="flex items-center space-x-4 text-xs text-[#706F6C] dark:text-[#A0A0A0]">
            <a
              href="mailto:soporte@institutocentrobioenergetica.com"
              className="hover:text-[#1A1915] dark:hover:text-[#E5E5E5] transition-colors flex items-center space-x-1"
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
