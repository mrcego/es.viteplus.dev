# Ejecutar Binarios

Usa `vpx`, `vp exec` y `vp dlx` para ejecutar binarios sin cambiar entre instalaciones locales, paquetes descargados y herramientas específicas del proyecto.

## Vista General

`vpx` ejecuta un comando desde un paquete npm local o remoto. Puede ejecutar un paquete que ya esté disponible localmente, descargar un paquete bajo demanda o dirigirse a una versión explícita del paquete.

Usa los otros comandos de binarios cuando necesites un control más estricto:

- `vpx` busca un binario en los directorios `node_modules/.bin` locales, paquetes globales administrados por Vite+ y el `PATH` del sistema, en ese orden, y luego recurre a `vp dlx`. Con `pkg@version`, `--package/-p` o `--shell-mode`, se ejecuta a través de `vp dlx` directamente.
- `vp exec` ejecuta un comando desde los directorios `node_modules/.bin` locales, recurriendo a `PATH` si no se encuentra
- `vp dlx` ejecuta un binario de paquete sin añadirlo como dependencia.

## `vpx`

Usa `vpx` para ejecutar cualquier binario local o remoto:

```bash
vpx <pkg[@version]> [args...]
```

### Opciones

- `-p, --package <nombre>` instala uno o más paquetes adicionales antes de ejecutar el comando.
- `-c, --shell-mode` ejecuta el comando dentro de una terminal (shell).
- `-s, --silent` suprime la salida de Vite+ y solo muestra la salida del comando.

### Ejemplos

```bash
vpx eslint .
vpx create-vue my-app
vpx oxlint@1.85.0 --version
vpx -p cowsay -c 'echo "hola" | cowsay'
```

## `vp exec`

Usa `vp exec` para ejecutar herramientas ya instaladas en tu proyecto o disponibles en tu entorno.

```bash
vp exec <comando> [args...]
```

Ejemplos:

```bash
vp exec eslint .
vp exec tsc --noEmit
```

## `vp dlx`

Usa `vp dlx` para la ejecución única de un paquete sin añadirlo a las dependencias de tu proyecto.

```bash
vp dlx <paquete> [args...]
```

Ejemplos:

```bash
vp dlx create-vite
vp dlx oxlint@1.85.0 --version
```

