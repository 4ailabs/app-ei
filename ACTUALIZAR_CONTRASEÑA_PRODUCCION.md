# 🔑 Actualizar Contraseña en Producción (Vercel)

## Problema
El usuario `admin@seminario.com` existe y está aprobado, pero la contraseña no coincide con `Admin123`.

## Solución: Actualizar Contraseña

### Paso 1: Conectar con Vercel

```bash
# Conectar con tu proyecto de Vercel
vercel link

# Descargar variables de entorno (incluye DATABASE_URL)
vercel env pull .env.local
```

### Paso 2: Actualizar la Contraseña

```bash
# Actualizar contraseña del usuario
npm run update-password admin@seminario.com Admin123
```

Este comando:
- ✅ Busca el usuario por email
- ✅ Hashea la nueva contraseña
- ✅ Actualiza la contraseña en la base de datos
- ✅ Asegura que el usuario esté aprobado

### Paso 3: Verificar que el Usuario sea Administrador

Si el usuario no es administrador, conviértelo:

```bash
npm run make-admin admin@seminario.com
```

---

## Alternativa: Usar el Panel de Admin (si tienes acceso)

Si ya tienes acceso a otro administrador:

1. Inicia sesión como otro admin
2. Ve a `/admin`
3. Busca `admin@seminario.com`
4. Haz clic en "Editar"
5. Ingresa la nueva contraseña en "Nueva Contraseña"
6. Guarda los cambios

---

## Verificar el Usuario

Para verificar el estado del usuario:

```bash
npm run check-user admin@seminario.com
```

Esto mostrará:
- ✅ Si el usuario existe
- ✅ Si está aprobado
- ✅ Si es administrador
- ✅ Información básica

---

## Notas Importantes

1. **Después de actualizar la contraseña**, el usuario debe:
   - Cerrar sesión completamente (si está logueado)
   - Iniciar sesión con la nueva contraseña

2. **Si estás en producción**, asegúrate de tener las variables de entorno correctas:
   ```bash
   vercel env pull .env.local
   ```

3. **Si el usuario no es administrador**, después de actualizar la contraseña, conviértelo:
   ```bash
   npm run make-admin admin@seminario.com
   ```

---

## Solución Rápida (Todo en Uno)

```bash
# 1. Conectar con Vercel
vercel link

# 2. Descargar variables de entorno
vercel env pull .env.local

# 3. Actualizar contraseña
npm run update-password admin@seminario.com Admin123

# 4. Convertir en administrador (si no lo es)
npm run make-admin admin@seminario.com
```

¡Listo! Ahora puedes iniciar sesión con `admin@seminario.com` / `Admin123`.

