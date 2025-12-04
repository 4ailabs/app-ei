# ✅ Solución: Configurar Storage y Base de Datos en Vercel

## 🔍 Aclaración Importante

**NO necesitas API keys de Prisma** para este proyecto. Lo único que necesitas es:
1. Crear una base de datos PostgreSQL en Vercel Storage
2. Configurar la variable de entorno `DATABASE_URL`

---

## 🚀 Pasos para Configurar Todo Correctamente

### Paso 1: Crear Base de Datos PostgreSQL en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto **app-ei** (o el nombre de tu proyecto)
3. En el menú superior, haz clic en la pestaña **"Storage"**
4. Haz clic en el botón **"Create Database"**
5. Verás opciones del Marketplace. Elige una de estas (recomendadas en orden):
   
   **Opción A: Prisma Postgres** (Más fácil, recomendada)
   - Busca "Prisma Postgres" o "Instant Serverless Postgres"
   - Haz clic en "Create" o "Add"
   - Nombre: `app-ei-db` (o el que prefieras)
   - Región: Elige la más cercana a ti
   - Haz clic en "Create"

   **Opción B: Neon** (Muy popular)
   - Busca "Neon - Serverless Postgres"
   - Sigue el proceso de configuración
   - Conecta tu cuenta de Neon si es necesario

   **Opción C: Supabase**
   - Busca "Supabase - Postgres backend"
   - Sigue el proceso de configuración

6. ⚠️ **MUY IMPORTANTE**: Después de crear la base de datos:
   - Vercel te mostrará la **Connection String** o **DATABASE_URL**
   - Se ve algo como: `postgresql://usuario:password@host:5432/database?sslmode=require`
   - **COPIA ESTA URL COMPLETA** - la necesitarás en el siguiente paso
   - Si no la ves inmediatamente, busca en:
     - "Connection String"
     - "Environment Variables" (Vercel a veces la agrega automáticamente)
     - Configuración de la base de datos

---

### Paso 2: Configurar Variables de Entorno en Vercel

1. En el mismo proyecto de Vercel, ve a **Settings** (en el menú superior)
2. En el menú lateral izquierdo, haz clic en **"Environment Variables"**
3. Verifica si `DATABASE_URL` ya existe:
   - Si Vercel la agregó automáticamente, está bien ✅
   - Si NO existe, agrégala manualmente

#### Agregar DATABASE_URL Manualmente (si no existe)

1. Haz clic en **"Add New"** o **"Add"**
2. **Key**: `DATABASE_URL`
3. **Value**: Pega la URL que copiaste en el Paso 1
4. **Environment**: Marca las 3 casillas:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Haz clic en **"Save"**

#### Verificar NEXTAUTH_URL

1. Busca la variable `NEXTAUTH_URL`
2. Si no existe, agrégala:
   - **Key**: `NEXTAUTH_URL`
   - **Value**: `https://tu-app.vercel.app` (reemplaza con tu URL real de Vercel)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Verificar NEXTAUTH_SECRET

1. Busca la variable `NEXTAUTH_SECRET`
2. Si no existe, agrégala:
   - **Key**: `NEXTAUTH_SECRET`
   - **Value**: Genera uno con este comando:
     ```bash
     openssl rand -base64 32
     ```
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

---

### Paso 3: Redesplegar la Aplicación

1. Ve a la pestaña **"Deployments"** en Vercel
2. Encuentra el último deployment
3. Haz clic en los tres puntos (⋯) del último deployment
4. Selecciona **"Redeploy"**
5. O simplemente haz un nuevo commit y push a GitHub:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

---

## ✅ Verificación

Después del deployment, deberías ver:
- ✅ Build completado sin errores
- ✅ Migraciones de Prisma aplicadas correctamente
- ✅ Aplicación funcionando en la URL de Vercel

---

## 🔧 Si Aún Hay Errores

### Error: "Environment variable not found: DATABASE_URL"

**Solución:**
1. Ve a Settings → Environment Variables
2. Verifica que `DATABASE_URL` existe
3. Verifica que está marcada para "Production"
4. Si no existe, agrégala con la URL de tu base de datos

### Error: "Can't reach database server"

**Solución:**
1. Verifica que la `DATABASE_URL` es correcta
2. Verifica que la base de datos está activa en Vercel Storage
3. Si usas Neon o Supabase, verifica que la base de datos no está pausada

### Error: "Relation does not exist" o errores de migración

**Solución:**
1. Las migraciones se ejecutan automáticamente durante el build
2. Si hay problemas, puedes ejecutarlas manualmente conectándote a la base de datos
3. O verifica que las migraciones estén en `prisma/migrations/`

---

## 📝 Resumen: Lo Que NO Necesitas

❌ **NO necesitas:**
- API keys de Prisma
- Prisma Accelerate
- Prisma Data Proxy
- Configuraciones complejas de Prisma

✅ **Solo necesitas:**
- Una base de datos PostgreSQL (en Vercel Storage o externa)
- La variable `DATABASE_URL` configurada
- Las variables de NextAuth configuradas

---

## 🎯 Nuestra Configuración Actual (Correcta)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"  ✅ Correcto
}

datasource db {
  provider = "postgresql"         ✅ Correcto
  url      = env("DATABASE_URL")  ✅ Solo necesitas esta variable
}
```

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()
// ✅ No necesitas configuración adicional
```

---

## 🆘 ¿Necesitas Ayuda?

Si después de seguir estos pasos aún tienes problemas:

1. **Revisa los logs de Vercel:**
   - Ve a Deployments → Selecciona el deployment → Logs
   - Busca errores específicos

2. **Verifica las variables de entorno:**
   - Settings → Environment Variables
   - Asegúrate de que todas estén configuradas

3. **Verifica la base de datos:**
   - Storage → Selecciona tu base de datos
   - Verifica que está activa y funcionando

4. **Prueba localmente:**
   - Descarga las variables: `vercel env pull .env.local`
   - Ejecuta: `npm run dev`
   - Verifica si funciona localmente

---

¡Con estos pasos deberías poder configurar todo correctamente! 🚀

