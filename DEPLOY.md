# Guía Completa de Despliegue

Esta guía te llevará paso a paso desde la preparación del código hasta el despliegue en Vercel.

## 📋 Tabla de Contenidos

1. [Preparación para GitHub](#preparación-para-github)
2. [Subir a GitHub](#subir-a-github)
3. [Configurar Vercel](#configurar-vercel)
4. [Configurar Base de Datos](#configurar-base-de-datos)
5. [Variables de Entorno](#variables-de-entorno)
6. [Desplegar](#desplegar)
7. [Post-Despliegue](#post-despliegue)
8. [Troubleshooting](#troubleshooting)

---

## Preparación para GitHub

### 1. Verificar Archivos Sensibles

Antes de subir cualquier código, asegúrate de que no hay archivos sensibles:

```bash
# Verifica que .env no esté siendo rastreado
git status

# Si ves .env en los archivos, elimínalo del staging
git rm --cached .env
```

### 2. Verificar .gitignore

Asegúrate de que `.gitignore` incluya:
- `.env` y `.env.local`
- `node_modules/`
- `.next/`
- `prisma/dev.db` y `prisma/dev.db-journal`
- `.vercel/`

### 3. Inicializar Git (si es necesario)

```bash
# Si el proyecto no tiene Git inicializado
git init

# Agrega todos los archivos
git add .

# Crea el commit inicial
git commit -m "Initial commit: Seminario Inteligencia Energética"
```

---

## Subir a GitHub

### 1. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `app-seminario-inteligencia-energetica` (o el que prefieras)
4. **NO** marques:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
5. Haz clic en "Create repository"

### 2. Conectar Repositorio Local con GitHub

```bash
# Agrega el remote (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/app-seminario-inteligencia-energetica.git

# Cambia a la rama main
git branch -M main

# Sube el código
git push -u origin main
```

### 3. Verificar

Visita tu repositorio en GitHub y verifica que todos los archivos estén presentes y que `.env` NO esté visible.

---

## Configurar Vercel

### 1. Crear Cuenta en Vercel

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en "Sign Up"
3. Elige "Continue with GitHub"
4. Autoriza Vercel para acceder a tus repositorios

### 2. Importar Proyecto

1. En el dashboard de Vercel, haz clic en "Add New Project"
2. Selecciona el repositorio `app-seminario-inteligencia-energetica`
3. Vercel detectará automáticamente:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Configuración del Proyecto

**Framework Preset**: Next.js (automático)
**Root Directory**: `./` (dejar por defecto)
**Build Command**: `npm run build` (automático)
**Output Directory**: `.next` (automático)
**Install Command**: `npm install` (automático)

---

## Configurar Base de Datos

### Opción A: Vercel Postgres (Recomendado)

1. En el dashboard de Vercel, ve a la pestaña "Storage"
2. Haz clic en "Create Database"
3. Selecciona "Postgres"
4. Elige un nombre para tu base de datos
5. Selecciona una región cercana a tus usuarios
6. Haz clic en "Create"
7. **Copia la `DATABASE_URL`** que se muestra (la necesitarás después)

### Opción B: Base de Datos Externa

Puedes usar cualquier proveedor de PostgreSQL:

- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech
- **PlanetScale**: https://planetscale.com

Copia la URL de conexión PostgreSQL que te proporcionen.

---

## Variables de Entorno

### 1. Agregar Variables en Vercel

En la configuración del proyecto en Vercel:

1. Ve a "Settings" → "Environment Variables"
2. Agrega las siguientes variables:

#### DATABASE_URL

```
postgresql://usuario:password@host:5432/database?schema=public
```

O si usas Vercel Postgres, usa la URL que te proporcionaron.

#### NEXTAUTH_URL

Para producción, usa la URL de tu aplicación:
```
https://tu-app.vercel.app
```

**Nota**: Vercel actualiza automáticamente esta variable, pero puedes configurarla manualmente.

#### NEXTAUTH_SECRET

Genera un secret aleatorio seguro:

```bash
openssl rand -base64 32
```

Copia el resultado y úsalo como valor de `NEXTAUTH_SECRET`.

### 2. Configurar para Todos los Entornos

Asegúrate de que las variables estén configuradas para:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Desplegar

### 1. Primer Despliegue

1. En la página de configuración del proyecto, haz clic en "Deploy"
2. Vercel comenzará el proceso de despliegue:
   - Instalará dependencias (`npm install`)
   - Ejecutará `postinstall` (genera Prisma Client)
   - Ejecutará `npm run build`:
     - Genera Prisma Client
     - Ejecuta migraciones de base de datos
     - Construye la aplicación Next.js

### 2. Monitorear el Despliegue

Puedes ver el progreso en tiempo real en la página de despliegue. Si hay errores, aparecerán en los logs.

### 3. Verificar el Despliegue

Una vez completado, visita la URL proporcionada por Vercel (ej: `https://tu-app.vercel.app`).

---

## Post-Despliegue

### 1. Crear Usuario Inicial

Necesitas crear al menos un usuario para poder iniciar sesión. Tienes dos opciones:

#### Opción A: Vercel CLI (Recomendado)

```bash
# Instala Vercel CLI globalmente
npm install -g vercel

# Conecta con tu proyecto
vercel link

# Descarga las variables de entorno
vercel env pull .env.local

# Crea el usuario
npm run init-user admin@example.com tu-password "Nombre Admin"
```

#### Opción B: Script de API Temporal

Crea un endpoint temporal `app/api/create-user/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })
    
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

**⚠️ IMPORTANTE**: Elimina este endpoint después de crear el usuario por seguridad.

### 2. Verificar Funcionalidad

1. Visita la URL de tu aplicación
2. Deberías ver la página de login
3. Inicia sesión con el usuario creado
4. Verifica que puedas navegar por las sesiones
5. Prueba las funcionalidades principales

### 3. Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a "Settings" → "Domains"
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar los DNS

---

## Troubleshooting

### Error: "Prisma Client not generated"

**Solución:**
- Verifica que el script `postinstall` esté en `package.json`
- Revisa los logs de build en Vercel
- Asegúrate de que `prisma generate` se ejecute correctamente

### Error: "Database connection failed"

**Solución:**
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que la base de datos PostgreSQL esté accesible desde internet
- Verifica las credenciales de la base de datos
- Si usas Vercel Postgres, verifica que la base de datos esté activa

### Error: "NEXTAUTH_SECRET is missing"

**Solución:**
- Ve a "Settings" → "Environment Variables" en Vercel
- Asegúrate de que `NEXTAUTH_SECRET` esté configurada
- Regenera el secret si es necesario: `openssl rand -base64 32`

### Error: "Migration failed"

**Solución:**
- Verifica que la base de datos esté vacía o que las migraciones sean compatibles
- Revisa los logs de build para ver el error específico
- Si es necesario, ejecuta las migraciones manualmente usando Prisma Studio

### Error: "Build failed"

**Solución:**
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no haya errores de TypeScript: `npm run lint`
- Verifica que el script `fix-prisma.sh` tenga permisos de ejecución

### La aplicación carga pero muestra errores

**Solución:**
- Revisa los logs de runtime en Vercel
- Verifica la consola del navegador para errores de JavaScript
- Asegúrate de que todas las variables de entorno estén configuradas
- Verifica que la base de datos tenga las tablas necesarias

---

## Comandos Útiles

```bash
# Ver logs en tiempo real
vercel logs

# Abrir Prisma Studio (después de conectar con vercel link)
npx prisma studio

# Ejecutar migraciones manualmente
npx prisma migrate deploy

# Generar Prisma Client
npx prisma generate
```

---

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de NextAuth.js](https://next-auth.js.org)

---

## Checklist Final

Antes de considerar el despliegue completo, verifica:

- [ ] Código subido a GitHub
- [ ] `.env` no está en el repositorio
- [ ] Proyecto conectado en Vercel
- [ ] Base de datos configurada (PostgreSQL)
- [ ] Variables de entorno configuradas:
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXTAUTH_SECRET`
- [ ] Despliegue exitoso
- [ ] Usuario inicial creado
- [ ] Login funcionando
- [ ] Sesiones cargando correctamente
- [ ] Funcionalidades principales probadas

¡Felicitaciones! Tu aplicación está desplegada y lista para usar. 🎉


