# Instalar Dependencias

`vp install` instala las dependencias usando el gestor de paquetes del espacio de trabajo (workspace) actual.

## Vista General

Usa Vite+ para gestionar las dependencias a través de pnpm, npm, Yarn y Bun. En lugar de cambiar entre `pnpm install`, `npm install`, `yarn install` y `bun install`, puedes seguir usando `vp install`, `vp add`, `vp remove` y el resto de los comandos de gestión de paquetes de Vite+.

Vite+ detecta el gestor de paquetes desde la raíz del workspace en este orden:

1. `packageManager` en el `package.json`
2. `devEngines.packageManager` en el `package.json`
3. `pnpm-workspace.yaml`
4. `pnpm-lock.yaml`
5. `yarn.lock` o `.yarnrc.yml`
6. `package-lock.json`
7. `bun.lock` o `bun.lockb`
8. `.pnpmfile.cjs` o `pnpmfile.cjs`
9. `bunfig.toml`
10. `yarn.config.cjs`

Si ninguno de esos archivos está presente, `vp` recurre a `pnpm` por defecto. Vite+ descarga automáticamente el gestor de paquetes correspondiente y lo utiliza para el comando que ejecutaste. Cuando la detección proviene de archivos lockfile o archivos de configuración, la versión resuelta se escribe en `devEngines.packageManager` para que las ejecuciones futuras sean deterministas; los proyectos que ya declaran `packageManager` o `devEngines.packageManager` se dejan como están.

El campo [`devEngines.packageManager`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines) acepta un solo objeto o un array de objetos, y su `version` puede ser un rango semver (semver range):

```json
{
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "^11.0.0",
      "onFail": "download"
    }
  }
}
```

Un rango se resuelve a una versión satisfactoria ya descargada cuando sea posible; de lo contrario, se resuelve a la última versión satisfactoria del registro de npm. El rango en sí sigue siendo la fuente de verdad; Vite+ nunca lo congela en una fijación (pin) exacta en `packageManager`. Cuando se declaran tanto `packageManager` como `devEngines.packageManager`, el campo `packageManager` dirige la selección y Vite+ advierte cuando este no cumple con la restricción de devEngines (`vp env doctor` muestra los detalles).

Actualmente, Vite+ descarga el gestor de paquetes declarado (el comportamiento de `onFail: "download"`); los otros valores de `onFail` se aceptan pero aún no se diferencian.

El campo explícito `packageManager` (o la declaración `devEngines.packageManager`) también afecta a los shims de los gestores de paquetes correspondientes. Si un proyecto tiene `packageManager: "npm@10.9.4"`, `npm` y `npx` usan npm 10.9.4. Otros pares de alias generados se comportan de la misma manera: `pnpm`/`pnpx`, `yarn`/`yarnpkg` y `bun`/`bunx`. Las herramientas que no coinciden no se traducen; `npm` en un proyecto `pnpm` todavía se resuelve como npm.

## Uso

```bash
vp install
```

Flujos de instalación comunes:

```bash
vp install
vp install --frozen-lockfile
vp install --lockfile-only
vp install --filter web
vp install -w
```

`vp install` se mapea al comportamiento de instalación subyacente correcto para el gestor de paquetes detectado, incluyendo los parámetros de archivo de bloqueo (lockfile) adecuados para pnpm, npm, Yarn y Bun.

## Paquetes Globales

Usa el parámetro `-g` para instalar, actualizar o eliminar paquetes instalados globalmente:

- `vp install -g <pkg>` instala un paquete globalmente.
- `vp uninstall -g <pkg>` elimina un paquete global.
- `vp update -g [pkg]` acredita un paquete global o todos ellos.
- `vp list -g [pkg]` enumera los paquetes globales.
- `vp outdated -g [pkg]` imprime los paquetes desactualizados.

::: warning ADVERTENCIA
Estos comandos **NO** interactúan con el directorio de instalación global del gestor de paquetes subyacente.

En su lugar, Vite+ gestiona sus propios paquetes globales bajo `VP_HOME/packages`, lo que permite que sigan estando disponibles en diferentes versiones de Node.js.

Como resultado, comandos como `vp link` no afectan a los paquetes globales de Vite+ y no aparecerán en `vp list -g`.
:::

## Gestionar Dependencias

Vite+ proporciona todos los comandos familiares de gestión de paquetes:

- `vp install` instala el grafo de dependencias actual del proyecto.
- `vp add <pkg>` añade paquetes a `dependencies`; usa `-D` para `devDependencies`.
- `vp remove <pkg>` elimina paquetes.
- `vp update` actualiza las dependencias.
- `vp dedupe` reduce las entradas de dependencias duplicadas donde el gestor de paquetes lo admita.
- `vp outdated` muestra las actualizaciones disponibles.
- `vp list` muestra los paquetes instalados.
- `vp why <pkg>` explica por qué un paquete está presente.
- `vp info <pkg>` muestra los metadatos del registro de un paquete.
- `vp rebuild` reconstruye los módulos nativos (ej. después de cambiar la versión de Node.js).
- `vp link` y `vp unlink` gestionan enlaces de paquetes locales.
- `vp dlx <pkg>` ejecuta el binario de un paquete sin añadirlo al proyecto.
- `vp pm <comando>` reenvía un comando bruto específico del gestor de paquetes cuando necesites un comportamiento fuera del conjunto de comandos normalizados de `vp`.

### Guía de Comandos

#### Install

Usa `vp install` cuando quieras instalar exactamente lo que describen el `package.json` y el lockfile actuales.

- `vp install` es el comando de instalación estándar.
- `vp install --frozen-lockfile` falla si el lockfile necesitara cambios.
- `vp install --no-frozen-lockfile` permite actualizaciones del lockfile de forma explícita.
- `vp install --lockfile-only` actualiza el lockfile sin realizar una instalación completa.
- `vp install --prefer-offline` y `vp install --offline` prefieren o requieren paquetes en caché.
- `vp install --ignore-scripts` omite los scripts del ciclo de vida.
- `vp install --filter <patrón>` limita el trabajo de instalación en monorepos.
- `vp install -w` instala en la raíz del workspace.

#### Instalación Global

Usa estos comandos cuando quieras que las herramientas gestionadas por el gestor de paquetes estén disponibles fuera de un único proyecto.

- `vp install -g typescript`
- `vp uninstall -g typescript`
- `vp update -g`
- `vp list -g`
- `vp outdated -g`

#### Add y Remove

Usa `vp add` y `vp remove` para las ediciones diarias de dependencias en lugar de editar el `package.json` a mano.

- `vp add react`
- `vp add -D typescript vitest`
- `vp add -O fsevents`
- `vp add --save-peer react`
- `vp remove react`
- `vp remove --filter web react`

#### Update, Dedupe y Outdated

Usa estos comandos para mantener el grafo de dependencias a lo largo del tiempo.

- `vp update` actualiza los paquetes a versiones más recientes.
- `vp outdated` muestra qué paquetes tienen versiones más recientes disponibles.
- `vp dedupe` pide al gestor de paquetes que colapse los duplicados donde sea posible.

#### Inspeccionar

Usa estos comandos cuando necesites entender el estado actual de las dependencias.

- `vp list` muestra los paquetes instalados.
- `vp why react` explica por qué `react` está instalado
- `vp info react` muestra metadatos del registro como versiones y dist-tags

#### Reconstruir (Rebuild)

Usa `vp rebuild` cuando los módulos nativos necesiten ser recompilados, por ejemplo, después de cambiar la versión de Node.js o cuando un addon de C/C++ falla al cargar.

- `vp rebuild` reconstruye todos los módulos nativos
- `vp rebuild <paquete...>` reconstruye solo los paquetes listados
- `vp rebuild -- <args>` pasa argumentos adicionales al gestor de paquetes subyacente

```bash
vp rebuild
vp rebuild better-sqlite3 sharp
vp rebuild -- --update-binary
```

`vp rebuild` es un atajo para `vp pm rebuild`.

Con pnpm v10+, un `vp rebuild` sin argumentos solo reconstruye los paquetes cuyos scripts de construcción están listados en `onlyBuiltDependencies` (o aprobados mediante `pnpm approve-builds`); nombra el paquete explícitamente para forzar una reconstrucción que omita el paso de aprobación.

#### Avanzado

Usa estos comandos cuando necesites un comportamiento de nivel más bajo del gestor de paquetes.

- `vp link` y `vp unlink` gestionan enlaces de desarrollo locales.
- `vp dlx create-vite` ejecuta el binario de un paquete sin guardarlo como dependencia.
- `vp pm <comando>` reenvía directamente al gestor de paquetes resuelto.

Ejemplos:

```bash
vp pm config get registry
vp pm cache clean -- --force
vp pm audit --json
```

#### Publicación por etapas (Staged publishing)

`vp pm stage` expone el flujo de trabajo de [publicación por etapas (staged publishing) de npm](https://docs.npmjs.com/staged-publishing): se sube una compilación a un área de pruebas (sin 2FA, ideal para CI), luego un mantenedor la aprueba o rechaza desde un dispositivo de confianza (con 2FA). Se adapta al gestor de paquetes detectado.

```bash
vp pm stage publish              # sube el paquete al área de pruebas (sin 2FA)
vp pm stage list                 # enumera las versiones en el área de pruebas
vp pm stage view <stage-id>      # inspecciona una versión en el área de pruebas
vp pm stage download <stage-id>  # descarga el tarball de la versión del área de pruebas
vp pm stage approve <stage-id>   # promueve al registro activo (con 2FA)
vp pm stage reject <stage-id>    # descarta una versión del área de pruebas (con 2FA)
```

- pnpm (`pnpm stage`, requiere pnpm ≥ 11.3) y npm (`npm stage`, requiere npm ≥ 11.15 y Node ≥ 22.14) se reenvían directamente.
- yarn (Berry) utiliza su plugin npm (`yarn npm publish --staged`, `yarn npm stage …`); `view`/`download` recurren a npm.
- yarn Classic y bun no tienen soporte de publicación por etapas y recurren a `npm stage`.

