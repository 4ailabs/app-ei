# Diseño Visual de la Aplicación

## 🎨 Paleta de Colores

### Colores Principales

```css
/* Fondo Principal */
--background: #F7F8FA  /* Gris muy claro, fondo de toda la app */

/* Color Primario (Negro) */
--primary: #000000
--primary-dark: #1d1d1d
--primary-light: #333333

/* Color Secundario (Verde) */
--secondary: #10b981
--secondary-dark: #059669

/* Texto */
--foreground: #171717  /* Casi negro para texto principal */
```

### Uso de Colores

- **Negro (#000000)**: 
  - Botones principales
  - Iconos con fondo
  - Textos destacados
  - Sidebar activo
  - Hover states

- **Gris Claro (#F7F8FA)**:
  - Fondo de toda la aplicación
  - Cards y contenedores

- **Grises**:
  - `#171717` - Texto principal
  - `#333333` - Texto secundario
  - `#6B7280` - Texto terciario
  - `#E5E7EB` - Bordes y separadores
  - `#F3F4F6` - Fondos de inputs

- **Verde (#10b981)**:
  - Indicadores de completado
  - Progreso al 100%
  - Estados de éxito
  - Badges de "Completado"

- **Rojo**:
  - Errores y alertas
  - Botones destructivos

- **Azul**:
  - Links y enlaces
  - Focus states en inputs

---

## 📝 Tipografía

### Fuente Principal
- **Inter** (Google Fonts)
- Pesos disponibles: 300, 400, 500, 600, 700, 800
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`

### Jerarquía Tipográfica

```css
/* Títulos Principales */
text-3xl lg:text-5xl font-bold  /* Hero titles */

/* Títulos de Sección */
text-2xl font-bold  /* Card titles, section headers */

/* Subtítulos */
text-xl font-semibold  /* Subsection titles */

/* Texto Normal */
text-base  /* Body text */

/* Texto Pequeño */
text-sm  /* Descriptions, labels */

/* Texto Muy Pequeño */
text-xs  /* Badges, metadata */
```

### Estilos de Texto

- **Bold (700)**: Títulos, énfasis
- **Semibold (600)**: Subtítulos, labels importantes
- **Medium (500)**: Texto destacado
- **Regular (400)**: Texto normal

---

## 🧩 Componentes de Diseño

### 1. Cards (Tarjetas)

**Estructura Base:**
```tsx
<div className="bg-white rounded-2xl lg:rounded-3xl 
                shadow-sm hover:shadow-xl 
                border border-gray-200
                transition-all duration-300">
```

**Características:**
- Fondo blanco
- Bordes redondeados: `rounded-2xl` (mobile) / `rounded-3xl` (desktop)
- Sombra suave que aumenta en hover
- Borde sutil gris
- Transición suave en hover

**Variantes:**
- **SessionCard**: Con imagen, progreso, badges
- **Card UI Component**: Componente base reutilizable (shadcn/ui style)

### 2. Botones

**Botón Principal (Negro):**
```tsx
className="bg-black text-white hover:bg-gray-800 
           rounded-lg px-6 py-3 
           transition-colors duration-200"
```

**Variantes:**
- `default`: Azul (#2563eb)
- `destructive`: Rojo (#ef4444)
- `outline`: Borde gris, fondo transparente
- `secondary`: Gris claro
- `ghost`: Sin fondo, solo hover
- `link`: Estilo de enlace

**Tamaños:**
- `sm`: `h-9 px-3`
- `default`: `h-10 px-4`
- `lg`: `h-11 px-8`
- `icon`: `h-10 w-10`

### 3. Inputs (Campos de Formulario)

**Estilo Base:**
```tsx
className="w-full pl-10 pr-4 py-3 
           border border-gray-200 rounded-xl 
           bg-gray-50/50 focus:bg-white
           focus:outline-none focus:ring-2 
           focus:ring-blue-500/50 focus:border-blue-500
           transition-all duration-200"
```

**Características:**
- Icono a la izquierda (Lucide React)
- Fondo gris claro que se vuelve blanco en focus
- Borde azul en focus con ring
- Transición suave

### 4. Sidebar (Barra Lateral)

**Desktop:**
- Fondo: `bg-[#F7F8FA]`
- Ancho fijo
- Items con hover effect
- Item activo: fondo negro, texto blanco

**Mobile:**
- Header fijo en la parte superior
- Menú hamburguesa
- Overlay oscuro cuando está abierto
- Sidebar deslizable desde la izquierda

**Estilo de Items:**
```tsx
/* Inactivo */
className="text-gray-500 hover:bg-gray-200 
           hover:-translate-y-1 rounded-full 
           px-6 py-3 transition-all duration-300"

/* Activo */
className="bg-black text-white shadow-md 
           rounded-full px-6 py-3"
```

### 5. Badges y Tags

**Badge de Sesión:**
```tsx
className="text-xs font-semibold text-gray-700 
           uppercase tracking-wide 
           px-2.5 py-1 rounded-md bg-gray-100"
```

**Badge Completado:**
```tsx
className="text-xs text-green-700 font-medium 
           bg-green-50 px-2.5 py-1 rounded-md"
```

**Badge en Imagen:**
```tsx
className="text-xs font-semibold text-white 
           uppercase tracking-wide 
           px-3 py-1.5 rounded-lg 
           bg-white/20 backdrop-blur-sm"
```

### 6. Progress Bars (Barras de Progreso)

**Contenedor:**
```tsx
className="w-full bg-gray-200 rounded-full h-2"
```

**Barra de Progreso:**
```tsx
/* Normal */
className="h-full rounded-full bg-black 
           transition-all duration-700 ease-out"

/* Completado (100%) */
className="h-full rounded-full bg-green-600"
```

### 7. Hero Section

**Estilo:**
```tsx
className="bg-gradient-to-br from-black via-gray-900 to-black 
           p-8 lg:p-12 rounded-3xl text-white 
           relative overflow-hidden"
```

**Efectos:**
- Gradiente negro
- Círculos difuminados de fondo (blur)
- Badge amarillo con icono Sparkles
- Título grande y bold
- Descripción en gris claro

---

## 🎭 Animaciones y Transiciones

### Transiciones Comunes

```css
/* Hover en Cards */
transition-all duration-300
transform: translateY(-4px)  /* Elevación */

/* Hover en Botones */
transition-colors duration-200

/* Focus en Inputs */
transition-all duration-200

/* Progress Bar */
transition-all duration-700 ease-out
```

### Animaciones Personalizadas

**Fade In:**
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Scale In:**
```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

**Shimmer (Efecto brillo en botones):**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

**Float (Flotación suave):**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

### Clases de Animación

- `.animate-fade-in`: Aparecer con fade
- `.animate-scale-in`: Aparecer con escala
- `.animate-float`: Flotación continua
- `.card-hover`: Efecto hover en cards
- `.btn-shine`: Efecto brillo en botones

---

## 📐 Layout y Espaciado

### Sistema de Espaciado (Tailwind)

- `p-2`, `p-4`, `p-6`, `p-8`, `p-12`: Padding
- `space-y-4`, `space-y-6`, `space-y-8`: Espaciado vertical
- `gap-2`, `gap-3`, `gap-4`, `gap-6`: Gaps en flex/grid

### Breakpoints Responsive

```css
/* Mobile First */
base: 0px      /* Mobile */
sm: 640px      /* Tablet pequeña */
md: 768px      /* Tablet */
lg: 1024px     /* Desktop */
xl: 1280px     /* Desktop grande */
```

### Layout Principal

```tsx
<div className="flex flex-1">
  <Sidebar />  {/* Barra lateral */}
  <main className="flex-1 lg:ml-0 p-2 lg:p-8">
    {children}  {/* Contenido principal */}
  </main>
</div>
<Footer />  {/* Footer fijo */}
```

### Grid y Flexbox

**Grid de Sesiones:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
           gap-6 lg:gap-8"
```

**Flex común:**
```tsx
className="flex items-center justify-between"
className="flex flex-col space-y-4"
```

---

## 🖼️ Imágenes y Media

### Imágenes de Sesiones

- **Tamaño**: `h-48 lg:h-56` (altura fija)
- **Object Fit**: `object-cover`
- **Hover**: `group-hover:scale-105` (zoom suave)
- **Overlay**: Gradiente negro semitransparente

### Iconos

- **Biblioteca**: Lucide React
- **Tamaños comunes**: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`, `h-8 w-8`
- **Colores**: 
  - Blanco en fondos negros
  - Gris en fondos claros
  - Negro en fondos blancos

### Iconos con Fondo

```tsx
<div className="p-4 bg-black rounded-2xl">
  <Zap className="h-8 w-8 text-white" />
</div>
```

---

## 🎯 Estados Visuales

### Hover States

**Cards:**
- Elevación: `translateY(-4px)`
- Sombra aumentada: `shadow-xl`
- Escala en imagen: `scale-105`

**Botones:**
- Cambio de color: `hover:bg-gray-800`
- Efecto shine (opcional)

**Links:**
- Subrayado: `hover:underline`
- Cambio de color

### Focus States

**Inputs:**
- Ring azul: `focus:ring-2 focus:ring-blue-500/50`
- Borde azul: `focus:border-blue-500`
- Fondo blanco: `focus:bg-white`

**Botones:**
- Ring: `focus-visible:ring-2`

### Active States

**Sidebar Items:**
- Fondo negro: `bg-black`
- Texto blanco: `text-white`
- Sombra: `shadow-md`

### Disabled States

```tsx
className="disabled:pointer-events-none disabled:opacity-50"
```

---

## 🎨 Efectos Especiales

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
```

**Uso**: Badges sobre imágenes, modales

### Gradientes

**Texto con Gradiente:**
```css
.text-gradient {
  background: linear-gradient(135deg, #000000 0%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Fondo con Gradiente:**
```tsx
className="bg-gradient-to-br from-black via-gray-900 to-black"
```

### Sombras

- `shadow-sm`: Sombra pequeña (cards normales)
- `shadow-md`: Sombra media (items activos)
- `shadow-xl`: Sombra grande (hover en cards)
- `shadow-lg`: Sombra grande (modales, popups)

---

## 📱 Responsive Design

### Mobile (< 1024px)

- **Sidebar**: Se convierte en header superior con menú hamburguesa
- **Cards**: Una columna
- **Padding**: Reducido (`p-2` vs `p-8`)
- **Texto**: Tamaños más pequeños
- **Imágenes**: Altura reducida (`h-48` vs `h-56`)

### Desktop (≥ 1024px)

- **Sidebar**: Visible siempre a la izquierda
- **Cards**: Grid de 3 columnas
- **Padding**: Amplio (`p-8`, `p-12`)
- **Texto**: Tamaños grandes
- **Espaciado**: Más generoso

### Clases Responsive Comunes

```tsx
className="text-base lg:text-xl"           // Texto responsive
className="p-4 lg:p-8"                     // Padding responsive
className="grid-cols-1 lg:grid-cols-3"      // Grid responsive
className="flex-col lg:flex-row"           // Flex direction responsive
className="hidden lg:flex"                  // Mostrar/ocultar responsive
```

---

## 🎭 Páginas Específicas

### Login / Register

**Estructura:**
- Centrado vertical y horizontal
- Card blanco con sombra
- Icono grande con fondo negro
- Título grande y bold
- Inputs con iconos
- Botón principal negro
- Link a otra página

**Estilo del Card:**
```tsx
className="w-full max-w-md 
           border border-gray-200 
           shadow-lg bg-white 
           rounded-3xl"
```

### Dashboard (Home)

**Hero Section:**
- Gradiente negro
- Badge amarillo con icono
- Título grande
- Descripción
- Estadísticas en cards

**Grid de Sesiones:**
- Cards con imagen
- Progreso visible
- Badges de estado
- Hover effect

### Sesión Individual

**Estructura:**
- Header con título y descripción
- Tabs para diferentes secciones (Videos, PDFs, Audios, Temas, etc.)
- Cada sección con su propio diseño
- Progreso visible

### Panel Admin

**Tabla de Usuarios:**
- Filas alternadas
- Búsqueda y filtros
- Botones de acción
- Formulario modal/desplegable

---

## 🎨 Patrones de Diseño

### 1. **Minimalismo**
- Mucho espacio en blanco
- Colores limitados (negro, gris, verde)
- Tipografía clara

### 2. **Consistencia**
- Mismos componentes reutilizables
- Misma paleta en toda la app
- Mismos espaciados

### 3. **Jerarquía Visual**
- Tamaños de texto claros
- Colores para destacar
- Espaciado para separar secciones

### 4. **Feedback Visual**
- Hover states claros
- Estados de carga
- Mensajes de error/éxito visibles
- Progreso visual

### 5. **Accesibilidad**
- Contraste adecuado
- Focus states visibles
- Tamaños de click adecuados (min 44x44px)
- Texto legible

---

## 🛠️ Herramientas de Diseño

### CSS Framework
- **Tailwind CSS 4**: Utility-first CSS
- **PostCSS**: Procesamiento de CSS

### Componentes UI
- **Radix UI**: Componentes accesibles base
  - Accordion
  - Tabs
  - Dialog
- **shadcn/ui style**: Componentes personalizados
  - Button
  - Card
  - Tabs

### Iconos
- **Lucide React**: Biblioteca de iconos

### Fuentes
- **Google Fonts**: Inter

---

## 📋 Checklist de Diseño

Para replicar el diseño, asegúrate de:

- [ ] Configurar Tailwind CSS 4
- [ ] Importar fuente Inter
- [ ] Definir variables CSS de colores
- [ ] Crear componentes base (Button, Card)
- [ ] Implementar Sidebar responsive
- [ ] Configurar animaciones personalizadas
- [ ] Establecer sistema de espaciado consistente
- [ ] Implementar estados hover/focus/active
- [ ] Configurar breakpoints responsive
- [ ] Aplicar glassmorphism donde corresponda
- [ ] Implementar gradientes necesarios
- [ ] Configurar scrollbar personalizada

---

## 🎯 Principios de Diseño Aplicados

1. **Simplicidad**: Diseño limpio sin elementos innecesarios
2. **Consistencia**: Mismos patrones en toda la app
3. **Claridad**: Información fácil de entender
4. **Feedback**: Estados visuales claros
5. **Responsive**: Funciona en todos los dispositivos
6. **Accesibilidad**: Cumple estándares básicos
7. **Performance**: Animaciones suaves, no bloqueantes

---

Este documento describe completamente el sistema de diseño visual de la aplicación. Puede usarse como guía para replicar el diseño en otro proyecto o mantener consistencia en futuras actualizaciones.

