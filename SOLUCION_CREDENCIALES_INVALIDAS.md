# 🔧 Solución: "Credenciales Inválidas"

## 🔍 Diagnóstico del Problema

Si recibes el mensaje "Credenciales inválidas" al intentar iniciar sesión, puede ser por estas razones:

1. ❌ El usuario no existe en la base de datos
2. ❌ El usuario existe pero NO está aprobado (`approved: false`)
3. ❌ La contraseña es incorrecta
4. ❌ Problema de conexión a la base de datos

---

## ✅ Solución Paso a Paso

### Paso 1: Verificar si el Usuario Existe y está Aprobado

Ejecuta este comando para verificar el estado de tu usuario:

```bash
npm run check-user <tu-email>
```

**Ejemplo:**
```bash
npm run check-user admin@example.com
```

Esto te mostrará:
- ✅ Si el usuario existe
- ✅ Si está aprobado o no
- ✅ Información básica del usuario

---

### Paso 2: Si el Usuario NO Existe

Crea un nuevo usuario administrador:

```bash
npm run init-user <email> <password> "<nombre>"
```

**Ejemplo:**
```bash
npm run init-user admin@example.com Admin123 "Administrador"
```

**Nota:** El script `init-user` ahora aprueba automáticamente al usuario.

---

### Paso 3: Si el Usuario Existe pero NO está Aprobado

Aprueba el usuario manualmente:

```bash
npm run approve-user <email>
```

**Ejemplo:**
```bash
npm run approve-user admin@example.com
```

Esto establecerá `approved: true` para ese usuario.

---

### Paso 4: Si Usas Producción (Vercel)

Si estás en producción, necesitas conectarte primero:

```bash
# 1. Conectar con Vercel
vercel link

# 2. Descargar variables de entorno
vercel env pull .env.local

# 3. Verificar usuario
npm run check-user <email>

# 4. Aprobar usuario (si es necesario)
npm run approve-user <email>
```

---

## 🔑 Crear Usuario Administrador desde Cero

Si no tienes ningún usuario, crea uno administrador completo:

```bash
npm run init-user admin@example.com Admin123 "Administrador"
```

Este comando:
- ✅ Crea el usuario
- ✅ Hashea la contraseña
- ✅ Lo aprueba automáticamente (`approved: true`)
- ✅ Está listo para iniciar sesión

---

## 🎯 Casos Comunes

### Caso 1: Usuario Recién Registrado

Si te registraste desde `/register`, tu usuario está creado pero **NO aprobado** por defecto.

**Solución:**
1. Un administrador debe aprobarte desde el panel `/admin`
2. O ejecuta: `npm run approve-user tu-email@example.com`

### Caso 2: Usuario Administrador

Si eres el administrador y no puedes entrar:

**Solución:**
1. Verifica que el usuario existe: `npm run check-user tu-email`
2. Si existe pero no está aprobado: `npm run approve-user tu-email`
3. Si no existe: `npm run init-user tu-email password "Tu Nombre"`

### Caso 3: Contraseña Incorrecta

Si el usuario existe y está aprobado pero aún no puedes entrar:

**Solución:**
1. Cambia la contraseña ejecutando `init-user` de nuevo (actualiza la contraseña):
   ```bash
   npm run init-user tu-email nueva-password "Tu Nombre"
   ```

---

## 🛠️ Scripts Disponibles

| Script | Descripción | Uso |
|--------|-------------|-----|
| `npm run init-user` | Crear/actualizar usuario (lo aprueba automáticamente) | `npm run init-user email password "nombre"` |
| `npm run check-user` | Verificar estado de un usuario | `npm run check-user email` |
| `npm run approve-user` | Aprobar un usuario existente | `npm run approve-user email` |

---

## 🔍 Verificar en la Base de Datos Directamente

Si prefieres verificar manualmente:

```bash
npm run db:studio
```

Esto abrirá Prisma Studio donde puedes:
- Ver todos los usuarios
- Verificar si `approved: true` o `false`
- Editar manualmente el campo `approved`
- Ver la contraseña hasheada (no la real)

---

## 🆘 Si Nada Funciona

### Verificar Conexión a la Base de Datos

Si todos los scripts fallan, verifica que:

1. **La variable `DATABASE_URL` está configurada:**
   ```bash
   # Verificar en .env.local o .env
   echo $DATABASE_URL
   ```

2. **La base de datos está accesible:**
   - En local: PostgreSQL está corriendo
   - En producción: La base de datos en Vercel está activa

3. **Las migraciones están aplicadas:**
   ```bash
   npm run db:migrate
   ```

### Ver Logs de Error

Revisa los logs del servidor para ver errores específicos:
- En desarrollo: Terminal donde corre `npm run dev`
- En producción: Logs de Vercel Dashboard

---

## ✅ Resumen Rápido

```bash
# 1. Verificar usuario
npm run check-user tu-email@example.com

# 2. Si no existe o no está aprobado, crear/actualizar
npm run init-user tu-email@example.com password123 "Tu Nombre"

# 3. O solo aprobar si ya existe
npm run approve-user tu-email@example.com

# 4. Intentar login nuevamente
```

---

¡Con estos pasos deberías poder resolver el problema de "Credenciales inválidas"! 🚀

