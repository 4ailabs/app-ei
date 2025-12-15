import { prisma } from '../lib/prisma'

/**
 * Script para convertir un usuario en administrador
 * 
 * Uso:
 *   npm run make-admin <email>
 * 
 * Ejemplo:
 *   npm run make-admin usuario@ejemplo.com
 */
async function main() {
  const email = process.argv[2]

  if (!email) {
    console.error('❌ Error: Debes proporcionar un email')
    console.log('Uso: npm run make-admin <email>')
    console.log('Ejemplo: npm run make-admin usuario@ejemplo.com')
    process.exit(1)
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ Error: No se encontró un usuario con el email "${email}"`)
      process.exit(1)
    }

    if (user.isAdmin) {
      console.log(`ℹ️  El usuario "${email}" ya es administrador`)
      process.exit(0)
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        approved: true,
      }
    })

    console.log('✅ Usuario convertido a administrador exitosamente:')
    console.log(`   Email: ${updatedUser.email}`)
    console.log(`   Nombre: ${updatedUser.name || 'N/A'}`)
    console.log(`   ID: ${updatedUser.id}`)
    console.log(`   Administrador: ${updatedUser.isAdmin ? '✅ Sí' : '❌ No'}`)
    console.log(`   Aprobado: ${updatedUser.approved ? '✅ Sí' : '❌ No'}`)
    console.log('\n💡 Nota: El usuario debe cerrar sesión y volver a iniciar sesión para que los cambios surtan efecto.')
  } catch (error) {
    console.error('❌ Error al convertir usuario en administrador:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

