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
vp config --no-hooks
vp config --no-agent
```

Usa `--no-hooks` cuando quieras que `vp config` deje intacta la configuración de hooks de Git existente. Usa `--no-agent` cuando quieras que omita las actualizaciones de los archivos de instrucciones de agentes de programación existentes. Puedes pasar ambos flags cuando quieras que `vp config` omita ambos pasos de configuración.

También puedes establecer `VITE_GIT_HOOKS=0` para deshabilitar la instalación de hooks desde scripts de ciclo de vida como `prepare` o `postinstall`.

### `vp staged`

`vp staged` ejecuta comprobaciones de archivos staged utilizando la configuración `staged` de `vite.config.ts`. Si configuraste Vite+ para gestionar tus hooks de commit, se ejecutará automáticamente cuando hagas commit de tus cambios locales.

```bash
vp staged
vp staged --verbose
vp staged --fail-on-changes
```

## Configuración

Define las comprobaciones de archivos staged en el bloque `staged` de `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

Este es el enfoque predeterminado de Vite+ y debería reemplazar la configuración separada de `lint-staged` en la mayoría de los proyectos. Debido a que `vp staged` lee de `vite.config.ts`, tus comprobaciones de archivos staged permanecen en el mismo lugar que tu configuración de lint, formato, pruebas, construcción y ejecución de tareas.

## Deshabilitar hooks en entornos específicos

Los hooks instalados comprueban el entorno en cada ejecución, por lo que puedes deshabilitarlos por máquina o por proceso sin desinstalar nada. Esto es útil cuando las confirmaciones (commits) ocurren fuera del desarrollo, por ejemplo a través de un CMS de archivos planos u otros procesos.

### Variable de entorno

Establece `VITE_GIT_HOOKS=0` en el entorno del proceso que ejecuta `git commit`, y cada hook de Vite+ finalizará inmediatamente sin ejecutarse:

```bash
VITE_GIT_HOOKS=0 git commit -m "actualización de contenido"
```

`HUSKY=0` se respeta de la misma manera para mantener la compatibilidad con las herramientas del ecosistema. Establecer `VITE_GIT_HOOKS=0` en un entorno también evita que `vp config` reinstale los hooks allí cuando se ejecuta un script del ciclo de vida como `prepare`.

### Script de inicialización

Antes de verificar la variable de entorno, cada hook ejecuta un script de inicialización si existe uno:

1. `$XDG_CONFIG_HOME/vite-plus/hooks-init.sh` (por defecto `~/.config/vite-plus/hooks-init.sh`)
2. `$XDG_CONFIG_HOME/husky/init.sh` como alternativa (fallback)

Para deshabilitar los hooks en toda la máquina, crea el script de inicialización y exporta la variable allí:

```sh [~/.config/vite-plus/hooks-init.sh]
export VITE_GIT_HOOKS=0
```

Dado que el propio hook lee este archivo, funciona incluso cuando el proceso que realiza el commit no hereda tu entorno de shell, por ejemplo si un demonio o servidor web está haciendo commits.

## Eliminar hooks de commit

Para eliminar por completo los hooks de commit de Vite+, deshace cada configuración realizada por `vp config`:

1. Elimina la ruta de hooks de Git que apunta al despachador de Vite+:

```bash
git config --unset core.hooksPath
```

2. Elimina el directorio de hooks (usa el valor de tu `--hooks-dir` si lo cambiaste):

```bash
rm -rf .vite-hooks
```

3. Elimina `vp config` del script `prepare` en `package.json`. De lo contrario, la siguiente instalación volverá a ejecutar `vp config` y reinstalará los hooks.

4. Elimina el bloque `staged` de `vite.config.ts` si existe.

