# Configuración de Archivos Staged

`vp staged` y `vp config` leen las reglas de archivos en estado "staged" desde el bloque `staged` en `vite.config.ts`. Consulta la [guía de hooks de commit](/guide/commit-hooks).

## Ejemplo

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

