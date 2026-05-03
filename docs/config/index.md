# Configuración de Vite+

Vite+ mantiene la configuración del proyecto en un solo lugar: `vite.config.ts`, lo que te permite consolidar muchos archivos de configuración de nivel superior en un único archivo. Puedes seguir utilizando tu configuración habitual de Vite, como `server` o `build`, y añadir bloques de Vite+ para el resto de tu flujo de trabajo:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  server: {},
  build: {},
  preview: {},

  test: {},
  lint: {},
  fmt: {},
  run: {},
  pack: {},
  staged: {},
});
```

## Configuración Específica de Vite+

Vite+ amplía la configuración básica de Vite con estas adiciones:

- [`lint`](/config/lint) para Oxlint
- [`fmt`](/config/fmt) para Oxfmt
- [`test`](/config/test) para Vitest
- [`run`](/config/run) para Vite Task
- [`pack`](/config/pack) para tsdown
- [`staged`](/config/staged) para comprobaciones de archivos en estado "staged"
