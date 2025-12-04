# 📘 Guía Completa del Sistema de Usuarios

## 🎯 Resumen Ejecutivo

Este documento explica **TODO** el sistema de usuarios: cómo funciona, cómo crear administradores, cómo aprobar usuarios, y cómo solucionar problemas.

---

## 🔄 Cómo Funciona el Sistema

### Flujo de Autenticación

1. **Usuario intenta iniciar sesión** → Ingresa email y contraseña
2. **NextAuth verifica credenciales** → Compara contraseña con hash en BD
3. **NextAuth verifica aprobación** → Solo usuarios con `approved: true` pueden entrar
4. **Si todo OK** → Crea sesión JWT y redirige al dashboard
5. **Si algo falla** → Sistema diagnostica el problema y muestra mensaje específico

### Estados de Usuario

- ✅ **Aprobado (`approved: true`)** → Puede iniciar sesión
- ⏳ **Pendiente (`approved: false`)** → No puede iniciar sesión, espera aprobación
- ❌ **No existe** → No puede iniciar sesión

---

## 👤 Crear el Primer Administrador

### Opción 1: Script de Terminal (Recomendado)

**Localmente:**
```bash
npm run init-user admin@example.com Admin123 "Administrador"
```

**En Producción (Vercel):**
```bash
# 1. Conectar con Vercel
vercel link

# 2. Descargar variables de entorno
vercel env pull .env.local

# 3. Crear administrador
npm run init-user admin@example.com Admin123 "Administrador"
```

Este comando:
- ✅ Crea el usuario
- ✅ Hashea la contraseña
- ✅ Lo aprueba automáticamente (`approved: true`)
- ✅ Está listo para iniciar sesión

### Opción 2: Prisma Studio (Interfaz Visual)

```bash
npm run db:studio
```

Esto abre una interfaz web donde puedes:
1. Ver tabla `User`
2. Crear nuevo usuario manualmente
3. **Importante:** Hashea la contraseña con bcrypt primero
4. Marca `approved: true`

**No recomendado** porque requiere hashear la contraseña manualmente.

---

## 📝 Registrar Nuevos Usuarios

### Opción 1: Registro Público (`/register`)

Los usuarios pueden registrarse desde la página `/register`:
- Se crean con `approved: false`
- Necesitan ser aprobados por un admin
- Pueden ser aprobados desde el panel `/admin`

### Opción 2: Admin Crea Usuario

Un administrador puede crear usuarios desde el panel `/admin`:
- Puede aprobarlos inmediatamente
- O dejarlos pendientes

### Opción 3: Script de Terminal

```bash
npm run init-user email@example.com password123 "Nombre Usuario"
```

---

## ✅ Aprobar Usuarios

### Opción 1: Panel de Administración (Recomendado)

1. Inicia sesión como administrador
2. Ve a `/admin`
3. Busca el usuario pendiente
4. Haz clic en "Editar"
5. Marca la casilla "Aprobado"
6. Guarda

### Opción 2: Script de Terminal

```bash
npm run approve-user email@example.com
```

### Opción 3: Verificar y Aprobar

```bash
# Primero verificar estado
npm run check-user email@example.com

# Luego aprobar si es necesario
npm run approve-user email@example.com
```

---

## 🔍 Diagnosticar Problemas

### Problema: "Credenciales Inválidas"

El sistema ahora muestra mensajes específicos:

- **"El email no está registrado"** → Regístrate primero
- **"Tu cuenta está pendiente de aprobación"** → Necesitas ser aprobado
- **"La contraseña es incorrecta"** → Verifica tu contraseña
- **"Error de conexión a la base de datos"** → Problema del servidor

### Verificar Estado de Usuario

```bash
npm run check-user email@example.com
```

Muestra:
- Si el usuario existe
- Si está aprobado
- Información básica

---

## 🛠️ Scripts Disponibles

| Script | Descripción | Uso |
|--------|-------------|-----|
| `npm run init-user` | Crear/actualizar usuario (lo aprueba automáticamente) | `npm run init-user email password "nombre"` |
| `npm run check-user` | Verificar estado de un usuario | `npm run check-user email` |
| `npm run approve-user` | Aprobar un usuario existente | `npm run approve-user email` |

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Verificación de aprobación en servidor
- ✅ Cookies HttpOnly y Secure en producción
- ✅ Sesiones JWT con expiración (7 días)
- ✅ Validación de email y contraseña

---

## 📋 Checklist para Primer Setup

### Desarrollo Local

- [ ] PostgreSQL instalado y corriendo
- [ ] `DATABASE_URL` configurada en `.env`
- [ ] Migraciones ejecutadas: `npm run db:migrate`
- [ ] Primer admin creado: `npm run init-user admin@example.com password "Admin"`
- [ ] Verificar login funciona

### Producción (Vercel)

- [ ] Base de datos PostgreSQL creada en Vercel Storage
- [ ] `DATABASE_URL` configurada en Vercel Environment Variables
- [ ] `NEXTAUTH_URL` configurada
- [ ] `NEXTAUTH_SECRET` configurado
- [ ] Deployment exitoso
- [ ] Conectar con Vercel: `vercel link`
- [ ] Descargar variables: `vercel env pull .env.local`
- [ ] Crear primer admin: `npm run init-user admin@example.com password "Admin"`
- [ ] Verificar login funciona

---

## 🆘 Solución de Problemas Comunes

### "No puedo iniciar sesión"

1. Verifica que el usuario existe: `npm run check-user tu-email`
2. Verifica que está aprobado
3. Si no está aprobado, apruebalo: `npm run approve-user tu-email`
4. Si no existe, créalo: `npm run init-user tu-email password "Nombre"`

### "Error de conexión a la base de datos"

1. Verifica que `DATABASE_URL` esté configurada
2. Verifica que la base de datos esté activa
3. En producción, verifica en Vercel Dashboard → Storage

### "El usuario no se aprueba"

1. Verifica que estás usando el comando correcto
2. Revisa los logs del servidor
3. Usa Prisma Studio para verificar manualmente: `npm run db:studio`

---

## 📚 Archivos Clave del Sistema

- `lib/auth.ts` - Configuración de NextAuth
- `app/api/register/route.ts` - Endpoint de registro
- `app/api/auth/diagnose/route.ts` - Diagnóstico de problemas
- `app/login/page.tsx` - Página de login
- `prisma/schema.prisma` - Schema de base de datos (campo `approved`)

---

## 🎯 Flujo Completo: Usuario Nuevo → Acceso

1. **Usuario se registra** en `/register`
   - Se crea con `approved: false`
   - Recibe mensaje: "Pendiente de aprobación"

2. **Administrador ve el usuario** en `/admin`
   - Ve lista de usuarios pendientes
   - Puede filtrar por "Pendientes"

3. **Administrador aprueba** el usuario
   - Marca casilla "Aprobado" y guarda
   - O usa script: `npm run approve-user email`

4. **Usuario puede iniciar sesión**
   - Va a `/login`
   - Ingresa email y contraseña
   - Sistema verifica que esté aprobado
   - Accede al dashboard

---

## ✅ Resumen de Mejoras Implementadas

1. ✅ **Sistema simplificado** - Eliminada verificación redundante
2. ✅ **Mensajes de error claros** - El usuario sabe exactamente qué está mal
3. ✅ **Endpoint de diagnóstico** - Diagnostica problemas automáticamente
4. ✅ **Scripts útiles** - Comandos simples para gestión de usuarios
5. ✅ **Documentación completa** - Este documento explica todo

---

**¡Ahora el sistema es más claro, simple y fácil de usar!** 🚀

