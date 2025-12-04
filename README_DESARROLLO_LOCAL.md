# 💻 Desarrollo Local

## Base de Datos

El proyecto está configurado para usar **PostgreSQL** tanto en desarrollo como en producción.

### Opción 1: Usar PostgreSQL Localmente (Recomendado)

1. Instala PostgreSQL en tu Mac:
   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```

2. Crea una base de datos:
   ```bash
   createdb app_seminario_dev
   ```

3. Configura `.env`:
   ```env
   DATABASE_URL="postgresql://tu_usuario@localhost:5432/app_seminario_dev"
   ```

4. Ejecuta migraciones:
   ```bash
   npm run db:migrate
   ```

### Opción 2: Usar SQLite Temporalmente (Solo para desarrollo rápido)

Si necesitas usar SQLite temporalmente para desarrollo:

1. Cambia el schema temporalmente:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Configura `.env`:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

3. **IMPORTANTE**: Antes de hacer commit, vuelve a cambiar a PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

### Opción 3: Usar Base de Datos Remota (PostgreSQL)

Puedes usar una base de datos PostgreSQL remota (Supabase, Neon, Railway, etc.) tanto para desarrollo como producción.

## Variables de Entorno Necesarias

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@host:5432/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secret-aleatorio-aqui"

# Google OAuth (Opcional)
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

## Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Comandos Útiles

```bash
# Generar cliente de Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Abrir Prisma Studio (GUI para la base de datos)
npm run db:studio

# Crear usuario
npm run init-user email@example.com password123 "Nombre Usuario"

# Iniciar servidor de desarrollo
npm run dev
```

