# 🐛 Debugging: Iframe No Funciona

## 🔍 Pasos para Diagnosticar

### Paso 1: Verificar que el Redeploy se Completó

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Deployments**
4. Verifica que el último deployment esté **"Ready"** (verde)
5. Si está "Building" o "Error", espera a que termine

### Paso 2: Verificar Headers en DevTools

1. Abre `inteligencia-energetica.com` en el navegador
2. Abre **DevTools** (F12 o Cmd+Option+I)
3. Ve a la pestaña **Network**
4. Recarga la página (Cmd+R o F5)
5. Busca una request a `app-ei-gamma.vercel.app`
6. Haz clic en esa request
7. Ve a la pestaña **Headers** → **Response Headers**
8. Busca `Content-Security-Policy`
9. Debería mostrar: `frame-ancestors 'self' https://inteligencia-energetica.com https://*.inteligencia-energetica.com;`
10. **NO debería haber** `X-Frame-Options: SAMEORIGIN`

### Paso 3: Verificar el Iframe en Framer

Asegúrate de que tu iframe en Framer tenga **exactamente** estos atributos:

```tsx
<iframe
    src="https://app-ei-gamma.vercel.app"
    allow="camera; microphone; geolocation; autoplay; encrypted-media; fullscreen"
    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    allowFullScreen={true}
    scrolling="yes"
    title="Seminario Inteligencia Energética"
    loading="lazy"
    style={{
        width: "100%",
        height: "100%",
        border: "none",
    }}
/>
```

### Paso 4: Limpiar Caché

1. **Hard Refresh**: Presiona `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)
2. **O abre en modo incógnito**: Para evitar caché completamente
3. **O limpia caché del navegador**: Settings → Clear browsing data → Cached images and files

### Paso 5: Verificar Errores Específicos

Abre DevTools → Console y busca:

#### ✅ Errores que PUEDES ignorar (no afectan funcionalidad):
- `Blocked a frame...` de extensiones del navegador
- Errores de autocompletado (envelope, etc.)
- Errores de servicios de terceros

#### ❌ Errores que SÍ importan:
- `Failed to load resource: 500` - Error del servidor
- `CORS policy` - Problema de CORS
- `Refused to frame` - Problema de headers
- `Permission denied` - Problema de permisos

---

## 🔧 Soluciones por Problema Específico

### Problema: "La página no carga en el iframe"

**Causa**: Headers bloqueando el embedding

**Solución**:
1. Verifica que el redeploy en Vercel esté completo
2. Verifica headers en DevTools (Paso 2)
3. Si ves `X-Frame-Options: SAMEORIGIN`, el redeploy no se aplicó aún

### Problema: "El login no funciona"

**Causa**: Cookies bloqueadas entre dominios

**Solución**:
1. Verifica que `sameSite: "none"` esté en `lib/auth.ts` (ya está configurado)
2. Verifica que `secure: true` esté en producción (ya está configurado)
3. Verifica cookies en DevTools → Application → Cookies
4. Deberías ver cookies de `app-ei-gamma.vercel.app`

### Problema: "El asistente de voz no funciona"

**Causa**: Permisos del iframe o API key faltante

**Solución**:
1. Verifica que el iframe tenga `allow="camera; microphone"`
2. Verifica que `GOOGLE_GEMINI_API_KEY` esté configurada en Vercel
3. Verifica permisos del micrófono en el navegador (Settings → Privacy → Microphone)

### Problema: "Los formularios no funcionan"

**Causa**: Atributo `sandbox` sin `allow-forms`

**Solución**:
1. Verifica que el iframe tenga `sandbox="... allow-forms ..."`
2. Verifica en Console si hay errores de JavaScript

---

## 🧪 Test Rápido

Para verificar rápidamente si funciona:

1. **Abre directamente**: `https://app-ei-gamma.vercel.app`
   - Si funciona aquí pero no en el iframe → Problema de headers/iframe
   - Si no funciona aquí → Problema de la aplicación

2. **Abre en modo incógnito**: Para evitar caché
   - Si funciona en incógnito → Problema de caché
   - Si no funciona → Problema de configuración

3. **Verifica en otro navegador**: Chrome, Firefox, Safari
   - Si funciona en uno pero no en otro → Problema específico del navegador

---

## 📋 Checklist Completo

- [ ] Vercel deployment está "Ready"
- [ ] Headers muestran `Content-Security-Policy` con `frame-ancestors`
- [ ] Headers NO muestran `X-Frame-Options: SAMEORIGIN`
- [ ] Iframe tiene atributo `allow` con permisos
- [ ] Iframe tiene atributo `sandbox` con permisos
- [ ] Hard refresh realizado (Cmd+Shift+R)
- [ ] `GOOGLE_GEMINI_API_KEY` configurada en Vercel
- [ ] Cookies visibles en DevTools → Application → Cookies
- [ ] No hay errores críticos en Console

---

## 🆘 Si Nada Funciona

### Última Opción: Usar Subdominio

La solución más confiable es usar un subdominio:

1. **En Vercel**: Settings → Domains → Add Domain
2. **Agrega**: `app.inteligencia-energetica.com`
3. **Configura DNS** según instrucciones de Vercel
4. **Actualiza el iframe**:
   ```tsx
   src="https://app.inteligencia-energetica.com"
   ```
5. **Actualiza headers** en `next.config.ts`:
   ```typescript
   value: "frame-ancestors 'self' https://inteligencia-energetica.com;"
   ```

Esto elimina todos los problemas de cookies y CORS porque ambos dominios comparten el mismo dominio raíz.

---

## 📞 Información para Debugging

Si necesitas ayuda adicional, proporciona:

1. **Screenshot de DevTools → Console** (mostrando errores)
2. **Screenshot de DevTools → Network → Headers** (de una request a app-ei-gamma.vercel.app)
3. **Qué específicamente no funciona**:
   - ¿La página no carga?
   - ¿El login no funciona?
   - ¿El asistente de voz no funciona?
   - ¿Algo más?

