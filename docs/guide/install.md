# Instalar Dependencias

`vp install` instala las dependencias usando el gestor de paquetes del espacio de trabajo (workspace) actual.

## Vista General

Usa Vite+ para gestionar las dependencias a través de pnpm, npm, Yarn y Bun. En lugar de cambiar entre `pnpm install`, `npm install` y `yarn install`, puedes seguir usando `vp install`, `vp add`, `vp remove` y el resto de los comandos de gestión de paquetes de Vite+.

Vite+ detecta el gestor de paquetes desde la raíz del workspace en este orden:

1. `packageManager` en el `package.json`
2. `pnpm-workspace.yaml`
3. `pnpm-lock.yaml`
4. `yarn.lock` o `.yarnrc.yml`
5. `package-lock.json`
6. `bun.lock` o `bun.lockb`
7. `.pnpmfile.cjs` o `pnpmfile.cjs`
8. `bunfig.toml`
9. `yarn.config.cjs`

Si ninguno de esos archivos está presente, `vp` recurre a `pnpm` por defecto. Vite+ descarga automáticamente el gestor de paquetes correspondiente y lo utiliza para el comando que ejecutaste.

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
- `vp rebuild` reconstruye los módulos nativos (ej. después de cambiar la versión de Node.js)
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
- `vp rebuild -- <args>` pasa argumentos adicionales al gestor de paquetes subyacente

```bash
vp rebuild
vp rebuild -- --update-binary
```

`vp rebuild` es un atajo para `vp pm rebuild`.

#### Avanzado

Usa estos comandos cuando necesites un comportamiento de nivel más bajo del gestor de paquetes.

- `vp link` y `vp unlink` gestionan enlaces de desarrollo locales.
- `vp dlx create-vite` ejecuta el binario de un paquete sin guardarlo como dependencia.
- `vp pm <comando>` reenvía directamente al gestor de paquetes resuelto.

Ejemplos:

```bash
vp pm config get registry
vp pm cache clean --force
vp pm exec tsc --version
```

