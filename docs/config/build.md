# Configuración de Construcción (Build)

`vp dev`, `vp build` y `vp preview` utilizan la [configuración estándar de Vite](https://vite.dev/config/), incluyendo [plugins](https://vite.dev/guide/using-plugins), [alias](https://vite.dev/config/shared-options#resolve-alias), los campos [`server`](https://vite.dev/config/server-options), [`build`](https://vite.dev/config/build-options) y [`preview`](https://vite.dev/config/preview-options).

## Ejemplo

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
  preview: {
    port: 4173,
  },
});
```

