# Caché de GitHub Actions

::: warning Experimental
Reutilizar la caché de Vite Task en diferentes ejecuciones de GitHub Actions es experimental. Pruébalo y mídelo en tu proyecto antes de confiar en ello en CI.
:::

Vite Task almacena los resultados de las tareas en `node_modules/.vite/task-cache` en la raíz del workspace. Restaura ese directorio en las ejecuciones posteriores de GitHub Actions para que Vite Task pueda reutilizar los resultados de tareas anteriores.

GitHub Actions y Vite Task toman decisiones por separado:

1. `actions/cache` restaura y guarda el directorio de caché basándose en la clave (key) en tu workflow.
2. Vite Task utiliza el directorio de caché restaurado y reproduce solo las tareas cuyas huellas digitales (fingerprints) aún coinciden.

## Antes de Comenzar

Usa este flujo de trabajo cuando se cumpla todo lo siguiente:

- El comando se ejecuta a través de [`vp run`](/guide/run).
- Una segunda ejecución inmediata informa un acierto de caché (cache hit) para la tarea.
- La tarea tiene un rastreo de entrada y salida estable para CI.
- El workflow instala las dependencias antes de restaurar `node_modules/.vite/task-cache`.

Si la segunda ejecución inmediata falla, corrige la configuración de rastreo de la tarea antes de agregar la caché de GitHub Actions. Consulta [Cuándo Agregar Configuración Manual](/guide/automatic-data-tracking#cuando-agregar-configuracion-manual) para conocer las causas comunes de un almacenamiento en caché inestable y sus soluciones.

## Medir Antes de Almacenar en Caché entre Ejecuciones

Es posible que no necesites restaurar la caché de Vite Task entre ejecuciones de GitHub Actions cuando:

- La tarea ya es lo suficientemente rápida. Los pasos de restauración y guardado añaden sobrecoste (overhead), por lo que las tareas cortas pueden terminar más rápido sin este flujo de trabajo.
- La transferencia de la caché tarda más que volver a ejecutar la tarea. Vite Task todavía puede ahorrar tiempo dentro de una sola ejecución de workflow cuando la misma tarea se ejecuta más de una vez, pero entre ejecuciones el tiempo de transferencia es parte del costo.

Mide antes de agregar una caché de GitHub Actions para Vite Task. Compara la duración del workflow con y sin los pasos de restauración y guardado. Comprueba tanto el tiempo del paso de caché de GitHub como el tiempo de `vp run`.

## 1. Definir Tareas de CI que se Puedan Almacenar en Caché

Solo los comandos ejecutados a través de `vp run` utilizan el almacenamiento en caché de Vite Task. Un comando directo como `vp build` no utiliza la caché de tareas. Define una tarea en `vite.config.ts` para cada comando que desees almacenar en caché en CI:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: 'vp build',
      lint: 'vp lint',
    },
  },
});
```

Esta guía asume que cada tarea ya tiene un acierto de caché (cache hit) localmente. Si una tarea falla, corrige su configuración de rastreo en `vite.config.ts` antes de agregar los pasos de caché de GitHub Actions. Consulta [Rastreo Automático de Datos](/guide/automatic-data-tracking) y [`run.tasks`](/config/run#tasks).

Ejecuta cada tarea dos veces:

```bash
vp run build
vp run build # debería imprimir "cache hit"
vp run lint
vp run lint # debería imprimir "cache hit"
```

## 2. Restaurar la Caché Después de Instalar

Restaura `node_modules/.vite/task-cache` después de `vp install`, porque la instalación de paquetes puede recrear o modificar `node_modules`.

```yaml [.github/workflows/ci.yml]
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: voidzero-dev/setup-vp@v1
        with:
          node-version: '24'
          cache: true

      - run: vp install

      - name: Restaurar caché de Vite Task
        id: vite-task-cache
        uses: actions/cache/restore@v6
        with:
          path: node_modules/.vite/task-cache
          key: vite-task-${{ runner.os }}-${{ runner.arch }}-${{ github.run_id }}-${{ github.run_attempt }}
          restore-keys: |
            vite-task-${{ runner.os }}-${{ runner.arch }}-

      - run: vp run lint
      - run: vp run build

      - name: Guardar caché de Vite Task
        if: success()
        uses: actions/cache/save@v6
        with:
          path: node_modules/.vite/task-cache
          key: ${{ steps.vite-task-cache.outputs.cache-primary-key }}
```

La clave primaria incluye `github.run_id` y `github.run_attempt` para que cada ejecución exitosa pueda guardar una nueva entrada de caché inmutable. El prefijo de restauración permite a GitHub restaurar la caché más reciente para el mismo sistema operativo y arquitectura.

Deja las entradas de la tarea, incluidos los archivos fuente y lockfiles, fuera de la clave de GitHub Actions. Vite Task las registra en su huella digital. Si cambian la clave de Actions, GitHub podría omitir restauraciones útiles antes de que Vite Task decida qué tareas aún tienen un acierto de caché.

Para monorepos, restaura la caché de tareas desde la raíz del workspace. Luego ejecuta los mismos comandos `vp run` que usas localmente, como `vp run -t @my/app#build`. Vite Task puede reutilizar los resultados para el paquete solicitado y los paquetes de los que depende.

## 3. Verificar en los Logs

En la primera ejecución, el paso de restauración debería indicar que no se encontró caché, y el paso de guardado debería crear una. Las solicitudes de extracción (pull requests) de bifurcaciones (forks) pueden ser de solo restauración porque GitHub puede otorgar acceso de solo lectura al token de caché. En ese caso, el paso de guardado advierte y finaliza con éxito sin escribir una entrada de caché.

En una ejecución posterior, busca ambas capas:

```text
Cache restored from key: vite-task-Linux-X64-...
$ vp build ◉ cache hit, replaying
vp run: cache hit, 1.10s saved.
```

Si GitHub restaura una caché pero Vite Task muestra un fallo de caché (cache miss), el workflow restauró el directorio de caché, pero la huella digital de la tarea cambió.

## Mantener Estable el Rastreo de Tareas

Si GitHub restaura una caché pero `vp run` muestra un fallo de caché, corrige la huella digital de la tarea antes de cambiar la clave de la caché de Actions. Consulta [Rastreo Automático de Datos](/guide/automatic-data-tracking) y [`run.tasks`](/config/run#tasks).

## Elegir una Clave de Caché

Usa una clave primaria rotativa más un prefijo de restauración:

```yaml [.github/workflows/ci.yml]
key: vite-task-${{ runner.os }}-${{ runner.arch }}-${{ github.run_id }}-${{ github.run_attempt }}
restore-keys: |
  vite-task-${{ runner.os }}-${{ runner.arch }}-
```

La clave primaria es única para cada ejecución porque contiene `github.run_id` and `github.run_attempt`. Luego, GitHub busca el prefijo de restauración y restaura la caché coincidente más reciente.

Incluye:

- `runner.os` y `runner.arch`, porque las salidas y las herramientas nativas pueden ser específicas de la plataforma.
- A per-run value tal como `github.run_id` y `github.run_attempt`, porque las entradas de caché de GitHub son inmutables.

Si un archivo de dependencia afecta al resultado de una tarea, rastréalo en la huella digital de la tarea en lugar de en la clave de GitHub Actions.

## Gestionar la Caducidad y el Alcance de la Caché

GitHub desaloja (evicts) las cachés basándose en sus reglas de retención de caché y almacenamiento de repositorio. El alcance de la caché también depende de la rama: las ejecuciones de workflows pueden restaurar cachés de la rama actual y de la rama predeterminada, mientras que las cachés de referencias de fusión de pull requests (merge-ref) tienen un alcance limitado.

Vite Task puede borrar toda la caché de tareas, pero actualmente no elimina entradas de tareas individuales por antigüedad o tamaño. A medida que se guardan nuevas entradas de tareas y archivos de salida, `node_modules/.vite/task-cache` puede seguir creciendo.

Gestiona el tamaño en la capa de caché de GitHub Actions:

- Limita el `path` almacenado en caché al directorio de caché de Vite Task.
- Mantén el prefijo de restauración restringido a ejecutores compatibles, como el mismo sistema operativo y arquitectura.
- Elimina las entradas de caché de GitHub Actions obsoletas, guarda cachés de menos workflows o ajusta el límite de caché del repositorio si las cachés grandes provocan desalojos frecuentes.

Consulta la [referencia de caché de GitHub](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching) para conocer las reglas de desalojo y alcance vigentes.
