# Configuración de Lint

`vp lint` y `vp check` leen la configuración de Oxlint desde el bloque `lint` en `vite.config.ts`. Consulta la [configuración de Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html) para más detalles.

## Ejemplo

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-console': ['error', { allow: ['error'] }],
    },
  },
});
```

Recomendamos habilitar tanto `options.typeAware` como `options.typeCheck` para que `vp lint` y `vp check` puedan utilizar el motor completo con conocimiento de tipos (type-aware).

