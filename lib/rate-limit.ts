/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter (para producción, considerar usar Redis)
 */

import { NextRequest } from 'next/server'

interface RateLimitEntry {
  count: number
  resetTime: number
}

/**
 * Obtener la IP del cliente desde la request
 */
export function getClientIP(request: NextRequest): string {
  // Intentar obtener IP de headers comunes
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    // x-forwarded-for puede tener múltiples IPs, tomar la primera
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback: usar 'unknown' si no se puede determinar
  return 'unknown'
}

const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Rate limiter simple en memoria
 * Para producción, usar Redis o un servicio dedicado
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Limpiar entradas expiradas periódicamente (cada 1000 requests)
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // Nueva ventana de tiempo
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    }
    rateLimitStore.set(identifier, newEntry)
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: newEntry.resetTime,
    }
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetTime,
    }
  }

  // Incrementar contador
  entry.count++
  rateLimitStore.set(identifier, entry)

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetTime,
  }
}

/**
 * Obtener timestamp de medianoche (próximo reset diario)
 */
function getMidnightTimestamp(): number {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0) // Próxima medianoche
  return midnight.getTime()
}

/**
 * Rate limiter con reset diario (a medianoche)
 * Ideal para límites de mensajes por día
 */
export function checkDailyRateLimit(
  identifier: string,
  maxRequests: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  const midnightReset = getMidnightTimestamp()

  if (!entry || entry.resetTime < now) {
    // Nueva ventana (nuevo día)
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: midnightReset,
    }
    rateLimitStore.set(identifier, newEntry)
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: midnightReset,
    }
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetTime,
    }
  }

  // Incrementar contador
  entry.count++
  rateLimitStore.set(identifier, entry)

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetTime,
  }
}

/**
 * Obtener timestamp de reset quincenal (cada 15 días)
 */
function getBiweeklyResetTimestamp(): number {
  const now = new Date()
  // Calcular días desde epoch para determinar el ciclo de 15 días
  const daysSinceEpoch = Math.floor(now.getTime() / (24 * 60 * 60 * 1000))
  const daysIntoCycle = daysSinceEpoch % 15
  const daysUntilReset = 15 - daysIntoCycle

  const resetDate = new Date(now)
  resetDate.setDate(resetDate.getDate() + daysUntilReset)
  resetDate.setHours(0, 0, 0, 0)

  return resetDate.getTime()
}

/**
 * Rate limiter con reset quincenal (cada 15 días)
 * Ideal para límites de sesiones de audio
 */
export function checkBiweeklyRateLimit(
  identifier: string,
  maxSessions: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  const biweeklyReset = getBiweeklyResetTimestamp()

  if (!entry || entry.resetTime < now) {
    // Nueva ventana (nuevo ciclo de 15 días)
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: biweeklyReset,
    }
    rateLimitStore.set(identifier, newEntry)
    return {
      allowed: true,
      remaining: maxSessions - 1,
      resetAt: biweeklyReset,
    }
  }

  if (entry.count >= maxSessions) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetTime,
    }
  }

  // Incrementar contador
  entry.count++
  rateLimitStore.set(identifier, entry)

  return {
    allowed: true,
    remaining: maxSessions - entry.count,
    resetAt: entry.resetTime,
  }
}

/**
 * Consultar límite sin incrementar (para mostrar en UI)
 */
export function getBiweeklyRateLimitStatus(
  identifier: string,
  maxSessions: number
): { remaining: number; limit: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  const biweeklyReset = getBiweeklyResetTimestamp()

  if (!entry || entry.resetTime < now) {
    return {
      remaining: maxSessions,
      limit: maxSessions,
      resetAt: biweeklyReset,
    }
  }

  return {
    remaining: Math.max(0, maxSessions - entry.count),
    limit: maxSessions,
    resetAt: entry.resetTime,
  }
}

/**
 * Limpiar entradas expiradas
 */
export function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}

// Limpiar cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000)
}
