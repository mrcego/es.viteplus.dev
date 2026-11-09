# Formato

`vp fmt` formatea el código con Oxfmt.

## Vista General

`vp fmt` está basado en [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), el formateador de Oxc. Oxfmt tiene compatibilidad total con Prettier y está diseñado como un reemplazo directo y rápido para Prettier.

Usa `vp fmt` para formatear tu proyecto, y `vp check` para formatear, hacer lint y verificar tipos, todo a la vez.

## Uso

```bash
vp fmt
vp fmt --check
vp fmt . --write
```

## Configuración {#configuracion}

Coloca la configuración de formateo directamente en el bloque `fmt` en el `vite.config.ts` raíz para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `.oxfmtrc.json` con Vite+.

`vp fmt` encuentra su configuración desde el directorio de trabajo, por lo que los directorios de paquetes sin su propio bloque `fmt` usan la configuración raíz. Los argumentos de archivos relativos mantienen su significado. Usa [`fmt.overrides`](/guide/monorepo#overrides-de-formato) para opciones específicas de archivos o paquetes en lugar de agregar bloques `fmt` a las configuraciones de paquetes.

`vp check` utiliza el bloque `fmt` de la raíz del workspace cuando existe, incluso desde el directorio de un paquete. Las configuraciones de paquetes no pueden reemplazar esos ajustes de formato en `vp check`.

Un `vp fmt -c <ruta>` o `vp fmt --config <ruta>` explícito selecciona otra configuración. De lo contrario, Oxfmt detecta el archivo `vite.config.*` más cercano con un bloque `fmt`. Las extensiones soportadas son `.js`, `.mjs`, `.ts`, `.cjs`, `.mts` y `.cts`. Las configuraciones anidadas no anulan los ajustes para archivos individuales.

Para los editores, deshabilita las configuraciones de formateador anidadas para evitar anulaciones por archivo:

```json [.vscode/settings.json]
{
  "oxc.fmt.disableNestedConfig": true
}
```

Para ver el comportamiento del formateador original y la referencia de configuración, consulta la [documentación de Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html).

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
  },
});
```
