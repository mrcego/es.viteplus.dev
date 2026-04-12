# Ejecutar Binarios

Usa `vpx`, `vp exec` y `vp dlx` para ejecutar binarios sin cambiar entre instalaciones locales, paquetes descargados y herramientas específicas del proyecto.

## Vista General

`vpx` ejecuta un comando desde un paquete npm local o remoto. Puede ejecutar un paquete que ya esté disponible localmente, descargar un paquete bajo demanda o dirigirse a una versión explícita del paquete.

Usa los otros comandos de binarios cuando necesites un control más estricto:

- `vpx` resuelve primero un binario de paquete localmente por defecto y lo descarga si no lo encuentra; con `pkg@version`, `--package/-p` o `--shell-mode`, se ejecuta a través de `vp dlx`.
- `vp exec` ejecuta un binario desde el directorio `node_modules/.bin` del proyecto actual.
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
vpx typescript@5.5.4 tsc --version
vpx -p cowsay -c 'echo "hola" | cowsay'
```

## `vp exec`

Usa `vp exec` cuando el binario deba provenir del proyecto actual, por ejemplo, un binario de una dependencia instalada en `node_modules/.bin`.

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
vp dlx typescript tsc --version
```

