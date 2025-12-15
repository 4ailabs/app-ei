import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

/**
 * Script para actualizar la contraseña de un usuario
 * 
 * Uso:
 *   npm run update-password <email> <nueva-contraseña>
 * 
 * Ejemplo:
 *   npm run update-password admin@seminario.com Admin123
 */
async function main() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error('❌ Error: Debes proporcionar email y contraseña')
    console.log('Uso: npm run update-password <email> <contraseña>')
    console.log('Ejemplo: npm run update-password admin@seminario.com Admin123')
    process.exit(1)
  }

  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (!existingUser) {
      console.error(`❌ Error: No se encontró un usuario con el email "${email}"`)
      process.exit(1)
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Actualizar la contraseña
    const user = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        approved: true, // Asegurar que esté aprobado
      },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
        isAdmin: true,
      }
    })

    console.log('✅ Contraseña actualizada exitosamente:')
    console.log(`   Email: ${user.email}`)
    console.log(`   Nombre: ${user.name || 'N/A'}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Aprobado: ${user.approved ? '✅ Sí' : '❌ No'}`)
    console.log(`   Administrador: ${user.isAdmin ? '✅ Sí' : '❌ No'}`)
    console.log('\n💡 Ahora puedes iniciar sesión con la nueva contraseña.')
  } catch (error) {
    console.error('❌ Error al actualizar contraseña:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

