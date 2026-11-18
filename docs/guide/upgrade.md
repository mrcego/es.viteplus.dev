# Actualizar Vite+

Usa `vp upgrade` para actualizar el binario global `vp`, o [Homebrew](#homebrew) si gestiona tu instalación. Para actualizar el paquete local `vite-plus` en un proyecto, consulta [Actualizar Vite+](/guide/upgrade-project).

## Vista general

Hay dos partes al actualizar Vite+:

- El comando global `vp` instalado en tu máquina
- El [paquete local `vite-plus`](/guide/upgrade-project) utilizado por un proyecto individual

Puedes actualizar ambos de forma independiente.

## Mostrar el Toolchain

Ejecuta `vp toolchain` para mostrar los componentes del directorio actual:

```bash
vp toolchain
vp toolchain vite
vp toolchain vite rolldown oxc
vp toolchain --json
```

El comando utiliza el paquete local `vite-plus` cuando el proyecto cuenta con uno. Usa `--global` o `-g` para mostrar el release del comando global `vp`:

```bash
vp toolchain --global
```

`vp why <package>` muestra el árbol de dependencias del gestor de paquetes. No puede mostrar el código empaquetado dentro de `@voidzero-dev/vite-plus-core`. Tampoco puede mostrar los motores compilados en Vite+. Usa `vp toolchain` para ver esas versiones y relaciones.

## CLI global `vp`

Actualiza la CLI global con:

```bash
vp upgrade                        # actualizar a la última versión
vp upgrade --check                # comprobar si hay actualizaciones sin instalar
vp upgrade <versión>              # instalar una versión específica
vp upgrade --registry <registro>  # usar un registro de npm personalizado
```

### Comprobaciones automáticas de actualización

La CLI global busca actualizaciones en segundo plano durante el uso normal de la terminal, almacenando en caché los resultados durante 24 horas. Cuando hay una versión más reciente disponible, imprime un aviso en stderr sin instalarla.

Establece `VP_NO_UPDATE_CHECK=1` para deshabilitar estas comprobaciones y avisos. También están deshabilitadas en CI y para instalaciones de Homebrew.

### Mover una instalación existente a la estructura de directorios dividida

Vite+ 0.3.0 es la primera versión compatible con la estructura de directorios dividida. Vite+ 0.2.x y versiones anteriores utilizan la estructura de raíz única para instalaciones nuevas y actualizaciones.

`vp upgrade` mantiene una instalación predeterminada existente en `~/.vite-plus` en Unix o en `%USERPROFILE%\.vite-plus` en Windows. El comando actualiza la CLI en ese directorio. No traslada la instalación a los directorios divididos de la plataforma. Puedes continuar usando la estructura existente.

Para usar la estructura dividida ahora, elimina la instalación existente y luego instala Vite+ de nuevo. Ejecuta `vp implode` en una terminal que use la instalación actual. El comando elimina el archivo de entorno generado y las entradas del perfil de la terminal. No desasigna las variables de directorio en la terminal actual. Desasigna todas las variables de directorio de Vite+ antes de ejecutar el instalador. Esto puede incluir valores de un archivo de entorno de vista previa anterior. Alternativamente, inicia una nueva terminal después de `vp implode` y luego ejecuta el instalador allí.

::: warning
`vp implode` elimina todos los runtimes de Node.js, paquetes globales, configuraciones y cachés gestionados por Vite+. Mantén la estructura existente si no deseas recrear esos datos.
:::

```bash
vp implode
unset VP_HOME VP_DATA_DIR VP_BIN_DIR VP_CACHE_DIR
curl -fsSL https://vite.plus | bash
```

En Windows:

```powershell
vp implode
Remove-Item Env:\VP_HOME, Env:\VP_DATA_DIR, Env:\VP_BIN_DIR, Env:\VP_CACHE_DIR -ErrorAction SilentlyContinue
irm https://vite.plus/ps1 | iex
```

Elimina también las definiciones persistentes de `VP_HOME`, `VP_DATA_DIR`, `VP_BIN_DIR` y `VP_CACHE_DIR` de tu perfil de terminal o del entorno del sistema. Una instalación nueva utiliza `VP_HOME` o un grupo completo `VP_*_DIR` que permanezca definido. `VP_HOME` selecciona la estructura de raíz única. Si instalas Vite+ 0.2.x o una versión anterior, el instalador también utiliza esta estructura y muestra un aviso.

### Reversión (Rollback)

Vite+ mantiene instaladas las **3 versiones más recientes** para que puedas revertir rápidamente:

```bash
vp upgrade --rollback
```

Las versiones más antiguas se eliminan automáticamente después de cada actualización. La versión activa y la versión anterior siempre se conservan, por lo que nunca se elimina un objetivo de reversión.

### Homebrew

El [tap oficial de Homebrew](/guide/homebrew) gestiona su binario instalado. Actualízalo con:

```bash
brew upgrade voidzero-dev/vite-plus/vp
```

`vp upgrade` detecta la fórmula instalada y muestra su comando de actualización de Homebrew sin descargar ni instalar otra versión. Esto también se aplica a `--force`, una versión específica y `--rollback`. La reversión y la limpieza automática del instalador por script no se aplican a las instalaciones de Homebrew.

Para el tap, ejecuta `vp` después de actualizar para instalar las dependencias de la nueva versión en tu directorio de datos de usuario. La configuración conserva tus preferencias de gestión.

Para el tap, `vp upgrade --check` te dirige a `brew outdated voidzero-dev/vite-plus/vp`. Las comprobaciones y avisos automáticos de actualización de npm están deshabilitados para las instalaciones de Homebrew.

Para cambiar al tap, sigue los [pasos de migración](/guide/homebrew#switch-an-existing-installation).

## Compilaciones de vista previa (Preview Builds)

Algunas solicitudes de extracción (pull requests) de Vite+ publican paquetes temporales para realizar pruebas antes de un lanzamiento en npm. Trata estas compilaciones como nocturnas (nightly) o de vanguardia (bleeding-edge): son útiles cuando deseas verificar una corrección específica, probar una nueva actualización de dependencias de upstream o confirmar un cambio antes del próximo lanzamiento. Para el trabajo diario, prefiere la versión `latest` publicada.

Cada commit en una pull request elegible se publica en el [puente de registro (registry bridge)](https://registry-bridge.viteplus.dev/). El puente sirve estas compilaciones como versiones ordinarias de npm con el formato `0.0.0-commit.<sha>` y redirige cualquier otro paquete al registro de npm. Eso significa que instalas una vista previa con especificadores de versión normales en lugar de URLs mutables, y las mismas versiones se resuelven en CI.

Tanto `vite-plus` como `@voidzero-dev/vite-plus-core` se publican bajo la misma versión `0.0.0-commit.<sha>`. Cada pull request incluye un comentario que enumera la versión exacta de su último commit, junto con pasos de instalación listos para copiar.

Puedes encontrar compilaciones de vista previa en solicitudes de extracción que actualizan automáticamente las dependencias de upstream. Por ejemplo, busca las pull requests fusionadas para [actualizaciones de dependencias de upstream](https://github.com/voidzero-dev/vite-plus/pulls?q=is%3Apr+is%3Amerged+upgrade+upstream+dependencies).

Las compilaciones de vista previa se identifican por el número de pull request o el SHA del commit. No constituyen un rango de versiones estable y debes evitar dejarlas en ramas de larga duración a menos que un encargado de mantenimiento te lo pida.

### Vista previa de `vp` global

Para una instalación de Homebrew, sigue las [instrucciones de vista previa del tap](/guide/homebrew#test-a-preview-build).

Instala una compilación de vista previa de la CLI global pasando `VP_PR_VERSION` al instalador. Pasa un número de pull request o un SHA de commit:

```bash
curl -fsSL https://vite.plus | VP_PR_VERSION=<pr-or-sha> bash
```

En Windows:

```powershell
$env:VP_PR_VERSION = "<pr-or-sha>"
irm https://vite.plus/ps1 | iex
Remove-Item Env:\VP_PR_VERSION
```

El instalador utiliza el registry bridge para resolver la referencia a una compilación `0.0.0-commit.<sha>`. Instala esta compilación al igual que otras versiones. Ejecuta `vp toolchain --global` para mostrar la compilación activa y las versiones de las herramientas. Después de probar, ejecuta `vp upgrade --force` para restaurar el release publicado. También puedes ejecutar el instalador sin `VP_PR_VERSION`.

### Vista previa de `vite-plus` local

Para usar la misma vista previa en un proyecto, sigue [Actualizar Vite+](/guide/upgrade-project#preview-builds).
