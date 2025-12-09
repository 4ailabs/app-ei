#!/usr/bin/env tsx

/**
 * Script para extraer el UID de un video de Cloudflare Stream desde una URL
 * 
 * Uso:
 *   npm run extract-video-id "https://customer-xxx.cloudflarestream.com/abc123def456/iframe"
 */

const url = process.argv[2]

if (!url) {
  console.error('❌ Por favor proporciona la URL del video de Cloudflare Stream:')
  console.log('   npm run extract-video-id "<url-del-video>"')
  process.exit(1)
}

// Patrones de URLs de Cloudflare Stream
const patterns = [
  // URL de iframe embed: https://customer-ACCOUNT_ID.cloudflarestream.com/VIDEO_UID/iframe
  /customer-[a-zA-Z0-9]+\.cloudflarestream\.com\/([a-zA-Z0-9]+)/,
  // URL de watch: https://watch.videodelivery.net/VIDEO_UID
  /watch\.videodelivery\.net\/([a-zA-Z0-9]+)/,
  // URL directa con UID
  /\/stream\/([a-zA-Z0-9]+)/,
  // Solo el UID directamente
  /^([a-zA-Z0-9]{15,})$/
]

let videoUID: string | null = null
let accountID: string | null = null

for (const pattern of patterns) {
  const match = url.match(pattern)
  if (match) {
    videoUID = match[1]
    
    // Intentar extraer Account ID de la URL si está presente
    const accountMatch = url.match(/customer-([a-zA-Z0-9]+)\.cloudflarestream/)
    if (accountMatch) {
      accountID = accountMatch[1]
    }
    break
  }
}

if (!videoUID) {
  console.error('❌ No se pudo extraer el UID del video de la URL proporcionada.')
  console.log('\nFormatos de URL soportados:')
  console.log('  - https://customer-ACCOUNT_ID.cloudflarestream.com/VIDEO_UID/iframe')
  console.log('  - https://watch.videodelivery.net/VIDEO_UID')
  console.log('  - Solo el UID: abc123def456ghi789')
  process.exit(1)
}

console.log('\n✅ Información extraída:')
console.log(`   Video UID: ${videoUID}`)
if (accountID) {
  console.log(`   Account ID: ${accountID}`)
}

console.log('\n📋 Para usar este video en tu aplicación:')
console.log('\n1. Actualiza tu archivo data/sessions.ts:')
console.log(`   cloudflareStreamId: "${videoUID}",`)

if (accountID) {
  console.log('\n2. Agrega a tu .env:')
  console.log(`   CLOUDFLARE_ACCOUNT_ID="${accountID}"`)
  console.log(`   NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID="${accountID}"`)
} else {
  console.log('\n2. Necesitarás obtener tu Account ID desde:')
  console.log('   https://dash.cloudflare.com')
  console.log('   (Está en la barra lateral derecha)')
}

console.log('\n3. El video debería reproducirse automáticamente en tu app! 🎬')

