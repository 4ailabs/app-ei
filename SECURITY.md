# 🔐 Guía de Seguridad y Deploy

## Nunca hacer esto ❌

1. **Commitear `.env.local`** → Expone URLs de BD y secrets
2. **Usar `prisma db push --force-reset`** → Borra TODA la BD
3. **Cambiar schema sin migraciones** → Puede perder datos
4. **Conectar múltiples repositorios a Vercel** → Causará conflictos

## Siempre hacer esto ✅

### 1. Proteger variables de entorno

```bash
# En .gitignore (ya está)
.env.local
.env.*.local

# En Vercel Dashboard → Settings → Environment Variables
# Configura TODAS las variables sensibles:
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
```

### 2. Usar migraciones para cambios de schema

```bash
# Local: crear migración
npx prisma migrate dev --name "descripcion del cambio"

# Commit y push
git add prisma/migrations
git commit -m "Add migration: descripcion"
git push origin main

# En Vercel: automático con 'prisma migrate deploy'
```

### 3. Verificar antes de deployar

```bash
# Ejecuta este script antes de hacer push
bash scripts/safe-deploy.sh

# Verificar que Vercel está conectado a:
# Repository: 4ailabs/app-ei
# Branch: main
```

### 4. Si necesitas cambiar el schema

✅ **Forma segura:**
```bash
# 1. Edita prisma/schema.prisma
# 2. Crea migración
npx prisma migrate dev --name "nombre cambio"
# 3. Prueba localmente
npm run dev
# 4. Commit y push
git add .
git commit -m "Add schema migration"
git push origin main
```

❌ **Forma peligrosa:**
```bash
# NO HAGAS ESTO
prisma db push --force-reset  # ← BORRA TODA LA BD
git push --force              # ← Reescribe historial
```

## Recuperar datos si algo sale mal

### Si Vercel perdió usuarios:

1. **Ir a Vercel Dashboard:**
   - Proyecto → Storage → Database
   - Ver fecha del último backup

2. **Contactar soporte de Vercel/Prisma** para restaurar backup

3. **O reimportar usuarios:**
```bash
# Si tienes un export de usuarios
node scripts/import-users.js usuarios.json
```

## Checklist antes de cada deploy

- [ ] Cambios están en GitHub (4ailabs/app-ei)
- [ ] `.env.local` NO está en git (`git ls-files` no lo menciona)
- [ ] Rama actual es `main`
- [ ] No hay cambios sin commit
- [ ] Schema cambios están en `prisma/migrations/`
- [ ] Vercel conectado a `4ailabs/app-ei`

## Variables de entorno obligatorias en Vercel

```
DATABASE_URL          # PostgreSQL de Vercel
NEXTAUTH_SECRET       # Genera con: openssl rand -base64 32
NEXTAUTH_URL          # https://tu-dominio.vercel.app
ADMIN_EMAIL          # Email del admin
CLOUDFLARE_ACCOUNT_ID # Para videos
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
```

## Monitoreo de usuarios

Verificar que los usuarios se preservan:

```bash
# Local
npx prisma db seed  # Si tienes seed.ts

# En Vercel Dashboard → Functions → Logs
# Buscar "User" para ver si hay errores
```

---

**¿Preguntas?** Revisa este documento antes de hacer cambios al schema o deploy.
