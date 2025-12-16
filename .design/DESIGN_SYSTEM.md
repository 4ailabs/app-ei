# Sistema de Diseño - Inteligencia Energética

Este documento define los lineamientos de diseño para mantener consistencia visual en toda la aplicación.

## Paleta de Colores

### Color Principal (Brand)
- **Naranja principal**: `#DA7756` - Usar para acentos, botones primarios, iconos activos
- **Naranja hover/activo**: `#ea580c` - Usar para estados hover en elementos naranjas

### Colores de Fondo
| Elemento | Light Mode | Dark Mode |
|----------|------------|-----------|
| Fondo página | `#FAF9F7` | `#1A1A1A` |
| Fondo tarjetas | `white` | `#252525` |
| Fondo secundario | `#F5F4F0` | `#333333` |
| Fondo input/chat | `#fafafa` | `#0f0f0f` |

### Colores de Texto
| Uso | Light Mode | Dark Mode |
|-----|------------|-----------|
| Texto principal | `#1A1915` | `#E5E5E5` |
| Texto secundario | `#706F6C` | `#A0A0A0` |
| Texto terciario | `#9B9A97` | `#808080` |
| Texto placeholder | `#9B9A97` | `#737373` |

### Bordes
| Uso | Light Mode | Dark Mode |
|-----|------------|-----------|
| Borde principal | `#E5E4E0` | `#333333` |
| Borde sutil | `#F5F4F0` | `#2a2a2a` |

## Tipografía

- **Fuente principal**: Inter (variable `--font-primary`)
- **Pesos disponibles**: 300, 400, 500, 600, 700, 800

### Tamaños
- Títulos grandes: `text-3xl` a `text-5xl`
- Títulos de sección: `text-lg` a `text-xl`
- Texto normal: `text-base` (16px)
- Texto pequeño: `text-sm` (14px)
- Texto muy pequeño: `text-xs` (12px)

## Componentes

### Iconos
- **IMPORTANTE**: Todos los iconos decorativos/de sección usan el color naranja `#DA7756`
- **NO usar** colores variados (azul, púrpura, rojo, cyan) para diferentes tipos de contenido
- Los iconos en estados neutros usan `text-[#706F6C]` (light) / `text-[#A0A0A0]` (dark)
- Los iconos deben cambiar a `text-[#DA7756]` en hover cuando son clickeables

### Badges/Etiquetas de Contenido
```tsx
// Badge clickeable (lleva a otra sección)
className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F5F4F0] dark:bg-[#333333] hover:bg-[#DA7756]/10 dark:hover:bg-[#DA7756]/20 rounded-lg transition-colors group"

// Icono dentro del badge
className="text-[#706F6C] dark:text-[#A0A0A0] group-hover:text-[#DA7756]"
```

### Tarjetas
```tsx
className="bg-white dark:bg-[#252525] rounded-2xl p-4 sm:p-6 shadow-sm border border-[#E5E4E0] dark:border-[#333333]"
```

### Botones
```tsx
// Botón primario
className="bg-[#DA7756] hover:bg-[#ea580c] text-white"

// Botón secundario/ghost
className="hover:bg-[#F5F4F0] dark:hover:bg-[#333333] text-[#706F6C] dark:text-[#A0A0A0]"
```

### Inputs
```tsx
className="bg-white dark:bg-[#212121] border border-[#E5E4E0] dark:border-[#3a3a3a] rounded-xl focus:border-[#DA7756]"
```

## Espaciado Responsive

### Padding/Margin
- Móvil: `p-2` a `p-4`
- Tablet: `sm:p-4` a `sm:p-6`
- Desktop: `lg:p-6` a `lg:p-10`

### Border Radius
- Pequeño: `rounded-lg` (móvil) → `sm:rounded-xl` (tablet+)
- Medio: `rounded-xl` (móvil) → `sm:rounded-2xl` (tablet+)
- Grande: `rounded-2xl` (móvil) → `sm:rounded-3xl` (tablet+)

## iOS Safe Areas

Para dispositivos con notch/Dynamic Island, usar estas clases:

```css
.pb-safe { padding-bottom: max(env(safe-area-inset-bottom), 0.5rem); }
.pt-safe { padding-top: max(env(safe-area-inset-top), 1rem); }
.mt-header-safe { margin-top: calc(4rem + env(safe-area-inset-top)); }
.top-header-safe { top: calc(4rem + env(safe-area-inset-top)); }
```

- `pb-safe`: Usar en elementos fijos en la parte inferior (inputs, botones de acción)
- `pt-safe`: Usar en headers móviles
- `mt-header-safe`: Usar en contenido principal que va debajo del header móvil
- `top-header-safe`: Usar en elementos fixed que deben ir debajo del header móvil

## Principios de Diseño

### 1. Claridad sobre Decoración
- Los elementos clickeables deben ser claramente distinguibles de los decorativos
- Usar hover states para indicar interactividad
- Evitar iconos coloridos que parezcan botones pero no lo sean

### 2. Consistencia de Color
- Un solo color de acento (naranja `#DA7756`)
- No usar múltiples colores para categorizar contenido
- Los colores deben tener propósito funcional, no decorativo

### 3. Jerarquía Visual
- Usar tamaño y peso de fuente para establecer jerarquía
- El color naranja solo para elementos importantes/activos
- Grises para contenido secundario

### 4. Mobile First
- Diseñar primero para móvil
- Agregar complejidad visual en pantallas más grandes
- Respetar safe areas en iOS

## Orden de Contenido en Sesiones

El contenido se muestra en este orden (pedagógico):
1. Videos
2. Audios
3. Temas
4. Protocolos
5. Material (PDF)
6. Recursos Adicionales
7. Apps

## Animaciones

- Transiciones suaves: `transition-all duration-300`
- Hover scale sutil: `hover:scale-105`
- Evitar animaciones excesivas que distraigan
