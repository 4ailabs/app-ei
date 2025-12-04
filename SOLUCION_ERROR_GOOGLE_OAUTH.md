# 🔧 Solución: Error 400 invalid_request en Google OAuth

## Error Común
```
Error 400: invalid_request
Detalles: flowName=GeneralOAuthFlow
```

## Causas Más Comunes

### 1. URIs de Redirección Incorrectas ⚠️ (Más Común)

Las URIs de redirección en Google Cloud Console deben coincidir **exactamente** con las que usa tu aplicación.

#### Para Desarrollo Local:
```
http://localhost:3000/api/auth/callback/google
```

#### Para Producción (Vercel):
```
https://tu-app.vercel.app/api/auth/callback/google
```

**⚠️ IMPORTANTE:**
- Debe incluir el protocolo (`http://` o `https://`)
- No debe tener trailing slash (`/`) al final
- Debe ser exactamente igual, sin espacios

### 2. JavaScript Origins Incorrectos

En Google Cloud Console, en **Authorized JavaScript origins**, agrega:

#### Para Desarrollo:
```
http://localhost:3000
```

#### Para Producción:
```
https://tu-app.vercel.app
```

**⚠️ IMPORTANTE:**
- Sin trailing slash
- Sin `/api/auth/callback/google` (eso va en redirect URIs)

### 3. Variables de Entorno Incorrectas

Verifica que en Vercel (o tu `.env` local) tengas:

```env
GOOGLE_CLIENT_ID=tu-client-id-correcto
GOOGLE_CLIENT_SECRET=tu-client-secret-correcto
NEXTAUTH_URL=https://tu-app.vercel.app  # Para producción
```

## Pasos para Solucionar

### Paso 1: Verificar Configuración en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** → **Credentials**
4. Haz clic en tu **OAuth 2.0 Client ID**

### Paso 2: Verificar Authorized JavaScript Origins

Debe tener:
- `http://localhost:3000` (para desarrollo)
- `https://tu-app.vercel.app` (para producción - reemplaza con tu URL real)

### Paso 3: Verificar Authorized Redirect URIs

Debe tener **exactamente**:
- `http://localhost:3000/api/auth/callback/google` (para desarrollo)
- `https://tu-app.vercel.app/api/auth/callback/google` (para producción)

**⚠️ Verifica:**
- No hay espacios al inicio o final
- El protocolo es correcto (`http://` para local, `https://` para producción)
- No hay trailing slash
- La ruta es exactamente `/api/auth/callback/google`

### Paso 4: Verificar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén configuradas
4. Verifica que `NEXTAUTH_URL` sea tu URL de producción

### Paso 5: Verificar OAuth Consent Screen

1. En Google Cloud Console, ve a **OAuth consent screen**
2. Verifica que esté configurado correctamente
3. Si está en modo "Testing", agrega tu email como test user

## Ejemplo de Configuración Correcta

### En Google Cloud Console:

**Authorized JavaScript origins:**
```
http://localhost:3000
https://app-ei.vercel.app
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://app-ei.vercel.app/api/auth/callback/google
```

### En Vercel Environment Variables:

```
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
NEXTAUTH_URL=https://app-ei.vercel.app
```

## Verificación Rápida

1. **¿Estás en desarrollo local?**
   - Verifica que `http://localhost:3000/api/auth/callback/google` esté en Redirect URIs
   - Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén en tu `.env` local

2. **¿Estás en producción (Vercel)?**
   - Verifica que `https://tu-url.vercel.app/api/auth/callback/google` esté en Redirect URIs
   - Verifica que las variables de entorno estén en Vercel
   - Verifica que `NEXTAUTH_URL` sea tu URL de producción

## Si Aún No Funciona

1. **Elimina y recrea las credenciales OAuth** en Google Cloud Console
2. **Copia las nuevas credenciales** a Vercel
3. **Espera unos minutos** después de cambiar la configuración (puede tomar tiempo en propagarse)
4. **Limpia la caché del navegador** y prueba de nuevo

## Debugging

Para ver más detalles del error, revisa:
- La consola del navegador (F12)
- Los logs de Vercel
- Los logs de Google Cloud Console

¿Necesitas ayuda para verificar alguna configuración específica?

