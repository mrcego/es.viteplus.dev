# Migrar a Vite+

`vp migrate` ayuda a mover proyectos existentes a Vite+.

## Vista General

Este comando es el punto de partida para consolidar configuraciones separadas de Vite, Vitest, Oxlint, Oxfmt, ESLint y Prettier en Vite+.

Úsalo cuando desees tomar un proyecto existente y moverlo a los valores predeterminados de Vite+ en lugar de configurar cada herramienta a mano.

## Uso

```bash
vp migrate
vp migrate <ruta>
vp migrate --no-interactive
```

## Ruta de Destino

El argumento posicional `RUTA` es opcional.

- Si se omite, `vp migrate` migra el directorio actual.
- Si se proporciona, migra ese directorio de destino en su lugar.

```bash
vp migrate
vp migrate mi-app
```

## Opciones

- `--agent <nombre>` escribe instrucciones para agentes en el proyecto.
- `--no-agent` omite la configuración de instrucciones para agentes.
- `--editor <nombre>` escribe archivos de configuración del editor en el proyecto.
- `--no-editor` omite la configuración del editor.
- `--hooks` configura los hooks de pre-commit.
- `--no-hooks` omite la configuración de hooks.
- `--no-interactive` ejecuta la migración sin preguntas.

## Flujo de Migración

El comando `migrate` está diseñado para mover proyectos existentes a Vite+ rápidamente. Esto es lo que hace el comando:

- Actualiza las dependencias del proyecto.
- Reeascribe las importaciones donde sea necesario.
- Fusiona la configuración específica de la herramienta en `vite.config.ts`.
- Actualiza los scripts a la superficie de comandos de Vite+.
- Puede configurar hooks de commit.
- Puede escribir archivos de configuración para agentes y editores.

La mayoría de los proyectos requerirán ajustes manuales adicionales después de ejecutar `vp migrate`.

## Flujo de Trabajo Recomendado

Antes de ejecutar la migración:

- Actualiza primero a Vite 8+ y Vitest 4.1+.
- Asegúrate de entender cualquier configuración existente de lint, formateo o pruebas que deba preservarse.

Después de ejecutar la migración:

- Ejecuta `vp install`.
- Ejecuta `vp check`.
- Ejecuta `vp test`.
- Ejecuta `vp build`.

## Prompt de Migración

Si deseas entregar este trabajo a un agente de IA (¡o si el lector es un agente!), usa este prompt de migración:

```md
Migra este proyecto a Vite+. Vite+ reemplaza las herramientas actuales divididas en torno a la gestión del entorno de ejecución, gestión de paquetes, comandos dev/build/test, linting, formateo y empaquetado. Ejecuta `vp help` para entender las capacidades de Vite+ y `vp help migrate` antes de realizar cambios. Usa `vp migrate --no-interactive` en la raíz del espacio de trabajo. Asegúrate de que el proyecto esté usando Vite 8+ y Vitest 4.1+ antes de migrar.

Después de la migración:

- Confirma que las importaciones de `vite` se reescribieron a `vite-plus` donde fuera necesario.
- Confirma que las importaciones de `vitest` se reescribieron a `vite-plus/test` donde fuera necesario.
- Elimina las dependencias antiguas de `vite` y `vitest` solo después de confirmar esas reescrituras.
- Mueve la configuración restante específica de la herramienta a los bloques apropiados en `vite.config.ts`.

Mapeo de comandos a tener en cuenta:

- `vp run <script>` es el equivalente a `pnpm run <script>`.
- `vp test` ejecuta el comando de prueba integrado, mientras que `vp run test` ejecuta el script `test` del `package.json`.
- `vp install`, `vp add` y `vp remove` delegan a través del gestor de paquetes declarado por `packageManager`.
- `vp dev`, `vp build`, `vp preview`, `vp lint`, `vp fmt`, `vp check` y `vp pack` reemplazan las herramientas independientes correspondientes.
- Prefiere `vp check` para los bucles de validación.

Finalmente, verifica la migración ejecutando: `vp install`, `vp check`, `vp test` y `vp build`.

Resume la migración al final e informa sobre cualquier seguimiento manual que aún se requiera.
```

## Migraciones Específicas de Herramientas

### Vitest

Vitest se migra automáticamente a través de `vp migrate`. Si estás migrando manualmente, tienes que actualizar todas las importaciones a `vite-plus/test` en su lugar:

```ts
// antes
import { describe, expect, it, vi } from 'vitest';

const { page } = await import('@vitest/browser/context');

// después
import { describe, expect, it, vi } from 'vite-plus/test';

const { page } = await import('vite-plus/test/browser/context');
```

### tsdown

Si tu proyecto usa un `tsdown.config.ts`, mueve sus opciones al bloque `pack` en `vite.config.ts`:

```ts
// antes — tsdown.config.ts
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
});

// después — vite.config.ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
  },
});
```

Después de fusionar, elimina `tsdown.config.ts`. Consulta la [guía de Pack](/guide/pack) para ver la referencia de configuración completa.

### lint-staged

Vite+ reemplaza lint-staged con su propio bloque `staged` en `vite.config.ts`. Solo se admite el formato de configuración `staged`. Los archivos `.lintstagedrc` independientes en formato no JSON y `lint-staged.config.*` no se migran automáticamente.

Mueve tus reglas de lint-staged al bloque `staged`:

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

Después de migrar, elimina lint-staged de tus dependencias y elimina cualquier archivo de configuración de lint-staged. Consulta la [guía de Hooks de commit](/guide/commit-hooks) y la [referencia de configuración Staged](/config/staged) para más detalles.

## Ejemplos

```bash
# Migrar el proyecto actual
vp migrate

# Migrar un directorio específico
vp migrate mi-app

# Ejecutar sin preguntas
vp migrate --no-interactive

# Escribir configuración de agente y editor durante la migración
vp migrate --agent claude --editor zed
```

