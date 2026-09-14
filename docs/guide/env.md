# Entorno

`vp env` gestiona entornos de Node.js y de gestores de paquetes tanto de forma global como por proyecto.

## Vista General

El modo gestionado está activado por defecto, por lo que `node`, `npm`, `npx`, `pnpm`, `pnpx`, `yarn`, `yarnpkg`, `bun`, `bunx`, `vpx` y los shims relacionados se resuelven a través de Vite+ y seleccionan la versión correcta para el proyecto actual.

La versión de Node.js del proyecto se resuelve a partir de estas fuentes, en orden de prioridad:

1. `.nvmrc` cuando no se declaran fuentes de mayor prioridad y ya existía un pin antes de la migración
2. El archivo `.node-version` (directorio actual o directorios padres)
3. `devEngines.runtime` en el `package.json` (el [estándar devEngines](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines))
4. `engines.node` en el `package.json`
5. El valor predeterminado global (`vp env default node`), luego la última versión LTS

`devEngines.runtime` tiene mayor prioridad que `engines.node` porque declara el requisito del entorno de desarrollo, mientras que `engines.node` es un rango de soporte orientado al consumidor. `vp env doctor` advierte cuando las fuentes declaradas entran en conflicto.

Cuando un proyecto declara `packageManager` (o `devEngines.packageManager`) en `package.json`, los shims de los gestores de paquetes correspondientes también utilizan esa versión. Por ejemplo, `packageManager: "npm@10.9.4"` hace que tanto `npm` como `npx` se ejecuten mediante npm 10.9.4. Los pares de alias siguen los shims de gestores de paquetes instalados: `npm`/`npx`, `pnpm`/`pnpx`, `yarn`/`yarnpkg` y `bun`/`bunx`. Sin una declaración de gestor de paquetes, invocar `pnpm`, `yarn` o `bun` utiliza la última versión sin solicitar confirmación. La versión resuelta se almacena en caché durante una hora y una caché expirada permanece disponible cuando no se puede acceder al registro. Vite+ no traduce comandos que no coincidan, por lo que un proyecto fijado a `pnpm` todavía permite que `npm` recurra al npm que viene con el runtime de Node.js resuelto.

Una instalación nueva utiliza el diseño de plataforma dividido por defecto. En Unix, Vite+ almacena los runtimes administrados y los archivos relacionados en `~/.local/share/vite-plus`. Almacena los scripts de configuración en `~/.config/vite-plus` y los enlaces binarios (shims) en `~/.local/bin`. En Windows, estos van en `%LOCALAPPDATA%\vite-plus\data`, `%LOCALAPPDATA%\vite-plus\config` y `%LOCALAPPDATA%\vite-plus\bin`.

Configura `VP_HOME` para anular la raíz de datos (por ejemplo, en entornos CI o compartidos). Consulta las [Variables de Entorno del Instalador](/guide/installer-env-vars) para ver el diseño del directorio y todas las opciones de ruta.

Vite+ respeta los estándares `XDG_DATA_HOME` y `XDG_CONFIG_HOME` en Unix.

## Modos de Operación

Los shims de Vite+ operan en uno de dos modos:

### Modo Gestionado (Predeterminado)

Los shims resuelven las versiones de Node.js y del gestor de paquetes a través de Vite+. Si la versión requerida no está instalada localmente, Vite+ la descarga automáticamente.

El modo gestionado es el comportamiento predeterminado después de instalar Vite+. Puedes activarlo explícitamente con:

```bash
vp env on
```

### Modo Primero el Sistema (System-First)

Los shims buscan en tu `PATH` un ejecutable del sistema fuera del directorio de shims de Vite+. Si se encuentra uno, se utiliza directamente. Las versiones administradas por Vite+ solo se utilizan como respaldo si no hay ninguna instalación del sistema disponible.

```bash
vp env off
```

Esto cambia al modo primero el sistema, donde los shims prefieren el Node.js de tu sistema y solo usan las versiones de Vite+ cuando no se encuentra ningún binario en el sistema.

## Comandos

### Configuración

- `vp env setup` crea o actualiza los shims `node`, `npm`, `npx`, `pnpm`, `pnpx`, `yarn`, `yarnpkg`, `bun`, `bunx`, `vpx` y `vpr` en el directorio bin resuelto. Escribe scripts de configuración de shell en el directorio de configuración.
- `vp env on` habilita el modo gestionado para que los shims siempre usen Node.js y gestores de paquetes gestionados por Vite+.
- `vp env off` habilita el modo primero el sistema para que los shims prefieran primero las herramientas del sistema.
- `vp env print` imprime el fragmento de shell para la sesión actual.

### Gestión de Versiones

- `vp env pin` fija una versión para el proyecto actual escribiendo `.node-version` o `packageManager` en `package.json`.
- `vp env unpin` elimina la versión fijada para el proyecto actual.
- `vp env default` establece la versión predeterminada global para Node.js o para un gestor de paquetes.
- `vp env use` establece una versión para la sesión de shell actual.
- `vp env install` instala una versión de Node.js o gestor de paquetes.
- `vp env uninstall` elimina una versión instalada.
- `vp env clean` elimina los runtimes de Node.js no utilizados y todos los gestores de paquetes descargados.
- `vp env exec` ejecuta un comando con una versión específica de Node.js o del gestor de paquetes.
- `vp node` ejecuta un script de Node.js — atajo para `vp env exec node`.

### Inspección

- `vp env current` muestra el entorno resuelto actual.
- `vp env which` muestra la ruta del binario resuelto.
- `vp env list` lista las versiones instaladas localmente.
- `vp env list-remote` lista las versiones remotas disponibles.
- `vp env doctor` verifica la configuración del entorno y advierte sobre problemas.

## Fijar Versiones del Proyecto

Fija la versión de Node.js para un proyecto:

```bash
vp env pin 22                  # Escribe 22.x.x en .node-version
vp env pin 22.12.0             # Escribe 22.12.0 exacto en .node-version
vp env pin --target dev-engines 22 # Escribe en devEngines.runtime en package.json
vp env pin --target engines 22 # Escribe en engines.node en package.json
```

Fija versiones de gestores de paquetes:

```bash
vp env pin pnpm@10             # Escribe la última versión 10 en packageManager
vp env pin pnpm@10.18.0        # Escribe la versión exacta en packageManager
vp env pin --target dev-engines pnpm@10 # Escribe en devEngines.packageManager
```

Desfijar versiones:

```bash
vp env unpin                   # Elimina .node-version
vp env unpin --target all      # Elimina .node-version y declaraciones en package.json
vp env unpin pnpm              # Elimina la declaración de pnpm en package.json
```

## Ejemplos Rápidos

```bash
# Configuración
vp env setup                  # Crear shims de Node.js y gestores de paquetes
vp env on                     # Usar Node.js y gestores de paquetes gestionados por Vite+
vp env print                  # Imprimir fragmento de shell para esta sesión

# Fijar versiones
vp env pin 22                 # Fijar Node.js a la versión 22 para este proyecto
vp env pin pnpm@10            # Fijar pnpm a la versión 10 para este proyecto
vp env unpin                  # Desfijar la versión de Node.js

# Gestión
vp env install 22             # Instalar Node.js 22
vp env default 22             # Establecer la versión global de Node.js
vp env default pnpm@10        # Establecer la versión global de pnpm
vp env use 20 pnpm@10         # Anular ambos componentes para esta shell
vp env use --unset pm         # Eliminar solo la anulación de sesión del gestor de paquetes
vp env clean                  # Eliminar versiones no utilizadas

# Inspección
vp env current                # Mostrar el entorno resuelto actual
vp env current --json         # Salida JSON para automatización
vp env which node             # Mostrar qué binario de node se usará
vp env which npx              # Mostrar el alias del gestor de paquetes fijado
vp env list                   # Mostrar cada componente instalado localmente
vp env list node              # Mostrar solo instalaciones de Node.js
vp env list-remote --lts      # Listar solo versiones LTS de Node.js

# Ejecución
vp env exec --node lts --package-manager pnpm@10 pnpm install
vp env exec node -v           # Usar modo shim con resolución automática de versiones
vp node script.js             # Atajo: ejecutar un script de Node.js con la versión resuelta
vp node -e "console.log(1+1)" # Atajo: reenviar cualquier flag o argumento de node
```

## Salida JSON

La salida JSON para `current`, `list` y `list-remote` está organizada por componente. `current --json` devuelve objetos hermanos `node` y `package_manager`:

```json
{
  "node": {
    "version": "22.0.0",
    "source": "devEngines.runtime",
    "source_path": "/project/package.json",
    "project_root": "/project",
    "bin_path": "/home/.vite-plus/js_runtime/node/22.0.0/bin/node",
    "installed": true,
    "mode": "managed"
  },
  "package_manager": {
    "name": "pnpm",
    "version": "10.18.0",
    "source": "packageManager",
    "source_path": "/project/package.json",
    "project_root": "/project",
    "bin_paths": {
      "pnpm": "/home/.vite-plus/package_manager/pnpm/10.18.0/pnpm/bin/pnpm",
      "pnpx": "/home/.vite-plus/package_manager/pnpm/10.18.0/pnpm/bin/pnpx"
    },
    "installed": true,
    "mode": "managed"
  }
}
```

`list --json` y `list-remote --json` agrupan los arreglos de componentes:

```json
{
  "node": [],
  "package_managers": {
    "npm": [],
    "pnpm": [],
    "yarn": [],
    "bun": []
  }
}
```

Los selectores omiten los campos de nivel superior o las familias de gestores de paquetes no seleccionados. El listado del registro es todo-o-error: Vite+ no imprime ningún resultado parcial cuando falla cualquier solicitud al registro seleccionado.

## Espejo Personalizado de Node.js

Por defecto, Vite+ descarga Node.js desde `https://nodejs.org/dist`. Si estás detrás de un proxy corporativo o necesitas usar un espejo interno (por ejemplo, Artifactory), establece la variable de entorno `VP_NODE_DIST_MIRROR`:

```bash
export VP_NODE_DIST_MIRROR="https://custom-mirror.example.com/nodejs"
```
