# Caché de Tareas

Vite Task puede rastrear automáticamente las dependencias y almacenar en caché las tareas ejecutadas a través de `vp run`.

## Vista General

Cuando una tarea se ejecuta con éxito (código de salida 0), se guarda su salida en la terminal (stdout/stderr). En la siguiente ejecución, Vite Task comprueba si algo ha cambiado:

1. **Argumentos:** ¿Han cambiado los [argumentos adicionales](/guide/run#argumentos-adicionales) pasados a la tarea?
2. **Variables de entorno:** ¿Ha cambiado alguna [variable de entorno registrada](/config/run#env)?
3. **Archivos de entrada:** ¿Ha cambiado algún archivo que el comando lee?

Si todo coincide, la salida en caché se reproduce instantáneamente y el comando no se ejecuta.

::: info
Actualmente, solo se almacena en caché y se reproduce la salida de la terminal. Los archivos de salida como `dist/` no se almacenan en caché. Si los eliminas, usa `--no-cache` para forzar una nueva ejecución. El almacenamiento en caché de archivos de salida está planeado para una versión futura.
:::

Cuando ocurre un fallo de caché (cache miss), Vite Task te indica exactamente por qué:

```
$ vp lint ✗ cache miss: 'src/utils.ts' modified, executing
$ vp build ✗ cache miss: env changed, executing
$ vp test ✗ cache miss: args changed, executing
```

## ¿Cuándo se habilita el caché?

Un comando ejecutado por `vp run` es una **tarea** definida en `vite.config.ts` o un **script** definido en `package.json`. Los nombres de tareas y los nombres de scripts no pueden solaparse. Por defecto, **las tareas se almacenan en caché y los scripts no.**

Hay tres tipos de controles para el caché de tareas, en orden:

### 1. `cache: false` por tarea

Una tarea puede establecer [`cache: false`](/config/run#cache) para desactivarlo. Esto no puede ser anulado por ningún otro parámetro de control de caché.

### 2. Parámetros de CLI

`--no-cache` desactiva el caché para todo. `--cache` habilita el caché tanto para tareas como para scripts, lo cual es equivalente a establecer [`run.cache: true`](/run-config#cache) para esa invocación.

### 3. Configuración del workspace

La opción [`run.cache`](/config/run#run-cache) en tu `vite.config.ts` de la raíz controla el valor predeterminado para cada categoría:

| Configuración    | Por defecto | Efecto                                          |
| ---------------- | ----------- | ----------------------------------------------- |
| `cache.tasks`    | `true`      | Cachear tareas definidas en `vite.config.ts`    |
| `cache.scripts`  | `false`     | Cachear scripts de `package.json`               |

## Rastreo Automático de Archivos

Vite Task rastrea qué archivos lee cada comando durante la ejecución. Cuando una tarea se ejecuta, registra qué archivos abre el proceso, como tus archivos fuente `.ts`, `vite.config.ts` y `package.json`, y registra los hashes de su contenido. En la siguiente ejecución, vuelve a comprobar esos hashes para determinar si algo ha cambiado.

Esto significa que el caché funciona de inmediato para la mayoría de los comandos sin ninguna configuración. Vite Task también registra:

- **Archivos faltantes:** si un comando busca un archivo que no existe, como `utils.ts` durante la resolución de módulos, crear ese archivo más tarde invalida correctamente el caché.
- **Listados de directorios:** si un comando escanea un directorio, como un ejecutor de pruebas buscando `*.test.ts`, añadir o quitar archivos en ese directorio invalida el caché.

### Evitar un Rastreo de Entrada Demasiado Amplio

El rastreo automático a veces puede incluir más archivos de los necesarios, causando fallos de caché innecesarios:

- **Archivos de caché de herramientas:** algunas herramientas mantienen su propio caché, como `.tsbuildinfo` de TypeScript o `target/` de Cargo. Estos archivos pueden cambiar entre ejecuciones incluso cuando tu código fuente no lo ha hecho, causando una invalidación innecesaria del caché.
- **Listados de directorios:** cuando un comando escanea un directorio, como cuando busca patrones glob para `**/*.js`, Vite Task ve la lectura del directorio pero no el patrón glob. Cualquier archivo añadido o eliminado en ese directorio, incluso los no relacionados, invalida el caché.

Usa la opción [`input`](/config/run#input) para excluir archivos o para reemplazar el rastreo automático por patrones de archivos explícitos:

```ts
tasks: {
  build: {
    command: 'tsc',
    input: [{ auto: true }, '!**/*.tsbuildinfo'],
  },
}
```

## Variables de Entorno

Por defecto, las tareas se ejecutan en un entorno limpio. Solo se pasan un pequeño conjunto de variables comunes, como `PATH`, `HOME` y `CI`. Otras variables de entorno no son visibles para la tarea ni se incluyen en la huella digital del caché.

Para añadir una variable de entorno a la clave del caché, añádela a [`env`](/config/run#env). Cambiar su valor invalidará entonces el caché:

```ts
tasks: {
  build: {
    command: 'webpack --mode production',
    env: ['NODE_ENV'],
  },
}
```

Para pasar una variable a la tarea **sin** afectar al comportamiento del caché, usa [`untrackedEnv`](/config/run#untracked-env). Esto es útil para variables como `CI` o `GITHUB_ACTIONS` que deben estar disponibles en la tarea, pero que generalmente no afectan al comportamiento del caché.

Consulta [Configuración de Ejecución](/config/run#env) para obtener detalles sobre patrones de comodines y la lista completa de variables que se pasan automáticamente.

## Compartir Caché

El caché de Vite Task se basa en el contenido. Si dos tareas ejecutan el mismo comando con las mismas entradas, comparten la entrada del caché. Esto sucede de forma natural cuando múltiples tareas incluyen un paso común, ya sea como tareas independientes o como parte de [comandos compuestos](/guide/run#comandos-compuestos):

```json [package.json]
{
  "scripts": {
    "check": "vp lint && vp build",
    "release": "vp lint && deploy-script"
  }
}
```

Con el caché habilitado, por ejemplo a través de `--cache` o [`run.cache.scripts: true`](/config/run#run-cache), ejecutar `check` primero significa que el paso `vp lint` en `release` será un acierto de caché instantáneo, ya que ambos ejecutan el mismo comando contra los mismos archivos.

## Comandos de Caché

Usa `vp cache clean` cuando necesites borrar los resultados de las tareas almacenadas en caché:

```bash
vp cache clean
```

El caché de tareas se almacena en `node_modules/.vite/task-cache` en la raíz del proyecto. `vp cache clean` elimina ese directorio de caché.
