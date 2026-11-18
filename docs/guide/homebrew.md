# Tap de Homebrew

El tap oficial es compatible con macOS y Linux glibc en ARM64 y x64. Homebrew gestiona el ejecutable nativo `vp`; `vp` gestiona sus dependencias de JavaScript, versiones de Node.js descargadas, gestores de paquetes y configuraciones en tus directorios de usuario.
La instalación estable descarga el ejecutable y su lockfile de dependencias desde GitHub Releases. Este paso no requiere una instalación existente de Node.js o de un gestor de paquetes, ni acceso al registro de npm.

## Instalación {#install}

Instala el tap:

```bash
brew tap voidzero-dev/vite-plus https://github.com/voidzero-dev/vite-plus
brew install voidzero-dev/vite-plus/vp
vp
```

La URL explícita del repositorio es obligatoria porque la fórmula forma parte del repositorio de Vite+.
Si ya utilizas Vite+, sigue los [pasos de migración](#switch-an-existing-installation).

## Primer uso {#first-use}

En el primer uso, `vp` instala sus dependencias de CLI coincidentes y configura tu terminal y preferencias de gestión de herramientas. Este paso necesita acceso a las descargas de Node.js y a tu registro de npm.
La configuración utiliza las versiones fijadas de Node.js y pnpm del release, incluso si decides preferir las herramientas del sistema. Un [`VP_SETUP_NODE_VERSION`](/guide/global-cli#vp-setup-node-version) compatible puede anular el runtime de instalación sin cambiar la selección de Node.js para tus proyectos.
`vp` almacena las dependencias en `<DATA>/cli-packages/<version>/<platform>`.
`<DATA>` proviene de la [configuración de directorios de Vite+](/guide/global-cli#variables-de-instalacion).

Abre una nueva terminal después de la configuración para que los shims estén disponibles en el `PATH`. Las invocaciones posteriores reutilizan la configuración completada.
Usa [`vp env on` y `vp env off`](/guide/env) para cambiar qué herramientas gestiona `vp`.

## Registro personalizado de npm {#custom-npm-registry}

La configuración de la primera ejecución lee `~/.npmrc`, incluyendo la autenticación compatible con npm:

```ini
registry=https://registry.example.com/repository/npm/
//registry.example.com/repository/npm/:_authToken=${NPM_TOKEN}
```

Exporta `NPM_TOKEN` antes de ejecutar `vp`. Tanto el descargador nativo de pnpm como la instalación de dependencias de pnpm utilizan esta configuración.
Puedes seleccionar otro archivo con `NPM_CONFIG_USERCONFIG` o anular el registro con `NPM_CONFIG_REGISTRY`.
Las rutas relativas de user-config se resuelven a partir de tu directorio actual. No se requieren variables de npm específicas de Homebrew.

Los fallos de autenticación detienen la configuración. Corrige la configuración y ejecuta `vp` de nuevo; la configuración conserva tus opciones de gestión.

## Recuperarse de una configuración fallida {#recover-from-failed-setup}

Ejecuta `vp env doctor` para inspeccionar el ejecutable, el directorio de dependencias y los shims. Su verificación de dependencias de CLI lee archivos locales y no instala ni repara dependencias. Otras verificaciones pueden obtener metadatos de versiones de Node.js.

Corrige el problema de configuración, acceso o espacio en disco reportado, luego ejecuta `vp --help` para reintentar la configuración.
Para un error de lockfile, la [opción de recuperación del instalador](/guide/global-cli#vp-setup-skip-install-lockfile) también funciona con Homebrew:

```bash
VP_SETUP_SKIP_INSTALL_LOCKFILE=1 vp --help
```

Esto resuelve las dependencias sin el lockfile publicado. Una invocación posterior sin la anulación restaura las verificaciones normales del lockfile y puede reinstalar esas dependencias.
Si pnpm falla, el log reportado contiene su código de salida y los códigos de error reconocidos, sin la salida sin procesar del gestor de paquetes.
Los shims de herramientas configurados pueden ejecutar versiones de Node.js, gestores de paquetes y paquetes globales en caché independientemente de la reparación de dependencias de CLI.

## Cambiar una instalación existente {#switch-an-existing-installation}

Conserva tu configuración de directorios existente. La migración preserva tus preferencias, runtimes y paquetes globales, y actualiza sus shims al comando público `vp` de Homebrew.
No ejecutes `vp implode`: elimina esos datos de usuario. Abre una nueva terminal después de cambiar.

### Cambiar desde el instalador por script {#switch-from-the-script-installer}

Ejecuta los comandos `brew tap` y `brew install` anteriores. Luego invoca el ejecutable de Homebrew directamente, para que un shim de instalación por script existente no tenga precedencia:

```bash
"$(brew --prefix)/bin/vp" env setup --refresh
```

### Cambiar desde Homebrew Core {#switch-from-homebrew-core}

La fórmula `vite-plus` proporciona los mismos comandos y debe eliminarse antes de instalar el tap:

```bash
brew tap voidzero-dev/vite-plus https://github.com/voidzero-dev/vite-plus
brew uninstall vite-plus
brew install voidzero-dev/vite-plus/vp
"$(brew --prefix)/bin/vp" env setup --refresh
```

## Actualizar o desinstalar {#upgrade-or-remove}

```bash
brew upgrade voidzero-dev/vite-plus/vp
```

Ejecuta `vp` después de actualizar para preparar sus dependencias coincidentes. La configuración conserva tus preferencias.
`vp upgrade` identifica el tap oficial y te dirige a `brew upgrade voidzero-dev/vite-plus/vp`.

Para una eliminación completa, elimina tus datos de usuario antes de desinstalar el ejecutable:

```bash
vp implode
brew uninstall voidzero-dev/vite-plus/vp
```

`brew uninstall` por sí solo conserva los datos de usuario. En una máquina compartida, cada cuenta del sistema operativo puede eliminar sus propios datos con `vp implode` antes de que se elimine el ejecutable.

## Probar una compilación preliminar (preview) {#test-a-preview-build}

Establece `HOMEBREW_VP_PR_VERSION` con un número de PR o el SHA completo de un commit. El PR debe tener un `preview-build` publicado que incluya compatibilidad con el tap de Homebrew. Usa un SHA completo para mantener la instalación y la verificación en el mismo commit:

```bash
brew tap voidzero-dev/vite-plus https://github.com/voidzero-dev/vite-plus
HOMEBREW_VP_PR_VERSION="<full-commit-sha>" brew install voidzero-dev/vite-plus/vp
HOMEBREW_VP_PR_VERSION="<full-commit-sha>" brew test voidzero-dev/vite-plus/vp
```

Usa `brew reinstall` en lugar de `brew install` para reemplazar una compilación instalada del tap. Si la fórmula `vite-plus` está instalada, ejecuta primero `brew uninstall vite-plus`; esto conserva tus datos de usuario.
`brew test` utiliza datos de usuario temporales y no modifica la configuración de tu terminal. Ejecuta `vp` después para configurar la vista previa para tu cuenta. Si estás cambiando desde el instalador por script, [actualiza sus shims](#switch-from-the-script-installer) para usar el ejecutable de Homebrew.

Homebrew descarga solo el paquete nativo de vista previa desde el registry bridge y verifica su suma de comprobación. Resuelve los números de PR al último commit publicado, que puede diferir del head actual del PR.
El primer inicio instala las dependencias correspondientes desde el bridge. Un `NPM_CONFIG_REGISTRY` explícito debe apuntar a un registro que también sirva esos paquetes de vista previa.

El selector es específico para este tap. No modifica otras fórmulas de Homebrew, y no se necesita un cliente npm durante `brew install`.
Para probar cambios en la fórmula misma, primero haz checkout del PR en el repositorio del tap. Establece `HOMEBREW_NO_AUTO_UPDATE=1` para estos comandos para mantener ese checkout.

Para volver a un release estable, borra las anulaciones, restaura la rama `main` del tap si cambiaste su checkout y actualízalo antes de reinstalar:

```bash
unset HOMEBREW_VP_PR_VERSION HOMEBREW_NO_AUTO_UPDATE
git -C "$(brew --repository voidzero-dev/vite-plus)" switch main
brew update
brew reinstall voidzero-dev/vite-plus/vp
```

