# 🔐 Configurar Login con Google

## Pasos para Configurar Google OAuth

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** → **Credentials**

### 2. Configurar OAuth Consent Screen

1. Ve a **OAuth consent screen**
2. Selecciona **External** (o Internal si tienes Google Workspace)
3. Completa la información:
   - **App name**: Seminario Inteligencia Energética
   - **User support email**: Tu email
   - **Developer contact information**: Tu email
4. Haz clic en **Save and Continue**
5. En **Scopes**, haz clic en **Save and Continue** (puedes agregar scopes después)
6. En **Test users**, agrega emails de prueba si es necesario
7. Haz clic en **Save and Continue**

### 3. Crear Credenciales OAuth 2.0

1. Ve a **Credentials** → **Create Credentials** → **OAuth client ID**
2. Selecciona **Web application**
3. Configura:
   - **Name**: Seminario Web App
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (para desarrollo)
     - `https://tu-app.vercel.app` (para producción)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (para desarrollo)
     - `https://tu-app.vercel.app/api/auth/callback/google` (para producción)
4. Haz clic en **Create**
5. **Copia el Client ID y Client Secret** (los necesitarás después)

### 4. Configurar Variables de Entorno

#### Localmente (.env)

Agrega estas variables a tu archivo `.env`:

```env
GOOGLE_CLIENT_ID=tu-client-id-aqui
GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
```

#### En Vercel (Producción)

1. Ve a tu proyecto en Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Agrega:
   - **Key**: `GOOGLE_CLIENT_ID`
   - **Value**: Tu Client ID de Google
   - **Environment**: Production, Preview, Development
4. Agrega:
   - **Key**: `GOOGLE_CLIENT_SECRET`
   - **Value**: Tu Client Secret de Google
   - **Environment**: Production, Preview, Development

### 5. Verificar Configuración

1. Reinicia el servidor de desarrollo
2. Ve a `/login`
3. Deberías ver el botón "Continuar con Google"
4. Haz clic y debería redirigirte a Google para autenticación

## ⚠️ Notas Importantes

### Aprobación de Usuarios

- Los usuarios que se registren con Google también necesitan ser **aprobados por un administrador**
- Cuando un usuario nuevo inicia sesión con Google por primera vez:
  - Se crea su cuenta automáticamente
  - Se marca como `approved: false` (pendiente)
  - No puede acceder hasta que un admin lo apruebe
- El administrador debe aprobar el usuario desde el panel de administración

### Seguridad

- **Nunca compartas** tu Client Secret públicamente
- Mantén las credenciales en variables de entorno
- No subas el `.env` al repositorio

### Testing

Para probar en desarrollo:
1. Usa `http://localhost:3000` como origen autorizado
2. Agrega tu email como "Test user" en OAuth consent screen
3. O publica la app (puede tomar algunos días para aprobación)

## 🆘 Solución de Problemas

### Error: "redirect_uri_mismatch"
- Verifica que las URIs en Google Console coincidan exactamente con las de tu app
- Incluye el protocolo (`http://` o `https://`)
- No incluyas trailing slashes

### Error: "access_denied"
- Verifica que el OAuth consent screen esté configurado
- Si es una app en modo "Testing", agrega el email como test user

### El botón de Google no aparece
- Verifica que las variables de entorno estén configuradas
- Reinicia el servidor después de agregar las variables
- Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén en el `.env`

