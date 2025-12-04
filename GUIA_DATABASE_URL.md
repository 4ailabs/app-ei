# 📝 Guía: Cómo Obtener DATABASE_URL en Vercel

## ¿Qué es DATABASE_URL?

`DATABASE_URL` es una cadena de conexión que contiene toda la información necesaria para que tu aplicación se conecte a la base de datos PostgreSQL. Se ve así:

```
postgresql://usuario:contraseña@host:5432/nombre_base_datos?sslmode=require
```

## Paso a Paso: Obtener DATABASE_URL

### 1. Crear la Base de Datos

1. Ve a tu proyecto en Vercel Dashboard
2. Pestaña **"Storage"** → **"Create Database"**
3. Elige un proveedor de PostgreSQL del Marketplace:
   - **Prisma Postgres** (Recomendado - más fácil)
   - **Neon** (Muy popular)
   - **Supabase** (También buena opción)
4. Haz clic en **"Create"** en el proveedor que elijas

### 2. Configurar la Base de Datos

Cada proveedor tiene un proceso ligeramente diferente:

#### Si eliges Prisma Postgres:
- Se crea automáticamente
- La URL aparece inmediatamente después de crear

#### Si eliges Neon:
- Puede pedirte crear una cuenta o conectar con GitHub
- Después de crear, te mostrará la connection string

#### Si eliges Supabase:
- Puede pedirte crear una cuenta
- Te mostrará la connection string en la configuración

### 3. Encontrar la DATABASE_URL

Después de crear la base de datos, busca la URL en uno de estos lugares:

**Opción A: En la pantalla de confirmación**
- Justo después de crear, Vercel muestra la `DATABASE_URL`
- Busca un campo que diga "Connection String", "DATABASE_URL", o "Postgres Connection URL"
- Haz clic en el botón "Copy" o selecciona y copia el texto completo

**Opción B: En la configuración de la base de datos**
- Ve a Storage → Tu base de datos
- Busca la sección "Connection" o "Settings"
- Ahí encontrarás la `DATABASE_URL` o "Connection String"

**Opción C: En el dashboard del proveedor**
- Si usas Neon o Supabase, puedes ver la URL en su dashboard
- Ve a la configuración de la base de datos
- Busca "Connection String" o "Connection URL"

### 4. Formato de la URL

La URL debería verse así:
```
postgresql://default:abc123xyz@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

O así:
```
postgresql://neondb_owner:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 5. Copiar y Guardar

- **Copia la URL completa** (desde `postgresql://` hasta el final)
- **Guárdala en un lugar seguro** - la necesitarás para el siguiente paso
- **No la compartas públicamente** - contiene credenciales sensibles

## ⚠️ Importante

- La URL contiene tu usuario y contraseña de la base de datos
- Es única para tu base de datos
- Si la pierdes, puedes regenerarla desde la configuración de la base de datos
- Necesitarás esta URL para configurar la variable de entorno en Vercel

## 🆘 ¿No encuentras la URL?

1. Ve a Storage → Tu base de datos creada
2. Busca un botón o enlace que diga "Connection String", "View Connection", o "Settings"
3. Si usas Neon o Supabase, ve a su dashboard directamente
4. Algunos proveedores muestran la URL solo una vez al crear - si la perdiste, busca en "Settings" o "Connection" de la base de datos

