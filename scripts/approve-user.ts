import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  
  if (!email) {
    console.error('❌ Por favor proporciona un email:')
    console.log('   npm run approve-user <email>')
    process.exit(1)
  }

  try {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log(`❌ Usuario con email "${email}" no encontrado.`)
      console.log('\n💡 Para crear un nuevo usuario, usa:')
      console.log(`   npm run init-user ${email} <password> "<nombre>"`)
      process.exit(1)
    }

    if (user.approved) {
      console.log(`✅ El usuario "${email}" ya está aprobado.`)
      await prisma.$disconnect()
      return
    }

    // Aprobar usuario
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { approved: true },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
      }
    })

    console.log('✅ Usuario aprobado exitosamente:')
    console.log(`   Email: ${updatedUser.email}`)
    console.log(`   Nombre: ${updatedUser.name || 'No especificado'}`)
    console.log(`   ID: ${updatedUser.id}`)
    console.log(`   Aprobado: ${updatedUser.approved ? '✅ Sí' : '❌ No'}`)
    console.log('\n🎉 Ahora el usuario puede iniciar sesión.')

  } catch (error: any) {
    console.error('❌ Error al aprobar usuario:', error.message)
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

