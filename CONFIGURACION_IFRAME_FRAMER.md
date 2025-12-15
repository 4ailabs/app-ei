# 🔧 Configuración de Iframe en Framer - Optimizada para app-ei

## 📋 Código Optimizado

He creado una versión optimizada de tu componente de Framer con todos los atributos necesarios para que la aplicación funcione correctamente embebida.

### Cambios Importantes:

1. **Atributo `allow`**: Agregado para permitir:
   - `camera` - Necesario para el asistente de voz
   - `microphone` - Necesario para el asistente de voz
   - `geolocation` - Por si se necesita en el futuro
   - `autoplay` - Para videos
   - `encrypted-media` - Para contenido protegido
   - `fullscreen` - Para modo pantalla completa

2. **Atributo `sandbox`**: Configurado con permisos necesarios:
   - `allow-same-origin` - Permite acceso al mismo origen (crítico)
   - `allow-scripts` - Permite JavaScript (necesario)
   - `allow-forms` - Permite formularios (login, registro)
   - `allow-popups` - Permite ventanas emergentes
   - `allow-popups-to-escape-sandbox` - Permite popups fuera del sandbox
   - `allow-top-navigation-by-user-activation` - Permite navegación solo con interacción del usuario

3. **Atributo `loading="lazy"`**: Mejora el rendimiento cargando el iframe solo cuando es necesario

4. **Título descriptivo**: Cambiado a "Seminario Inteligencia Energética"

---

## 🔄 Cómo Usar

### Opción 1: Reemplazar el Código Actual

1. Abre tu componente en Framer
2. Reemplaza el código completo con el código optimizado de `IFRAME_FRAMER_OPTIMIZADO.tsx`
3. Guarda y publica

### Opción 2: Actualizar Solo los Atributos

Si prefieres mantener tu código actual, solo agrega estos atributos al iframe:

```tsx
<iframe
    src={url}
    style={{...}}
    // AGREGAR ESTOS ATRIBUTOS:
    allow="camera; microphone; geolocation; autoplay; encrypted-media; fullscreen"
    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    allowFullScreen={allowFullscreen}
    scrolling={allowScrolling ? "yes" : "no"}
    title="Seminario Inteligencia Energética"
    loading="lazy"
/>
```

---

## ✅ Funcionalidades que Ahora Funcionarán

Con esta configuración, estas funcionalidades deberían funcionar correctamente:

- ✅ **Login y Registro**: Formularios funcionan
- ✅ **Asistente de Voz (Maestro IA)**: Puede acceder al micrófono
- ✅ **Videos**: Pueden reproducirse
- ✅ **Navegación**: Funciona dentro del iframe
- ✅ **Cookies de Sesión**: Funcionan (gracias a `sameSite: "none"` configurado anteriormente)

---

## 🔍 Verificación

Después de actualizar el código en Framer:

1. **Publica los cambios** en Framer
2. **Recarga la página** en `inteligencia-energetica.com`
3. **Abre DevTools** → Console
4. **Verifica que no haya errores** de "Blocked a frame"
5. **Prueba el asistente de voz**:
   - Ve a "Maestro IA"
   - Haz clic en el botón de voz
   - Debería pedirte permiso para el micrófono
   - Debería conectarse correctamente

---

## ⚠️ Notas Importantes

1. **Permisos del Navegador**: La primera vez que uses el asistente de voz, el navegador pedirá permiso para acceder al micrófono. El usuario debe aceptar.

2. **HTTPS Requerido**: Tanto `inteligencia-energetica.com` como `app-ei-gamma.vercel.app` deben usar HTTPS para que todo funcione correctamente.

3. **Cookies de Terceros**: Algunos navegadores (especialmente Safari) pueden bloquear cookies de terceros. Si hay problemas de login, considera usar un subdominio.

---

## 🐛 Solución de Problemas

### El asistente de voz no funciona

1. Verifica que el navegador haya dado permiso al micrófono
2. Abre DevTools → Console y busca errores
3. Verifica que `GOOGLE_GEMINI_API_KEY` esté configurada en Vercel

### Los formularios no funcionan

1. Verifica que `allow-forms` esté en el atributo `sandbox`
2. Verifica que no haya errores de CORS en la consola

### Las cookies no funcionan (login no persiste)

1. Verifica que `sameSite: "none"` esté configurado (ya está configurado)
2. Verifica que ambos dominios usen HTTPS
3. Considera usar un subdominio para mejor compatibilidad

---

## 📝 Resumen de Atributos

| Atributo | Valor | Propósito |
|----------|-------|-----------|
| `allow` | `camera; microphone; ...` | Permisos modernos del navegador |
| `sandbox` | `allow-same-origin allow-scripts ...` | Permisos de seguridad del iframe |
| `allowFullScreen` | `true` | Permite pantalla completa |
| `scrolling` | `"yes"` | Permite scroll |
| `loading` | `"lazy"` | Carga diferida para mejor rendimiento |

---

¡Con esta configuración, tu aplicación debería funcionar perfectamente embebida en Framer! 🎉

