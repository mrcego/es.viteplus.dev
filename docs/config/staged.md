# Configuración de Archivos Staged

`vp staged` y `vp config` leen las reglas de archivos en estado "staged" desde el bloque `staged` en `vite.config.ts`. Consulta la [Hooks de Commit](/guide/commit-hooks).

## Ejemplo

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
});
```

