# Ejecutar Binarios y Scripts

Usa `vpx`, `vp exec` y `vp dlx` para ejecutar binarios de paquetes y scripts sin alternar entre instalaciones locales, paquetes descargados y herramientas específicas del proyecto.

## Vista General

`vpx` realiza una de dos acciones, según su primer argumento:

- [`vpx <paquete>`](#ejecutar-binarios-de-paquetes) ejecuta un binario desde un paquete npm local o remoto, como `npx`.
- [`vpx <archivo>`](#ejecutar-scripts) ejecuta un archivo TypeScript o JavaScript, como `tsx`.

Los otros comandos ofrecen un control más estricto sobre el origen del binario:

- [`vp exec`](#vp-exec) ejecuta un comando desde los directorios locales `node_modules/.bin`, recurriendo a `PATH`.
- [`vp dlx`](#vp-dlx) ejecuta el binario de un paquete sin agregarlo como dependencia.

`vpx -v` o `vpx --version` imprime la versión de Vite+, al igual que `vp --version`. En scripts de `package.json`, `vpx` imprime la versión del paquete `vite-plus` del proyecto.

## Ejecutar Binarios de Paquetes

```bash
vpx [opciones] <paquete[@versión]> [argumentos...]
```

`vpx` busca el binario en los directorios locales `node_modules/.bin`, en los paquetes globales administrados por Vite+ y en el `PATH` del sistema, en ese orden. Si ninguno lo tiene, `vpx` descarga el paquete y lo ejecuta mediante `vp dlx`. Con `paquete@versión`, `--package/-p` o `--shell-mode`, se ejecuta directamente mediante `vp dlx`.

### Opciones

- `-p, --package <nombre>` instala uno o más paquetes adicionales antes de ejecutar el comando.
- `-c, --shell-mode` ejecuta el comando dentro de una terminal (shell).
- `-s, --silent` oculta la salida de Vite+ y solo muestra la del comando ejecutado.

### Ejemplos

```bash
vpx eslint .
vpx create-vue my-app
vpx oxlint@1.85.0 --version
vpx -p cowsay -c 'echo "hola" | cowsay'
```

Los gestores de paquetes y `vp run` colocan `node_modules/.bin` en primer lugar en el `PATH`, por lo que los scripts de `package.json` ejecutan el binario `vpx` del paquete `vite-plus` del proyecto. Ese binario no necesita la CLI global y busca únicamente en los directorios locales `node_modules/.bin`. Ejecuta un binario instalado directamente, al igual que el `vpx` global, y `paquete@versión`, `--package/-p` o `--shell-mode` a través de `vp dlx`. Si un binario no está instalado, se produce un error para que los scripts nunca descarguen un paquete por accidente:

```
error: vpx: 'eslint' is not installed in node_modules
note: Add it to devDependencies, or run `vp dlx eslint` to download and run it.
```

## Ejecutar Scripts

```bash
vpx [--tsconfig <ruta>] [opciones de node] <archivo> [argumentos...]
```

`vpx` ejecuta archivos TypeScript y JavaScript directamente, sin necesidad de dependencias como `tsx` o `ts-node`. Los scripts se ejecutan en la versión de Node.js del proyecto (la misma que selecciona [`vp node`](/guide/env)) utilizando el cargador [oxc-node](https://github.com/oxc-project/oxc-node) que incluye Vite+.

```bash
vpx ./scripts/seed.ts --dry-run
vpx scripts/build.mts
vpx --watch ./server.ts
vpx --env-file=.env ./scripts/migrate.ts
vpx --tsconfig tsconfig.scripts.json ./tools/gen.ts
```

### Archivos y Nombres de Paquetes

`vpx` ejecuta su argumento como un archivo cuando es:

- una ruta (que comienza con `./`, `../` o `/`; en Windows también `.\`, `..\`, una unidad como `C:\` o `\\`) que termina en `.ts`, `.mts`, `.cts`, `.tsx`, `.js`, `.mjs`, `.cjs` o `.jsx`
- un nombre con una de esas extensiones que existe como archivo, como `scripts/seed.ts`
- una ruta a un archivo cuyo shebang ejecuta `vpx` (consulta [Scripts Shebang](#scripts-shebang))

Una ruta inexistente o un nombre inexistente con extensión TypeScript produce un error: `vpx` nunca descarga un paquete en esos casos. Tras opciones de Node.js, como en `vpx --watch seed.ts`, solo una ruta inexistente es informada por `vpx`; Node.js informa el nombre inexistente por sí mismo. Un nombre con extensión JavaScript que no sea un archivo, como `highlight.js`, ejecuta el paquete npm de dicho nombre.

### Sintaxis Compatible

- Sintaxis de TypeScript que el stripping de tipos de Node.js rechaza: enums, namespaces, parameter properties y JSX.
- Decoradores con `"experimentalDecorators": true`, incluyendo `emitDecoratorMetadata`; decoradores estándar y `accessor` funcionan en clases sin esa opción.
- `.env` mediante `--env-file`, opciones de Node.js antes del archivo y argumentos del script después de él.
- Funciona tanto con módulos ES (`"type": "module"`, `.mts`, `.mjs`) como con CommonJS (`.cts`, `.cjs`).

Para usar decoradores legacy, activa `"experimentalDecorators": true` en el tsconfig más cercano. Para emitir metadatos de tipos para inyección de dependencias con TypeORM o reflect-metadata, activa también `"emitDecoratorMetadata": true`.

### Opciones

Pasa las opciones de Node.js antes del archivo y los argumentos del script después de él:

```bash
vpx --inspect --env-file=.env ./server.ts --port 3000
```

### Scripts Shebang

Haz ejecutables los scripts en Linux y macOS con este shebang:

```typescript
#!/usr/bin/env vpx
console.log('¡Hola desde un script TypeScript ejecutable!');
```

### En Scripts de `package.json`

```json [package.json]
{
  "scripts": {
    "seed": "vpx ./scripts/seed.ts",
    "dev:server": "vpx --watch ./src/server.ts"
  }
}
```

### Modo Observador (Watch Mode)

```bash
vpx --watch <archivo>
```

`vpx --watch` reinicia el script cuando el archivo, un archivo que importe (incluyendo tipos o paquetes locales del workspace) o su tsconfig cambian. Se ejecuta en el observador nativo de oxc-node, el mismo motor de alta velocidad que impulsa Oxlint, con estas opciones:

- `--include <glob>` también vigila los archivos coincidentes, y `--exclude <glob>` nunca los vigila.
- `--clear-screen=false` (o `--no-clear-screen`) conserva la salida de ejecuciones anteriores; la pantalla solo se borra en una terminal interactiva.
- `--kill-signal <señal>` detiene el script antes de una reejecución (por defecto `SIGTERM`), y `--kill-timeout <ms>` fuerza su terminación tras ese tiempo (por defecto 5000).
- `--rerun-on-enter=false` (o `--no-rerun-on-enter`) deja stdin disponible para el script.
- `--poll[=<ms>]` sondea archivos en lugar de usar eventos del sistema de archivos, ideal para Docker, WSL y unidades de red.
- `--tsconfig <ruta>` aplica un único tsconfig a cada archivo, igual que para `vpx <archivo>`.

Las opciones de `tsx watch` `--ignore` y `--no-cache` y su variable `CHOKIDAR_USEPOLLING` también funcionan (`--no-cache` no hace nada ya que `vpx` no tiene caché de transformación), al igual que las opciones de modo watch de Node.js `--watch-preserve-output` y `--watch-kill-signal`. `--watch-path`, que iniciaría el modo watch de Node.js, muestra un error indicando usar `--include`, al igual que `--test`, `--eval` y otras opciones que no ejecutan un archivo.

### tsconfig

`vpx` lee las opciones del compilador desde un tsconfig pero no realiza comprobación de tipos con él. Cada archivo utiliza el `tsconfig.json` más cercano ubicado por encima de él que lo incluya a través de `files`, `include`, `exclude` o `references` del proyecto, tal como lo hace `tsc`, y se sigue `extends`. Los archivos en `node_modules` no usan tsconfig, y tampoco lo hace un archivo no incluido en ningún tsconfig, por lo que recibe los valores predeterminados. Dicho archivo aún resuelve alias `paths` mediante el `tsconfig.json` más cercano superior, igual que tsx: con un tsconfig raíz cuyo `include` sea `["src"]`, un script en `scripts/` puede importar los mismos alias que `src/`. Dado que la configuración depende de la ubicación del archivo y no del directorio de trabajo actual, `vpx` compila un archivo de la misma manera sin importar desde dónde se ejecute.

Pasa `--tsconfig <ruta>` para forzar una configuración en todos los archivos del script:

```bash
vpx --tsconfig tsconfig.scripts.json ./tools/gen.ts
```

La ruta se resuelve de forma relativa al directorio de trabajo actual.

### JSX

`vpx` compila JSX en archivos `.jsx` y `.tsx`, en código JavaScript generado por TypeScript y en archivos que contengan un comentario `/** @jsxImportSource … */`.

Sin una opción `jsx` en el tsconfig, `vpx` utiliza el runtime automático: transforma `<div />` en llamadas a `jsx('div', ...)` importadas desde `react/jsx-runtime`. Para configurar el runtime para otra librería:

- Configura `"jsx": "react-jsx"` y `"jsxImportSource": "preact"` (o `vue`, `hono/jsx`, etc.) en el tsconfig del archivo.
- O añade `/** @jsxImportSource preact */` al inicio del archivo.

Para usar la compilación clásica (`React.createElement`), establece `"jsx": "react"` en el tsconfig. Las opciones de tsconfig `jsxFactory` y `jsxFragmentFactory` personalizan el identificador de fábrica (por ejemplo, `h` y `Fragment`).

El JSX que depende de un plugin del compilador no está admitido. `vpx` compila JSX únicamente según la especificación del compilador de TypeScript.

### Venir desde tsx

`vp migrate` reescribe los comandos tsx en los scripts de `package.json` hacia `vpx` y elimina la devDependency `tsx` una vez que nada la usa; consulta [tsx a `vpx`](/guide/migrate-rules#tsx-a-vpx). La mayoría de los scripts que se ejecutan con tsx funcionan con `vpx` sin cambios. Estas diferencias pueden requerir ajustes:

- **Valor predeterminado de JSX**: sin una opción `jsx` en tsconfig, tsx compila JSX a `React.createElement()`, lo que requiere `React` en el ámbito, mientras que `vpx` utiliza el runtime automático. Establece `"jsx": "react"` para conservar la salida clásica. Debido a este valor por defecto, tsx también ignora un comentario `/** @jsxImportSource … */` solitario a menos que el archivo tenga `/** @jsxRuntime automatic */` o el tsconfig establezca `"jsx": "react-jsx"`; `vpx` aplica el comentario por sí mismo.
- **Archivos `.cts` con `import` o `export`**: tsx los compila a CommonJS, mientras que `vpx` reporta un error. Cambia el nombre del archivo a `.mts`, o escríbelo con `import x = require()` y `export =`.
- **Archivos con `import` y sintaxis CommonJS**: en paquetes sin `"type": "module"`, tsx permite mezclar `import` con `__dirname`, `__filename`, `require()` o `module.exports`. `vpx` ejecuta archivos con sintaxis de módulo ES como módulos ES, donde los identificadores CommonJS no están definidos. Reemplaza `__dirname` con `import.meta.dirname` o añade `"type": "module"` a `package.json`.
- **Resolución de `require()`**: tsx asigna `require('./a.js')` a `a.ts` y aplica los `paths` de tsconfig a `require()`. `vpx` resuelve `require()` tal como lo hace Node.js, por lo que debes escribir la extensión `.ts` y usar los alias de `paths` únicamente con `import`.
- **Señales**: tsx transforma `SIGINT` y `SIGTERM` en códigos de salida 130 y 143 y ejecuta los controladores `process.on('exit')` primero. Bajo `vpx`, la señal finaliza el script tal como ocurre en Node.js, por lo que debes limpiar en un controlador `process.on('SIGINT')` o `process.on('SIGTERM')`.
- **Versión de Node.js**: `vpx` requiere Node.js `^22.18.0 || ^24.11.0 || >=26.0.0`, mientras que tsx también se ejecuta en versiones más antiguas.
- **Modo observador (Watch mode)**: `tsx watch` se convierte en `vpx --watch`, que admite las opciones de tsx watch (consulta [Modo Observador](#modo-observador-watch-mode)). También vuelve a ejecutar el script ante cambios en tsconfig y cuando se crea un archivo buscado por una importación fallida, casos que tsx watch pasa por alto.
- **Eval, REPL y `--check`**: `vpx --eval`, el REPL y `vpx --check` no transforman TypeScript.
- **`node --import tsx`**: `vpx` no tiene equivalente para herramientas que deban iniciar `node` por sí mismas.
- **Otros cargadores**: elimina `--import tsx` de `NODE_OPTIONS`. Dos cargadores registrados simultáneamente compiten por los mismos archivos.

## `vp exec`

Usa `vp exec` para ejecutar herramientas ya instaladas en tu proyecto o disponibles en tu entorno.

```bash
vp exec <comando> [argumentos...]
```

Ejemplos:

```bash
vp exec eslint .
vp exec tsc --noEmit
```

## `vp dlx`

Usa `vp dlx` para la ejecución única de un paquete sin agregarlo a las dependencias de tu proyecto.

```bash
vp dlx <paquete> [argumentos...]
```

Ejemplos:

```bash
vp dlx create-vite
vp dlx oxlint@1.85.0 --version
```
