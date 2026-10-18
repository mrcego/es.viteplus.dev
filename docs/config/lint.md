# Configuración de Lint

`vp lint` y `vp check` utilizan el bloque `lint` de la raíz del workspace, incluso cuando se ejecutan desde el directorio de un paquete. Las configuraciones de paquetes no reemplazan estos ajustes de lint. Usa `vp lint -c <ruta>` o `vp lint --config <ruta>` para seleccionar otra configuración. Si la configuración raíz no tiene un bloque `lint`, Oxlint utiliza la [detección nativa](/guide/lint#configuracion). Consulta la [configuración de Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html) para más detalles.

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

Para reglas de lint específicas de un archivo o paquete, usa [`lint.overrides`](/guide/monorepo#configuracion-de-raiz-con-overrides) desde el `vite.config.ts` raíz.

Oxlint deshabilita las configuraciones anidadas en modo Vite+, por lo que las configuraciones de lint anidadas no anulan los ajustes para archivos individuales. Consulta la [solución de problemas](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied) para más detalles.
