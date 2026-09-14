# Configuración de Formato (Format)

`vp fmt` y `vp check` leen la configuración de Oxfmt desde el bloque `fmt` en `vite.config.ts`. Consulta la [configuración de Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html) para más detalles.

`vp fmt` lee la configuración únicamente desde el `vite.config.ts` raíz. Los archivos `vite.config.ts` o `.oxfmtrc.json` anidados no se leen. Usa [`fmt.overrides`](#overrides) para configurar diferentes ajustes para directorios específicos. Consulta [Solución de problemas](/guide/troubleshooting#configuraciones-anidadas-de-lint-o-formato-no-admitidas) para más detalles.

## Ejemplo

```ts [vite.config.ts]
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

## Overrides

Para opciones del formateador específicas de paquetes en un monorepo, consulta la [guía de Monorepo](/guide/monorepo#overrides-de-formato).

