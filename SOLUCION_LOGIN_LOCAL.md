# 🔧 Solución: Problemas de Login Local

## 🔍 Problema

No puedes iniciar sesión con `admin@seminario.com` en tu entorno local.

## ✅ Solución Rápida

### Opción 1: Usar el script de inicialización (Recomendado)

```bash
npm run init-user admin@seminario.com Admin123 "Administrador" --admin
```

**Nota**: El flag `--admin` debe ir al final, no como argumento de npm.

### Opción 2: Verificar y configurar DATABASE_URL

1. **Verifica que tengas `.env.local`** con `DATABASE_URL`:

```bash
# Verificar si existe
cat .env.local | grep DATABASE_URL
```

2. **Si no existe, crea o actualiza `.env.local`**:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
NEXTAUTH_SECRET="tu-secret-key-aqui"
NEXTAUTH_URL="http://localhost:8080"
```

3. **Luego ejecuta**:

```bash
npm run init-user admin@seminario.com Admin123 "Administrador" --admin
```

### Opción 3: Usar el script de corrección

```bash
npm run fix-local-admin
```

Este script:
- ✅ Verifica si el usuario existe
- ✅ Crea el usuario si no existe
- ✅ Actualiza la contraseña si no coincide
- ✅ Asegura que esté aprobado
- ✅ Asegura que sea administrador

---

## 🔍 Diagnóstico

### Verificar el estado del usuario

```bash
npm run check-user admin@seminario.com
```

### Verificar la base de datos

```bash
npm run db:studio
```

Esto abrirá Prisma Studio donde puedes ver y editar usuarios directamente.

---

## ⚠️ Problemas Comunes

### 1. DATABASE_URL no configurado

**Error**: `Error validating datasource db: the URL must start with the protocol postgresql://`

**Solución**: 
- Verifica que `.env.local` tenga `DATABASE_URL`
- Asegúrate de que la base de datos local esté corriendo
- Verifica que las credenciales sean correctas

### 2. Usuario no aprobado

**Síntoma**: El login falla aunque las credenciales sean correctas

**Solución**: 
```bash
npm run approve-user admin@seminario.com
```

### 3. Contraseña incorrecta

**Síntoma**: "Credenciales inválidas"

**Solución**: 
```bash
npm run update-password admin@seminario.com Admin123
```

### 4. Usuario no es administrador

**Síntoma**: No puedes acceder al panel de admin

**Solución**: 
```bash
npm run make-admin admin@seminario.com
```

---

## 📋 Checklist de Verificación

- [ ] `.env.local` existe y tiene `DATABASE_URL`
- [ ] La base de datos local está corriendo
- [ ] El usuario `admin@seminario.com` existe
- [ ] El usuario está aprobado (`approved: true`)
- [ ] El usuario es administrador (`isAdmin: true`)
- [ ] La contraseña es `Admin123` (o la que configuraste)

---

## 🚀 Solución Completa (Todo en Uno)

Si nada funciona, ejecuta estos comandos en orden:

```bash
# 1. Verificar/Crear usuario con todos los permisos
npm run init-user admin@seminario.com Admin123 "Administrador" --admin

# 2. Si el usuario ya existe, actualizar contraseña
npm run update-password admin@seminario.com Admin123

# 3. Asegurar que sea admin
npm run make-admin admin@seminario.com

# 4. Verificar estado final
npm run check-user admin@seminario.com
```

---

## 💡 Nota sobre el Flag --admin

El flag `--admin` debe pasarse como argumento del script, no de npm:

```bash
# ❌ INCORRECTO
npm run init-user admin@seminario.com Admin123 "Administrador" --admin

# ✅ CORRECTO (pero el script necesita ajuste)
# Por ahora, después de crear el usuario, ejecuta:
npm run make-admin admin@seminario.com
```

---

**Si después de estos pasos aún no puedes iniciar sesión**, verifica:
1. Los logs del servidor (`npm run dev`)
2. La consola del navegador (F12)
3. Que las cookies se estén guardando correctamente

