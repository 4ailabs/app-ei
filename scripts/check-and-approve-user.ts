import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  
  if (!email) {
    console.error('❌ Por favor proporciona un email:')
    console.log('   npm run check-user <email>')
    process.exit(1)
  }

  try {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
        createdAt: true,
      }
    })

    if (!user) {
      console.log(`❌ Usuario con email "${email}" no encontrado.`)
      console.log('\n💡 Para crear un nuevo usuario, usa:')
      console.log(`   npm run init-user ${email} <password> "<nombre>"`)
      process.exit(1)
    }

    console.log('\n📋 Información del Usuario:')
    console.log(`   Email: ${user.email}`)
    console.log(`   Nombre: ${user.name || 'No especificado'}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Creado: ${user.createdAt}`)
    console.log(`   Aprobado: ${user.approved ? '✅ Sí' : '❌ No'}`)

    if (!user.approved) {
      console.log('\n⚠️  El usuario NO está aprobado. Esto impide el login.')
      console.log('\n💡 Para aprobar este usuario, ejecuta:')
      console.log(`   npm run approve-user ${email}`)
    } else {
      console.log('\n✅ El usuario está aprobado y puede iniciar sesión.')
    }

  } catch (error: any) {
    console.error('❌ Error al verificar usuario:', error.message)
    if (error.code === 'P1001') {
      console.error('\n💡 Error de conexión a la base de datos.')
      console.error('   Verifica que DATABASE_URL esté configurada correctamente.')
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

