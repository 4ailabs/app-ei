# 📍 Cómo Asignar Videos a Sesiones Específicas

## 🎯 Flujo Completo

Cuando subes un video a Cloudflare Stream, necesitas **asignarlo manualmente** a la sesión y video correspondiente en tu aplicación.

---

## 📋 Paso a Paso

### Paso 1: Subir el Video

Sube el video usando cualquiera de estos métodos:
- Panel de Admin → Videos → Subir
- Dashboard de Cloudflare directamente

### Paso 2: Obtener el UID del Video

Después de subir, obtendrás un **UID** (identificador único). Ejemplos:
- `5d21d898f778e84d5b552556e4f6e8a4`
- `abc123def456ghi789jkl012`

**Dónde encontrar el UID:**
- Panel de Admin: Aparece después de subir
- Dashboard Cloudflare: En la lista de videos, columna "UID" o "Video ID"
- URL del video: `https://iframe.videodelivery.net/[AQUI_ESTA_EL_UID]`

### Paso 3: Identificar Dónde Va el Video

Antes de subir, anota:
- **¿Qué sesión?** (Sesión 1, Sesión 2, etc.)
- **¿Qué video dentro de esa sesión?** (primer video, segundo, etc.)

**Ejemplo:**
- Sesión: Sesión 1 - Módulo 1
- Video: "La Ventana de Tolerancia" (es el segundo video de esa sesión)

### Paso 4: Agregar el UID al Archivo `sessions.ts`

Abre el archivo: `data/sessions.ts`

Encuentra el video correspondiente y agrega el `cloudflareStreamId`:

```typescript
{
  id: "v1-2",  // ID del video
  title: "La Ventana de Tolerancia",  // Título del video
  cloudflareStreamId: "AQUI_VA_EL_UID_QUE_OBTUVISTE",  // ← Agrega esto
  duration: "6-8 min",
  description: "Concepto de Siegel, metáfora de la ducha..."
}
```

---

## 📖 Ejemplos Prácticos

### Ejemplo 1: Asignar "Los 3 Estados del Sistema Nervioso"

**Ubicación:** Sesión 1, Primer video

**En `data/sessions.ts`, línea ~84:**

```typescript
videos: [
  {
    id: "v1-1",
    title: "Los 3 Estados del Sistema Nervioso",
    cloudflareStreamId: "5d21d898f778e84d5b552556e4f6e8a4", // ← Tu UID aquí
    duration: "8-10 min",
    description: "Explicación visual..."
  },
  // ... más videos
]
```

### Ejemplo 2: Asignar "La Ventana de Tolerancia"

**Ubicación:** Sesión 1, Segundo video

**En `data/sessions.ts`, línea ~91:**

```typescript
{
  id: "v1-2",
  title: "La Ventana de Tolerancia",
  cloudflareStreamId: "abc123def456ghi789", // ← Tu UID aquí
  duration: "6-8 min",
  description: "Concepto de Siegel..."
}
```

### Ejemplo 3: Asignar a Sesión 2

**Ubicación:** Sesión 2, Primer video

**En `data/sessions.ts`, busca la Sesión 2 (id: 2), luego:**

```typescript
{
  id: "v2-1",
  title: "¿Qué es un Recurso?",
  cloudflareStreamId: "xyz789ghi012jkl345", // ← Tu UID aquí
  duration: "6-8 min",
  description: "Definición, tipos..."
}
```

---

## 🗺️ Mapa del Archivo `sessions.ts`

```
data/sessions.ts
├── Sesión 1 (id: 1)
│   ├── videos[0] → id: "v1-1" → "Los 3 Estados..."
│   ├── videos[1] → id: "v1-2" → "La Ventana de Tolerancia"
│   ├── videos[2] → id: "v1-3" → "Neurocepción..."
│   └── videos[3] → id: "v1-4" → "Demo: Respiración 4-7-8"
│
├── Sesión 2 (id: 2)
│   ├── videos[0] → id: "v2-1" → "¿Qué es un Recurso?"
│   ├── videos[1] → id: "v2-2" → "El Poder de la Pendulación"
│   └── ...
│
└── Sesión 3 (id: 3)
    └── ...
```

---

## ✅ Checklist Rápido

Antes de asignar un video, asegúrate de tener:

- [ ] El video ya está subido a Cloudflare Stream
- [ ] Tienes el UID del video (ej: `5d21d898f778e84d5b552556e4f6e8a4`)
- [ ] Sabes qué sesión (1, 2, 3, etc.)
- [ ] Sabes qué video dentro de esa sesión (primer, segundo, etc.)
- [ ] Tienes abierto `data/sessions.ts`

---

## 🎬 Flujo Visual

```
1. Subes video a Cloudflare Stream
        ↓
2. Obtienes UID: "abc123def456"
        ↓
3. Abres: data/sessions.ts
        ↓
4. Buscas la sesión correcta (ej: Sesión 1)
        ↓
5. Buscas el video correcto (ej: "v1-2")
        ↓
6. Agregas: cloudflareStreamId: "abc123def456"
        ↓
7. Guardas el archivo
        ↓
8. El video aparece en la app! ✅
```

---

## 💡 Tips Importantes

### Mantener un Registro
Crea un documento temporal para llevar registro:

```
Video: "Los 3 Estados del Sistema Nervioso"
UID: 5d21d898f778e84d5b552556e4f6e8a4
Sesión: 1
Posición: Primer video (v1-1)
Fecha subido: 2024-12-09
```

### Nombres Consistentes
Si subes varios videos a la vez, nombra el video en Cloudflare igual que en la app:
- En Cloudflare: "Los 3 Estados del Sistema Nervioso"
- En sessions.ts: `title: "Los 3 Estados del Sistema Nervioso"`

### Verificar que Funcione
Después de agregar el UID:
1. Guarda `sessions.ts`
2. Recarga la app (si está corriendo)
3. Ve a la sesión correspondiente
4. Verifica que el video aparezca y se reproduzca

---

## 🆘 Si el Video No Aparece

1. **Verifica el UID**: Asegúrate de copiarlo correctamente
2. **Verifica la sesión**: Confirma que estás en la sesión correcta
3. **Verifica la sintaxis**: Asegúrate de que `cloudflareStreamId` esté bien escrito
4. **Recarga la página**: Puede que necesites refrescar

---

## 📝 Plantilla Rápida

Cuando tengas un video nuevo, usa esta plantilla:

```typescript
{
  id: "vX-Y",  // X = número de sesión, Y = número de video
  title: "Título del Video",
  cloudflareStreamId: "PEGA_AQUI_EL_UID",  // ← Esto es lo importante
  duration: "X min",
  description: "Descripción del video"
}
```

