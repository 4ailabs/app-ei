import { config } from 'dotenv'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Cargar variables de entorno desde .env.local si existe
config({ path: resolve(process.cwd(), '.env.local') })
config() // También cargar .env si existe

// Crear instancia de Prisma con las variables de entorno cargadas
const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@example.com'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Admin User'
  // Verificar si --admin está en cualquier argumento
  const makeAdmin = process.argv.includes('--admin')

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
