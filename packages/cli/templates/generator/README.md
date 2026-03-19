# Inicio de Generador de Código de Vite+

Un punto de partida para crear un generador de código de Vite+.

## Uso

Desde la raíz del monorepo:

```bash
# ejecuta y selecciona el generador
vp create
```

## Desarrollo

```bash
# Editar la plantilla
code src/template.ts

# Probar la CLI del generador
vp run dev

# Ejecutar pruebas
vp run test
```

## Personalización

Edita `src/template.ts` para personalizar:

- Esquema de opciones (usando Zod)
- Lógica de generación de archivos
- Scripts y sugerencias

Puedes encontrar más información sobre las [Plantillas de Bingo](https://create.bingo/) [aquí](https://create.bingo/build/concepts/creations).
