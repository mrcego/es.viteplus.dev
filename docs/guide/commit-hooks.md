# Hooks de Commit

Usa `vp config` para instalar hooks de commit, y `vp staged` para ejecutar comprobaciones en los archivos en estado "staged".

## Vista General

Vite+ soporta hooks de commit y comprobaciones de archivos staged sin necesidad de herramientas adicionales.

Usa:

- `vp config` para configurar los hooks del proyecto e integraciones relacionadas.
- `vp staged` para ejecutar comprobaciones contra los archivos actualmente marcados para commit en Git (staged).

Si usas [`vp create`](/guide/create) o [`vp migrate`](/guide/migrate), Vite+ te sugerirá configurar esto automáticamente para tu proyecto.

## Comandos

### `vp config`

`vp config` configura Vite+ para el proyecto actual. Instala los hooks de Git, establece el directorio de hooks y también puede manejar integraciones de proyecto relacionadas, como la configuración de agentes. Por defecto, los hooks se escriben en `.vite-hooks`:

```bash
vp config
vp config --hooks-dir .vite-hooks
```

### `vp staged`

`vp staged` ejecuta comprobaciones de archivos staged utilizando la configuración `staged` de `vite.config.ts`. Si configuraste Vite+ para gestionar tus hooks de commit, se ejecutará automáticamente cuando hagas commit de tus cambios locales.

```bash
vp staged
vp staged --verbose
vp staged --fail-on-changes
```

## Configuración

Define las comprobaciones de archivos staged en el bloque `staged` de `vite.config.ts`:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

Este es el enfoque predeterminado de Vite+ y debería reemplazar la configuración separada de `lint-staged` en la mayoría de los proyectos. Debido a que `vp staged` lee de `vite.config.ts`, tus comprobaciones de archivos staged permanecen en el mismo lugar que tu configuración de lint, formato, pruebas, construcción y ejecución de tareas.

