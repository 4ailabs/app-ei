"use client"

interface AppLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export function AppLink({ href, className, children }: AppLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevenir que Next.js intercepte el enlace
    e.preventDefault()
    e.stopPropagation()
    // Navegar directamente usando window.location para evitar RSC prefetch
    window.location.href = href
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      data-nextjs-link="false"
    >
      {children}
    </a>
  )
}
