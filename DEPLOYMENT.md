# Guía de Deployment en Vercel

## ⚠️ IMPORTANTE: Configurar Variables de Entorno ANTES del Deployment

**El error más común es olvidar configurar las variables de entorno en Vercel antes del primer deployment.**

## Paso 1: Crear Base de Datos PostgreSQL

### Opción A: Vercel Postgres (Recomendado)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en la pestaña **"Storage"**
3. Haz clic en **"Create Database"**
4. Selecciona **"Postgres"**
5. Elige un nombre para tu base de datos (ej: `app-ei-db`)
6. Selecciona una región cercana a tus usuarios
7. Haz clic en **"Create"**
8. **IMPORTANTE**: Copia la `DATABASE_URL` que aparece (la necesitarás en el siguiente paso)

### Opción B: Base de Datos Externa

Puedes usar cualquier proveedor de PostgreSQL:
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech

Copia la URL de conexión PostgreSQL que te proporcionen.

## Paso 2: Configurar Variables de Entorno en Vercel

**⚠️ ESTE PASO ES CRÍTICO - Sin estas variables, el build fallará**

1. En el dashboard de Vercel, ve a tu proyecto
2. Haz clic en **"Settings"** (Configuración)
3. En el menú lateral, haz clic en **"Environment Variables"**
4. Agrega las siguientes variables:

### Variable 1: DATABASE_URL

- **Key**: `DATABASE_URL`
- **Value**: La URL de tu base de datos PostgreSQL
  - Si usas Vercel Postgres: usa la URL que te proporcionaron
  - Si usas otra base de datos: usa la URL de conexión PostgreSQL
- **Environment**: Selecciona **Production**, **Preview**, y **Development** (o al menos Production)
- Haz clic en **"Save"**

### Variable 2: NEXTAUTH_URL

- **Key**: `NEXTAUTH_URL`
- **Value**: La URL de tu aplicación en Vercel
  - Para producción: `https://tu-app.vercel.app` (reemplaza con tu URL real)
  - Vercel puede actualizar esto automáticamente, pero es mejor configurarlo manualmente
- **Environment**: Selecciona **Production**, **Preview**, y **Development**
- Haz clic en **"Save"**

### Variable 3: NEXTAUTH_SECRET

- **Key**: `NEXTAUTH_SECRET`
- **Value**: Genera un secret aleatorio seguro ejecutando:
  ```bash
  openssl rand -base64 32
  ```
  O usa este generador online: https://generate-secret.vercel.app/32
- **Environment**: Selecciona **Production**, **Preview**, y **Development**
- Haz clic en **"Save"**

## Paso 3: Deployment

1. Conecta tu repositorio de GitHub a Vercel (si aún no lo has hecho)
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Haz clic en **"Deploy"**
4. El build script incluye:
   - `prisma generate` - Genera el cliente Prisma
   - `prisma migrate deploy` - Aplica las migraciones a PostgreSQL
   - `next build` - Construye la aplicación

## Nota sobre Prisma

El cliente de Prisma se genera automáticamente durante el build en Vercel.
Si encuentras problemas de importación localmente, ejecuta:

```bash
npm run db:generate
```

## Paso 4: Crear Usuario Inicial

Después del deployment exitoso, necesitas crear un usuario para poder iniciar sesión.

### Opción A: Usar Vercel CLI (Recomendado)

```bash
# Instala Vercel CLI globalmente
npm i -g vercel

# Conecta con tu proyecto
vercel link

# Descarga las variables de entorno
vercel env pull .env.local

# Ejecuta el script de inicialización
npm run init-user admin@example.com password123 "Admin User"
```

### Opción B: Crear endpoint temporal de API

Crea un endpoint temporal en `app/api/create-user/route.ts` para crear usuarios (recuerda eliminarlo después por seguridad).

## 🔧 Solución de Problemas

### Error: "Environment variable not found: DATABASE_URL"

**Causa**: No has configurado la variable `DATABASE_URL` en Vercel.

**Solución**:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega `DATABASE_URL` con la URL de tu base de datos PostgreSQL
4. Asegúrate de seleccionar al menos "Production" en Environment
5. Haz clic en "Save"
6. Vuelve a hacer deploy

### Error: "Prisma schema validation - provider mismatch"

**Causa**: El schema estaba configurado para SQLite pero necesitas PostgreSQL.

**Solución**: Ya está corregido. El schema ahora usa PostgreSQL. Si aún ves este error:
1. Verifica que `prisma/schema.prisma` tenga `provider = "postgresql"`
2. Haz commit y push de los cambios
3. Vuelve a hacer deploy

### Error: "Migration failed" o "Database connection failed"

**Causa**: La URL de la base de datos es incorrecta o la base de datos no está accesible.

**Solución**:
1. Verifica que `DATABASE_URL` esté correctamente configurada en Vercel
2. Asegúrate de que la base de datos PostgreSQL esté activa
3. Verifica que la URL incluya todas las credenciales necesarias
4. Si usas Vercel Postgres, verifica que la base de datos esté creada y activa

### Error: "NEXTAUTH_SECRET is missing"

**Causa**: No has configurado `NEXTAUTH_SECRET` en Vercel.

**Solución**:
1. Genera un secret: `openssl rand -base64 32`
2. Agrega `NEXTAUTH_SECRET` en Vercel → Settings → Environment Variables
3. Vuelve a hacer deploy

## 📝 Nota sobre Desarrollo Local

Si quieres seguir usando SQLite localmente y PostgreSQL en producción, puedes:

1. Mantener un `.env.local` con SQLite para desarrollo:
   ```
   DATABASE_URL="file:./dev.db"
   ```

2. Y usar PostgreSQL en producción (configurado en Vercel)

Sin embargo, **se recomienda usar PostgreSQL también en desarrollo** para evitar diferencias entre entornos.
