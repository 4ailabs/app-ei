# 🔧 Solución: Error de Same-Origin Policy en Iframe

## 🔍 ¿Qué Significa el Error?

El error que ves:
```
Blocked a frame with origin "https://inteligencia-energetica.com" from accessing a frame with origin "https://app-ei-gamma.vercel.app"
```

Significa que el navegador está bloqueando la comunicación entre dos frames (ventanas/iframes) de diferentes dominios por seguridad. Esto es parte de la **Same-Origin Policy** del navegador.

---

## ✅ Solución Implementada

He configurado los headers HTTP correctos para permitir que tu aplicación se embeba en iframes desde `inteligencia-energetica.com`.

### Cambios Realizados:

1. **X-Frame-Options**: Permite que la app se embeba desde `inteligencia-energetica.com`
2. **Content-Security-Policy**: Configurado para permitir embedding desde tu dominio
3. **Headers de seguridad**: Mantienen la seguridad mientras permiten embedding

---

## 📋 Verificación

Después de que Vercel redespliegue (automáticamente con el push), verifica:

1. **Abrir DevTools** en `inteligencia-energetica.com`
2. **Ir a Console**
3. **Los errores de "Blocked a frame" deberían desaparecer**

---

## 🔧 Si Aún Ves Errores

### Opción 1: Verificar que el Iframe Tenga los Atributos Correctos

Asegúrate de que el iframe en `inteligencia-energetica.com` tenga:

```html
<iframe 
  src="https://app-ei-gamma.vercel.app"
  allow="camera; microphone; geolocation"
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
  allow-forms allow-popups allow-scripts allow-same-origin"
  style="width: 100%; height: 100vh; border: none;"
></iframe>
```

**Importante**: El atributo `sandbox` debe incluir:
- `allow-same-origin`: Permite que el iframe acceda a su propio origen
- `allow-scripts`: Permite ejecutar JavaScript
- `allow-forms`: Permite formularios
- `allow-popups`: Permite ventanas emergentes
- `allow-top-navigation`: Permite navegación (opcional)

### Opción 2: Actualizar Headers para Múltiples Dominios

Si necesitas permitir embedding desde múltiples dominios, actualiza `next.config.ts`:

```typescript
{
  key: 'Content-Security-Policy',
  value: "frame-ancestors 'self' https://inteligencia-energetica.com https://*.inteligencia-energetica.com https://otro-dominio.com;",
}
```

### Opción 3: Usar Subdominio (Recomendado para Producción)

La mejor solución a largo plazo es usar un subdominio:

1. **Configurar `app.inteligencia-energetica.com` en Vercel:**
   - Ve a Settings → Domains
   - Agrega el dominio personalizado
   - Configura DNS según instrucciones

2. **Actualizar el iframe:**
   ```html
   <iframe src="https://app.inteligencia-energetica.com"></iframe>
   ```

3. **Actualizar headers en `next.config.ts`:**
   ```typescript
   {
     key: 'Content-Security-Policy',
     value: "frame-ancestors 'self' https://inteligencia-energetica.com;",
   }
   ```

---

## ⚠️ Notas Importantes

1. **Seguridad**: Los headers configurados permiten embedding solo desde `inteligencia-energetica.com`. Esto es seguro.

2. **Cookies**: Si aún tienes problemas con cookies (login), verifica que `sameSite: "none"` esté configurado en `lib/auth.ts` (ya está configurado).

3. **CSP (Content-Security-Policy)**: Si agregas más dominios, actualiza el header `Content-Security-Policy` en `next.config.ts`.

---

## 🐛 Debugging

Si los errores persisten:

1. **Verificar headers en DevTools:**
   - Abre DevTools → Network
   - Recarga la página
   - Haz clic en cualquier request
   - Ve a la pestaña "Headers"
   - Verifica que `X-Frame-Options` y `Content-Security-Policy` estén presentes

2. **Verificar que el redeploy se completó:**
   - Ve a Vercel Dashboard → Deployments
   - Verifica que el último deployment esté "Ready"

3. **Limpiar caché:**
   - Presiona `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows) para hard refresh
   - O abre en modo incógnito

---

## 📝 Resumen

✅ **Headers configurados** para permitir embedding desde `inteligencia-energetica.com`
✅ **Content-Security-Policy** configurado correctamente
✅ **Cambios en GitHub** y Vercel redesplegará automáticamente

Después del redeploy, los errores de "Blocked a frame" deberían desaparecer.

