# Monorepos

Vite+ soporta monorepos con un archivo `vite.config.ts` en la raíz. Puedes definir los valores predeterminados para `lint`, `fmt`, etc., en la raíz y utilizar `overrides` para aplicar configuraciones específicas de lint y formato para cada paquete.

Debido a que `vite.config.ts` es simplemente JavaScript, puedes elegir poner toda tu configuración en este archivo o componerla utilizando importaciones regulares de JavaScript. Aún puedes tener archivos `vite.config.ts` separados en cada paquete para la configuración de Vite, Vitest, el framework o el runtime.

## Configuración de Raíz con Overrides
Utiliza `lint.overrides` para reglas de Oxlint que solo se apliquen a algunos paquetes:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    plugins: ['typescript'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    overrides: [
      {
        files: ['apps/web/**', 'packages/ui/**'],
        plugins: ['typescript', 'react'],
        rules: {
          'react/self-closing-comp': 'error',
        },
      },
      {
        files: ['apps/api/**'],
        env: {
          node: true,
        },
        rules: {
          'no-console': 'off',
        },
      },
      {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: ['typescript', 'vitest'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off',
          'vitest/no-disabled-tests': 'error',
        },
      },
    ],
  },
});
```

Los globs se resuelven desde el `vite.config.ts` de la raíz, así que utiliza rutas del workspace como `apps/web/**`, `apps/api/**` y `packages/ui/**`.

::: tip
Cuando una entrada de `lint.overrides` establece `plugins`, esa lista reemplaza la lista base de `lint.plugins` para los archivos que coincidan. Incluye cada plugin necesario para ese grupo de archivos, como `['typescript', 'react']`. Omite `plugins` solo cuando el override deba heredar la lista base sin cambios.
:::

## Overrides de Formato
Utiliza `fmt.overrides` para opciones de Oxfmt específicas de archivos o paquetes. Los overrides del formateador colocan sus ajustes bajo `options`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: true,
    overrides: [
      {
        files: ['apps/api/**'],
        options: {
          printWidth: 120,
        },
      },
      {
        files: ['**/*.md'],
        options: {
          proseWrap: 'always',
        },
      },
    ],
  },
});
```

## Composición de Archivos de Configuración
Puedes dividir la configuración a lo largo de tu repositorio y componerla utilizando importaciones de JavaScript. Exporta objetos JavaScript desde archivos o paquetes cercanos, impórtalos en la configuración raíz y mézclalos en el override correspondiente.

```ts [tooling/lint/react.ts]
import type { OxlintOverride } from 'vite-plus/lint';

export const reactLint = {
  plugins: ['typescript', 'react'],
  rules: {
    'react/self-closing-comp': 'error',
  },
} satisfies Omit<OxlintOverride, 'files'>;
```

```ts [tooling/lint/node.ts]
import type { OxlintOverride } from 'vite-plus/lint';

export const nodeLint = {
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
  },
} satisfies Omit<OxlintOverride, 'files'>;
```

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

import { nodeLint } from './tooling/lint/node';
import { reactLint } from './tooling/lint/react';

export default defineConfig({
  lint: {
    plugins: ['typescript'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ['apps/web/**', 'packages/ui/**'],
        ...reactLint,
      },
      {
        files: ['apps/api/**'],
        ...nodeLint,
      },
    ],
  },
});
```

Esto mantiene el comportamiento centralizado mientras permite que cada equipo o paquete sea dueño de las piezas de configuración que necesita.

## Comandos de Aplicación
El `vite.config.ts` raíz es más valioso para el linting compartido, el formateo, las comprobaciones de archivos preparados (staged) y las definiciones de tareas. Para el comportamiento de desarrollo, construcción y pruebas específico del proyecto, utiliza la configuración que mejor se adapte a cada aplicación:

- Pasa una carpeta a los comandos integrados de Vite cuando quieras dirigirte a una sola aplicación:

```bash
vp dev apps/web
vp build apps/web
```

- Mantén los scripts específicos del paquete en cada paquete cuando el comando difiera por aplicación:

```json [apps/api/package.json]
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json"
  }
}
```

- Ejecuta scripts a lo largo del workspace con `vp run`:

```bash
vp run -r build
vp run -r --parallel dev
vp run --filter ./apps/web build
```

Consulta la [guía de Ejecución (Run)](/guide/run) para tareas de workspace recursivas, paralelas, filtradas y con caché.
