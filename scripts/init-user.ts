import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const email = process.argv[2] || 'admin@example.com'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Admin User'
  const makeAdmin = process.argv[5] === '--admin' || process.argv[4] === '--admin'

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name: name !== '--admin' ? name : 'Admin User',
        approved: true, // Aprobar automáticamente al actualizar
        isAdmin: makeAdmin,
      },
      create: {
        email,
        password: hashedPassword,
        name: name !== '--admin' ? name : 'Admin User',
        approved: true, // Aprobar automáticamente al crear
        isAdmin: makeAdmin,
      },
    })

    console.log('✅ Usuario creado/actualizado exitosamente:')
    console.log(`   Email: ${user.email}`)
    console.log(`   Nombre: ${user.name}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Aprobado: ${user.approved ? '✅ Sí' : '❌ No'}`)
    console.log(`   Administrador: ${user.isAdmin ? '✅ Sí' : '❌ No'}`)
  } catch (error) {
    console.error('❌ Error al crear usuario:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
