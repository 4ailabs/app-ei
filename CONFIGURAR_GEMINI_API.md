# 🤖 Configurar Google Gemini API para Maestro IA

## 🔍 ¿Qué es esto?

El asistente de IA "Maestro IA" usa **Google Gemini API** para proporcionar respuestas inteligentes. Necesitas obtener una API key de Google y configurarla en Vercel.

---

## 📋 Paso 1: Obtener API Key de Google Gemini

### 1.1. Ir a Google AI Studio

1. Ve a [Google AI Studio](https://aistudio.google.com/)
2. Inicia sesión con tu cuenta de Google

### 1.2. Crear API Key

1. En el menú lateral, haz clic en **"Get API key"** o **"API Keys"**
2. Si es la primera vez, haz clic en **"Create API key"**
3. Selecciona un proyecto de Google Cloud (o crea uno nuevo)
4. **Copia la API key** que se genera (tendrá un formato como: `AIzaSy...`)

**⚠️ IMPORTANTE**: Guarda esta API key de forma segura. No la compartas públicamente.

---

## 📋 Paso 2: Configurar en Vercel

### 2.1. Ir a Variables de Entorno

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto (`app-ei` o el nombre que tengas)
3. Ve a **Settings** → **Environment Variables**

### 2.2. Agregar Variable

1. Haz clic en **"Add New"** o **"Add"**
2. Configura:
   - **Key**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Pega la API key que copiaste (formato: `AIzaSy...`)
   - **Environment**: Marca las 3 casillas:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Haz clic en **"Save"**

---

## 📋 Paso 3: Redesplegar

Después de agregar la variable de entorno, necesitas redesplegar:

### Opción A: Redesplegar desde Vercel (Recomendado)

1. Ve a la pestaña **"Deployments"**
2. Encuentra el último deployment
3. Haz clic en los **tres puntos (⋯)** a la derecha
4. Selecciona **"Redeploy"**
5. Confirma el redeploy

### Opción B: Hacer un nuevo push

```bash
git commit --allow-empty -m "Trigger redeploy after adding Gemini API key"
git push origin main
```

---

## ✅ Verificación

Después del redeploy:

1. **Inicia sesión** en tu aplicación
2. Ve a **"Maestro IA"** en el menú
3. **Envía un mensaje** al asistente
4. Deberías recibir una respuesta del asistente

Si ves un error como "Error de configuración. Contacta al administrador", verifica:
- ✅ Que la variable `GOOGLE_GEMINI_API_KEY` esté configurada en Vercel
- ✅ Que el redeploy se haya completado
- ✅ Que la API key sea válida

---

## 🔍 Verificar que la Variable Esté Configurada

Para verificar que la variable esté correctamente configurada:

1. En Vercel Dashboard → Settings → Environment Variables
2. Busca `GOOGLE_GEMINI_API_KEY`
3. Deberías verla en la lista con el valor parcialmente oculto

---

## 💰 Costos de Google Gemini API

**Buenas noticias**: Google Gemini tiene un **nivel gratuito generoso**:

- **60 solicitudes por minuto** (gratis)
- **1,500 solicitudes por día** (gratis)
- **32,000 tokens por minuto** (gratis)

Para la mayoría de casos de uso, el nivel gratuito es suficiente.

Si necesitas más, puedes ver los precios en: https://ai.google.dev/pricing

---

## 🆘 Solución de Problemas

### Error: "GOOGLE_GEMINI_API_KEY not configured"

**Causa**: La variable de entorno no está configurada o el redeploy no se ha completado.

**Solución**:
1. Verifica que `GOOGLE_GEMINI_API_KEY` esté en Vercel → Settings → Environment Variables
2. Asegúrate de que el redeploy se haya completado
3. Espera unos minutos y prueba de nuevo

### Error: "Error de configuración. Contacta al administrador."

**Causa**: La API key es inválida o ha expirado.

**Solución**:
1. Ve a [Google AI Studio](https://aistudio.google.com/)
2. Verifica que la API key esté activa
3. Genera una nueva API key si es necesario
4. Actualiza la variable en Vercel
5. Redesplega

### Error: "Límite de solicitudes excedido"

**Causa**: Has excedido el límite de solicitudes gratuitas.

**Solución**:
1. Espera unos minutos
2. O configura facturación en Google Cloud para aumentar los límites

---

## 📝 Resumen Rápido

1. ✅ Obtener API key en [Google AI Studio](https://aistudio.google.com/)
2. ✅ Agregar `GOOGLE_GEMINI_API_KEY` en Vercel → Settings → Environment Variables
3. ✅ Redesplegar la aplicación
4. ✅ Probar el asistente en "Maestro IA"

---

## 🔗 Enlaces Útiles

- [Google AI Studio](https://aistudio.google.com/) - Obtener API key
- [Documentación de Gemini API](https://ai.google.dev/docs) - Documentación oficial
- [Precios de Gemini](https://ai.google.dev/pricing) - Información de precios

¡Listo! Tu asistente de IA debería funcionar ahora. 🎉

