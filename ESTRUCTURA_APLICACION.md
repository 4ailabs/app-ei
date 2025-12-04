# Estructura Completa de la Aplicación

## 📋 Resumen General

Esta es una aplicación Next.js 16 (App Router) para un **Seminario Internacional de Inteligencia Energética**. Es una plataforma de aprendizaje donde los estudiantes pueden acceder a sesiones con contenido multimedia (videos, audios, PDFs, temas, protocolos) y los administradores pueden gestionar usuarios y aprobar registros.

---

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 16.0.7** (App Router)
- **React 19.2.0**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Radix UI** (componentes accesibles: Accordion, Tabs, Dialog)
- **Lucide React** (iconos)

### Backend
- **Next.js API Routes** (backend integrado)
- **NextAuth.js 5.0.0-beta.30** (autenticación)
- **Prisma 6.19.0** (ORM)
- **PostgreSQL** (producción) / **SQLite** (desarrollo local)
- **bcryptjs** (hashing de contraseñas)

### Deployment
- **Vercel** (hosting y CI/CD)
- **PostgreSQL** (base de datos en producción)

---

## 📁 Estructura de Directorios

```
app-seminario-inteligencia-energetica/
├── app/                          # Next.js App Router
│   ├── admin/                    # Panel de administración
│   │   └── page.tsx              # Página principal del admin
│   ├── api/                      # API Routes
│   │   ├── admin/
│   │   │   └── stats/
│   │   │       └── route.ts      # Estadísticas del admin
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts      # Configuración NextAuth
│   │   │   └── check-user/
│   │   │       └── route.ts      # Verificar estado de usuario
│   │   ├── progress/
│   │   │   └── route.ts          # Gestión de progreso de sesiones
│   │   ├── register/
│   │   │   └── route.ts          # Registro de nuevos usuarios
│   │   └── users/
│   │       ├── [id]/
│   │       │   └── route.ts      # CRUD de usuario individual
│   │       └── route.ts          # Listar y crear usuarios
│   ├── login/
│   │   └── page.tsx              # Página de login
│   ├── register/
│   │   └── page.tsx              # Página de registro
│   ├── sesiones/
│   │   └── [id]/
│   │       └── page.tsx          # Página dinámica de sesión
│   ├── layout.tsx                # Layout raíz de la app
│   ├── page.tsx                  # Página principal (dashboard)
│   ├── globals.css               # Estilos globales
│   └── favicon.ico
│
├── components/                    # Componentes React reutilizables
│   ├── admin/
│   │   ├── AdminPanel.tsx        # Panel principal de admin
│   │   ├── StatsPanel.tsx        # Panel de estadísticas
│   │   ├── UserForm.tsx          # Formulario de usuario
│   │   └── UserTable.tsx         # Tabla de usuarios
│   ├── session/                  # Componentes de sesiones
│   │   ├── AppSection.tsx        # Sección de apps
│   │   ├── AudioSection.tsx      # Sección de audios
│   │   ├── PDFSection.tsx        # Sección de PDFs
│   │   ├── ProtocolSection.tsx   # Sección de protocolos
│   │   ├── SessionCard.tsx       # Tarjeta de sesión
│   │   ├── ThemeExplorer.tsx     # Explorador de temas
│   │   └── VideoSection.tsx      # Sección de videos
│   ├── providers/
│   │   └── SessionProvider.tsx    # Provider de sesión NextAuth
│   ├── ui/                       # Componentes UI base (shadcn/ui style)
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── tabs.tsx
│   ├── Footer.tsx                # Footer de la app
│   ├── Navbar.tsx                # Barra de navegación
│   └── Sidebar.tsx               # Barra lateral de navegación
│
├── lib/                          # Utilidades y configuraciones
│   ├── auth.ts                   # Configuración NextAuth
│   ├── auth-server.ts            # Helpers de autenticación server-side
│   ├── prisma.ts                 # Cliente Prisma singleton
│   └── utils.ts                  # Utilidades generales
│
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Schema de la base de datos
│   ├── migrations/               # Migraciones de BD
│   └── dev.db                    # Base de datos SQLite (local)
│
├── data/                         # Datos estáticos
│   └── sessions.ts               # Definición de sesiones del seminario
│
├── scripts/                      # Scripts de utilidad
│   ├── init-user.ts              # Crear usuario inicial
│   └── fix-prisma.sh             # Fix para Prisma en Vercel
│
├── public/                       # Archivos estáticos
│   ├── images/
│   │   └── sessions/             # Imágenes de sesiones
│   └── ...
│
├── types/                        # Tipos TypeScript
│   └── next-auth.d.ts            # Extensiones de tipos NextAuth
│
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración TypeScript
├── next.config.ts                # Configuración Next.js
├── tailwind.config.js            # Configuración Tailwind
└── vercel.json                   # Configuración Vercel
```

---

## 🗄️ Modelo de Base de Datos (Prisma Schema)

### Modelos Principales

#### 1. **User** (Usuario)
```prisma
- id: String (CUID)
- name: String? (opcional)
- email: String (único)
- password: String (hasheado con bcrypt)
- approved: Boolean (default: false) // Sistema de aprobación
- emailVerified: DateTime?
- image: String?
- createdAt, updatedAt: DateTime
- Relaciones: accounts, sessions, progress
```

#### 2. **Account** (Cuentas OAuth - NextAuth)
```prisma
- id: String
- userId: String (FK → User)
- type, provider: String
- providerAccountId: String
- tokens: refresh_token, access_token, etc.
```

#### 3. **Session** (Sesiones NextAuth)
```prisma
- id: String
- sessionToken: String (único)
- userId: String (FK → User)
- expires: DateTime
```

#### 4. **Progress** (Progreso de Sesiones)
```prisma
- id: String
- userId: String (FK → User)
- sessionId: Int
- pdfViewed: Boolean
- videosViewed: Boolean
- audiosViewed: Boolean
- themesViewed: Boolean
- completed: Boolean
- createdAt, updatedAt: DateTime
- Unique: [userId, sessionId]
```

#### 5. **VerificationToken** (NextAuth)
```prisma
- identifier: String
- token: String (único)
- expires: DateTime
```

---

## 🔐 Sistema de Autenticación

### Configuración (lib/auth.ts)

- **Provider**: Credentials (email/password)
- **Strategy**: JWT (no base de datos)
- **Duración de sesión**: 7 días
- **Actualización**: Cada 24 horas
- **Cookies**: HttpOnly, SameSite: lax, Secure en producción

### Flujo de Autenticación

1. **Registro** (`/register`)
   - Usuario completa formulario
   - Se crea con `approved: false`
   - Mensaje: "Pendiente de aprobación"

2. **Login** (`/login`)
   - Verifica credenciales con bcrypt
   - **Verifica `approved: true`** (si no, rechaza)
   - Crea sesión JWT

3. **Protección de Rutas**
   - Middleware o `getServerSession()` en páginas protegidas
   - Redirección a `/login` si no autenticado

### Endpoints de Autenticación

- `POST /api/register` - Registrar nuevo usuario
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `GET /api/auth/check-user` - Verificar estado de aprobación

---

## 📄 Páginas Principales

### 1. **Página Principal** (`app/page.tsx`)
- Dashboard con tarjetas de sesiones
- Muestra todas las sesiones disponibles
- Requiere autenticación

### 2. **Login** (`app/login/page.tsx`)
- Formulario de email/password
- Link a registro
- Manejo de errores (credenciales inválidas, no aprobado)

### 3. **Registro** (`app/register/page.tsx`)
- Formulario: nombre, email, password, confirmar password
- Validaciones client-side
- Mensaje de éxito visible con animación
- Link a login

### 4. **Sesión Individual** (`app/sesiones/[id]/page.tsx`)
- Página dinámica por ID de sesión
- Muestra: videos, audios, PDFs, temas, protocolos, apps
- Tracking de progreso
- Componentes modulares por tipo de contenido

### 5. **Panel Admin** (`app/admin/page.tsx`)
- Requiere autenticación y rol admin
- Integra: `AdminPanel`, `UserTable`, `UserForm`, `StatsPanel`
- CRUD de usuarios
- Aprobar/rechazar usuarios
- Estadísticas

---

## 🔌 API Routes

### Autenticación
- **`POST /api/register`**
  - Crea usuario con `approved: false`
  - Valida email único
  - Hashea password con bcrypt

### Usuarios
- **`GET /api/users`** - Lista todos los usuarios
- **`POST /api/users`** - Crea usuario (admin)
- **`GET /api/users/[id]`** - Obtiene usuario
- **`PUT /api/users/[id]`** - Actualiza usuario (incluye `approved`)
- **`DELETE /api/users/[id]`** - Elimina usuario

### Admin
- **`GET /api/admin/stats`** - Estadísticas:
  - Total usuarios
  - Usuarios con/sin progreso
  - Progreso promedio
  - Tasa de completación

### Progreso
- **`GET /api/progress`** - Obtiene progreso del usuario
- **`POST /api/progress`** - Actualiza progreso de sesión

---

## 🎨 Componentes Clave

### Layout
- **`app/layout.tsx`**: Layout raíz con `SessionProvider`, `Sidebar`, `Footer`
- **`components/Sidebar.tsx`**: Navegación lateral (responsive)
- **`components/Navbar.tsx`**: Barra superior (opcional)
- **`components/Footer.tsx`**: Footer

### Sesiones
- **`SessionCard`**: Tarjeta de sesión en dashboard
- **`VideoSection`**: Reproductor de videos Vimeo
- **`AudioSection`**: Reproductor de audios
- **`PDFSection`**: Visualizador de PDFs
- **`ThemeExplorer`**: Explorador de temas con acordeones
- **`ProtocolSection`**: Protocolos descargables
- **`AppSection`**: Enlaces a aplicaciones externas

### Admin
- **`AdminPanel`**: Contenedor principal
- **`UserTable`**: Tabla con búsqueda y filtros
- **`UserForm`**: Formulario crear/editar
- **`StatsPanel`**: Panel de estadísticas

---

## 📊 Datos de Sesiones

### Estructura (`data/sessions.ts`)

Cada sesión contiene:
- `id`: número único
- `title`, `description`: información básica
- `day`: día del seminario
- `imageUrl`: imagen de portada
- `pdfUrl`: PDF principal
- `videos[]`: array de videos (Vimeo IDs)
- `audios[]`: array de audios (URLs)
- `themes[]`: temas con subtemas
- `protocols[]`: protocolos descargables
- `apps[]`: enlaces a aplicaciones

---

## 🔧 Scripts NPM

```json
{
  "dev": "next dev",                    // Desarrollo local
  "build": "prisma generate && ...",    // Build para producción
  "start": "next start",                 // Servidor producción
  "db:migrate": "prisma migrate dev",    // Crear migración
  "db:generate": "prisma generate",     // Generar cliente Prisma
  "db:studio": "prisma studio",         // UI de base de datos
  "init-user": "tsx scripts/init-user.ts" // Crear usuario inicial
}
```

---

## 🌍 Variables de Entorno

### Desarrollo Local
```env
DATABASE_URL="file:./prisma/dev.db"  # SQLite local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"
```

### Producción (Vercel)
```env
DATABASE_URL="postgresql://..."      # PostgreSQL de Vercel
NEXTAUTH_URL="https://tu-dominio.vercel.app"
NEXTAUTH_SECRET="secret-production"
```

---

## 🚀 Flujo de Deployment (Vercel)

1. **Push a GitHub** → Trigger automático
2. **Build Script**:
   ```bash
   prisma generate && bash scripts/fix-prisma.sh && prisma migrate deploy && next build
   ```
3. **Variables de Entorno**: Configurar en Vercel Dashboard
4. **PostgreSQL**: Crear base de datos en Vercel
5. **Migraciones**: Se ejecutan automáticamente en build

---

## 🔄 Flujos de Usuario

### Flujo de Registro y Aprobación
1. Usuario se registra → `approved: false`
2. Admin ve usuario pendiente en panel
3. Admin aprueba usuario → `approved: true`
4. Usuario puede iniciar sesión

### Flujo de Sesión de Aprendizaje
1. Usuario inicia sesión
2. Ve dashboard con todas las sesiones
3. Click en sesión → `/sesiones/[id]`
4. Interactúa con contenido (videos, PDFs, etc.)
5. Progreso se guarda automáticamente
6. Puede ver su progreso en dashboard

---

## 🎯 Características Principales

### ✅ Implementado
- ✅ Autenticación con NextAuth (JWT)
- ✅ Sistema de registro y aprobación de usuarios
- ✅ Panel de administración completo
- ✅ CRUD de usuarios
- ✅ Tracking de progreso por sesión
- ✅ Contenido multimedia (videos, audios, PDFs)
- ✅ Responsive design
- ✅ Deployment en Vercel
- ✅ Base de datos PostgreSQL en producción

### 🔒 Seguridad
- Passwords hasheados con bcrypt
- Cookies HttpOnly y Secure
- Validación de usuarios aprobados
- Protección de rutas con middleware
- Variables de entorno para secrets

---

## 📝 Notas Importantes

1. **Next.js 16**: Usa App Router (no Pages Router)
2. **NextAuth 5**: Versión beta, configuración diferente a v4
3. **Prisma**: Requiere `prisma generate` antes de build
4. **TypeScript**: Configuración estricta
5. **Tailwind CSS 4**: Nueva versión con PostCSS
6. **Sesiones**: Todos los usuarios tienen acceso a todas las sesiones por defecto

---

## 🔗 Archivos de Configuración Clave

- `next.config.ts`: Configuración Next.js (imágenes remotas)
- `tsconfig.json`: Configuración TypeScript
- `prisma/schema.prisma`: Schema de base de datos
- `lib/auth.ts`: Configuración NextAuth
- `app/layout.tsx`: Layout global
- `vercel.json`: Configuración de deployment

---

## 📚 Documentación Adicional

- `DEPLOYMENT.md`: Guía de deployment en Vercel
- `README_DESARROLLO_LOCAL.md`: Setup local con PostgreSQL
- `GESTION_USUARIOS.md`: Documentación del sistema de usuarios
- `SOLUCION_VERCEL.md`: Solución de problemas comunes

---

## 🎨 Estilo y Diseño

- **Color principal**: Negro (#000000)
- **Fondo**: Gris claro (#F7F8FA)
- **Tipografía**: Inter (Google Fonts)
- **Componentes**: Radix UI + Tailwind CSS
- **Iconos**: Lucide React
- **Responsive**: Mobile-first con breakpoints de Tailwind

---

Esta estructura puede replicarse en otro agente siguiendo este documento como guía. Los puntos críticos son:
1. Configuración de NextAuth 5
2. Schema de Prisma con modelo de aprobación
3. Estructura de sesiones en `data/sessions.ts`
4. Componentes modulares de contenido
5. Sistema de tracking de progreso

