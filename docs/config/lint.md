# Configuración de Lint

`vp lint` utiliza la [detección nativa de configuración](/guide/lint#configuracion) de Oxlint desde el directorio de trabajo. Usa `vp lint -c <ruta>` o `vp lint --config <ruta>` para seleccionar otra configuración. Consulta la [configuración de Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html) para más detalles.

`vp check` utiliza el bloque `lint` de la raíz del workspace cuando existe, incluso desde el directorio de un paquete. Las configuraciones de paquetes no reemplazan estos ajustes de lint en `vp check`.

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
