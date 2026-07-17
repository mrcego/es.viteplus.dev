# Entorno

`vp env` gestiona las versiones de Node.js de forma global y por proyecto.

## Vista General

El modo gestionado está activado por defecto, por lo que `node`, `npm` y los shims relacionados se resuelven a través de Vite+ y seleccionan la versión correcta de Node.js para el proyecto actual.

La versión de Node.js del proyecto se resuelve a partir de estas fuentes, en orden de prioridad:

1. El archivo `.node-version` (directorio actual o directorios padres)
2. `devEngines.runtime` en el `package.json` (el [estándar devEngines](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines))
3. `engines.node` en el `package.json`
4. El valor predeterminado global (`vp env default`), luego la última versión LTS

`devEngines.runtime` tiene mayor prioridad que `engines.node` porque declara el requisito del entorno de desarrollo, mientras que `engines.node` es un rango de soporte orientado al consumidor. `vp env doctor` advierte cuando las fuentes declaradas entran en conflicto.

Cuando un proyecto declara `packageManager` (o `devEngines.packageManager`) en `package.json`, los shims del gestor de paquetes correspondientes también usan esa versión exacta del gestor de paquetes. Por ejemplo, `packageManager: "npm@10.9.4"` hace que tanto `npm` como `npx` se ejecuten a través de npm 10.9.4. Los pares de alias siguen los shims de los gestores de paquetes instalados: `npm`/`npx`, `pnpm`/`pnpx`, `yarn`/`yarnpkg` y `bun`/`bunx`. Vite+ no traduce comandos que no coinciden, por lo que un proyecto fijado a `pnpm` todavía permite que `npm` recurra al npm que viene con el entorno de ejecución de Node.js resuelto.

Por defecto, Vite+ almacena su entorno de ejecución gestionado y los archivos relacionados en `~/.vite-plus`. Si es necesario, puedes anular esa ubicación con `VP_HOME`.

Si quieres mantener ese comportamiento, ejecuta:

```bash
vp env on
```

Esto habilita el modo gestionado, donde los shims siempre utilizan la instalación de Node.js gestionada por Vite+.

Si no quieres que Vite+ gestione Node.js primero, ejecuta:

```bash
vp env off
```

Esto cambia al modo de "sistema primero", donde los shims prefieren el Node.js de tu sistema y solo recurren al entorno de ejecución gestionado por Vite+ cuando sea necesario.

## Comandos

### Configuración

- `vp env setup` crea o actualiza shims en `VP_HOME/bin` (y escribe los scripts de configuración por terminal en `VP_HOME`).
- `vp env on` habilita el modo gestionado para que los shims siempre usen Node.js de Vite+.
- `vp env off` habilita el modo sistema primero para que los shims prefieran Node.js del sistema.
- `vp env print` imprime el fragmento de código de la terminal para la sesión actual.

PowerShell necesita hacer dot-source del script de configuración generado en la terminal actual antes de que `vp env use` pueda afectar solo a esa sesión:

```powershell
. "$env:USERPROFILE\.vite-plus\env.ps1"
```

Añade esa línea al final de tu `$PROFILE` de PowerShell para aplicarlo automáticamente en nuevas terminales. No requiere privilegios elevados.

Crea el archivo de perfil si aún no existe:

```powershell
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
```

Abre el archivo de perfil para editarlo:

```powershell
Invoke-Item $PROFILE
```

El símbolo del sistema de Windows (`cmd.exe`) no puede definir la función wrapper necesaria para que `vp env use` actualice la sesión actual de la terminal. Usa el comando generado `vp-use.cmd` en su lugar:

```batch
vp-use 20
node --version
vp-use --unset
```

Solo `vp env use` necesita este comando alternativo. Otros comandos `vp env` funcionan normalmente en el símbolo del sistema. `vp env setup` crea `vp-use.cmd` bajo `VP_HOME/bin` en Windows.

En CI, `vp env use` puede ejecutarse sin inicialización de la terminal. Escribe un archivo temporal de sesión en `VP_HOME` para que las llamadas posteriores a shims en el mismo job puedan resolver la versión seleccionada de Node.js.

### Gestionar

- `vp env default` establece o muestra la versión global predeterminada de Node.js.
- `vp env pin` fija una versión de Node.js en el directorio actual: si ya existe `.node-version`, se sigue actualizando; de lo contrario, la fijación se escribe en `package.json#devEngines.runtime`; `.node-version` solo se crea cuando el directorio no tiene `package.json`. Usa `--target node-version` o `--target dev-engines` para elegir explícitamente. Un `engines.node` existente nunca se modifica.
- `vp env unpin` elimina la fijación de la misma fuente en la que escribiría `vp env pin`.
- `vp env use` establece una versión de Node.js para la sesión actual de la terminal.
- `vp env install` instala una versión de Node.js.
- `vp env uninstall` elimina una versión instalada de Node.js.
- `vp env clean` elimina los entornos de ejecución de Node.js gestionados que no se utilicen, todos los gestores de paquetes descargados y la caché de Corepack.
- `vp env exec` ejecuta un comando con una versión específica de Node.js.
- `vp node` ejecuta un script de Node.js — un atajo para `vp env exec node`.

### Inspeccionar

- `vp env current` muestra el entorno resuelto actual.
- `vp env doctor` ejecuta diagnósticos del entorno.
- `vp env which` muestra qué ruta de herramienta se utilizará.
- `vp env list` muestra las versiones de Node.js instaladas localmente.
- `vp env list-remote` muestra las versiones de Node.js disponibles en el registro.

## Configuración del Proyecto

- Fija la versión de un proyecto con `vp env pin`.
- Usa `vp install`, `vp dev` y `vp build` normalmente.
- Deja que Vite+ elija el entorno de ejecución adecuado para el proyecto.

## Ejemplos

```bash
# Configuración
vp env setup                  # Crear shims para node, npm, npx, corepack
vp env on                     # Usar Node.js gestionado por Vite+
vp env print                  # Imprimir fragmento de la terminal para esta sesión

# Gestionar
vp env pin lts                # Fijar el proyecto a la última versión LTS
vp env install                # Instalar la versión de .node-version o package.json
vp env default lts            # Establecer la versión global predeterminada
vp env use 20                 # Usar Node.js 20 para la sesión actual de la terminal
vp env use --unset            # Eliminar la anulación de la sesión
vp env clean                  # Eliminar cachés gestionadas no utilizadas

# Inspeccionar
vp env current                # Mostrar el entorno resuelto actual
vp env current --json         # Salida JSON para automatización
vp env which node             # Mostrar qué binario de node se utilizará
vp env which npx              # Muestra el alias del gestor de paquetes fijado cuando packageManager coincide
vp env list-remote --lts      # Enumerar solo las versiones LTS

# Ejecutar
vp env exec --node lts npm i  # Ejecutar npm con la última LTS
vp env exec node -v           # Usar el modo shim con resolución automática de versión
vp node script.js             # Atajo: ejecuta un script de Node.js con la versión resuelta
vp node -e "console.log(1+1)" # Atajo: reenvía cualquier flag o argumento de node
```

## Espejo Personalizado de Node.js (Mirror)

Por defecto, Vite+ descarga Node.js desde `https://nodejs.org/dist`. Si estás detrás de un proxy corporativo o necesitas usar un espejo interno (por ejemplo, Artifactory), establece la variable de entorno `VP_NODE_DIST_MIRROR`:

```bash
# Instala una versión específica desde tu espejo personalizado
VP_NODE_DIST_MIRROR=https://mi-espejo.ejemplo.com/nodejs/dist vp env install 22

# Establece la versión global predeterminada usando un espejo personalizado
VP_NODE_DIST_MIRROR=https://mi-espejo.ejemplo.com/nodejs/dist vp env default lts

# Establécelo permanentemente en el perfil de tu terminal (.bashrc, .zshrc, etc.)
echo 'export VP_NODE_DIST_MIRROR=https://mi-espejo.ejemplo.com/nodejs/dist' >> ~/.zshrc
```

## Corepack

Vite+ crea un shim de `corepack` por defecto, por lo que corepack funciona sin necesidad de una instalación del sistema de Node.js:

- En Node.js 24 y versiones anteriores, el shim ejecuta el corepack empaquetado con la versión de Node.js resuelta.
- En Node.js 25 y versiones posteriores, donde corepack ya no viene empaquetado, Vite+ instala corepack como un paquete global gestionado en el primer uso. Solo se vincula el binario `corepack`; ejecuta `vp install -g corepack` tú mismo si también deseas que los ejecutores pnpm/yarn del paquete se expongan directamente.
- Si instalas corepack explícitamente con `vp install -g corepack`, siempre se preferirá esa instalación.

`corepack enable` normalmente crea los ejecutores `pnpm`/`yarn` junto al binario de corepack, los cuales bajo Vite+ no estarían en el `PATH`. El shim soluciona esto estableciendo de forma predeterminada `--install-directory` en `VP_HOME/bin`, de modo que después de `corepack enable` los ejecutores estén disponibles en todas partes y sigan resolviendo las versiones de Node.js y del gestor de paquetes del proyecto:

```bash
corepack enable               # pnpm y yarn ahora se resuelven a través de corepack
corepack disable              # Elimina los ejecutores de pnpm/yarn nuevamente
```

Los ejecutores hacen referencia a la copia de corepack que los creó. Si esa copia se elimina posteriormente (por ejemplo, al desinstalar la versión de Node.js con la que se envió), vuelve a ejecutar `corepack enable` para recrearlos.

Los shims que pertenecen a Vite+ (`npm`, `npx` y los binarios instalados con `vp install -g`) están protegidos: si corepack los elimina o reemplaza, Vite+ los restaura e imprime una advertencia.

## Verificación de Firmas de Node.js

Al instalar Node.js desde la distribución oficial de `nodejs.org`, Vite+ descarga el archivo `SHASUMS256.txt.asc` firmado con PGP y lo verifica contra las claves de lanzamiento de Node.js empaquetadas antes de confiar en cualquier suma de verificación. Esto protege contra un archivo `SHASUMS256.txt` manipulado que se haya emparejado con un archivo comprimido malicioso correspondiente. La suma de verificación SHA-256 del archivo comprimido descargado siempre se verifica después.

Los espejos personalizados (`VP_NODE_DIST_MIRROR`) que publican solo el archivo `SHASUMS256.txt` simple recurren a la verificación basada únicamente en sumas de verificación. Un espejo que sí publica un archivo `.asc` seguirá teniendo su firma verificada, y una firma no válida generará un error fatal.

Si un problema futuro con el llavero (keyring) o los certificados bloquea las descargas, establece `VP_NODE_SKIP_SIGNATURE_VERIFY` para omitir temporalmente la verificación de PGP. La suma de verificación SHA-256 se seguirá verificando y Vite+ imprimirá una advertencia cuando se omita la comprobación de firmas:

```bash
VP_NODE_SKIP_SIGNATURE_VERIFY=1 vp env install 22
```


