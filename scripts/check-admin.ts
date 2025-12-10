import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const email = 'admin@seminario.com'
  const password = 'Admin123'

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ Usuario no encontrado')
      return
    }

    console.log('✅ Usuario encontrado:')
    console.log(`   Email: ${user.email}`)
    console.log(`   Nombre: ${user.name}`)
    console.log(`   Aprobado: ${user.approved ? '✅ Sí' : '❌ No'}`)
    console.log(`   Tiene contraseña: ${user.password ? '✅ Sí' : '❌ No'}`)
    console.log(`   Longitud del hash: ${user.password?.length || 0}`)

    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password)
      console.log(`   Contraseña válida: ${isValid ? '✅ Sí' : '❌ No'}`)
      
      if (!isValid) {
        console.log('\n⚠️  La contraseña no coincide. Reseteando...')
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword, approved: true }
        })
        console.log('✅ Contraseña reseteada exitosamente')
      }
    } else {
      console.log('\n⚠️  El usuario no tiene contraseña. Creando...')
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword, approved: true }
      })
      console.log('✅ Contraseña creada exitosamente')
    }
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
