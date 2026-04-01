# Configuración de Ejecución (Run)

Puedes configurar Vite Task bajo el campo `run` en `vite.config.ts`. Consulta [`vp run`](/guide/run) para aprender más sobre la ejecución de scripts y tareas con Vite+.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    enablePrePostScripts: true,
    cache: {
      /* ... */
    },
    tasks: {
      /* ... */
    },
  },
});
```

## `run.enablePrePostScripts`

- **Tipo:** `boolean`
- **Por defecto:** `true`

Indica si se deben ejecutar automáticamente los scripts `preX`/`postX` de `package.json` como hooks de ciclo de vida cuando se ejecuta el script `X`.

Cuando está habilitado (por defecto), ejecutar un script como `test` ejecutará automáticamente `pretest` antes y `posttest` después, si existen en el `package.json`.

```ts
export default defineConfig({
  run: {
    enablePrePostScripts: false, // Desactivar hooks de ciclo de vida pre/post
  },
});
```

::: warning ADVERTENCIA
Esta opción solo se puede establecer en el `vite.config.ts` de la raíz del workspace. Establecerla en la configuración de un paquete individual resultará en un error.
:::

## `run.cache`

- **Tipo:** `boolean | { scripts?: boolean, tasks?: boolean }`
- **Por defecto:** `{ scripts: false, tasks: true }`

Controla si los resultados de las tareas se almacenan en caché y se reproducen en ejecuciones posteriores.

```ts
export default defineConfig({
  run: {
    cache: {
      scripts: true, // Cachear scripts de package.json (por defecto: false)
      tasks: true, // Cachear definiciones de tareas (por defecto: true)
    },
  },
});
```

`cache: true` habilita tanto el caché de tareas como el de scripts, `cache: false` desactiva ambos.

## `run.tasks`

- **Tipo:** `Record<string, TaskConfig>`

Define las tareas que se pueden ejecutar con `vp run <tarea>`.

### `command`

- **Tipo:** `string`

Define el comando de terminal que se ejecutará para la tarea.

```ts
tasks: {
  build: {
    command: 'vp build',
  },
}
```

Cada tarea definida en `vite.config.ts` debe incluir su propio `command`. No puedes definir una tarea con el mismo nombre tanto en `vite.config.ts` como en `package.json`.

Los comandos unidos con `&&` se dividen automáticamente en subtareas almacenadas en caché de forma independiente. Consulta [Comandos Compuestos](/guide/run#comandos-compuestos).

### `dependsOn`

- **Tipo:** `string[]`
- **Por defecto:** `[]`

Tareas que deben completarse con éxito antes de que comience esta.

```ts
tasks: {
  deploy: {
    command: 'deploy-script --prod',
    dependsOn: ['build', 'test'],
  },
}
```

Las dependencias pueden hacer referencia a tareas en otros paquetes utilizando el formato `paquete#tarea`:

```ts
dependsOn: ['@my/core#build', '@my/utils#lint'];
```

Consulta [Dependencias de Tareas](/guide/run#dependencias-de-tareas) para obtener detalles sobre cómo interactúan las dependencias explícitas y topológicas.

### `cache`

- **Tipo:** `boolean`
- **Por defecto:** `true`

Indica si se debe almacenar en caché la salida de esta tarea. Establécelo en `false` para tareas que nunca deberían almacenarse en caché, como los servidores de desarrollo:

```ts
tasks: {
  dev: {
    command: 'vp dev',
    cache: false,
  },
}
```

### `env`

- **Tipo:** `string[]`
- **Por defecto:** `[]`

Variables de entorno incluidas en la huella digital (fingerprint) del caché. Cuando el valor de cualquier variable listada cambia, el caché se invalida.

```ts
tasks: {
  build: {
    command: 'vp build',
    env: ['NODE_ENV'],
  },
}
```

Se admiten patrones de comodines: `VITE_*` coincide con todas las variables que comienzan con `VITE_`.

```bash
$ NODE_ENV=development vp run build    # primera ejecución
$ NODE_ENV=production vp run build     # fallo de caché: la variable cambió
```

### `untrackedEnv`

- **Tipo:** `string[]`
- **Por defecto:** ver abajo

Variables de entorno que se pasan al proceso de la tarea pero que **no** se incluyen en la huella digital del caché. Cambiar estos valores no invalidará el caché.

```ts
tasks: {
  build: {
    command: 'vp build',
    untrackedEnv: ['CI', 'GITHUB_ACTIONS'],
  },
}
```

Un conjunto de variables de entorno comunes se pasan automáticamente a todas las tareas:

- **Sistema:** `HOME`, `USER`, `PATH`, `SHELL`, `LANG`, `TZ`
- **Node.js:** `NODE_OPTIONS`, `COREPACK_HOME`, `PNPM_HOME`
- **CI/CD:** `CI`, `VERCEL_*`, `NEXT_*`
- **Terminal:** `TERM`, `COLORTERM`, `FORCE_COLOR`, `NO_COLOR`

### `input`

- **Tipo:** `Array<string | { auto: boolean } | { pattern: string, base: "workspace" | "package" }>`
- **Por defecto:** `[{ auto: true }]` (inferido automáticamente)

Vite Task detecta automáticamente qué archivos utiliza un comando (consulta [Rastreo Automático de Archivos](/guide/cache#rastreo-automático-de-archivos)). La opción `input` se puede usar para incluir o excluir explícitamente ciertos archivos.

**Excluir archivos** del rastreo automático:

```ts
tasks: {
  build: {
    command: 'vp build',
    // Usa `{ auto: true }` para usar la huella digital automática (por defecto).
    input: [{ auto: true }, '!**/*.tsbuildinfo', '!dist/**'],
  },
}
```

**Especificar archivos explícitos** únicamente, sin rastreo automático:

```ts
tasks: {
  build: {
    command: 'vp build',
    input: ['src/**/*.ts', 'vite.config.ts'],
  },
}
```

**Resolver patrones relativos a la raíz del workspace** usando la forma de objeto:

```ts
tasks: {
  build: {
    command: 'vp build',
    input: [
      { auto: true },
      { pattern: 'shared-config/**', base: 'workspace' },
    ],
  },
}
```

El campo `base` es obligatorio y controla cómo se resuelve el patrón glob:
- `"package"`: relativo al directorio del paquete
- `"workspace"`: relativo a la raíz del workspace

**Desactivar el rastreo de archivos** por completo y cachear solo por cambios en el comando o el entorno:

```ts
tasks: {
  greet: {
    command: 'node greet.mjs',
    input: [],
  },
}
```

::: tip CONSEJO
Por defecto, los patrones glob de cadenas se resuelven de forma relativa al directorio del paquete. Usa la forma de objeto con `base: "workspace"` para resolverlos de forma relativa a la raíz del workspace.
:::

### `cwd`

- **Tipo:** `string`
- **Por defecto:** raíz del paquete

Directorio de trabajo para la tarea, relativo a la raíz del paquete.

```ts
tasks: {
  'test-e2e': {
    command: 'vp test',
    cwd: 'tests/e2e',
  },
}
```

