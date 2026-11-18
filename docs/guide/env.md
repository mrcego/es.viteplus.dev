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

El alias `lts` selecciona el lanzamiento LTS más reciente. El alias `latest` selecciona el lanzamiento estable más reciente, sea LTS o no, y omite versiones preliminares como `27.0.0-alpha.0.0.0`. Para usar una versión preliminar, especifica su versión exacta.

`devEngines.runtime` tiene mayor prioridad que `engines.node` porque declara el requisito del entorno de desarrollo, mientras que `engines.node` es un rango de soporte orientado al consumidor. `vp env doctor` advierte cuando las fuentes declaradas entran en conflicto.

::: tip Usar pnpm con la administración de entornos de ejecución de Vite+
pnpm también puede administrar el entorno de ejecución declarado en `devEngines.runtime`. Cuando tanto pnpm como Vite+ administran Node.js, pueden descargar la misma versión por separado o seleccionar versiones diferentes, causando un comportamiento inconsistente entre comandos.

Si tu proyecto utiliza Vite+ para administrar las versiones de Node.js y pnpm, añade estas configuraciones al `pnpm-workspace.yaml` del proyecto (pnpm 11+):

```yaml
runtimeOnFail: ignore
pmOnFail: ignore
```

[`runtimeOnFail`](https://pnpm.io/settings/cli#runtimeonfail) desactiva la administración automática de entornos declarados por parte de pnpm. [`pmOnFail`](https://pnpm.io/settings/cli#pmonfail) evita que pnpm cambie a la versión del gestor de paquetes declarada en `package.json`. Haz commit de estas opciones para que el proyecto comparta la misma política.

`runtimeOnFail: ignore` también afecta a otros entornos declarados, incluidos Bun y Deno. Si el proyecto depende de pnpm para administrarlos, tenlo en cuenta antes de habilitar esta opción. Cambiar un proyecto existente a esta política puede modificar entradas del runtime en `pnpm-lock.yaml` en la siguiente instalación; revisa y haz commit de esos cambios junto con la configuración.
:::

Cuando un proyecto declara `packageManager` (o `devEngines.packageManager`) en `package.json`, los shims de los gestores de paquetes correspondientes también utilizan esa versión. Por ejemplo, `packageManager: "npm@10.9.4"` hace que tanto `npm` como `npx` se ejecuten mediante npm 10.9.4. Por ejemplo, pnpm controla `pnpm`, `pnpx`, `pn` y `pnx`; invocar `npm` aún resuelve npm de forma independiente. Sin una selección de proyecto coincidente, un shim nombrado usa su versión predeterminada configurada y, de lo contrario, usa la última versión sin preguntar. El shim de npm recurre al npm incluido con Node. `vp env use npm` selecciona la última versión de npm independiente para la shell actual cuando no se ha configurado ninguna versión de proyecto ni valor predeterminado global.

`pn` ejecuta el mismo binario gestionado que `pnpm`, y `pnx` ejecuta el mismo binario gestionado que `pnpx` (`pnpm dlx`). Estos alias también funcionan con versiones gestionadas de pnpm anteriores a v11.

Una instalación nueva utiliza el diseño de plataforma dividido por defecto. En Unix, Vite+ almacena los runtimes administrados y los archivos relacionados en `~/.local/share/vite-plus`. Almacena los scripts de configuración en `~/.config/vite-plus` y los enlaces binarios (shims) en `~/.local/bin`. En Windows, estos van en `%LOCALAPPDATA%\vite-plus\data`, `%LOCALAPPDATA%\vite-plus\config` y `%LOCALAPPDATA%\vite-plus\bin`.

Configura `VP_HOME` para anular la raíz de datos (por ejemplo, en entornos CI o compartidos). Consulta el [CLI Global](/guide/global-cli#variables-de-instalacion) para ver el diseño del directorio y todas las opciones de ruta.

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

Esto cambia ambos componentes al modo primero el sistema. Vite+ prefiere las herramientas del sistema y recurre a instalaciones gestionadas como alternativa. Las configuraciones mixtas se componen: los lanzadores de gestores de paquetes que buscan Node.js a través de PATH reciben el runtime seleccionado por el modo de Node.

El uso de `pm` registra el modo seleccionado para todos los gestores de paquetes actualmente compatibles y reemplaza sus elecciones individuales. Un `on` o `off` sin alcance hace lo mismo a la vez que cambia Node.js.

## Comandos

### Configuración

- `vp env setup` crea los shims de herramientas y escribe scripts de configuración de shell.
- `vp env setup --refresh` recrea los shims de Vite+ y regenera los scripts de configuración de shell utilizando tus preferencias guardadas.
- `vp env on` / `vp env off` cambia entre el modo gestionado por Vite+ y el modo primero el sistema; añade `node`, `pm`, `npm`, `pnpm`, `yarn` o `bun` para acotar el cambio.
- `vp env print` imprime la configuración de PATH para ambos componentes; añade un selector para imprimir uno.

Las actualizaciones actualizan la configuración automáticamente. Abre una nueva terminal o recarga tu script de configuración de shell después.

#### Completado de shell

La CLI global admite completado con Tab en Bash, Zsh, Fish, Nushell y PowerShell. Ejecuta `vp env setup` y sigue las instrucciones de configuración del shell que imprime para habilitarlo. Presiona Tab para completar comandos, o nombres de tareas del proyecto después de `vp run` y `vpr`.

- **Zsh**: Ejecuta `autoload -Uz compinit; compinit` antes de cargar el script de configuración si tu shell no ha inicializado el completado.
- **Nushell**: El completado requiere `fish` en `PATH`. Usa Nushell 0.112.1 o posterior; consulta [Versión de Nushell](/guide/global-cli#version-de-nushell).

### Gestión de Versiones

- `vp env default` muestra el valor predeterminado global de Node.js y la versión de cada gestor de paquetes configurado. Las versiones solas configuran Node.js; las especificaciones calificadas como `pnpm@10.18.0` configuran el shim predeterminado de ese gestor de paquetes sin reemplazar los predeterminados de Bun, Yarn o npm. `--unset` borra todos los valores predeterminados a menos que se acote.
- `vp env default <lts|latest>` y las etiquetas de distribución del gestor de paquetes como `pnpm@latest` o `pnpm@latest-10` se vuelven a resolver en cada uso, por lo que el valor predeterminado sigue a la etiqueta, incluyendo las nuevas versiones mayores para `latest`. Otras versiones y rangos, como `24` o `pnpm@10`, se resuelven a una versión exacta cuando se configuran.
- `vp env pin` muestra o escribe fijaciones del proyecto. Las fijaciones de Node.js utilizan el directorio actual. Las fijaciones del gestor de paquetes utilizan el `package.json` de la raíz del workspace, o el `package.json` del proyecto actual fuera de un workspace. Fijar ambos componentes puede actualizar dos archivos diferentes.

  Los campos existentes en `.node-version` y `packageManager` de nivel superior se siguen actualizando para mantener la compatibilidad. Un `.nvmrc` existente se actualiza cuando es la fuente efectiva de Node en el directorio actual. Sus comentarios y demás contenido que no sea la versión se conservan. De lo contrario, Vite+ escribe la entrada coincidente en `devEngines`.

  Usa `--target node-version`, `--target nvmrc`, `--target dev-engines` o `--target package-manager` para elegir la fuente de fijación explícitamente. Esto no cambia el directorio del proyecto. La salida del gestor de paquetes muestra la ruta del archivo relativa al directorio de trabajo actual y el campo que se actualizó, o el objetivo antes de una confirmación de sobrescritura existente. Fijar en un directorio secundario no modifica un `.nvmrc` heredado.

- `vp env unpin` (alias de `vp env pin --unpin`) elimina ambas fijaciones efectivas de forma predeterminada. Agrega un selector para eliminar una. La eliminación de Node.js utiliza el directorio actual. La eliminación del gestor de paquetes utiliza el manifiesto de la raíz del workspace, o el manifiesto del proyecto actual fuera de un workspace. `--target` selecciona la fuente de fijación dentro de ese ámbito. La salida identifica el campo del gestor de paquetes eliminado o los campos comprobados cuando no se encuentra ninguna fijación coincidente. Las declaraciones de menor prioridad no se eliminan.
- `vp env use` activa el entorno completo del proyecto. Las especificaciones explícitas sobrescriben los componentes seleccionados; `--unset` borra ambos a menos que se acote.
- `vp env install` instala el entorno resuelto completo, un componente seleccionado o especificaciones explícitas.
- `vp env uninstall` elimina la versión de Node.js resuelta a partir de una versión o selector explícito, como `22` o `lts`. Los gestores de paquetes requieren una versión exacta calificada, como `pnpm@10.18.0`.
- `vp env clean` elimina los runtimes de Node.js no utilizados y todos los gestores de paquetes descargados.
- `vp env exec` ejecuta un comando con una versión específica de Node.js o del gestor de paquetes.
- `vp node` utiliza el entorno de ejecución de Node.js resuelto y expone la ruta del gestor de paquetes seleccionado a los procesos secundarios. Ejecuta Node.js tal cual, por lo que los archivos TypeScript solo reciben el stripping de tipos de Node.js; [`vpx <archivo>`](/guide/vpx#ejecutar-scripts) los ejecuta en el mismo entorno de ejecución con soporte completo de TypeScript.

### Inspección

- `vp env current` muestra el entorno resuelto actual.
- `vp env which` muestra la ruta del binario resuelto.
- `vp env list` lista las versiones instaladas localmente.
- `vp env list-remote` lista las versiones remotas disponibles.
- `vp env doctor` ejecuta diagnósticos del entorno. Agrega `node` para enfocarte en Node.js, `pm` para todos los gestores de paquetes, o `npm`, `pnpm`, `yarn` o `bun` para un gestor de paquetes específico.

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
vp env use --unset pm         # Eliminar todas las versiones de gestores de paquetes de la sesión

# Gestionar (global)
vp env default lts            # Usar siempre la última LTS, incluyendo nuevos majors
vp env default node@24        # Fijar el Node.js por defecto a una versión exacta
vp env default pnpm@10        # Fijar el pnpm por defecto a una versión exacta         # Eliminar solo la anulación de sesión del gestor de paquetes
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
