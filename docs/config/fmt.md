# Configuración de Formato

`vp fmt` y `vp check` utilizan el bloque `fmt` de la raíz del workspace, incluso cuando se ejecutan desde el directorio de un paquete. Las configuraciones de paquetes no reemplazan estos ajustes de formato. Usa `vp fmt -c <ruta>` o `vp fmt --config <ruta>` para seleccionar otra configuración. Si la configuración raíz no tiene un bloque `fmt`, Oxfmt utiliza la [detección nativa](/guide/fmt#configuracion). Consulta la [configuración de Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html) para más detalles.

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

Para ajustes de formato específicos de un archivo o paquete, usa [`fmt.overrides`](/guide/monorepo#overrides-de-formato) desde el `vite.config.ts` raíz.

Oxfmt deshabilita las configuraciones anidadas en modo Vite+, por lo que las configuraciones de formato anidadas no anulan los ajustes para archivos individuales. Consulta la [solución de problemas](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied) para más detalles.
