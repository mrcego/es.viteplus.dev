# Configuración de Lint

`vp lint` y `vp check` leen la configuración de Oxlint desde el bloque `lint` en `vite.config.ts`. Consulta la [configuración de Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html) para más detalles.

`vp lint` lee la configuración únicamente desde el `vite.config.ts` raíz. Los archivos `vite.config.ts` o `.oxlintrc.json` anidados no se leen. Usa [`lint.overrides`](#overrides) para configurar diferentes reglas para directorios específicos. Consulta [Solución de problemas](/guide/troubleshooting#configuraciones-anidadas-de-lint-o-formato-no-admitidas) para más detalles.

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

## Overrides

Para configuraciones de lint específicas de paquetes en un monorepo, consulta la [guía de Monorepo](/guide/monorepo#configuracion-de-raiz-con-overrides).

