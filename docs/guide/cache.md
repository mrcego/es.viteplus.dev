# Caché de Tareas

Vite Task puede rastrear automáticamente las dependencias y almacenar en caché las tareas ejecutadas a través de `vp run`.

## Vista General

Cuando una tarea se ejecuta con éxito (código de salida 0), se guarda su salida en la terminal (stdout/stderr) y todos los archivos escritos (archivos de salida). En la siguiente ejecución, Vite Task comprueba si algo ha cambiado:

1. **Argumentos:** ¿Han cambiado los [argumentos adicionales](/guide/run#argumentos-adicionales) pasados a la tarea?
2. **Variables de entorno:** ¿Ha cambiado alguna [variable de entorno registrada](/config/run#env)?
3. **Entradas:** ¿Ha cambiado algún archivo de entrada que el comando lee?

Cuando todas las comprobaciones coinciden, Vite Task reproduce la salida de terminal almacenada en caché, restaura los archivos de salida guardados y omite el comando.

Cuando ocurre un fallo de caché (cache miss), Vite Task te indica exactamente por qué:

```
$ vp lint ✗ cache miss: 'src/utils.ts' modified, executing
$ vp build ✗ cache miss: env 'VITE_GREETING' changed, executing
$ vp test ✗ cache miss: args changed, executing
```

## ¿Cuándo se habilita el caché?

Un comando ejecutado por `vp run` es una **tarea** definida en `vite.config.ts` o un **script** definido en `package.json`. Los nombres de tareas y los nombres de scripts no pueden solaparse. Por defecto, **las tareas se almacenan en caché y los scripts no.**

Hay tres tipos de controles para el caché de tareas, en orden:

### 1. `cache: false` por tarea

Una tarea puede establecer [`cache: false`](/config/run#cache) para desactivarlo. Esto no puede ser anulado por ningún otro parámetro de control de caché.

### 2. Parámetros de CLI

`--no-cache` desactiva el caché para cada tarea y script en esa ejecución. `--cache` habilita el caché tanto para tareas como para scripts, lo cual es equivalente a establecer [`run.cache: true`](/config/run#run-cache) para esa invocación.

### 3. Configuración del workspace

La opción [`run.cache`](/config/run#run-cache) en tu `vite.config.ts` de la raíz controla el valor predeterminado para cada categoría:

| Configuración    | Por defecto | Efecto                                          |
| ---------------- | ----------- | ----------------------------------------------- |
| `cache.tasks`    | `true`      | Cachear tareas definidas en `vite.config.ts`    |
| `cache.scripts`  | `false`     | Cachear scripts de `package.json`               |

## Rastreo Automático de Datos

Vite Task utiliza el [rastreo automático de datos](/guide/automatic-data-tracking) para aprender qué necesita cada tarea para el almacenamiento en caché, de modo que no tengas que configurarlo manualmente. El rastreo automático de datos tiene dos niveles:

- **Rastreo del sistema de archivos:** Vite Task registra las lecturas de archivos, las búsquedas de archivos faltantes, los listados de directorios y los archivos de salida escritos para cada tarea que tenga habilitado el almacenamiento en caché.
- **Rastreo cooperativo:** las herramientas que informan a la caché pueden reportar metadatos que el rastreo del sistema de archivos no puede inferir. Vite+ admite esto para `vp build` hoy en día.

Usa [`input`](/config/run#input) u [`output`](/config/run#output) cuando una tarea necesite reglas de rastreo manuales. `input` controla qué invalida la caché. `output` controla qué archivos restaura Vite Task en caso de acierto de caché (cache hit).

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'node build.mjs',
    input: [{ auto: true }, '!dist/**'],
    output: ['dist/**'],
  },
}
```

## Variables de Entorno

Por defecto, las tareas se ejecutan en un entorno limpio. Solo se pasan un pequeño conjunto de variables comunes, como `PATH`, `HOME` y `CI`. Otras variables de entorno no son visibles para la tarea ni se incluyen en la huella digital del caché.

Para añadir una variable de entorno a la clave del caché, añádela a [`env`](/config/run#env). Cambiar su valor invalidará entonces el caché:

```ts [vite.config.ts]
tasks: {
  build: {
    command: 'webpack --mode production',
    env: ['NODE_ENV'],
  },
}
```

Para pasar una variable a la tarea **sin** afectar al comportamiento del caché, usa [`untrackedEnv`](/config/run#untrackedenv). Esto es útil para variables como `CI` o `GITHUB_ACTIONS` que deben estar disponibles en la tarea, pero que generalmente no afectan al comportamiento del caché.

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
