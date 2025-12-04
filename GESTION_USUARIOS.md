# 👥 Guía de Gestión de Usuarios y Accesos

## 📋 Métodos para Gestionar Usuarios

Tienes varias opciones para crear y gestionar usuarios en tu aplicación:

---

## 🚀 Método 1: Script de Línea de Comandos (Recomendado para Desarrollo)

### Crear un Usuario

Usa el script `init-user` que ya está configurado:

```bash
npm run init-user <email> <password> <nombre>
```

**Ejemplos:**

```bash
# Crear usuario administrador
npm run init-user admin@seminario.com Admin123 "Administrador"

# Crear usuario participante
npm run init-user participante1@email.com Pass123 "Juan Pérez"

# Crear más usuarios
npm run init-user participante2@email.com Pass123 "María García"
```

**Nota:** Si el usuario ya existe, el script actualizará su contraseña y nombre.

### Para Producción (Vercel)

Si quieres crear usuarios en producción después del deployment:

```bash
# 1. Instala Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Conecta con tu proyecto
vercel link

# 3. Descarga las variables de entorno
vercel env pull .env.local

# 4. Crea el usuario
npm run init-user admin@seminario.com Admin123 "Administrador"
```

---

## 🎨 Método 2: Prisma Studio (Interfaz Visual)

Prisma Studio es una interfaz gráfica para gestionar tu base de datos.

### Usar Prisma Studio Localmente

```bash
npm run db:studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde puedes:
- ✅ Ver todos los usuarios
- ✅ Crear nuevos usuarios (necesitarás hashear la contraseña manualmente)
- ✅ Editar usuarios existentes
- ✅ Eliminar usuarios
- ✅ Ver el progreso de cada usuario

### Usar Prisma Studio con Producción

```bash
# Conecta con la base de datos de producción
vercel env pull .env.local
npm run db:studio
```

**⚠️ Cuidado:** Asegúrate de estar conectado a la base de datos correcta.

---

## 🔧 Método 3: Panel de Administración (Recomendado para Producción)

Puedes crear un panel de administración dentro de la aplicación. Te muestro cómo hacerlo más abajo.

---

## 📝 Operaciones Comunes

### Crear Múltiples Usuarios

Crea un archivo `scripts/create-users.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const users = [
  { email: 'admin@seminario.com', password: 'Admin123', name: 'Administrador' },
  { email: 'user1@email.com', password: 'Pass123', name: 'Usuario 1' },
  { email: 'user2@email.com', password: 'Pass123', name: 'Usuario 2' },
]

async function main() {
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: { password: hashedPassword, name: userData.name },
      create: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
      },
    })
    console.log(`✅ Usuario creado: ${user.email}`)
  }
  await prisma.$disconnect()
}

main()
```

Ejecuta con:
```bash
tsx scripts/create-users.ts
```

### Listar Todos los Usuarios

```bash
# Usando Prisma Studio
npm run db:studio
```

O crea un script:

```typescript
// scripts/list-users.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true }
  })
  console.table(users)
  await prisma.$disconnect()
}

main()
```

### Cambiar Contraseña de un Usuario

```bash
# El script init-user actualiza la contraseña si el usuario existe
npm run init-user usuario@email.com NuevaPassword123 "Nombre Usuario"
```

### Eliminar un Usuario

Usa Prisma Studio o crea un script:

```typescript
// scripts/delete-user.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('❌ Proporciona un email: tsx scripts/delete-user.ts email@example.com')
    process.exit(1)
  }
  
  await prisma.user.delete({ where: { email } })
  console.log(`✅ Usuario ${email} eliminado`)
  await prisma.$disconnect()
}

main()
```

---

## 🔐 Seguridad y Mejores Prácticas

### 1. Contraseñas Seguras
- Usa contraseñas fuertes (mínimo 8 caracteres, mayúsculas, números)
- Considera generar contraseñas aleatorias para usuarios

### 2. Gestión de Accesos
- **No compartas** las credenciales por email sin encriptar
- Considera implementar un sistema de "invitación por email"
- Limita el acceso al panel de administración

### 3. Auditoría
- Los usuarios tienen `createdAt` y `updatedAt` para auditoría
- Puedes agregar campos adicionales como `lastLogin` si lo necesitas

---

## 🎯 Próximos Pasos Recomendados

1. **Crear Panel de Administración**: Interfaz web para gestionar usuarios
2. **Sistema de Invitaciones**: Enviar emails con links de registro
3. **Roles y Permisos**: Agregar roles (admin, usuario, etc.)
4. **Recuperación de Contraseña**: Sistema de reset de contraseña

¿Quieres que cree alguno de estos para ti?


