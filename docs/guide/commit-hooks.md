# Hooks de Commit

Usa `vp config` para instalar hooks de commit, y `vp staged` para ejecutar comprobaciones en los archivos en estado "staged".

## Vista General

Vite+ soporta hooks de commit y comprobaciones de archivos staged sin necesidad de herramientas adicionales.

Usa:

- `vp config` para configurar los hooks del proyecto e integraciones relacionadas.
- `vp staged` para ejecutar comprobaciones contra los archivos actualmente marcados para commit en Git (staged).

Si usas [`vp create`](/guide/create) o [`vp migrate`](/guide/migrate), Vite+ te sugerirÃ¡ configurar esto automÃ¡ticamente para tu proyecto.

## Comandos

### `vp config`

`vp config` configura Vite+ para el proyecto actual. Instala los hooks de Git, establece el directorio de hooks y tambiÃ©n puede manejar integraciones de proyecto relacionadas, como la configuraciÃ³n de agentes. Por defecto, los hooks se escriben en `.vite-hooks`:

```bash
vp config
vp config --hooks-dir .vite-hooks
vp config --no-hooks
vp config --no-agent
```

Usa `--no-hooks` cuando quieras que `vp config` deje intacta la configuraciÃ³n de hooks de Git existente. Usa `--no-agent` cuando quieras que omita las actualizaciones de los archivos de instrucciones de agentes de programaciÃ³n existentes. Puedes pasar ambos flags cuando quieras que `vp config` omita ambos pasos de configuraciÃ³n.

TambiÃ©n puedes establecer `VP_GIT_HOOKS=0` para deshabilitar la instalaciÃ³n de hooks desde scripts de ciclo de vida como `prepare` o `postinstall`.

### `vp staged`

`vp staged` ejecuta comprobaciones de archivos staged utilizando la configuraciÃ³n `staged` de `vite.config.ts`. Si configuraste Vite+ para gestionar tus hooks de commit, se ejecutarÃ¡ automÃ¡ticamente cuando hagas commit de tus cambios locales.

```bash
vp staged
vp staged --verbose
vp staged --fail-on-changes
```

## ConfiguraciÃ³n

Define las comprobaciones de archivos staged en el bloque `staged` de `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

Este es el enfoque predeterminado de Vite+ y deberÃ­a reemplazar la configuraciÃ³n separada de `lint-staged` en la mayorÃ­a de los proyectos. Debido a que `vp staged` lee de `vite.config.ts`, tus comprobaciones de archivos staged permanecen en el mismo lugar que tu configuraciÃ³n de lint, formato, pruebas, construcciÃ³n y ejecuciÃ³n de tareas.

## Deshabilitar hooks en entornos especÃ­ficos

Los hooks instalados comprueban el entorno en cada ejecuciÃ³n, por lo que puedes deshabilitarlos por mÃ¡quina o por proceso sin desinstalar nada. Esto es Ãºtil cuando las confirmaciones (commits) ocurren fuera del desarrollo, por ejemplo a travÃ©s de un CMS de archivos planos u otros procesos.

### Variable de entorno

Establece `VP_GIT_HOOKS=0` en el entorno del proceso que ejecuta `git commit`, y cada hook de Vite+ finalizarÃ¡ inmediatamente sin ejecutarse:

```bash
VP_GIT_HOOKS=0 git commit -m "actualizaciÃ³n de contenido"
```

`HUSKY=0` se respeta de la misma manera para mantener la compatibilidad con las herramientas del ecosistema. Establecer `VP_GIT_HOOKS=0` en un entorno tambiÃ©n evita que `vp config` reinstale los hooks allÃ­ cuando se ejecuta un script del ciclo de vida como `prepare`.

### Script de inicializaciÃ³n

Antes de verificar la variable de entorno, cada hook ejecuta un script de inicializaciÃ³n si existe uno:

1. `$XDG_CONFIG_HOME/vite-plus/hooks-init.sh` (por defecto `~/.config/vite-plus/hooks-init.sh`)
2. `$XDG_CONFIG_HOME/husky/init.sh` como alternativa (fallback)

Para deshabilitar los hooks en toda la mÃ¡quina, crea el script de inicializaciÃ³n y exporta la variable allÃ­:

```sh [~/.config/vite-plus/hooks-init.sh]
export VP_GIT_HOOKS=0
```

Dado que el propio hook lee este archivo, funciona incluso cuando el proceso que realiza el commit no hereda tu entorno de shell, por ejemplo si un demonio o servidor web estÃ¡ haciendo commits.

## Eliminar hooks de commit

Para eliminar por completo los hooks de commit de Vite+, deshace cada configuraciÃ³n realizada por `vp config`:

1. Elimina la ruta de hooks de Git que apunta al despachador de Vite+:

```bash
git config --unset core.hooksPath
```

2. Elimina el directorio de hooks (usa el valor de tu `--hooks-dir` si lo cambiaste):

```bash
rm -rf .vite-hooks
```

3. Elimina `vp config` del script `prepare` en `package.json`. De lo contrario, la siguiente instalaciÃ³n volverÃ¡ a ejecutar `vp config` y reinstalarÃ¡ los hooks.

4. Elimina el bloque `staged` de `vite.config.ts` si existe.

