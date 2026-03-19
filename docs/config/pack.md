# Configuración de Empaquetado (Pack)

`vp pack` lee la configuración de tsdown desde el bloque `pack` en `vite.config.ts`. Consulta la [configuración de tsdown](https://tsdown.dev/options/config-file) para más detalles.

## Ejemplo

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    dts: true,
    format: ['esm', 'cjs'],
    sourcemap: true,
  },
});
```

