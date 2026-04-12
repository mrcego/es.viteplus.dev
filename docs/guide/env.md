# Entorno

`vp env` gestiona las versiones de Node.js de forma global y por proyecto.

## Vista General

El modo gestionado está activado por defecto, por lo que `node`, `npm` y los shims relacionados se resuelven a través de Vite+ y seleccionan la versión correcta de Node.js para el proyecto actual.

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

- `vp env setup` crea o actualiza shims en `VP_HOME/bin`.
- `vp env on` habilita el modo gestionado para que los shims siempre usen Node.js de Vite+.
- `vp env off` habilita el modo sistema primero para que los shims prefieran Node.js del sistema.
- `vp env print` imprime el fragmento de código de la terminal para la sesión actual.

### Gestionar

- `vp env default` establece o muestra la versión global predeterminada de Node.js.
- `vp env pin` fija una versión de Node.js en el directorio actual.
- `vp env unpin` elimina `.node-version` del directorio actual.
- `vp env use` establece una versión de Node.js para la sesión actual de la terminal.
- `vp env install` instala una versión de Node.js.
- `vp env uninstall` elimina una versión instalada de Node.js.
- `vp env exec` ejecuta un comando con una versión específica de Node.js.

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
vp env list-remote --lts      # Enumerar solo las versiones LTS

# Ejecutar
vp env exec --node lts npm i  # Ejecutar npm con la última LTS
vp env exec node -v           # Usar el modo shim con resolución automática de versión
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

