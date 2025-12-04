# 🔧 Solución Rápida: Error de Deployment en Vercel

## Problema
```
Error: Environment variable not found: DATABASE_URL
```

## Solución Paso a Paso

### 1. Cambiar Schema a PostgreSQL ✅ (Ya hecho)

El schema de Prisma ya fue actualizado de SQLite a PostgreSQL.

### 2. Crear Base de Datos PostgreSQL en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a la pestaña **"Storage"**
4. Haz clic en **"Create Database"**
5. Selecciona **"Postgres"**
6. Elige un nombre y región
7. Haz clic en **"Create"**
8. **Copia la `DATABASE_URL`** que aparece

### 3. Configurar Variables de Entorno en Vercel

**⚠️ CRÍTICO: Sin esto, el build seguirá fallando**

1. En tu proyecto de Vercel, ve a **Settings** → **Environment Variables**
2. Agrega estas 3 variables:

#### DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: La URL que copiaste del paso anterior
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- **Save**

#### NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://tu-app.vercel.app` (reemplaza con tu URL real)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- **Save**

#### NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `GZ4fSsrHY/I6ZXEkvSZYLidQM48Nu+p2aJhIR4vnON4=` (o genera uno nuevo)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- **Save**

### 4. Hacer Commit y Push de los Cambios

```bash
git add prisma/schema.prisma
git commit -m "Cambiar schema a PostgreSQL para producción"
git push origin main
```

### 5. Redesplegar en Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en **"Deployments"**
3. Haz clic en los tres puntos (⋯) del último deployment
4. Selecciona **"Redeploy"**
5. O simplemente haz un nuevo push a GitHub y Vercel desplegará automáticamente

## ✅ Verificación

Después del deployment exitoso, deberías ver:
- ✅ Build completado sin errores
- ✅ Migraciones aplicadas correctamente
- ✅ Aplicación funcionando en la URL de Vercel

## 🆘 Si Aún Hay Errores

### Error: "Migration failed"
- Verifica que la `DATABASE_URL` sea correcta
- Asegúrate de que la base de datos PostgreSQL esté activa
- Revisa los logs de Vercel para más detalles

### Error: "Prisma Client not generated"
- Esto debería resolverse automáticamente
- Si persiste, verifica que el script `postinstall` esté en `package.json`

## 📞 Próximos Pasos

Después del deployment exitoso:
1. Crea un usuario inicial usando Vercel CLI (ver `DEPLOYMENT.md`)
2. Prueba iniciar sesión en la aplicación
3. Verifica que todas las funcionalidades trabajen correctamente

