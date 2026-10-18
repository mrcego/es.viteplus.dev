<script setup lang="ts">
import { migrationPrompt, upgradePrompt } from '../.vitepress/theme/data/migration-prompts.ts';
</script>

# Migrar a Vite+

`vp migrate` ayuda a mover proyectos existentes a Vite+.

## Vista General

Este comando es el punto de partida para consolidar configuraciones separadas de Vite, Vitest, Oxlint, Oxfmt, ESLint, Prettier, tsdown y tsup en Vite+.

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

- Ejecuta `vp install`
- Ejecuta `vp check`
- Ejecuta `vp test`
- Ejecuta `vp build` (o `vp pack` si estás construyendo una librería)

## Prompt de Migración

Mira y copia este prompt en tu asistente de código con IA para migrar un proyecto existente a Vite+:

<CopyPrompt :prompt="migrationPrompt" label="Ver Prompt de Migración" />

## Actualización de Vite+ 0.3 a 1.0

Vite+ 1.0 incluye los cambios disruptivos (breaking changes) de Vitest 5. Consulta la [guía de compatibilidad de Vite+](./vitest-v5.md) junto con la [guía de migración upstream](https://vitest.dev/guide/migration/).

Las compilaciones de librerías también usan tsdown 0.23. Revisa las [reglas de migración de configuración de pack](./migrate-rules.md#configuracion-de-pack) y las [notas de la versión upstream](https://github.com/rolldown/tsdown/releases/tag/v0.23.0) para cambios de opciones y nuevos valores predeterminados.

Mantén las dependencias originales y el lockfile de tu proyecto hasta que la migración identifique el ejecutor antiguo. Actualizar las dependencias del proyecto primero puede impedir que la migración preserve el comportamiento de v4. Usa una de las siguientes rutas desde la raíz del espacio de trabajo.

### Con la CLI Global

Actualiza la [CLI global](./upgrade.md#vp-global) a tu versión 1.0 objetivo, luego ejecuta `vp migrate --no-interactive`. Para una versión preliminar (preview), sigue las [instrucciones de instalación de vista previa](./upgrade.md#vista-previa-de-vp-global).

### Sin la CLI Global

Usa un entorno de ejecución de Node.js existente que cumpla con `^22.18.0 || ^24.11.0 || >=26.0.0`. Ejecuta el migrador objetivo a través de tu gestor de paquetes sin agregarlo al proyecto primero. Para la versión `1.0.0-rc.0`:

::: code-group

```bash [pnpm]
pnpm dlx --package=vite-plus@1.0.0-rc.0 vp migrate --no-interactive
```

```bash [npm]
npx --package=vite-plus@1.0.0-rc.0 vp migrate --no-interactive
```

:::

Reemplaza `1.0.0-rc.0` con tu versión de lanzamiento objetivo. Para una versión preliminar, usa la versión del PR y pasa `--registry=https://registry-bridge.viteplus.dev` a `pnpm` o `npx` antes del comando `vp`. Mantén la versión en `--package` explícita para que ejecutes el migrador objetivo en lugar de la CLI local antigua.

Después de la migración, finaliza la instalación de dependencias y valida con la CLI local actualizada:

::: code-group

```bash [pnpm]
pnpm install
pnpm exec vp check
pnpm exec vp test
pnpm exec vp build
```

```bash [npm]
npm install
npm exec -- vp check
npm exec -- vp test
npm exec -- vp build
```

:::

Usa `vp pack` en lugar de `vp build` para una librería que utiliza el comando pack. Ejecuta también las suites configuradas de navegador, cobertura y benchmark.

### Revisar la Actualización

En un proyecto Vite+ existente, utiliza el flujo de actualización predeterminado. Agrega `--full` si también deseas repetir la configuración inicial del proyecto. Resuelve los bloqueos e inspecciona el informe específico de cada archivo antes de hacer commit. Consulta [Actualización vs. Configuración Completa](./migrate-rules.md#actualizacion-vs-configuracion-completa) para ver el alcance de cada modo.

Una vez que el proyecto migrado supere la validación, [comprueba si puedes eliminar los ajustes de compatibilidad generados para v4](./vitest-v5.md#eliminar-ajustes-de-compatibilidad-innecesarios) sin cambios de código o mediante pequeñas correcciones localizadas. Mantén la compatibilidad por ahora si la eliminación requiere cambios extensos en las pruebas o no puedes validar el resultado.

Para librerías, revisa los [ajustes de compatibilidad generados para tsdown](#tsdown) tras una ejecución exitosa de `vp pack`. Sigue sus enlaces a la documentación antes de adoptar los nuevos valores por defecto y verifica las importaciones y declaraciones emitidas con los consumidores de tu paquete.

### Copiar Prompt

Mira y copia este prompt en tu asistente de código con IA para actualizar un proyecto existente de Vite+ 0.3:

<CopyPrompt :prompt="upgradePrompt" label="Ver Prompt de Actualización" />

## Migraciones Específicas de Herramientas

### Vitest

Vitest se migra automáticamente a través de `vp migrate`. `vite-plus` reexporta el `vitest@5.0.1` de upstream bajo `vite-plus/test*`, por lo que para pruebas en modo Node, una sola instalación de `vite-plus` es suficiente: ya no necesitas instalar `vitest` directamente.

Para el modo navegador, puedes usar el entorno de ejecución del navegador base (`@vitest/browser`) y el proveedor de vista previa (`@vitest/browser-preview`) incluidos en `vite-plus`. Para usar Playwright o WebDriverIO, también necesitas el proveedor opcional (opt-in) (`@vitest/browser-playwright` o `@vitest/browser-webdriverio`) y su framework dependiente (`playwright` o `webdriverio`).

`vp migrate` agrega el proveedor de Playwright en la versión de Vitest empaquetada y asegura su framework dependiente. Puedes importarlo desde `vite-plus/test/browser-playwright`.

Para WebDriverIO, importa desde el paquete mantenido por la comunidad `@vitest/browser-webdriverio`. La migración restaura las importaciones del proveedor heredadas de Vite+, garantiza una versión del proveedor de al menos `5.0.0` y agrega un override de `@vitest/browser` que coincide con el ejecutor empaquetado. Gestiona tú mismo las actualizaciones posteriores del proveedor y de los frameworks correspondientes. Consulta [Proveedor comunitario de WebDriverIO](./vitest-v5.md#proveedor-comunitario-de-webdriverio).

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

`vp migrate` actualiza las opciones estáticas admitidas en los bloques `pack` y `tsdown.config.*` para tsdown 0.23. Esto también se ejecuta en proyectos Vite+ existentes y paquetes del espacio de trabajo sin `--full`. Consulta [Configuración de Pack](./migrate-rules.md#configuracion-de-pack) para conocer las asignaciones de opciones y los casos que requieren revisión manual.

La transformación preserva los valores predeterminados anteriores insertando `deps.resolveDepSubpath: true` y, cuando las comprobaciones de ATTW están habilitadas, `attw.profile: 'strict'` si estos ajustes están ausentes. Cada ajuste insertado incluye un comentario `tsdown <0.23 compatibility` con un enlace a la documentación y guía de eliminación. Los ajustes explícitos no cambian.

Mantén estos ajustes para la primera ejecución de `vp pack`. Después de la validación, revisa si tu paquete puede adoptar los nuevos valores predeterminados:

- Eliminar `deps.resolveDepSubpath: true` [preserva las importaciones de subrutas externas tal como están escritas](https://tsdown.dev/options/dependencies#deps-resolvedepsubpath). Comprueba que los consumidores puedan resolver las importaciones emitidas.
- Eliminar el `attw.profile: 'strict'` insertado selecciona el [perfil de resolución](https://tsdown.dev/options/lint#profiles) `esm-only`. Esto omite las comprobaciones de resolución de `node10` y CommonJS. Mantén `strict` si tu paquete requiere esas comprobaciones.

Elimina también el comentario generado de cada ajuste aceptado. Ejecuta `vp pack` y las comprobaciones de consumidor de tu paquete después de cada cambio. Mantén el ajuste cuando no puedas validar el resultado.

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

Cuando ninguna política de hooks existente controla el flujo de trabajo, `vp migrate` puede mover las reglas admitidas de lint-staged y eliminar la configuración y dependencia antiguas. Si se conserva una herramienta de hooks existente, mantén lint-staged en su lugar hasta que conviertas esa política manualmente. Consulta la [guía de Hooks de commit](/guide/commit-hooks) y la [referencia de configuración Staged](/config/staged) para más detalles.

### Herramientas de hooks de Git

El comando `vp migrate` no convierte automáticamente configuraciones de Husky. Cuando se detecta Husky, Vite+ deja sus hooks, scripts de ciclo de vida, configuración y dependencias sin cambios y muestra una advertencia. Puedes migrar el proyecto manualmente utilizando la [guía de Hooks de commit](/guide/commit-hooks).

Los hooks de Vite+ pertenecientes al proyecto también se conservan. El flujo de trabajo predeterminado de staged se introduce solo cuando no se encuentra ninguna política de hooks existente.

Si tu proyecto utiliza actualmente `lefthook`, `simple-git-hooks` o `yorkie`, `vp migrate` dejará intacta tu configuración existente y mostrará una advertencia. Esto ocurre incluso si eliges configurar hooks durante la pregunta interactiva o incluyes el flag `--hooks`.

Si deseas migrar una de esas herramientas a Vite+ manualmente, puedes seguir estos pasos. Primero, mueve tus comandos de archivos preparados (staged files) al bloque `staged` dentro de `vite.config.ts`. Luego, actualiza tu script de ciclo de vida para que ejecute `vp config`. También necesitarás crear un hook de Vite+ en `.vite-hooks/pre-commit` que ejecute `vp staged`. Ejecuta `vp hooks enable` (o `vp config`) para instalar el despachador y configurar `core.hooksPath`. Finalmente, una vez que hayas confirmado que el hook de Vite+ funciona como se espera, puedes eliminar la configuración y la dependencia de la herramienta antigua.

Usa `vp hooks status` para verificar que el despachador esté activo y `vp hooks disable` si necesitas desactivarlo nuevamente en este clon. Puedes encontrar más detalles sobre la configuración completa de los hooks de Vite+ en la [guía de Hooks de commit](/guide/commit-hooks).

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
