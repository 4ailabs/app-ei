# Configuración de Cloudflare Stream

Esta guía te ayudará a configurar Cloudflare Stream para subir y reproducir videos en tu aplicación.

## 📋 Requisitos Previos

1. Una cuenta de Cloudflare
2. Cloudflare Stream habilitado en tu cuenta (requiere un plan de pago)

## 🔑 Variables de Entorno

Agrega las siguientes variables de entorno en tu archivo `.env.local` (desarrollo) y en Vercel (producción):

```env
# Cloudflare Stream Configuration
CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui
CLOUDFLARE_API_TOKEN=tu_api_token_aqui

# Público (para generar URLs de embed en el cliente)
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui

# Admin Email (opcional, por defecto usa "admin@seminario.com")
ADMIN_EMAIL=tu-email@admin.com
```

## 📝 Obtener las Credenciales

### 1. Obtener Account ID

1. Inicia sesión en tu [dashboard de Cloudflare](https://dash.cloudflare.com)
2. Selecciona tu cuenta
3. En la barra lateral derecha, verás tu **Account ID**
4. Cópialo y úsalo como valor de `CLOUDFLARE_ACCOUNT_ID` y `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID`

### 2. Crear API Token

1. Ve a [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Haz clic en **"Create Token"**
3. Usa el template **"Edit Cloudflare Stream"** o crea uno personalizado con estos permisos:
   - **Account** → **Cloudflare Stream** → **Edit**
4. Guarda el token (solo se muestra una vez)
5. Úsalo como valor de `CLOUDFLARE_API_TOKEN`

## 🚀 Uso

### Subir Videos desde el Panel de Admin

Actualmente, puedes subir videos usando las APIs:

#### 1. Subir Video desde Archivo

```bash
curl -X POST http://localhost:3000/api/videos/upload \
  -H "Cookie: next-auth.session-token=tu-session-token" \
  -F "file=@/ruta/a/tu/video.mp4" \
  -F "name=Mi Video"
```

#### 2. Subir Video desde URL

```bash
curl -X POST http://localhost:3000/api/videos/upload \
  -H "Cookie: next-auth.session-token=tu-session-token" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://ejemplo.com/video.mp4",
    "name": "Mi Video"
  }'
```

### Usar Videos en las Sesiones

Una vez que tengas el `uid` del video de Cloudflare Stream, actualiza tus sesiones en `data/sessions.ts`:

```typescript
{
  id: "v1-1",
  title: "Los 3 Estados del Sistema Nervioso",
  cloudflareStreamId: "a1b2c3d4e5f6g7h8i9j0", // UID del video
  duration: "8-10 min",
  description: "Explicación visual..."
}
```

El componente `VideoSection` automáticamente detectará y reproducirá videos de Cloudflare Stream si tienen `cloudflareStreamId`, o videos de Vimeo si tienen `vimeoId`.

## 📡 APIs Disponibles

### `POST /api/videos/upload`
Sube un video a Cloudflare Stream. Solo administradores.

**Body (multipart/form-data):**
- `file`: Archivo de video
- `name` (opcional): Nombre del video
- `metadata` (opcional): JSON con metadata adicional

**Body (JSON para URL):**
```json
{
  "url": "https://ejemplo.com/video.mp4",
  "name": "Mi Video",
  "metadata": {}
}
```

### `GET /api/videos`
Lista todos los videos. Solo administradores.

**Query params:**
- `search` (opcional): Buscar videos
- `limit` (opcional): Límite de resultados

### `GET /api/videos/[uid]`
Obtiene detalles de un video específico. Solo administradores.

### `DELETE /api/videos?uid=[uid]`
Elimina un video. Solo administradores.

## 🎬 Reproductor de Videos

Los videos de Cloudflare Stream se reproducen automáticamente usando el iframe embed de Cloudflare. El componente `VideoSection`:

1. Prioriza videos de Cloudflare Stream (`cloudflareStreamId`)
2. Si no hay Stream, usa Vimeo (`vimeoId`)
3. Si no hay ninguno, muestra un placeholder

## ⚠️ Notas Importantes

1. **Costos**: Cloudflare Stream es un servicio de pago. Revisa los precios en su sitio web.

2. **Límites de Archivo**: 
   - Tamaño máximo: 30 GB
   - Formatos recomendados: MP4 (H264 + AAC)

3. **Procesamiento**: Los videos pueden tardar varios minutos en procesarse después de subirlos. Usa `readyToStream` para verificar si están listos.

4. **Seguridad**: Solo los administradores (email configurado en `ADMIN_EMAIL`) pueden subir/gestionar videos.

5. **Account ID Público**: El `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` es seguro de exponer públicamente, ya que solo se usa para generar URLs de embed.

## 🔧 Funciones Disponibles (lib/cloudflare-stream.ts)

- `uploadVideoToStream()`: Sube un archivo
- `uploadVideoFromUrl()`: Sube desde URL
- `getVideoDetails()`: Obtiene detalles
- `listVideos()`: Lista videos
- `deleteVideo()`: Elimina un video
- `getStreamEmbedUrl()`: Genera URL de embed
- `getPlaybackUrl()`: Obtiene URL directa de playback (HLS/DASH)

## 📚 Recursos

- [Documentación oficial de Cloudflare Stream](https://developers.cloudflare.com/stream/)
- [API Reference](https://developers.cloudflare.com/stream/stream-live/using-the-stream-api/)

