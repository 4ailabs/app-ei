# Seminario Internacional - Inteligencia Energética

Aplicación web moderna para el Seminario Internacional de Inteligencia Energética con 5 sesiones formativas.

## Características

- ✅ Autenticación segura con NextAuth.js
- 📚 5 sesiones formativas con material completo
- 📄 Descarga de PDFs
- 🎥 Integración con Vimeo para videos
- 🎵 Reproductor de audio personalizado
- 📖 Exploración interactiva de temas
- 📊 Tracking de progreso por sesión
- 🎨 Diseño moderno y responsive

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Prisma** - ORM para base de datos
- **NextAuth.js** - Autenticación
- **SQLite** - Base de datos (desarrollo)
- **Vercel** - Deployment

## Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd app-seminario-inteligencia-energetica
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` y configura:
- `DATABASE_URL` - URL de la base de datos
- `NEXTAUTH_URL` - URL de la aplicación (http://localhost:3000 para desarrollo)
- `NEXTAUTH_SECRET` - Secret para NextAuth (genera uno aleatorio)

4. Genera el cliente de Prisma y ejecuta las migraciones:
```bash
npm run db:generate
npm run db:migrate
```

5. Crea un usuario inicial:
```bash
npm run init-user <email> <password> <nombre>
```

Ejemplo:
```bash
npm run init-user admin@example.com admin123 "Admin User"
```

## Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configuración de Sesiones

Las sesiones se configuran en `data/sessions.ts`. Cada sesión puede incluir:

- `pdfUrl` - URL del PDF descargable
- `videos` - Array de videos de Vimeo (con `vimeoId`)
- `audios` - Array de audios (con `url`)
- `themes` - Array de temas explorables con subtemas

### Ejemplo de configuración:

```typescript
{
  id: 1,
  title: "Título de la Sesión",
  description: "Descripción",
  day: 1,
  pdfUrl: "https://ejemplo.com/manual.pdf",
  videos: [
    {
      id: "v1",
      title: "Video 1",
      vimeoId: "123456789",
      description: "Descripción del video"
    }
  ],
  audios: [
    {
      id: "a1",
      title: "Audio 1",
      url: "https://ejemplo.com/audio.mp3",
      description: "Descripción del audio"
    }
  ],
  themes: [
    {
      id: "t1",
      title: "Tema 1",
      content: "Contenido del tema...",
      subtopics: [
        {
          id: "st1",
          title: "Subtema",
          content: "Contenido del subtema..."
        }
      ]
    }
  ]
}
```

## Preparación para GitHub

Antes de subir el proyecto a GitHub, asegúrate de:

1. **Verificar que no hay archivos sensibles**:
   ```bash
   # Verifica que .env no esté en el repositorio
   git status
   ```

2. **Inicializar el repositorio Git** (si aún no está inicializado):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Seminario Inteligencia Energética"
   ```

3. **Crear el repositorio en GitHub**:
   - Ve a [GitHub](https://github.com) y crea un nuevo repositorio
   - No inicialices con README, .gitignore o licencia (ya los tienes)

4. **Conectar y subir el código**:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

## Deployment en Vercel

### Paso 1: Conectar con GitHub

1. Ve a [Vercel](https://vercel.com) e inicia sesión
2. Haz clic en "Add New Project"
3. Conecta tu cuenta de GitHub si aún no lo has hecho
4. Selecciona el repositorio `app-seminario-inteligencia-energetica`
5. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 2: Configurar Base de Datos

**Opción A: Vercel Postgres (Recomendado)**

1. En el dashboard de Vercel, ve a "Storage"
2. Crea una nueva base de datos PostgreSQL
3. Copia la `DATABASE_URL` que se genera automáticamente

**Opción B: Base de datos externa**

Usa cualquier proveedor de PostgreSQL (Supabase, Railway, Neon, etc.) y copia la URL de conexión.

### Paso 3: Configurar Variables de Entorno

En la configuración del proyecto en Vercel, agrega estas variables de entorno:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | URL de tu base de datos PostgreSQL |
| `NEXTAUTH_URL` | `https://tu-app.vercel.app` | URL de tu aplicación (se actualiza automáticamente) |
| `NEXTAUTH_SECRET` | `[generar]` | Secret aleatorio seguro |

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Paso 4: Configurar Build Settings

Vercel detectará automáticamente la configuración, pero verifica que:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (o el que está en `package.json`)
- **Output Directory**: `.next` (automático)
- **Install Command**: `npm install`

### Paso 5: Desplegar

1. Haz clic en "Deploy"
2. Vercel ejecutará automáticamente:
   - `npm install` - Instalación de dependencias
   - `prisma generate` - Generación del cliente Prisma
   - `prisma migrate deploy` - Aplicación de migraciones
   - `next build` - Build de la aplicación

### Paso 6: Crear Usuario Inicial

Después del despliegue, necesitas crear un usuario inicial. Tienes dos opciones:

**Opción A: Usar Vercel CLI (Recomendado)**
```bash
# Instala Vercel CLI
npm i -g vercel

# Conecta con tu proyecto
vercel link

# Ejecuta el script de inicialización
vercel env pull .env.local
npm run init-user admin@example.com password123 "Admin User"
```

**Opción B: Crear API endpoint temporal**

Crea un endpoint temporal en `app/api/create-user/route.ts` para crear usuarios (recuerda eliminarlo después por seguridad).

### Verificación Post-Deployment

1. Visita tu URL de Vercel: `https://tu-app.vercel.app`
2. Verifica que la página de login carga correctamente
3. Prueba iniciar sesión con el usuario creado
4. Revisa los logs en Vercel si hay errores

### Troubleshooting

**Error: "Prisma Client not generated"**
- Verifica que `postinstall` script esté en `package.json`
- Revisa los logs de build en Vercel

**Error: "Database connection failed"**
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que la base de datos PostgreSQL esté accesible desde internet
- Verifica las credenciales de la base de datos

**Error: "NEXTAUTH_SECRET is missing"**
- Asegúrate de haber configurado `NEXTAUTH_SECRET` en las variables de entorno
- Regenera el secret si es necesario

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run db:migrate` - Ejecuta migraciones de base de datos
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:studio` - Abre Prisma Studio (GUI para la base de datos)
- `npm run init-user` - Crea o actualiza un usuario

## Estructura del Proyecto

```
├── app/                    # Páginas y rutas (App Router)
│   ├── api/auth/          # API de autenticación
│   ├── login/             # Página de login
│   ├── sesiones/[id]/     # Página individual de sesión
│   └── page.tsx           # Dashboard principal
├── components/            # Componentes React
│   ├── session/          # Componentes de sesión
│   ├── ui/                # Componentes UI reutilizables
│   └── providers/         # Providers de contexto
├── data/                  # Datos estáticos
│   └── sessions.ts        # Configuración de sesiones
├── lib/                   # Utilidades y configuraciones
│   ├── auth.ts            # Configuración de NextAuth
│   ├── prisma.ts          # Cliente de Prisma
│   └── utils.ts           # Utilidades generales
├── prisma/                # Schema y migraciones de Prisma
│   └── schema.prisma     # Schema de la base de datos
└── types/                 # Tipos TypeScript
    └── next-auth.d.ts     # Tipos extendidos de NextAuth
```

## Licencia

Este proyecto es privado y está destinado exclusivamente para el Seminario Internacional de Inteligencia Energética.
