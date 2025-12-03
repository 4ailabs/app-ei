# Setup Local

## Pasos Iniciales

1. Instala dependencias:
```bash
npm install
```

2. Genera el cliente de Prisma:
```bash
npm run db:generate
```

3. Ejecuta las migraciones:
```bash
npm run db:migrate
```

4. Crea un usuario inicial (opcional):
```bash
npm run init-user <email> <password> <nombre>
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Nota sobre Prisma Client

Si encuentras errores de importación de PrismaClient, ejecuta:
```bash
npm run db:generate
```

Esto regenerará el cliente de Prisma en la ubicación correcta.
