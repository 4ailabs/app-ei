# 🎬 Guía para Subir Videos Nuevos

## 📋 Opciones Disponibles

### Opción 1: Panel de Administración (Más Fácil) ✅

Ya tienes un panel integrado en tu app para subir y gestionar videos.

#### Paso 1: Obtener API Token de Cloudflare

1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Haz clic en **"Create Token"**
3. Usa el template **"Edit Cloudflare Stream"** o crea uno personalizado:
   - **Account** → **Cloudflare Stream** → **Edit**
4. **IMPORTANTE**: Copia el token inmediatamente (solo se muestra una vez)
5. Agrega el token a tu `.env`:
   ```env
   CLOUDFLARE_API_TOKEN="tu_token_aqui"
   ```
6. Reinicia el servidor: `npm run dev`

#### Paso 2: Usar el Panel de Admin

1. Ve a: http://localhost:3000/admin
2. Inicia sesión como admin (`admin@seminario.com` / `Admin123`)
3. Haz clic en la pestaña **"Videos"**
4. Haz clic en **"Subir Video"**
5. Elige el método:
   - **Desde Archivo**: Selecciona un video desde tu computadora
   - **Desde URL**: Pega la URL de un video (ej: desde Google Drive, Dropbox, etc.)
6. Opcional: Agrega un nombre al video
7. Haz clic en **"Subir"**

#### Paso 3: Agregar el Video a una Sesión

Después de subir, obtendrás el **UID del video** (ej: `abc123def456`).

1. Abre `data/sessions.ts`
2. Encuentra el video correspondiente en la sesión
3. Agrega el `cloudflareStreamId`:

```typescript
{
  id: "v1-2",
  title: "La Ventana de Tolerancia",
  cloudflareStreamId: "abc123def456", // ← UID que obtuviste
  duration: "6-8 min",
  description: "..."
}
```

---

### Opción 2: Subir Manualmente en Cloudflare Dashboard

1. Ve a: https://dash.cloudflare.com
2. Navega a **Stream** en el menú lateral
3. Haz clic en **"Upload Video"**
4. Arrastra tu video o selecciona un archivo
5. Espera a que se procese
6. Copia el **UID del video** (aparece en la lista)
7. Agrega el UID a `data/sessions.ts` como en el Paso 3 anterior

---

### Opción 3: Desde URL Externa

Si tienes un video en otro servicio (Google Drive, Dropbox, Vimeo, etc.):

**Con API Token configurado:**
1. Ve al panel de admin → Videos
2. Selecciona "Desde URL"
3. Pega la URL del video
4. Cloudflare Stream descargará y procesará el video automáticamente

**Sin API Token:**
1. Descarga el video primero
2. Súbelo manualmente en Cloudflare Dashboard
3. O usa la Opción 2

---

## 🔑 Resumen Rápido

### Para empezar a subir videos:
```bash
# 1. Obtén el API Token de Cloudflare (ver Paso 1 arriba)
# 2. Agrégalo a .env:
CLOUDFLARE_API_TOKEN="tu_token_aqui"

# 3. Reinicia el servidor
npm run dev

# 4. Ve a http://localhost:3000/admin → Videos → Subir Video
```

### Para agregar videos a sesiones:
Después de subir, copia el UID y agrégalo a `data/sessions.ts`:
```typescript
cloudflareStreamId: "abc123def456"
```

---

## ⚠️ Notas Importantes

- **Tamaño máximo**: 30 GB por video
- **Formatos recomendados**: MP4 (H264 + AAC)
- **Procesamiento**: Los videos pueden tardar varios minutos en procesarse
- **Costo**: Cloudflare Stream es un servicio de pago (revisa precios en su sitio)

---

## 🆘 Solución de Problemas

### "Acceso denegado" al intentar subir
- Verifica que estés logueado como admin
- Verifica que el API Token esté correctamente configurado en `.env`
- Reinicia el servidor después de agregar el token

### El video no aparece después de subir
- Verifica que el video esté procesado (`readyToStream: true`)
- Espera unos minutos si acabas de subirlo
- Verifica que agregaste el `cloudflareStreamId` correctamente en `sessions.ts`

### Error al subir desde URL
- Asegúrate de que la URL sea accesible públicamente
- Verifica que el formato del video sea compatible
- Intenta descargar y subir desde archivo en su lugar

