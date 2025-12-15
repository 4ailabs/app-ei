# 📘 Guía Actualizada: Iframe en Framer para app-ei

## 🔍 Problema Común

Si el iframe no funciona en Framer, puede ser por:
1. **Atributos faltantes** en el iframe
2. **Headers del servidor** bloqueando el embedding
3. **Configuración incorrecta** del componente en Framer

---

## ✅ Código Corregido para Framer

He creado una versión corregida del componente. Aquí está el código completo:

```tsx
// Embed external website via iframe
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface EmbedPageProps {
    url: string
    allowFullscreen: boolean
    allowScrolling: boolean
    borderRadius: number
    style?: CSSProperties
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function EmbedPage(props: EmbedPageProps) {
    const {
        url = "https://app-ei-gamma.vercel.app",
        allowFullscreen = true,
        allowScrolling = true,
        borderRadius = 8,
    } = props

    return (
        <iframe
            src={url}
            style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: `${borderRadius}px`,
            }}
            allow="camera; microphone; geolocation; autoplay; encrypted-media; fullscreen; display-capture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
            allowFullScreen={allowFullscreen}
            scrolling={allowScrolling ? "yes" : "no"}
            title="Seminario Inteligencia Energética"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
        />
    )
}

addPropertyControls(EmbedPage, {
    url: {
        type: ControlType.String,
        title: "Website URL",
        defaultValue: "https://app-ei-gamma.vercel.app",
        placeholder: "https://example.com",
    },
    allowFullscreen: {
        type: ControlType.Boolean,
        title: "Allow Fullscreen",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    allowScrolling: {
        type: ControlType.Boolean,
        title: "Allow Scrolling",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
    },
})
```

---

## 🔧 Cambios Clave

### 1. Atributo `allow` Completo
```tsx
allow="camera; microphone; geolocation; autoplay; encrypted-media; fullscreen; display-capture"
```
- Agregado `display-capture` para captura de pantalla si es necesario

### 2. Atributo `sandbox` Completo
```tsx
sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
```
- Agregado `allow-modals` para diálogos/modales

### 3. `referrerPolicy`
```tsx
referrerPolicy="strict-origin-when-cross-origin"
```
- Mejora la privacidad y compatibilidad

### 4. Removido `overflow` del style
- El `overflow` en el style del iframe puede causar problemas
- Mejor controlarlo con el atributo `scrolling`

---

## 📋 Cómo Usar en Framer

### Paso 1: Crear Componente de Código Personalizado

1. En Framer, ve a **Components** → **+** → **Code Component**
2. Pega el código completo de arriba
3. Guarda el componente

### Paso 2: Usar el Componente

1. Arrastra el componente a tu canvas
2. Ajusta el tamaño (width y height)
3. En las propiedades, configura:
   - **Website URL**: `https://app-ei-gamma.vercel.app`
   - **Allow Fullscreen**: ✅ Sí
   - **Allow Scrolling**: ✅ Sí
   - **Border Radius**: 8px (o el que prefieras)

### Paso 3: Publicar

1. Publica tu sitio en Framer
2. Verifica que el iframe cargue correctamente

---

## 🔍 Verificación

Después de publicar:

1. **Abre tu sitio en Framer**
2. **Abre DevTools** (F12)
3. **Ve a Console** y verifica:
   - ✅ No debería haber errores de "Blocked a frame"
   - ✅ El iframe debería cargar la URL correcta

4. **Prueba funcionalidades**:
   - ✅ Login/Registro debería funcionar
   - ✅ Asistente de voz debería pedir permiso de micrófono
   - ✅ Videos deberían reproducirse

---

## ⚠️ Si Aún No Funciona

### Verificar Headers del Servidor

1. Abre DevTools → Network
2. Recarga la página
3. Busca request a `app-ei-gamma.vercel.app`
4. Ve a Headers → Response Headers
5. Verifica que tenga:
   ```
   Content-Security-Policy: frame-ancestors 'self' https://inteligencia-energetica.com ...
   ```
6. Verifica que NO tenga:
   ```
   X-Frame-Options: SAMEORIGIN
   ```

### Verificar que el Redeploy se Completó

1. Ve a Vercel Dashboard
2. Verifica que el último deployment esté "Ready"
3. Si está "Building", espera a que termine

### Probar en Modo Incógnito

1. Abre el sitio en modo incógnito
2. Esto evita problemas de caché
3. Si funciona en incógnito, el problema es de caché

---

## 🎯 Diferencias con el Código Anterior

| Aspecto | Anterior | Corregido |
|---------|----------|-----------|
| `overflow` en style | ✅ Tenía | ❌ Removido (causa problemas) |
| `allow-modals` en sandbox | ❌ Faltaba | ✅ Agregado |
| `display-capture` en allow | ❌ Faltaba | ✅ Agregado |
| `referrerPolicy` | ❌ Faltaba | ✅ Agregado |

---

## 📝 Notas Importantes

1. **El código debe estar en un Code Component de Framer**, no en un archivo normal
2. **Framer compila el código automáticamente**, no necesitas TypeScript configurado
3. **Los imports de `framer` están disponibles** en el entorno de Framer
4. **El componente debe tener ancho y alto fijos** para funcionar correctamente

---

## 🆘 Solución de Problemas Específicos

### Error: "Cannot find module 'framer'"

**Causa**: El código no está en un Code Component de Framer

**Solución**: 
- Asegúrate de crear un **Code Component** en Framer
- No uses un archivo `.tsx` normal
- Framer proporciona automáticamente el módulo `framer`

### El iframe está en blanco

**Causa**: Headers del servidor bloqueando el embedding

**Solución**:
- Verifica headers en DevTools (ver arriba)
- Espera a que Vercel redespliegue con los headers correctos

### El login no funciona

**Causa**: Cookies bloqueadas entre dominios

**Solución**:
- Ya está configurado `sameSite: "none"` en el servidor
- Verifica que ambos dominios usen HTTPS
- Considera usar un subdominio para mejor compatibilidad

---

¡Con este código corregido, tu iframe debería funcionar perfectamente en Framer! 🎉

