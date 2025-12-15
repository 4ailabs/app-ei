# 🔧 Solución: App Embebida en Otro Dominio

## 🔍 Problema

Cuando la aplicación está embebida en `https://inteligencia-energetica.com` pero NextAuth está configurado para `https://app-ei-gamma.vercel.app`, las cookies de sesión no funcionan correctamente porque:

1. **Cookies entre dominios**: Las cookies no se pueden compartir entre dominios diferentes por seguridad
2. **NEXTAUTH_URL**: NextAuth usa `NEXTAUTH_URL` para generar URLs de callback, y si no coincide con el dominio desde el que se accede, falla
3. **SameSite cookies**: Las cookies con `sameSite: "lax"` no funcionan bien en iframes embebidos

---

## ✅ Soluciones

### Opción 1: Configurar NEXTAUTH_URL para el Dominio Principal (Recomendado)

Si `inteligencia-energetica.com` es tu dominio principal, configura `NEXTAUTH_URL` para que apunte a ese dominio:

1. **En Vercel Dashboard:**
   - Ve a Settings → Environment Variables
   - Busca `NEXTAUTH_URL`
   - Cámbiala a: `https://inteligencia-energetica.com`
   - O agrega ambas URLs si es necesario

2. **Redesplegar:**
   - Ve a Deployments
   - Haz clic en "Redeploy" en el último deployment

### Opción 2: Usar Subdominio (Mejor para Cookies)

Si puedes usar un subdominio como `app.inteligencia-energetica.com`:

1. **Configurar dominio personalizado en Vercel:**
   - Ve a Settings → Domains
   - Agrega `app.inteligencia-energetica.com`
   - Configura el DNS según las instrucciones de Vercel

2. **Actualizar NEXTAUTH_URL:**
   - Cambia `NEXTAUTH_URL` a `https://app.inteligencia-energetica.com`

3. **Embebido:**
   - Usa el iframe apuntando a `https://app.inteligencia-energetica.com`

### Opción 3: Configurar Cookies para Funcionar en Iframe

Modificar la configuración de cookies para que funcionen mejor en iframes:

**Actualizar `lib/auth.ts`:**

```typescript
cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none", // Cambiar de "lax" a "none" para iframes
      path: "/",
      secure: true, // Siempre true en producción para sameSite: "none"
      maxAge: 7 * 24 * 60 * 60,
      // No especificar domain para que funcione en ambos dominios
    },
  },
},
```

**⚠️ Nota**: `sameSite: "none"` requiere `secure: true` y HTTPS.

### Opción 4: Usar Proxy/Reverse Proxy

Si tienes control sobre `inteligencia-energetica.com`, puedes configurar un proxy:

1. **Configurar proxy en el servidor principal:**
   - Proxy `/app/*` → `https://app-ei-gamma.vercel.app/*`
   - Esto hace que la app se sirva desde el mismo dominio

2. **Actualizar NEXTAUTH_URL:**
   - Cambiar a `https://inteligencia-energetica.com`

---

## 🚀 Solución Rápida (Recomendada)

### Paso 1: Actualizar Configuración de Cookies

Modificar `lib/auth.ts` para que las cookies funcionen en iframes:

```typescript
cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
},
```

### Paso 2: Configurar NEXTAUTH_URL en Vercel

1. Ve a Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Busca o crea `NEXTAUTH_URL`
3. Configúrala como: `https://app-ei-gamma.vercel.app` (o el dominio desde el que se accede)
4. Si la app se accede desde `inteligencia-energetica.com`, considera usar un subdominio

### Paso 3: Verificar el Iframe

Si estás usando un iframe, asegúrate de que tenga los atributos correctos:

```html
<iframe 
  src="https://app-ei-gamma.vercel.app"
  allow="camera; microphone; geolocation"
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
  style="width: 100%; height: 100vh; border: none;"
></iframe>
```

---

## 🔍 Verificar el Problema

Para diagnosticar si el problema es de cookies:

1. **Abrir DevTools** en `inteligencia-energetica.com`
2. **Ir a Application/Storage → Cookies**
3. **Verificar si hay cookies de `next-auth.session-token`**
4. **Si no hay cookies**, el problema es de configuración de cookies entre dominios

---

## ⚠️ Limitaciones de Seguridad

**Importante**: Las cookies entre dominios tienen limitaciones de seguridad:

- **SameSite: "lax"**: No funciona bien en iframes de otros dominios
- **SameSite: "none"**: Requiere HTTPS y puede ser menos seguro
- **Cookies de terceros**: Los navegadores modernos bloquean cookies de terceros por defecto

**Recomendación**: Usar un subdominio o proxy es la solución más segura y confiable.

---

## 📝 Checklist

- [ ] `NEXTAUTH_URL` configurada correctamente en Vercel
- [ ] Cookies configuradas con `sameSite: "none"` si se usa iframe
- [ ] `secure: true` cuando `sameSite: "none"`
- [ ] Iframe tiene atributos `sandbox` correctos
- [ ] Aplicación redesplegada después de cambios

---

## 🆘 Si Aún No Funciona

1. **Verificar logs de Vercel:**
   - Ve a Deployments → Último deployment → Functions
   - Revisa los logs para ver errores de autenticación

2. **Verificar cookies en DevTools:**
   - Abre DevTools → Application → Cookies
   - Verifica si las cookies se están estableciendo

3. **Probar desde el dominio directo:**
   - Accede directamente a `https://app-ei-gamma.vercel.app`
   - Si funciona ahí pero no embebido, el problema es de cookies entre dominios

4. **Considerar usar autenticación alternativa:**
   - Token en localStorage (menos seguro)
   - Autenticación basada en tokens en lugar de cookies

