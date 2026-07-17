# Variables de Entorno del Instalador

Los instaladores de Vite+ (`vp-setup.exe`, `install.ps1` e `install.sh`) y la CLI `vp` instalada leen las variables de entorno detalladas en esta página.

## Variables de Instalación

Estas variables controlan los scripts del instalador y el instalador independiente de Windows (`vp-setup.exe`).

### `VP_VERSION`

- **Propósito**: Versión a instalar
- **Predeterminado**: `latest`
- **Equivalente en CLI**: `--version`
- **Ejemplo**:

  ```bash
  # Unix
  curl -fsSL https://vite.plus | VP_VERSION=1.2.3 bash
  ```

  ```powershell
  # PowerShell
  $env:VP_VERSION = "1.2.3"; irm https://vite.plus/ps1 | iex
  ```

### `VP_HOME`

- **Propósito**: Directorio de instalación; la CLI instalada lee esta misma variable como el directorio de inicio de Vite+ (consulta [Entorno](/guide/env))
- **Predeterminado**: `~/.vite-plus` (Unix) o `%USERPROFILE%\.vite-plus` (Windows)
- **Equivalente en CLI**: `--install-dir`
- **Ejemplo**:

  ```bash
  # Unix
  curl -fsSL https://vite.plus | VP_HOME=/opt/vite-plus bash
  ```

  ```powershell
  # PowerShell
  $env:VP_HOME = "D:\vite-plus"; irm https://vite.plus/ps1 | iex
  ```

### `NPM_CONFIG_REGISTRY`

- **Propósito**: URL del registro de npm personalizado
- **Predeterminado**: `https://registry.npmjs.org`
- **Equivalente en CLI**: `--registry`
- **Ejemplo**:
  ```bash
  curl -fsSL https://vite.plus | NPM_CONFIG_REGISTRY=https://registry.npmmirror.com bash
  ```

### `VP_NODE_MANAGER`

- **Propósito**: Controlar la configuración del gestor de versiones de Node.js durante la instalación
- **Valores**: `yes` o `no`
- **Predeterminado**: Autodetectado
- **Equivalente en CLI**: `--no-node-manager` (invertido)
- **Ejemplo**:
  ```bash
  # Omitir la configuración del gestor de Node.js en CI
  curl -fsSL https://vite.plus | VP_NODE_MANAGER=no bash
  ```

### `VP_PR_VERSION`

- **Propósito**: Instalar una compilación de vista previa (preview) desde un pull request o un commit SHA
- **Valores**: Número de PR o commit SHA
- **Predeterminado**: Ninguno
- **Detalles**: [Vista Previa Global de `vp`](/guide/upgrade#global-vp-preview)

### Variables de desarrollo

Al desarrollar Vite+ en sí, `VP_LOCAL_TGZ` (ruta a un archivo local `vite-plus.tgz`) y `VP_LOCAL_BINARY` (ruta a un binario `vp` local) suministran una compilación local al instalador. Los instaladores también configuran `VP_INSTALL_STOP` por sí mismos; no la configures manualmente.

## Variables en Tiempo de Ejecución

Estas variables configuran la CLI de Vite+ instalada. `VP_HOME` (arriba) también se aplica en tiempo de ejecución.

### `VP_NODE_DIST_MIRROR`

- **Propósito**: URL del espejo de distribución de Node.js
- **Predeterminado**: `https://nodejs.org/dist`
- **Detalles**: [Espejo Personalizado de Node.js](/guide/env#espejo-personalizado-de-nodejs-mirror)

### `VP_NODE_VERSION`

- **Propósito**: Anular la versión de Node.js
- **Predeterminado**: Ninguno (autodetectado)
- **Ejemplo**:
  ```bash
  # Ejecutar un comando con una versión específica de Node.js
  VP_NODE_VERSION=22 vp env exec node -v
  ```

### `VP_NODE_SKIP_SIGNATURE_VERIFY`

- **Propósito**: Omitir la verificación de firma PGP de las descargas de Node.js
- **Valores**: Cualquier valor no vacío
- **Predeterminado**: Ninguno (verificación habilitada)
- **Detalles**: [Verificación de Firma de Node.js](/guide/env#verificacion-de-firma-de-nodejs)

### `VP_SHELL`

- **Propósito**: Especificar la terminal actual
- **Predeterminado**: Autodetectada
- **Ejemplo**:
  ```bash
  VP_SHELL=bash vp env print
  ```

### `VP_BYPASS`

- **Propósito**: Omitir el shim de Vite+ y usar la herramienta del sistema
- **Valores**: Lista de directorios al estilo `PATH` a omitir
- **Predeterminado**: Ninguno
- **Ejemplo**:
  ```bash
  VP_BYPASS=/usr/local/bin node -v
  ```

### Variables internas

Vite+ establece variables `VP_*` adicionales durante el despacho de shims y la integración de la terminal (guardas de recursión, registros de versión activa, flags de wrapper); no las configures manualmente.

## Configuración de TLS/CA

### `SSL_CERT_FILE` / `NODE_EXTRA_CA_CERTS`

- **Propósito**: Ruta al paquete PEM de certificados CA adicionales (`NODE_EXTRA_CA_CERTS` es la convención de Node.js)
- **Predeterminado**: Almacén de confianza del sistema
- **Ejemplo**:
  ```bash
  export SSL_CERT_FILE=/path/to/custom-ca.pem
  ```

### `VP_INSECURE_TLS`

- **Propósito**: Desactivar la verificación de certificados HTTPS
- **Valores**: Cualquier valor no vacío (`1`, `true`, `yes`)
- **Predeterminado**: Ninguno (verificación habilitada)
- **Advertencia**: Solo para diagnóstico; no usar en producción
- **Ejemplo**:
  ```bash
  VP_INSECURE_TLS=1 vp env install 22
  ```

## Registro y Depuración (Logging y Debugging)

### `VITE_LOG`

- **Propósito**: Filtro de registros para `tracing_subscriber`
- **Predeterminado**: Ninguno
- **Ejemplo**:
  ```bash
  VITE_LOG=debug vp dev
  VITE_LOG=vite_task=trace vp build
  ```

### `VP_DEBUG_SHIM`

- **Propósito**: Habilitar la salida de depuración para el despacho de shims
- **Valores**: Cualquier valor no vacío
- **Predeterminado**: Ninguno
- **Ejemplo**:
  ```bash
  VP_DEBUG_SHIM=1 node -v
  ```

## Variables de Entorno Estándar

Vite+ también respeta estas variables de entorno estándar:

### `CI`

- **Propósito**: Indica que se está ejecutando en un entorno de integración continua
- **Efecto**: Habilita el modo silencioso (`--yes`) para los instaladores

### `NO_COLOR`

- **Propósito**: Desactivar la salida coloreada
- **Efecto**: Desactiva los códigos de color ANSI

### `HOME` / `USERPROFILE`

- **Propósito**: Directorio de inicio del usuario
- **Efecto**: Directorio base para la ruta predeterminada `~/.vite-plus`

## Precedencia

1. Flags de la CLI (prioridad más alta)
2. Variables de entorno
3. Valores predeterminados (prioridad más baja)

For example, `VP_VERSION=1.0.0 vp-setup.exe --version 2.0.0` instalará la versión 2.0.0.
