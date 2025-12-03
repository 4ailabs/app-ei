#!/bin/bash
# Script para arreglar Prisma Client después de npm install

echo "🔧 Configurando Prisma Client..."

# Asegurar que el directorio existe
mkdir -p node_modules/@prisma/client/.prisma/client/default

# Copiar TODOS los archivos del cliente generado
if [ -d "node_modules/.prisma/client" ]; then
    cp -r node_modules/.prisma/client/* node_modules/@prisma/client/.prisma/client/default/ 2>/dev/null || true
    echo "✅ Archivos copiados a node_modules/@prisma/client/.prisma/client/default/"
    echo "✅ Prisma Client configurado correctamente"
else
    echo "⚠️  node_modules/.prisma/client no existe. Ejecuta 'npx prisma generate' primero."
    exit 1
fi
