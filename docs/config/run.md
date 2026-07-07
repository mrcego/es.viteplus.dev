# Configuración de Ejecución (Run)

Puedes configurar Vite Task bajo el campo `run` en `vite.config.ts`. Consulta [`vp run`](/guide/run) para aprender más sobre la ejecución de scripts y tareas con Vite+.

```ts [vite.config.ts]
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

```ts [vite.config.ts]
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

```ts [vite.config.ts]
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

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'vp build',
  },
}
```

Cada tarea definida en `vite.config.ts` debe incluir su propio `command`. No puedes definir una tarea con el mismo nombre tanto en `vite.config.ts` como en `package.json`.

Los comandos unidos con `&&` se dividen automáticamente en subtareas almacenadas en caché de forma independiente. Consulta [Comandos Compuestos](/guide/run#comandos-compuestos).

### `dependsOn`

- **Tipo:** `Array<string | { task: string, from: DependsOnFrom }>`
- **Por defecto:** `[]`

`from` acepta los tipos de dependencia `"dependencies"`, `"devDependencies"`, `"peerDependencies"`, o un array de esos valores, como `["dependencies", "devDependencies"]`.

Tareas que deben completarse con éxito antes de que comience esta.

```ts [vite.config.ts]
tasks: {
  deploy: {
    command: 'deploy-script --prod',
    dependsOn: ['build', 'test'],
  },
}
```

Las dependencias pueden hacer referencia a tareas en otros paquetes utilizando el formato `paquete#tarea`:

```ts [vite.config.ts]
dependsOn: ['@my/core#build', '@my/utils#lint'];
```

Usa la forma de objeto `{ task: string, from: DependsOnFrom }` para hacer referencia a las tareas de todas las dependencias:

```ts [vite.config.ts]
tasks: {
  test: {
    command: 'vp test',
    dependsOn: [{ task: 'build', from: ['dependencies', 'devDependencies'] }],
  },
}
```

Para el ejemplo anterior, Vite Task lee las `dependencies` y `devDependencies` directas del paquete declarante y ejecuta la tarea `build` en cada dependencia que la defina. Los paquetes sin `build` se omiten.

Consulta [Dependencias de Tareas](/guide/run#dependencias-de-tareas) para obtener detalles sobre cómo interactúan las dependencias explícitamente y las topológicas.

### `cache`

- **Tipo:** `boolean`
- **Por defecto:** `true`

Indica si se debe almacenar en caché la salida de esta tarea. Establécelo en `false` para tareas que nunca deberían almacenarse en caché, como los servidores de desarrollo:

```ts [vite.config.ts]
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

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',
    env: ['NODE_ENV'],
  },
}
```

Se admiten patrones de comodines y patrones de exclusión `!`: `VITE_*` coincide con todas las variables que comienzan con `VITE_`, y `!VITE_SECRET` excluye la variable `VITE_SECRET` de la coincidencia.

Para `vp build`, Vite informa automáticamente las variables de entorno de Vite a través del [rastreo automático](/guide/automatic-data-tracking#rastreo-cooperativo). No agregues `VITE_*` o `NODE_ENV` aquí para una compilación de Vite estándar a menos que tu proyecto tenga un comportamiento de compilación adicional que Vite no pueda informar.

```bash
$ NODE_ENV=development vp run build    # primera ejecución
$ NODE_ENV=production vp run build     # fallo de caché: env 'NODE_ENV' cambió
```

### `untrackedEnv`

- **Tipo:** `string[]`
- **Por defecto:** ver abajo

Variables de entorno que se pasan al proceso de la tarea pero que **no** se incluyen en la huella digital del caché. Cambiar estos valores no invalidará el caché.

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',
    untrackedEnv: ['CI', 'GITHUB_ACTIONS'],
  },
}
```

`untrackedEnv` acepta los mismos patrones de comodines y de exclusión `!` que [`env`](#env).

No coloques una variable en `untrackedEnv` si su valor cambia el resultado de la tarea. Si una herramienta que informa a la caché cubre la variable a través del [rastreo automático](/guide/automatic-data-tracking#rastreo-cooperativo), déjala fuera tanto de `env` como de `untrackedEnv`.

Vite Task pasa un conjunto de variables de entorno comunes a todas las tareas:

- **Sistema:** `HOME`, `USER`, `PATH`, `SHELL`, `LANG`, `TZ`
- **Node.js:** `NODE_OPTIONS`, `COREPACK_HOME`, `PNPM_HOME`
- **CI/CD:** `CI`, `VERCEL_*`, `NEXT_*`
- **Terminal:** Las variables de color (`FORCE_COLOR`, `NO_COLOR`, `COLORTERM`, `TERM`, `TERM_PROGRAM`) no se pasan a las tareas a menos que las incluyas en `env` (el valor se incluye en la huella digital, por lo que cambiarlo invalida el caché) o en `untrackedEnv` (se pasan sin incluirse en la huella digital). Si `FORCE_COLOR` no está en ninguna de las listas, el proceso hijo recibe `FORCE_COLOR=1` para que los registros almacenados en caché mantengan el color. Los colores se eliminan al mostrarse cuando la terminal no puede renderizarlos.

### `input`

- **Tipo:** `Array<string | { auto: boolean } | { pattern: string, base: "workspace" | "package" }>`
- **Por defecto:** `[{ auto: true }]` (inferido automáticamente)

Vite Task detecta automáticamente qué archivos utiliza un comando. Consulta [Rastreo Automático de Datos](/guide/automatic-data-tracking) para obtener detalles y saber cuándo agregar configuración manual.

**Excluir archivos** del rastreo automático:

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'vp build',
    // Usa `{ auto: true }` para usar la huella digital automática (por defecto).
    input: [{ auto: true }, '!**/*.tsbuildinfo', '!dist/**'],
  },
}
```

**Especificar archivos explícitos** únicamente, sin rastreo automático:

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'vp build',
    input: ['src/**/*.ts', 'vite.config.ts'],
  },
}
```

**Resolver patrones relativos a la raíz del workspace** usando la forma de objeto:

```ts [vite.config.ts]
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

```ts [vite.config.ts]
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

### `output`

- **Tipo:** `Array<string | { auto: boolean } | { pattern: string, base: "workspace" | "package" }>`
- **Por defecto:** rastreo automático de escritura

Vite Task archiva automáticamente los archivos generados por la ejecución exitosa de una tarea y los restaura cuando hay un acierto en la caché.

Si omites `output`, Vite Task utiliza el rastreo automático de escritura para elegir esos archivos. Agrega entradas explícitas en `output` cuando necesites sobrescribir qué archivos se restauran.

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',
    output: ['dist/**', '!dist/cache/**'],
  },
}
```

Usa `{ auto: true }` para mantener el rastreo automático de escritura mientras agregas globs de salida explícitos.

Esto es útil cuando una tarea escribe archivos que no deben restaurarse desde la caché. Por ejemplo, excluye los archivos `.tsbuildinfo` de TypeScript:

```ts [vite.config.ts]
tasks: {
  typecheck: {
    command: 'tsc --build',
    output: [{ auto: true }, '!*.tsbuildinfo'],
  },
}
```

Si una tarea escribe fuera de su propio paquete, utiliza la forma de objeto con `base: "workspace"`:

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',
    output: [
      'dist/**',
      { pattern: 'shared-artifacts/**', base: 'workspace' },
    ],
  },
}
```

Establece `output: []` para deshabilitar la restauración de salida para una tarea almacenada en caché:

```ts [vite.config.ts]
tasks: {
  report: {
    command: 'node scripts/report.mjs',
    output: [],
  },
}
```

A diferencia de `cache: false`, `output: []` todavía permite que Vite Task registre la huella digital de la tarea. En un acierto de caché, Vite Task omite el comando y reproduce su salida de terminal. Usa esto para cachés locales cuando los archivos de salida de la tarea ya están allí y no necesitan ser restaurados.

### `cwd`

- **Tipo:** `string`
- **Por defecto:** raíz del paquete

Directorio de trabajo para la tarea, relativo a la raíz del paquete.

```ts [vite.config.ts]
tasks: {
  'test-e2e': {
    command: 'vp test',
    cwd: 'tests/e2e',
  },
}
```

