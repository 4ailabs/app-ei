# Guía de Deployment en Vercel

## Configuración Pre-Deployment

1. **Base de Datos**: 
   - Para producción, configura una base de datos PostgreSQL en Vercel
   - O usa Vercel Postgres (recomendado)

2. **Variables de Entorno en Vercel**:
   - `DATABASE_URL`: URL de tu base de datos PostgreSQL
   - `NEXTAUTH_URL`: URL de tu aplicación (se configura automáticamente)
   - `NEXTAUTH_SECRET`: Genera un secret aleatorio seguro:
     ```bash
     openssl rand -base64 32
     ```

## Pasos para Deployment

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Las variables de entorno se configuran en el dashboard de Vercel
4. El build script incluye `prisma generate` y `prisma migrate deploy`

## Nota sobre Prisma

El cliente de Prisma se genera automáticamente durante el build en Vercel.
Si encuentras problemas de importación localmente, ejecuta:

```bash
npm run db:generate
```

## Crear Usuario Inicial

Después del deployment, puedes crear usuarios usando Prisma Studio:

```bash
npm run db:studio
```

O crea un script de API para registro de usuarios.
