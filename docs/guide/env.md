# Entorno

`vp env` gestiona las versiones de Node.js de forma global y por proyecto.

## Vista General

El modo gestionado está activado por defecto, por lo que `node`, `npm` y los shims relacionados se resuelven a través de Vite+ y seleccionan la versión correcta de Node.js para el proyecto actual.

Cuando un proyecto declara `packageManager` en `package.json`, los shims del gestor de paquetes correspondientes también usan esa versión exacta del gestor de paquetes. Por ejemplo, `packageManager: "npm@10.9.4"` hace que tanto `npm` como `npx` se ejecuten a través de npm 10.9.4. Los pares de alias siguen los shims de los gestores de paquetes instalados: `npm`/`npx`, `pnpm`/`pnpx`, `yarn`/`yarnpkg` y `bun`/`bunx`. Vite+ no traduce comandos que no coinciden, por lo que un proyecto fijado a `pnpm` todavía permite que `npm` recurra al npm que viene con el entorno de ejecución de Node.js resuelto.

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

- `vp env setup` crea o actualiza shims en `VP_HOME/bin` (y escribe los scripts de configuración por terminal en `~/.vite-plus/`).
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

En CI, `vp env use` puede ejecutarse sin inicialización de la terminal. Escribe un archivo temporal de sesión en `VP_HOME` para que las llamadas posteriores a shims en el mismo job puedan resolver la versión seleccionada de Node.js.

### Gestionar

- `vp env default` establece o muestra la versión global predeterminada de Node.js.
- `vp env pin` fija una versión de Node.js en el directorio actual.
- `vp env unpin` elimina `.node-version` del directorio actual.
- `vp env use` establece una versión de Node.js para la sesión actual de la terminal.
- `vp env install` instala una versión de Node.js.
- `vp env uninstall` elimina una versión instalada de Node.js.
- `vp env exec` ejecuta un comando con una versión específica de Node.js.
- `vp node` ejecuta un script de Node.js — un atajo para `vp env exec node`.

### Inspeccionar

- `vp env current` muestra el entorno resuelto actual.
- `vp env doctor` ejecuta diagnósticos del entorno.
- `vp env which` muestra qué ruta de herramienta se utilizará.
- `vp env list` muestra las versiones de Node.js instaladas localmente.
- `vp env list-remote` muestra las versiones de Node.js disponibles en el registro.

## Configuración del Proyecto

- Fija la versión de un proyecto con `.node-version`.
- Usa `vp install`, `vp dev` y `vp build` normalmente.
- Deja que Vite+ elija el entorno de ejecución adecuado para el proyecto.

## Ejemplos

```bash
# Configuración
vp env setup                  # Crear shims para node, npm, npx
vp env on                     # Usar Node.js gestionado por Vite+
vp env print                  # Imprimir fragmento de la terminal para esta sesión

# Gestionar
vp env pin lts                # Fijar el proyecto a la última versión LTS
vp env install                # Instalar la versión de .node-version o package.json
vp env default lts            # Establecer la versión global predeterminada
vp env use 20                 # Usar Node.js 20 para la sesión actual de la terminal
vp env use --unset            # Eliminar la anulación de la sesión

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

