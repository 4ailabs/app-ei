# Guía Rápida: Subir a GitHub

## ✅ Checklist Pre-Subida

Antes de subir a GitHub, verifica:

- [x] `.gitignore` configurado correctamente
- [x] `.env.example` existe y está completo
- [x] `prisma/dev.db` está en `.gitignore`
- [x] No hay archivos `.env` en el repositorio
- [x] `README.md` actualizado con instrucciones
- [x] `vercel.json` configurado correctamente

## 🚀 Pasos para Subir a GitHub

### 1. Verificar Estado Actual

```bash
cd /Users/miguelojedarios/app-seminario-inteligencia-energetica
git status
```

### 2. Agregar Archivos al Repositorio

```bash
# Agrega todos los archivos del proyecto
git add .

# Verifica qué se va a subir (NO deberías ver .env o dev.db)
git status
```

### 3. Crear Commit Inicial

```bash
git commit -m "Initial commit: Seminario Inteligencia Energética"
```

### 4. Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `app-seminario-inteligencia-energetica`
3. **NO** marques ninguna opción (README, .gitignore, license)
4. Haz clic en "Create repository"

### 5. Conectar y Subir

```bash
# Reemplaza TU-USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/app-seminario-inteligencia-energetica.git

# Cambia a la rama main
git branch -M main

# Sube el código
git push -u origin main
```

### 6. Verificar en GitHub

1. Visita tu repositorio en GitHub
2. Verifica que todos los archivos estén presentes
3. **IMPORTANTE**: Verifica que `.env` NO esté visible
4. Verifica que `prisma/dev.db` NO esté visible

## ⚠️ Si Ya Tienes un Repositorio Git

Si el proyecto ya tiene commits, simplemente:

```bash
# Verifica el remote actual
git remote -v

# Si necesitas cambiar el remote
git remote set-url origin https://github.com/TU-USUARIO/app-seminario-inteligencia-energetica.git

# Sube los cambios
git push -u origin main
```

## 🔍 Verificar Archivos Ignorados

Para asegurarte de que los archivos sensibles no se suban:

```bash
# Verifica que .env esté ignorado
git check-ignore .env
# Debería mostrar: .env

# Verifica que dev.db esté ignorado
git check-ignore prisma/dev.db
# Debería mostrar: prisma/dev.db
```

## 📝 Próximos Pasos

Después de subir a GitHub:

1. Sigue la guía en `DEPLOY.md` para desplegar en Vercel
2. O lee la sección "Deployment en Vercel" en `README.md`

## 🆘 Problemas Comunes

### Error: "remote origin already exists"

```bash
# Elimina el remote existente
git remote remove origin

# Agrega el nuevo remote
git remote add origin https://github.com/TU-USUARIO/app-seminario-inteligencia-energetica.git
```

### Error: "failed to push some refs"

```bash
# Si hay cambios en GitHub que no tienes localmente
git pull origin main --allow-unrelated-histories

# Luego intenta de nuevo
git push -u origin main
```

### Archivo .env aparece en GitHub

```bash
# Elimínalo del repositorio (pero mantén el archivo local)
git rm --cached .env

# Haz commit del cambio
git commit -m "Remove .env from repository"

# Sube el cambio
git push origin main
```


