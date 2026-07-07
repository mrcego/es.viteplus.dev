# Rastreo Automático de Datos

El rastreo automático de datos es el mecanismo por el cual Vite Task aprende qué entradas necesita una tarea para almacenar en caché las salidas sin necesidad de una configuración explícita.

Cuando ejecutas una tarea que tiene habilitada la caché, Vite Task observa la ejecución de la tarea y registra qué archivos se leyeron y escribieron, así como cualquier metadato informado por la tarea. En la siguiente ejecución, Vite Task utiliza la huella digital registrada para decidir si reproduce la caché o ejecuta la tarea.

Usa esta página cuando necesites entender por qué una tarea acierta o falla en la caché, o cuando necesites decidir si agregar configuración de `input`, `output`, `env` o `untrackedEnv`.

## Niveles de Rastreo

El rastreo automático de datos tiene dos niveles:

| Nivel | Se aplica a | Registra |
| --- | --- | --- |
| Rastreo del sistema de archivos | Todas las tareas con caché habilitada | <ul><li>Archivos leídos por el comando</li><li>Búsquedas de archivos faltantes</li><li>Listados de directorios</li><li>Archivos de salida escritos</li></ul> |
| Rastreo cooperativo | Herramientas que informan a la caché (`vp build` hoy en día) | <ul><li>Variables de entorno informadas por la herramienta</li><li>Rutas gestionadas por la herramienta que no deben ser entradas o salidas, como `node_modules/.vite-temp`</li></ul> |

Vite Task comienza con el rastreo del sistema de archivos para cualquier comando. Una herramienta que informe a la caché puede agregar información que solo ella conoce mientras se ejecuta.

## Rastreo del Sistema de Archivos

El rastreo del sistema de archivos se aplica a cada tarea que tiene habilitada la caché. Si omites [`input`](/config/run#input), Vite Task rastrea los archivos que lee un comando mientras se ejecuta:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: 'tsc',
      },
    },
  },
});
```

Para esta tarea, Vite Task registra los archivos fuente, archivos de configuración, archivos faltantes que el comando verificó y directorios que el comando escaneó. Las ejecuciones posteriores vuelven a ejecutar la tarea cuando cambia una de esas entradas rastreadas.

El rastreo del sistema de archivos también rastrea las salidas. Si omites [`output`](/config/run#output), Vite Task archiva los archivos que el comando escribe después de una ejecución exitosa y los restaura en un acierto de caché.

### Limitaciones

Vite Task no puede rastrear las lecturas de variables de entorno, y no siempre puede distinguir qué rutas rastreadas son entradas estables, salidas generadas o rutas de caché gestionadas por la herramienta que no deberían convertirse en entradas o salidas.

Usa [Sobrescribir Entradas y Salidas](#sobrescribir-entradas-y-salidas) cuando el rastreo del sistema de archivos incluya archivos que no deberían afectar a la caché, pase por alto archivos que sí deberían hacerlo, o restaure las salidas incorrectas.

Usa [`env`](/config/run#env) cuando un comando necesite una variable de entorno y su valor deba afectar a la caché, o [`untrackedEnv`](/config/run#untrackedenv) cuando el valor no deba afectar a la caché.

Estas limitaciones no se aplican a `vp build`: Vite informa automáticamente los metadatos de [Rastreo Cooperativo](#rastreo-cooperativo), incluyendo `VITE_*`, `NODE_ENV` y rutas de caché gestionadas por Vite que no deberían convertirse en entradas o salidas. Una tarea `vp build` estándar no necesita configuración manual de `input`, `output` o `env`.

### Sobrescribir Entradas y Salidas

[`input`](/config/run#input) controla qué invalida la caché. [`output`](/config/run#output) controla qué archivos restaura Vite Task en caso de un acierto de caché.

Ambas opciones utilizan la misma sintaxis y se pueden configurar por separado.

- Omite la opción para mantener el rastreo automático.
- Agrega `{ auto: true }` para mantener el rastreo automático mientras agregas reglas glob.
- Usa globs de cadena (strings) para incluir rutas.
- Usa globs `!` para excluir rutas.
- Usa `[]` para reemplazar el rastreo automático con una lista vacía.

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',

    // Mantiene el rastreo automático de entradas, pero excluye `dist` de las entradas.
    input: [{ auto: true }, '!dist/**'],

    // Deshabilita el rastreo automático de salidas y restaura solo `dist/**` en un acierto de caché.
    output: ['dist/**'],
  },
}
```

Usa globs explícitos de `input` solo cuando conozcas el conjunto completo de entradas del comando. Esta tarea de lint sobrescribe solo las entradas, por lo que el rastreo de salida sigue siendo automático:

```ts [vite.config.ts]
tasks: {
  lint: {
    command: 'vp lint',
    // Deshabilita el rastreo automático de entradas y registra solo estos archivos.
    input: ['src/**', 'vite.config.ts'],
  },
}
```

Establece `input: []` when no files should affect the cache fingerprint. Esto es rara vez útil. Por ejemplo, una tarea de descarga se puede almacenar en caché cuando la misma URL siempre sirve el mismo archivo. Ningún archivo de entrada debe registrarse para esta tarea, pero cambiar la URL sigue invalidando la caché:

```ts [vite.config.ts]
tasks: {
  downloadSchema: {
    command: 'curl -O https://example.com/schema.json',
    input: [],
  },
}
```

Establece `output: []` cuando no se deba restaurar ningún archivo en un acierto de caché.

## Rastreo Cooperativo

El rastreo del sistema de archivos registra el acceso. No puede saber por qué una herramienta utilizó cada ruta.

`vp build` sabe más sobre una compilación de Vite de lo que Vite Task puede inferir a partir del acceso a archivos. Cuando `vp build` se ejecuta con la caché habilitada, Vite informa esos metadatos a Vite Task. Vite Task combina el informe con el rastreo del sistema de archivos para construir una huella digital de caché más precisa.

Para una compilación de Vite estándar, no necesitas agregar estas entradas tú mismo porque Vite las informa automáticamente en tiempo de ejecución:

- `env: ['VITE_*']` o `env: ['NODE_ENV']`
- `output: ['dist/**']`
- exclusiones de entrada o salida para rutas temporales como `node_modules/.vite-temp`

Solo necesitas definir la tarea con `vp build`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      frontendBuild: 'vp build',
    },
  },
});
```

Ejecuta esta tarea con `vpr frontendBuild` o `vp run frontendBuild`.

La configuración manual sobrescribe los metadatos informados. Agrega `input`, `output`, `env` o `untrackedEnv` cuando tu proyecto tenga un comportamiento que Vite no pueda informar.

Vite+ admite el rastreo cooperativo para `vp build` hoy en día. Ampliará este soporte a más herramientas propias en el futuro. Las herramientas de terceros pueden informar metadatos de caché con [`@voidzero-dev/vite-task-client`](https://npmx.dev/package/@voidzero-dev/vite-task-client).

## Cuándo Agregar Configuración Manual

Agrega configuración cuando tu proyecto tenga un comportamiento que el comando o la herramienta no puedan conocer.

| Caso | Ejemplo |
| --- | --- |
| Excluir un directorio de salida de las entradas | `input: [{ auto: true }, '!dist/**']` |
| Excluir un archivo temporal generado del rastreo de entrada y salida | `input: [{ auto: true }, '!.tmp/config.mjs']`<br>`output: [{ auto: true }, '!.tmp/config.mjs']` |
| Evitar el rastreo automático de archivos para una tarea | `input: ['src/**']`<br>`output: ['dist/**']` |
| Rastrear y pasar una variable de entorno | `env: ['NODE_ENV']` |
| Pasar una variable de entorno sin registrarla en la huella digital | `untrackedEnv: ['GITHUB_ACTIONS']` |
