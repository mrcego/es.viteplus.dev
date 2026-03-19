# Formatear

`vp fmt` formatea el código con Oxfmt.

## Vista General

`vp fmt` está basado en [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), el formateador de Oxc. Oxfmt tiene compatibilidad total con Prettier y está diseñado como un reemplazo rápido y directo para Prettier.

Usa `vp fmt` para formatear tu proyecto, y `vp check` para formatear, hacer lint y verificar tipos, todo a la vez.

## Uso

```bash
vp fmt
vp fmt --check
vp fmt . --write
```

## Configuración

Coloca la configuración de formateo directamente en el bloque `fmt` en `vite.config.ts` para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `.oxfmtrc.json` con Vite+.

Para los editores, apunta la ruta de configuración del formateador a `./vite.config.ts` para que la función de "formatear al guardar" use el mismo bloque `fmt`:

```json
{
  "oxc.fmt.configPath": "./vite.config.ts"
}
```

Para ver el comportamiento del formateador original y la referencia de configuración, consulta la [documentación de Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html).

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
  },
});
```

