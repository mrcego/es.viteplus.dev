<script setup lang="ts">
function getScrollOffset(): number {
  const nav = typeof document !== 'undefined' ? document.querySelector('.VPNav') : null;
  return nav ? nav.getBoundingClientRect().height : 64;
}
import { nextTick, onMounted, onUnmounted } from 'vue';

function openTarget() {
  let target: HTMLElement | null;
  try {
    target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  } catch {
    return;
  }
  if (!target?.closest('details')) return;

  for (let details = target.closest('details'); details; details = details.parentElement?.closest('details') ?? null) {
    details.open = true;
  }

  // VitePress no puede medir un encabezado dentro de details cerrados. Corrige el scroll tras revelarlo.
  requestAnimationFrame(() => {
    if (!target.isConnected) return;
    const top = window.scrollY + target.getBoundingClientRect().top - getScrollOffset()
      + Number.parseInt(window.getComputedStyle(target).paddingTop, 10);
    window.scrollTo(0, top);
  });
}

function onAnchorClick(event: MouseEvent) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest('a') : null;
  // Hacer clic en el hash actual nuevamente no emite hashchange.
  if (link?.href === location.href) openTarget();
}

onMounted(async () => {
  window.addEventListener('hashchange', openTarget);
  document.addEventListener('click', onAnchorClick);
  await nextTick();
  openTarget();
});

onUnmounted(() => {
  window.removeEventListener('hashchange', openTarget);
  document.removeEventListener('click', onAnchorClick);
});
</script>

# CLI Global

La CLI global es un binario independiente `vp` para la gestión del entorno de ejecución y paquetes a nivel de máquina. Incluye el conjunto de herramientas de Vite+, no requiere que Node.js esté instalado previamente y se puede usar sin agregar `vite-plus` a un proyecto.

Los proyectos que registran su versión de Vite+ en su manifiesto aún pueden usar el [paquete local de Vite+](/guide/local-cli). Consulta [Usar Ambas CLIs Juntas](#usar-ambas-clis-juntas) para ver cómo interactúan.

## Instalación

Instala la CLI global `vp` con:

::: code-group

```bash [macOS / Linux]
curl -fsSL https://vite.plus | bash
```

```powershell [Windows]
irm https://vite.plus/ps1 | iex
```

```bash [Windows (EXE)]
# Descarga y ejecuta vp-setup.exe desde https://setup.viteplus.dev
```

:::

El `vp-setup.exe` aún no tiene firma de código. Es posible que tu navegador muestre una advertencia al descargarlo.

Los scripts de instalación y `vp-setup.exe` leen [variables de entorno](/guide/global-cli#variables-de-instalacion) como `VP_VERSION` y `VP_HOME`.

Si usas Nushell con directorios XDG personalizados, consulta los [requisitos de inicio de Nushell](/guide/global-cli#nushell-y-directorios-xdg) antes de instalar.

Tras la instalación, abre un nuevo shell y ejecuta:

```bash
vp help
```

### Variables de Instalación

Estas variables controlan los scripts de instalación y el instalador independiente de Windows (`vp-setup.exe`).

#### `VP_VERSION`

- **Propósito**: Versión a instalar
- **Predeterminado**: `latest`
- **Equivalente en CLI**: `--version`
- **Ejemplo**:

  ```bash
  VP_VERSION=1.0.0 curl -fsSL https://vite.plus | bash
  ```

  ```powershell
  $env:VP_VERSION="1.0.0"; irm https://vite.plus/ps1 | iex
  ```

  ```bash
  vp-setup.exe --version 1.0.0
  ```

#### `VP_HOME`

- **Propósito**: Directorio raíz de Vite+ para binarios, datos y shims
- **Predeterminado**:
  - macOS/Linux: `~/.vite-plus`
  - Windows: `%LOCALAPPDATA%\vite-plus`
- **Equivalente en CLI**: `--install-dir`
- **Ejemplo**:

  ```bash
  VP_HOME=/opt/vite-plus curl -fsSL https://vite.plus | bash
  ```

  ```powershell
  $env:VP_HOME="D:\tools\vite-plus"; irm https://vite.plus/ps1 | iex
  ```

#### `VP_BIN_DIR` / `VP_DATA_DIR` / `VP_CACHE_DIR`

- **Propósito**: Sobrescribe rutas de directorios individuales dentro de `VP_HOME`
- **Predeterminado**: Derivado de `VP_HOME`
  - Binarios: `$VP_HOME/bin`
  - Datos: `$VP_HOME/data`
  - Caché: `$VP_HOME/cache`
- **Ejemplo**:

  ```bash
  VP_BIN_DIR=/usr/local/bin curl -fsSL https://vite.plus | bash
  ```

#### `NPM_CONFIG_REGISTRY`

- **Propósito**: Registro npm personalizado para descargar artefactos de Vite+
- **Predeterminado**: Registro npm oficial (`https://registry.npmjs.org`)
- **Ejemplo**:

  ```bash
  NPM_CONFIG_REGISTRY=https://registry.npmmirror.com curl -fsSL https://vite.plus | bash
  ```

#### `VP_NODE_MANAGER`

- **Propósito**: Habilita o deshabilita la gestión de Node.js durante la configuración
- **Valores**: `yes` (o `1`, `true`), `no` (o `0`, `false`)
- **Predeterminado**: `yes`
- **Ejemplo**:

  ```bash
  VP_NODE_MANAGER=no curl -fsSL https://vite.plus | bash
  ```

#### `VP_PM_MANAGER`

- **Propósito**: Habilita o deshabilita la gestión de gestores de paquetes durante la configuración
- **Valores**: `yes` (o `1`, `true`), `no` (o `0`, `false`)
- **Predeterminado**: `yes`

#### `VP_NPM_MANAGER` / `VP_PNPM_MANAGER` / `VP_YARN_MANAGER` / `VP_BUN_MANAGER`

- **Propósito**: Habilita o deshabilita la gestión para un gestor de paquetes específico
- **Valores**: `yes` (o `1`, `true`), `no` (o `0`, `false`)
- **Predeterminado**: Hereda de `VP_PM_MANAGER`
- **Ejemplo**:

  ```bash
  VP_BUN_MANAGER=no curl -fsSL https://vite.plus | bash
  ```

#### `VP_PR_VERSION`

- **Propósito**: Instala una compilación de vista previa generada por un pull request específico
- **Ejemplo**:

  ```bash
  VP_PR_VERSION=123 curl -fsSL https://vite.plus | bash
  ```

#### Variables de desarrollo

- `VP_DOWNLOAD_BASE_URL`: Sobrescribe la URL base de descarga para artefactos binarios.

### Variables de Ejecución

Estas variables afectan al comando `vp` y a los shims gestionados durante el uso normal.

#### `VP_NODE_DIST_MIRROR`

- **Propósito**: Espejo personalizado para descargar distribuciones de Node.js
- **Predeterminado**: `https://nodejs.org/dist`
- **Ejemplo**: `https://npmmirror.com/mirrors/node`

#### `VP_NODE_VERSION`

- **Propósito**: Sobrescribe la versión de Node.js para la sesión actual
- **Ejemplo**:

  ```bash
  VP_NODE_VERSION=22.18.0 vp dev
  ```

#### `VP_PACKAGE_MANAGER`

- **Propósito**: Sobrescribe el gestor de paquetes para comandos como `vp install`
- **Ejemplo**:

  ```bash
  VP_PACKAGE_MANAGER=pnpm@10.20.0 vp install
  ```

#### `VP_NODE_SKIP_SIGNATURE_VERIFY`

- **Propósito**: Omite la verificación de firma criptográfica para descargas de Node.js
- **Valores**: `1`, `true`

#### `VP_DOWNLOAD_TIMEOUT`

- **Propósito**: Tiempo de espera de descarga en segundos
- **Predeterminado**: `300` (5 minutos)
- **Ejemplo**:

  ```bash
  VP_DOWNLOAD_TIMEOUT=600 vp install
  ```

#### `VP_SHELL`

- **Propósito**: Sobrescribe la detección de shell para la integración con la terminal
- **Valores**: `bash`, `zsh`, `fish`, `nushell`, `powershell`, `cmd`

#### `VP_BYPASS`

- **Propósito**: Desactiva el redireccionamiento de shims y ejecuta el binario del sistema directamente
- **Valores**: `1`, `true`
- **Ejemplo**:

  ```bash
  VP_BYPASS=1 node --version
  ```

#### Variables internas

Vite+ establece variables adicionales `VP_*` durante el despacho de shims y la integración con el shell. No las definas manualmente.

### Configuración de TLS/CA

#### `SSL_CERT_FILE` / `NODE_EXTRA_CA_CERTS`

- **Propósito**: Ruta al paquete de certificados CA personalizados
- **Uso**: Vite+ respeta estas variables para conexiones TLS salientes, permitiendo su uso en redes corporativas con inspección TLS.

#### `VP_INSECURE_TLS`

- **Propósito**: Desactiva la verificación de certificados TLS (solo desarrollo)
- **Valores**: `1`, `true`

::: danger
Usar `VP_INSECURE_TLS` desactiva la seguridad de transporte y te expone a ataques man-in-the-middle. Úsalo solo para solucionar problemas en redes aisladas.
:::

### Registro y Depuración

#### `VP_LOG`

- **Propósito**: Nivel de detalle de registro
- **Valores**: `trace`, `debug`, `info`, `warn`, `error`
- **Ejemplo**:

  ```bash
  VP_LOG=debug vp check
  ```

#### `VP_DEBUG_SHIM`

- **Propósito**: Imprime diagnósticos de resolución en stderr cuando se ejecutan shims gestionados
- **Valores**: `1`, `true`

### Variables de Entorno Estándar

Vite+ también respeta estas variables de entorno estándar:

#### Nushell y directorios XDG

Si personalizas `XDG_DATA_HOME` o `XDG_CONFIG_HOME`, configúralos **antes de iniciar Nushell**, mediante tu aplicación de terminal, el sistema operativo o el shell padre. Este es un [requisito de inicio de Nushell](https://www.nushell.sh/book/configuration.html#changing-default-directories); definirlos únicamente en `config.nu` o `env.nu` no configura los directorios de inicio de la sesión en ejecución.

Las asignaciones en esos archivos aún afectan a los procesos secundarios. El instalador de Vite+ inicia un Nushell secundario para localizar su directorio de carga automática (vendor autoload), por lo que puede escribir `vite-plus.nu` en un directorio que las nuevas sesiones normales no leen. La instalación puede completarse con éxito mientras `vp` permanece no disponible en esas sesiones.

Si esto sucede, abre tu configuración de Nushell con `config nu` y añade una línea `source` que apunte al archivo `env.nu` de Vite+ instalado. Para una instalación nueva por defecto en macOS o Linux sin un `XDG_CONFIG_HOME` personalizado, usa:

```nu
source ~/.config/vite-plus/env.nu
```

Para un `XDG_CONFIG_HOME` personalizado, usa la ruta absoluta a `<XDG_CONFIG_HOME>/vite-plus/env.nu` tal como se resolvió durante la instalación. Para una instalación bajo `VP_HOME` o una instalación existente en `~/.vite-plus`, usa `<VP_HOME>/env.nu` o `~/.vite-plus/env.nu` en su lugar. Reemplaza los marcadores de posición con rutas reales y entrecomilla las rutas que contengan espacios. Abre una nueva sesión de Nushell y ejecuta `vp help` para verificar la configuración.

#### `CI`

- **Propósito**: Indica ejecución en un entorno de integración continua
- **Efecto**: Desactiva las preguntas interactivas y ajusta la salida de registro para registros no interactivos.

#### `NO_COLOR`

- **Propósito**: Desactiva la salida con color en la terminal (según [no-color.org](https://no-color.org))

#### `HOME` / `USERPROFILE`

- **Propósito**: Directorio home del usuario actual para resolver rutas por defecto

### Precedencia

Cuando se admiten tanto flags de CLI como variables de entorno, los flags de línea de comandos tienen prioridad sobre las variables de entorno.

### Homebrew

En una instalación de Homebrew, el primer comando `vp` configura tu shell, los shims y las preferencias de gestión del entorno. Reutiliza el binario de Homebrew y el JavaScript empaquetado. La configuración almacena su estado de finalización en tus directorios de usuario y no necesita acceso de escritura al prefijo de Homebrew.

Los comandos posteriores reutilizan esa configuración mientras el binario instalado permanezca sin cambios. Los shims generados siguen el punto de entrada público de `vp` de Homebrew cuando Homebrew reemplaza una versión. La configuración conserva tus preferencias de gestión guardadas durante este reemplazo.

Para preferir tu Node.js y gestores de paquetes existentes durante la primera ejecución, usa:

```bash
VP_NODE_MANAGER=no VP_PM_MANAGER=no vp help
```

Después de la configuración inicial, usa `vp env off` para cambiar esta preferencia. Los comandos que necesiten entornos de ejecución faltantes o dependencias del proyecto aún podrán descargarlos.

Usa Homebrew para [actualizar](/guide/upgrade#homebrew) o [eliminar](/guide/implode#homebrew) su paquete.

`vp env doctor` identifica la instalación de Homebrew y su ruta binaria. Comprueba el comando `vp` y el directorio de shims de usuario en el `PATH` por separado. Si solo falta el directorio de shims, sigue sus instrucciones de configuración de shell para habilitar los shims.

## Usar sin un Paquete Local

La instalación global es suficiente para flujos de trabajo de entornos de ejecución, gestores de paquetes y ejecución de tareas:

```bash
vp env setup
node -v
pnpm -v
vp run build
```

Sin embargo, para herramientas específicas del proyecto como `vp dev`, `vp check` y `vp test`, necesitas agregar el paquete local `vite-plus` a tu proyecto.

## Usar Ambas CLIs Juntas

Cuando ejecutas `vp` dentro de un proyecto que tiene `vite-plus` instalado localmente:

1. El binario global `vp` detecta la instalación local de `vite-plus`.
2. Transfiere el control a la CLI local del proyecto.
3. Esto garantiza que todos en tu equipo usen la versión exacta de las herramientas definida en `package.json`.

Fuera de un proyecto con `vite-plus`, la CLI global utiliza su propio conjunto de herramientas empaquetado.

## Próximos Pasos

- [Gestionar entornos de ejecución y gestores de paquetes](/guide/env)
- [Crear un nuevo proyecto](/guide/create)
- [Migrar un proyecto existente](/guide/migrate)
