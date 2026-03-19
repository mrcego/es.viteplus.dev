# Configuración de Pruebas (Test)

`vp test` lee la configuración de Vitest desde el bloque `test` en `vite.config.ts`. Consulta la [configuración de Vitest](https://vitest.dev/config/) para más detalles.

## Ejemplo

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
```

