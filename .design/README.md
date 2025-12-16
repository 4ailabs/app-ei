# Guía de Diseño - Inteligencia Energética

Esta carpeta contiene los lineamientos de diseño del proyecto.

## Archivos

- **DESIGN_SYSTEM.md** - Sistema de diseño completo (colores, tipografía, componentes, espaciado)

## Para Claude/AI

Antes de hacer cambios en la UI, consulta `DESIGN_SYSTEM.md` para:

1. Usar los colores correctos de la paleta
2. Mantener consistencia en iconos (siempre naranja #DA7756)
3. Aplicar las clases correctas de safe areas para iOS
4. Seguir los principios de claridad y jerarquía visual

## Resumen Rápido

- **Color principal**: `#DA7756` (naranja)
- **Todos los iconos de sección**: Color naranja `#DA7756`
- **NO usar** colores variados para tipos de contenido
- **Mobile first**: Usar clases responsive `sm:` y `lg:`
- **Safe areas**: `pb-safe`, `pt-safe`, `mt-header-safe`, `top-header-safe`
