import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { prisma } from '@/lib/prisma'

const XP_THRESHOLD_PREMIUM = 500 // XP necesarios para desbloquear premium

// GET: Obtener XP actual del usuario
export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                totalXP: true,
                premiumUnlocked: true,
                lastXPSync: true
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
        }

        return NextResponse.json({
            totalXP: user.totalXP,
            premiumUnlocked: user.premiumUnlocked,
            xpToUnlock: Math.max(0, XP_THRESHOLD_PREMIUM - user.totalXP),
            progress: Math.min(100, Math.round((user.totalXP / XP_THRESHOLD_PREMIUM) * 100)),
            lastSync: user.lastXPSync
        })
    } catch (error) {
        console.error('Error obteniendo XP:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        
        // Si es un error de Prisma relacionado con campos faltantes
        if (errorMessage.includes('Unknown arg') || errorMessage.includes('does not exist')) {
            console.error('⚠️ Los campos de XP no existen en la base de datos. Ejecuta: npx prisma db push')
            return NextResponse.json({ 
                error: 'Base de datos no actualizada',
                totalXP: 0,
                premiumUnlocked: false
            }, { status: 200 }) // Retornar valores por defecto en lugar de error
        }
        
        return NextResponse.json({ 
            error: 'Error interno',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        }, { status: 500 })
    }
}

// POST: Sincronizar XP desde una app
export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
        }

        const body = await request.json()
        const { appName, xpGained, details } = body

        // Validaciones
        if (!appName || typeof appName !== 'string') {
            return NextResponse.json({ error: 'appName requerido' }, { status: 400 })
        }

        if (!xpGained || typeof xpGained !== 'number' || xpGained <= 0) {
            return NextResponse.json({ error: 'xpGained debe ser un número positivo' }, { status: 400 })
        }

        // Limitar XP máximo por sincronización (anti-abuse)
        const xpToAdd = Math.min(xpGained, 500)

        // Actualizar XP del usuario y crear registro en historial
        const [updatedUser] = await prisma.$transaction([
            prisma.user.update({
                where: { id: session.user.id },
                data: {
                    totalXP: { increment: xpToAdd },
                    lastXPSync: new Date()
                },
                select: {
                    totalXP: true,
                    premiumUnlocked: true
                }
            }),
            prisma.xPHistory.create({
                data: {
                    userId: session.user.id,
                    appName,
                    xpGained: xpToAdd,
                    details: details || null
                }
            })
        ])

        // Verificar si debe desbloquear premium
        const newTotalXP = updatedUser.totalXP
        const shouldUnlock = newTotalXP >= XP_THRESHOLD_PREMIUM

        if (shouldUnlock && !updatedUser.premiumUnlocked) {
            await prisma.user.update({
                where: { id: session.user.id },
                data: { premiumUnlocked: true }
            })
        }

        return NextResponse.json({
            success: true,
            xpAdded: xpToAdd,
            totalXP: newTotalXP,
            premiumUnlocked: shouldUnlock || updatedUser.premiumUnlocked,
            xpToUnlock: Math.max(0, XP_THRESHOLD_PREMIUM - newTotalXP),
            progress: Math.min(100, Math.round((newTotalXP / XP_THRESHOLD_PREMIUM) * 100)),
            justUnlockedPremium: shouldUnlock && !updatedUser.premiumUnlocked
        })
    } catch (error) {
        console.error('Error sincronizando XP:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        
        // Si es un error de Prisma relacionado con campos faltantes, dar un mensaje más útil
        if (errorMessage.includes('Unknown arg') || errorMessage.includes('does not exist')) {
            console.error('⚠️ Los campos de XP no existen en la base de datos. Ejecuta: npx prisma db push')
            return NextResponse.json({ 
                error: 'Base de datos no actualizada. Contacta al administrador.',
                details: 'Los campos de XP no están en la base de datos'
            }, { status: 500 })
        }
        
        return NextResponse.json({ 
            error: 'Error interno',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        }, { status: 500 })
    }
}
