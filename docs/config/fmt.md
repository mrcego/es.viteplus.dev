# Configuración de Formato

`vp fmt` utiliza la [detección nativa de configuración](/guide/fmt#configuracion) de Oxfmt desde el directorio de trabajo. Usa `vp fmt -c <ruta>` o `vp fmt --config <ruta>` para seleccionar otra configuración. Consulta la [configuración de Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html) para más detalles.

`vp check` utiliza el bloque `fmt` de la raíz del workspace cuando existe, incluso desde el directorio de un paquete. Las configuraciones de paquetes no reemplazan estos ajustes de formato en `vp check`.

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
