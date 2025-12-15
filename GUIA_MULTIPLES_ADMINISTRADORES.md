# 👥 Guía: Múltiples Administradores

## ✅ Cambios Realizados

Se ha actualizado el sistema para permitir múltiples administradores en lugar de solo uno basado en email hardcodeado.

### Cambios Principales:

1. **Campo `isAdmin` agregado al modelo User** - Ahora cada usuario puede ser marcado como administrador
2. **Función helper `isAdmin()`** - Centraliza la verificación de permisos de administrador
3. **Actualización de todas las verificaciones** - Todos los endpoints y páginas ahora usan el campo `isAdmin`
4. **Script para convertir usuarios en admin** - Nuevo comando `make-admin`
5. **Interfaz de administración actualizada** - El panel de admin permite asignar/remover permisos de administrador

---

## 🚀 Cómo Convertir un Usuario en Administrador

### Opción 1: Script de Terminal (Recomendado)

```bash
npm run make-admin <email>
```

**Ejemplo:**
```bash
npm run make-admin usuario@ejemplo.com
```

Este comando:
- ✅ Busca el usuario por email
- ✅ Lo convierte en administrador (`isAdmin: true`)
- ✅ Muestra información del usuario actualizado

**Nota:** El usuario debe cerrar sesión y volver a iniciar sesión para que los cambios surtan efecto.

---

### Opción 2: Panel de Administración

1. Inicia sesión como administrador actual
2. Ve a `/admin`
3. Busca el usuario que quieres convertir en admin
4. Haz clic en "Editar" (ícono de lápiz)
5. Marca la casilla "👑 Administrador (acceso completo al panel)"
6. Guarda los cambios

---

### Opción 3: Crear Usuario Nuevo como Administrador

```bash
npm run init-user <email> <password> <nombre> --admin
```

**Ejemplo:**
```bash
npm run init-user admin2@ejemplo.com Admin123 "Segundo Admin" --admin
```

---

## 🔧 Aplicar Cambios a la Base de Datos

Si estás en desarrollo local y necesitas aplicar el nuevo campo `isAdmin` a tu base de datos:

```bash
# Generar el cliente de Prisma con el nuevo campo
npx prisma generate

# Aplicar los cambios a la base de datos (desarrollo)
npx prisma db push

# O crear una migración (producción)
npx prisma migrate dev --name add_is_admin_field
```

---

## 📋 Migrar Usuario Existente a Administrador

Si ya tienes un usuario con el email `admin@seminario.com` y quieres convertirlo en administrador:

```bash
npm run make-admin admin@seminario.com
```

O desde el panel de administración editando el usuario y marcando la casilla de administrador.

---

## 🔐 Verificación de Permisos

El sistema ahora verifica permisos de administrador de la siguiente manera:

- **Backend (API routes)**: Usa la función `isAdmin(session)` que consulta la base de datos
- **Frontend (Componentes)**: Usa `session.user.isAdmin` del token JWT
- **Páginas protegidas**: Verifican `isAdmin` antes de permitir acceso

---

## ⚠️ Notas Importantes

1. **Cerrar sesión requerido**: Después de convertir un usuario en admin, debe cerrar sesión y volver a iniciar para que los cambios surtan efecto (el token JWT se actualiza)

2. **Primer administrador**: El endpoint `/api/setup` ahora crea el primer usuario con `isAdmin: true` automáticamente

3. **Múltiples administradores**: Ahora puedes tener tantos administradores como necesites

4. **Seguridad**: Solo los administradores pueden:
   - Acceder a `/admin`
   - Crear/editar/eliminar usuarios
   - Subir/gestionar videos
   - Ver estadísticas del sistema

---

## 🐛 Solución de Problemas

### El usuario no puede acceder al panel de admin después de convertirlo

1. Verifica que el campo `isAdmin` esté en `true` en la base de datos
2. El usuario debe cerrar sesión completamente
3. El usuario debe volver a iniciar sesión
4. Verifica que el token JWT se haya actualizado

### Error: "No se encontró un usuario con el email"

- Verifica que el email esté correcto
- Asegúrate de que el usuario exista en la base de datos
- Puedes verificar usuarios con: `npm run db:studio`

---

## 📝 Archivos Modificados

- `prisma/schema.prisma` - Agregado campo `isAdmin`
- `lib/admin.ts` - Nueva función helper para verificar admin
- `lib/auth.ts` - Actualizado para incluir `isAdmin` en JWT y sesión
- `types/next-auth.d.ts` - Tipos actualizados
- `app/admin/page.tsx` - Verificación actualizada
- `app/api/**/*.ts` - Todos los endpoints de API actualizados
- `components/Sidebar.tsx` - Verificación actualizada
- `components/admin/UserTable.tsx` - Muestra badge de admin
- `components/admin/UserForm.tsx` - Permite editar `isAdmin`
- `scripts/make-admin.ts` - Nuevo script
- `scripts/init-user.ts` - Actualizado para crear admins

---

## ✅ Checklist para Nueva Mac

Para permitir que otra Mac pueda ingresar como administrador:

1. ✅ Aplicar cambios de base de datos (si es necesario)
2. ✅ Crear o convertir el usuario en administrador:
   ```bash
   npm run make-admin email@usuario.com
   ```
3. ✅ El usuario debe iniciar sesión con sus credenciales
4. ✅ Verificar que puede acceder a `/admin`

---

¡Listo! Ahora puedes tener múltiples administradores en el sistema. 🎉

