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
- Reascribe las importaciones donde sea necesario.
- Fusiona la configuración específica de la herramienta en `vite.config.ts`.
- Actualiza los scripts a la superficie de comandos de Vite+.
- Puede configurar hooks de commit.
- Puede escribir archivos de configuración para agentes y editores.
- Formatea el proyecto migrado.

Consulta las [Reglas de Migración](./migrate-rules.md) para conocer el comportamiento exacto de las dependencias, la reescritura de código fuente y del gestor de paquetes.

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
- Confirma que las importaciones de `vitest` se reescribieron a `vite-plus/test` (y `@vitest/browser*` a `vite-plus/test/browser*`) donde fuera necesario.
- Elimina las dependencias antiguas de `vite`, `vitest` y `@vitest/browser*` solo después de que se confirmen esas reescrituras; `vite-plus` las incluye como dependencias directas.
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

Vitest se migra automáticamente a través de `vp migrate`. `vite-plus` reexporta el `vitest@4.x` de upstream bajo `vite-plus/test*`, por lo que para pruebas en modo Node, una sola instalación de `vite-plus` es suficiente: ya no necesitas instalar `vitest` directamente.

El modo navegador (browser mode) es más complejo. `vite-plus` incluye el entorno de ejecución del navegador base (`@vitest/browser`) y el proveedor de vista previa (`@vitest/browser-preview`), pero los proveedores de **Playwright** y **WebdriverIO** siguen siendo opcionales (opt-in): `@vitest/browser-playwright` (con su peer dependency `playwright`) y `@vitest/browser-webdriverio` (con su peer dependency `webdriverio`) **no** se incluyen con `vite-plus`, de modo que los proyectos que no usan navegador nunca los descargan. `vp migrate` detecta el proveedor que realmente utilizas y lo agrega —fijado a la versión de vitest empaquetada— junto con su framework. Si realizas la migración manualmente y usas uno de estos proveedores, instala el paquete del proveedor y su framework tú mismo para que `vite-plus/test/browser-playwright` / `vite-plus/test/browser-webdriverio` se puedan resolver.

Si estás haciendo la migración manualmente, actualiza todas las importaciones a `vite-plus/test*` en su lugar:

```ts
// antes
import { defineConfig } from 'vitest/config';
import { describe, expect, it, vi } from 'vitest';
import { playwright } from '@vitest/browser-playwright';

const { page } = await import('@vitest/browser/context');

// después
import { defineConfig } from 'vite-plus';
import { describe, expect, it, vi } from 'vite-plus/test';
import { playwright } from 'vite-plus/test/browser-playwright';

const { page } = await import('vite-plus/test/browser/context');
```

Las declaraciones de aumento de módulos (module augmentations) `declare module 'vitest'` / `declare module '@vitest/browser*'` intencionalmente **no** se reescriben. `vite-plus/test*` es una simple reexportación de `vitest*` de upstream, por lo que los aumentos de tipos deben dirigirse a la identidad del módulo upstream para fusionarse correctamente. Deja esas sentencias `declare module` apuntando a `'vitest'` / `'@vitest/browser*'`.

### tsdown

Si tu proyecto usa un `tsdown.config.ts`, mueve sus opciones al bloque `pack` en `vite.config.ts`:

```ts [tsdown.config.ts] {4-6}
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
});
```

```ts [vite.config.ts] {4-8}
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

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

Después de migrar, elimina lint-staged de tus dependencias y elimina cualquier archivo de configuración de lint-staged. Consulta la [guía de Hooks de commit](/guide/commit-hooks) y la [referencia de configuración Staged](/config/staged) para más detalles.

### Herramientas de hooks de Git

El comando `vp migrate` puede configurar los hooks de commit de Vite+ por ti, pero no migra automáticamente todos los tipos de herramientas de hooks de Git. Esta ruta de migración automática está diseñada específicamente para manejar configuraciones de Husky v9+ y del estilo de lint-staged. Los proyectos que usan versiones de Husky anteriores a la 9.0.0 se omiten y deben actualizarse a Husky v9 antes de usar la ruta de migración automática.

Si tu proyecto utiliza actualmente `lefthook`, `simple-git-hooks` o `yorkie`, `vp migrate` dejará intacta tu configuración existente y mostrará una advertencia. Esto ocurre incluso si eliges configurar hooks durante la pregunta interactiva o incluyes el flag `--hooks`.

Si deseas migrar una de esas herramientas a Vite+ manualmente, puedes seguir estos pasos. Primero, mueve tus comandos de archivos preparados (staged files) al bloque `staged` dentro de `vite.config.ts`. Luego, actualiza tu script de ciclo de vida para que ejecute `vp config`. También necesitarás crear un hook de Vite+ en `.vite-hooks/pre-commit` que ejecute `vp staged`. Finalmente, una vez que hayas confirmado que el hook de Vite+ funciona como se espera, puedes eliminar la configuración y la dependencia de la herramienta antigua.

Puedes encontrar más detalles sobre la configuración completa de los hooks de Vite+ en la [guía de Hooks de commit](/guide/commit-hooks).

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

