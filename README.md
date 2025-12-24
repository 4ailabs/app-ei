# Seminario Internacional - Inteligencia Energética

Aplicación web moderna para el Seminario Internacional de Inteligencia Energética con múltiples sesiones formativas, apps interactivas y sistema de gamificación.

## Características Principales

- ✅ **Autenticación segura** con NextAuth.js y gestión de usuarios
- 📚 **Múltiples sesiones formativas** con contenido completo (videos, audios, PDFs, protocolos)
- 🎮 **Sistema de XP y Premium** - Gana experiencia practicando en las apps y desbloquea contenido exclusivo
- 📱 **Apps Interactivas** - 10+ herramientas prácticas para regulación emocional y técnicas terapéuticas
- 🎥 **Videos de Cloudflare Stream** - Integración con Cloudflare Stream para reproducción de alta calidad
- 🎵 **Reproductor de audio personalizado** - Meditaciones guiadas y audios de práctica
- 📖 **Exploración interactiva de temas** - Contenido educativo organizado con subtemas
- 📊 **Tracking de progreso** - Seguimiento del avance por sesión
- 🎨 **Diseño moderno y responsive** - Soporte para modo oscuro y dispositivos móviles
- 👨‍💼 **Panel de administración** - Gestión completa de usuarios, estadísticas y contenido

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Prisma** - ORM para base de datos (PostgreSQL)
- **NextAuth.js v5** - Autenticación y gestión de sesiones
- **Cloudflare Stream** - Almacenamiento y reproducción de videos
- **Google Generative AI (Gemini)** - IA para generación de contenido personalizado
- **Vercel** - Deployment y hosting

## Contenido de la Aplicación

### Sesiones Formativas

La aplicación incluye múltiples sesiones organizadas por días y módulos, cada una con:

- **Videos educativos** (Cloudflare Stream y Vimeo)
- **Audios guiados** (meditaciones, prácticas de regulación)
- **PDFs descargables** (manuales, protocolos, guías)
- **Protocolos HTML interactivos** (slides, diagramas, tarjetas)
- **Temas explorables** con subtemas y contenido detallado
- **Apps interactivas** relacionadas con cada sesión

### Apps Interactivas Disponibles

1. **Respiración Guiada** - Patrones 4-7-8, Box Breathing y más
2. **Abrazo de Mariposa** - Estimulación bilateral con timer y vibración
3. **Lugar Seguro** - Visualización guiada para crear espacio de calma
4. **Escáner Corporal** - Recorrido guiado por el cuerpo
5. **Check-in de Estado** - Identificación de estado (Ventral/Simpático/Dorsal)
6. **Las 4 Palancas** - Práctica guiada paso a paso
7. **Re-etiquetado** - Transformación de lenguaje limitante (con generación IA)
8. **Detector de Estados** - Entrenamiento de reconocimiento de señales corporales
9. **Aventura de Regulación** - Juego educativo
10. **Regulación Game** - Gamificación de técnicas de regulación

Todas las apps sincronizan XP con el servidor para el sistema de gamificación.

### Sistema de XP y Premium

- **Sistema de puntos (XP)**: Gana experiencia completando prácticas en las apps
- **Desbloqueo de Premium**: Al alcanzar 500 XP, obtienes acceso a contenido exclusivo
- **Contenido Premium**: Videos, audios y material descargable que se actualiza semanalmente
- **Historial de XP**: Rastrea tu progreso y actividades que generaron puntos

### Protocolos y Materiales

Protocolos HTML interactivos disponibles:
- Las 4 Palancas del Estado
- Neuroplasticidad y Ciencia del Cambio
- Plan de Cambio Neuroplástico
- Re-etiquetado de Lenguaje
- Rituales de Consolidación
- Pregunta del Milagro (con slides y apps)
- Context Engineering (Kit de Tarjetas)
- TRSB Session Dashboard
- Diario de Regulación Semanal
- Y más...

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
- `DATABASE_URL` - URL de la base de datos PostgreSQL
- `NEXTAUTH_URL` - URL de la aplicación (http://localhost:8080 para desarrollo)
- `NEXTAUTH_SECRET` - Secret para NextAuth (genera uno aleatorio)
- `GOOGLE_GEMINI_API_KEY` - API Key de Google Generative AI (opcional, para funcionalidades de IA)
- `CLOUDFLARE_ACCOUNT_ID` - Account ID de Cloudflare Stream (opcional, para gestión de videos)
- `CLOUDFLARE_API_TOKEN` - API Token de Cloudflare (opcional, para gestión de videos)

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

Abre [http://localhost:8080](http://localhost:8080) en tu navegador (puerto configurado en package.json).

## Configuración de Sesiones

Las sesiones se configuran en `data/sessions.ts`. Cada sesión puede incluir:

- `pdfUrl` - URL del PDF descargable principal
- `pdfs` - Array de PDFs adicionales con categorías
- `videos` - Array de videos (soporta `cloudflareStreamId` y `vimeoId`)
- `audios` - Array de audios con categorías (regulación, meditación, etc.)
- `themes` - Array de temas explorables con subtemas
- `protocols` - Array de protocolos relacionados
- `apps` - Array de apps interactivas asociadas
- `additionalResources` - Recursos adicionales (imágenes, diagramas, slides)

### Ejemplo de configuración:

```typescript
{
  id: 1,
  title: "Título de la Sesión",
  description: "Descripción",
  day: 1,
  moduleNumber: 1,
  pdfUrl: "https://ejemplo.com/manual.pdf",
  videos: [
    {
      id: "v1",
      title: "Video 1",
      cloudflareStreamId: "abc123...", // Prioridad sobre vimeoId
      vimeoId: "123456789", // Fallback
      duration: "10 min",
      description: "Descripción del video"
    }
  ],
  audios: [
    {
      id: "a1",
      title: "Audio 1",
      url: "/Audios/audio.wav",
      duration: "15 min",
      category: "meditacion",
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
  ],
  apps: [
    {
      id: "app1",
      name: "App Interactiva",
      description: "Descripción",
      url: "/protocols/app.html",
      iconName: "Activity"
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
| `GOOGLE_GEMINI_API_KEY` | `[opcional]` | API Key para funcionalidades de IA (re-etiquetado, chat maestro) |
| `CLOUDFLARE_ACCOUNT_ID` | `[opcional]` | Account ID para gestión de videos en Cloudflare Stream |
| `CLOUDFLARE_API_TOKEN` | `[opcional]` | API Token para subir/gestionar videos |

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

- `npm run dev` - Inicia el servidor de desarrollo (puerto 8080)
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run db:migrate` - Ejecuta migraciones de base de datos
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:studio` - Abre Prisma Studio (GUI para la base de datos)
- `npm run init-user` - Crea o actualiza un usuario
- `npm run make-admin` - Convierte un usuario en administrador
- `npm run update-password` - Actualiza la contraseña de un usuario

## Estructura del Proyecto

```
├── app/                           # Páginas y rutas (App Router)
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autenticación
│   │   ├── users/                # Gestión de usuarios
│   │   ├── progress/             # Tracking de progreso
│   │   ├── videos/               # Gestión de videos (Cloudflare Stream)
│   │   ├── xp/                   # Sistema de XP y gamificación
│   │   ├── reetiquetado/         # Generación IA de transformaciones
│   │   └── maestro/              # Chat con IA para sesiones
│   ├── admin/                    # Panel de administración
│   ├── apps/                     # Página de apps interactivas
│   ├── premium/                  # Contenido premium (requiere XP)
│   ├── login/                    # Página de login
│   ├── register/                 # Página de registro
│   ├── sesiones/[id]/            # Página individual de sesión
│   └── page.tsx                  # Dashboard principal
├── components/                    # Componentes React
│   ├── admin/                    # Componentes del panel admin
│   ├── session/                  # Componentes de sesión
│   ├── maestro/                  # Componentes del chat IA
│   ├── ui/                       # Componentes UI reutilizables
│   └── providers/                # Providers de contexto
├── data/                          # Datos estáticos
│   └── sessions.ts               # Configuración de todas las sesiones
├── lib/                           # Utilidades y configuraciones
│   ├── auth.ts                   # Configuración de NextAuth
│   ├── auth-server.ts            # Utilidades de auth para servidor
│   ├── prisma.ts                 # Cliente de Prisma
│   ├── cloudflare-stream.ts      # Utilidades para Cloudflare Stream
│   ├── rate-limit.ts             # Sistema de límites de rate
│   └── maestro/                  # Configuración del chat IA
├── public/                        # Archivos estáticos
│   ├── protocols/                # Protocolos HTML interactivos
│   │   ├── *-app.html           # Apps interactivas
│   │   └── *.html               # Protocolos estáticos
│   └── images/                   # Imágenes
├── prisma/                        # Schema y migraciones de Prisma
│   └── schema.prisma             # Schema de la base de datos
└── types/                         # Tipos TypeScript
    └── next-auth.d.ts            # Tipos extendidos de NextAuth
```


## API Endpoints Principales

### Autenticación y Usuarios
- `POST /api/register` - Registro de nuevos usuarios
- `GET /api/auth/session` - Obtener sesión actual
- `GET /api/users` - Listar usuarios (admin)
- `PUT /api/users/[id]` - Actualizar usuario (admin)

### Progreso y XP
- `GET /api/progress` - Obtener progreso del usuario
- `POST /api/progress` - Actualizar progreso de sesión
- `GET /api/xp` - Obtener XP actual y estado premium
- `POST /api/xp` - Sincronizar XP desde apps

### Contenido IA
- `POST /api/reetiquetado/generate` - Generar transformación de lenguaje con IA
- `POST /api/maestro/chat` - Chat con IA para sesiones

### Videos
- `GET /api/videos` - Listar videos (admin)
- `POST /api/videos/upload` - Subir video a Cloudflare Stream (admin)
- `DELETE /api/videos` - Eliminar video (admin)

## Características Avanzadas

### Modo Oscuro
- Soporte completo para tema oscuro/claro
- Detecta preferencias del sistema
- Toggle manual disponible

### Apps HTML Estáticas
- Apps independientes en `/public/protocols/*-app.html`
- Sincronización de XP con el servidor
- Funcionan offline después de cargar
- Diseño responsive y PWA-ready

### Sistema de Rate Limiting
- Protección contra abuso en endpoints de IA
- Límites diarios por usuario
- Límites por tipo de contenido

## Licencia

Este proyecto es privado y está destinado exclusivamente para el Seminario Internacional de Inteligencia Energética.
