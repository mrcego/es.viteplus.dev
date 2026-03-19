# Configuración de Formato (Format)

`vp fmt` y `vp check` leen la configuración de Oxfmt desde el bloque `fmt` en `vite.config.ts`. Consulta la [configuración de Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html) para más detalles.

## Ejemplo

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    ignorePatterns: ['dist/**'],
    singleQuote: true,
    semi: true,
    sortPackageJson: true,
  },
});
```

