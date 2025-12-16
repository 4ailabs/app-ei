import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@seminario.com'
  const password = 'Admin123'

  try {
    console.log('🔍 Verificando usuario local...\n')

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (!existingUser) {
      console.log('❌ Usuario no encontrado. Creando usuario...\n')
      const hashedPassword = await bcrypt.hash(password, 10)
      
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Administrador',
          approved: true,
          isAdmin: true,
        }
      })

      console.log('✅ Usuario creado exitosamente:')
      console.log(`   Email: ${user.email}`)
      console.log(`   Nombre: ${user.name}`)
      console.log(`   Aprobado: ✅ Sí`)
      console.log(`   Administrador: ✅ Sí`)
      console.log(`\n🎉 Ahora puedes iniciar sesión con:`)
      console.log(`   Email: ${email}`)
      console.log(`   Contraseña: ${password}`)
    } else {
      console.log('✅ Usuario encontrado:')
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Nombre: ${existingUser.name || 'Sin nombre'}`)
      console.log(`   Aprobado: ${existingUser.approved ? '✅ Sí' : '❌ No'}`)
      console.log(`   Administrador: ${existingUser.isAdmin ? '✅ Sí' : '❌ No'}`)
      console.log(`   Tiene contraseña: ${existingUser.password ? '✅ Sí' : '❌ No'}`)

      // Verificar contraseña
      let needsUpdate = false
      const updates: any = {}

      if (!existingUser.password) {
        console.log('\n⚠️  El usuario no tiene contraseña. Creando...')
        needsUpdate = true
        updates.password = await bcrypt.hash(password, 10)
      } else {
        const isValid = await bcrypt.compare(password, existingUser.password)
        if (!isValid) {
          console.log('\n⚠️  La contraseña no coincide. Actualizando...')
          needsUpdate = true
          updates.password = await bcrypt.hash(password, 10)
        } else {
          console.log('✅ Contraseña válida')
        }
      }

      if (!existingUser.approved) {
        console.log('\n⚠️  El usuario no está aprobado. Aprobando...')
        needsUpdate = true
        updates.approved = true
      }

      if (!existingUser.isAdmin) {
        console.log('\n⚠️  El usuario no es administrador. Promoviendo a admin...')
        needsUpdate = true
        updates.isAdmin = true
      }

      if (needsUpdate) {
        await prisma.user.update({
          where: { email },
          data: updates
        })
        console.log('\n✅ Usuario actualizado exitosamente')
      }

      console.log(`\n🎉 Puedes iniciar sesión con:`)
      console.log(`   Email: ${email}`)
      console.log(`   Contraseña: ${password}`)
    }
  } catch (error: any) {
    console.error('\n❌ Error:', error.message)
    
    if (error.message.includes('DATABASE_URL')) {
      console.error('\n💡 Solución:')
      console.error('   1. Verifica que tengas un archivo .env.local')
      console.error('   2. Asegúrate de que DATABASE_URL esté configurado')
      console.error('   3. Ejemplo: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

