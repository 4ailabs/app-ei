# 🚨 ACCIÓN REQUERIDA: Configurar Variables de Entorno en Vercel

## ⚠️ El deployment está fallando porque faltan las variables de entorno

**Error actual:** `Environment variable not found: DATABASE_URL`

## 📋 Pasos para Solucionar (5 minutos)

### Paso 1: Crear Base de Datos PostgreSQL en Vercel

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto **app-ei** (o el nombre que tenga)
3. En el menú superior, haz clic en la pestaña **"Storage"**
4. Haz clic en el botón **"Create Database"**
5. Verás varias opciones del Marketplace. Para PostgreSQL, elige una de estas opciones (recomendadas en orden):
   - **Prisma Postgres** - "Instant Serverless Postgres" (Más fácil de configurar)
   - **Neon** - "Serverless Postgres" (Muy popular)
   - **Supabase** - "Postgres backend" (También buena opción)
6. Haz clic en **"Create"** en la opción que elijas
7. Sigue el proceso de configuración:
   - Conecta tu cuenta si es necesario (algunos proveedores requieren autenticación)
   - Configura el nombre de la base de datos (ej: `app-ei-db`)
   - Selecciona la región más cercana
   - Completa cualquier otro paso que te pida el proveedor
8. ⚠️ **IMPORTANTE**: Al finalizar, Vercel te mostrará la `DATABASE_URL` o "Connection String"
   - Se verá algo como: `postgresql://usuario:password@host:5432/database`
   - **Copia esta URL completa** - es única y necesaria para el siguiente paso
   - Si no la ves inmediatamente, busca en la configuración de la base de datos o en "Connection String"

### Paso 2: Configurar Variables de Entorno

1. En el mismo proyecto de Vercel, haz clic en **"Settings"** (en el menú superior)
2. En el menú lateral izquierdo, haz clic en **"Environment Variables"**
3. Agrega las siguientes 3 variables (una por una):

#### Variable 1: DATABASE_URL

1. Haz clic en **"Add New"** o **"Add"**
2. **Key**: `DATABASE_URL`
3. **Value**: Pega la URL que copiaste en el Paso 1
4. **Environment**: Marca las 3 casillas:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Haz clic en **"Save"**

#### Variable 2: NEXTAUTH_URL

1. Haz clic en **"Add New"** o **"Add"**
2. **Key**: `NEXTAUTH_URL`
3. **Value**: `https://app-ei.vercel.app` (o la URL que Vercel te haya asignado)
   - Puedes encontrar tu URL en la pestaña "Deployments" → verás algo como `app-ei-xxxxx.vercel.app`
   - O usa el dominio personalizado si lo tienes configurado
4. **Environment**: Marca las 3 casillas:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Haz clic en **"Save"**

#### Variable 3: NEXTAUTH_SECRET

1. Haz clic en **"Add New"** o **"Add"**
2. **Key**: `NEXTAUTH_SECRET`
3. **Value**: `GZ4fSsrHY/I6ZXEkvSZYLidQM48Nu+p2aJhIR4vnON4=`
   - (Este es un secret seguro que ya generamos)
   - O genera uno nuevo ejecutando: `openssl rand -base64 32`
4. **Environment**: Marca las 3 casillas:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Haz clic en **"Save"**

### Paso 3: Verificar que las Variables Estén Configuradas

Deberías ver 3 variables en la lista:
- ✅ `DATABASE_URL`
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`

### Paso 4: Redesplegar

**Opción A: Redesplegar desde Vercel (Recomendado)**

1. Ve a la pestaña **"Deployments"**
2. Encuentra el último deployment (el que falló)
3. Haz clic en los **tres puntos (⋯)** a la derecha
4. Selecciona **"Redeploy"**
5. Confirma el redeploy

**Opción B: Hacer un nuevo push (si prefieres)**

```bash
# Hacer un pequeño cambio y push
git commit --allow-empty -m "Trigger redeploy after env vars setup"
git push origin main
```

## ✅ Verificación

Después del redeploy, deberías ver:
- ✅ Build completado sin errores
- ✅ "Deployment ready" o similar
- ✅ Tu aplicación funcionando en la URL de Vercel

## 🆘 Si Aún Hay Errores

### Error: "Migration failed"
- Verifica que la `DATABASE_URL` sea correcta
- Asegúrate de que la base de datos PostgreSQL esté activa en Storage
- Verifica que la URL no tenga espacios o caracteres extra

### Error: "Database connection failed"
- Verifica que la base de datos esté creada y activa
- Intenta crear la base de datos nuevamente si es necesario
- Verifica que la región de la base de datos sea accesible

### Las variables no se aplican
- Asegúrate de haber seleccionado al menos "Production" en cada variable
- Después de agregar las variables, **debes hacer redeploy** para que se apliquen
- Las variables no se aplican automáticamente a deployments existentes

## 📞 ¿Necesitas Ayuda?

Si después de seguir estos pasos aún hay problemas:
1. Revisa los logs completos del deployment en Vercel
2. Verifica que las 3 variables estén correctamente configuradas
3. Asegúrate de haber hecho redeploy después de agregar las variables

