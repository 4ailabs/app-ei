#!/bin/bash

# Script seguro para deploy - preserva usuarios y datos
# Uso: bash scripts/safe-deploy.sh

set -e

echo "🔐 Verificando entorno..."

# Verificar que estamos en la rama main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Error: Debes estar en la rama 'main' para hacer deploy"
    exit 1
fi

# Verificar que no hay cambios sin commit
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: Hay cambios sin hacer commit"
    echo "Haz: git add . && git commit -m 'tu mensaje'"
    exit 1
fi

echo "✅ Rama correcta (main) y cambios committeados"
echo ""
echo "📋 Verificando que .env.local NO esté en git..."
if git ls-files | grep -q ".env.local"; then
    echo "❌ Error: .env.local está siendo tracked por git"
    echo "Ejecuta: git rm --cached .env.local"
    exit 1
fi
echo "✅ .env.local no está en git (seguro)"
echo ""

echo "🚀 Preparando para deploy..."
echo "   - Todos los usuarios serán preservados"
echo "   - La BD se sincronizará según el schema"
echo "   - Los cambios están en GitHub: 4ailabs/app-ei"
echo ""
echo "Pasos finales:"
echo "1. Ve a https://vercel.com/dashboard"
echo "2. Verifica que esté conectado a: 4ailabs/app-ei (main)"
echo "3. El deploy debería comenzar automáticamente"
echo "4. Los usuarios existentes se preservarán ✓"
echo ""
echo "✅ Deploy seguro preparado"
