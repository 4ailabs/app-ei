import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Aplicar a todas las rutas
        source: '/:path*',
        headers: [
          {
            // Content-Security-Policy es el estándar moderno (X-Frame-Options está deprecado)
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://inteligencia-energetica.com https://*.inteligencia-energetica.com;",
          },
          {
            // Mantener X-Frame-Options para compatibilidad con navegadores antiguos
            // Nota: SAMEORIGIN permite embedding desde el mismo origen, pero CSP tiene prioridad
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
