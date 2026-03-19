# Check

`vp check` ejecuta el formateo, lint y verificaciones de tipos en conjunto.

## Vista General

`vp check` es el comando predeterminado para verificaciones estáticas rápidas en Vite+. Reúne el formateo a través de [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), el linting a través de [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) y las verificaciones de tipos de TypeScript a través de [tsgolint](https://github.com/oxc-project/tsgolint). Al fusionar todas estas tareas en un único comando, `vp check` es más rápido que ejecutar el formateo, linting y verificación de tipos como herramientas separadas en comandos distintos.

Cuando `typeCheck` está habilitado en el bloque `lint.options` en `vite.config.ts`, `vp check` también ejecuta verificaciones de tipos de TypeScript a través de la ruta consciente del tipo (type-aware) de Oxlint impulsada por el toolchain de TypeScript en Go y [tsgolint](https://github.com/oxc-project/tsgolint). `vp create` y `vp migrate` habilitan tanto `typeAware` como `typeCheck` por defecto.

Recomendamos activar `typeCheck` para que `vp check` se convierta en el comando único para las verificaciones estáticas durante el desarrollo.

## Uso

```bash
vp check
vp check --fix # Formatear y ejecutar autocorrectores.
```

## Configuración

`vp check` utiliza la misma configuración que ya defines para el linting y formateo:

- Bloque [`lint`](/guide/lint#configuración) en `vite.config.ts`
- Bloque [`fmt`](/guide/fmt#configuración) en `vite.config.ts`
- Estructura del proyecto TypeScript y archivos tsconfig para linting consciente del tipo

Configuración base de `lint` recomendada:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
```

