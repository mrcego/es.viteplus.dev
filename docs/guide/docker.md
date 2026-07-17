# Docker

Vite+ publica una imagen oficial de Docker con la CLI `vp` preinstalada:

```bash
ghcr.io/voidzero-dev/vite-plus
```

Úsala para compilaciones, CI y devcontainers. No está pensada como una imagen de ejecución (runtime) para producción.

`vp` resuelve la versión de Node.js a partir de tu proyecto (`.node-version`, `devEngines.runtime` o `engines.node`) y descarga esa versión exacta durante la instalación/compilación. Esto significa que la imagen no necesita etiquetas específicas para la versión de Node.

Para producción, utiliza una compilación multi-etapa (multi-stage): compila la aplicación con la imagen de Vite+, luego copia solo el binario de Node.js resuelto, el resultado de la compilación y las dependencias de producción en una imagen de ejecución más pequeña.

## Etiquetas de imagen (Image tags)

Las etiquetas rastrean la versión de `vp`:

| Etiqueta | Significado |
| --- | --- |
| `ghcr.io/voidzero-dev/vite-plus:latest` | Última versión |
| `ghcr.io/voidzero-dev/vite-plus:<major>` | Última versión mayor |
| `ghcr.io/voidzero-dev/vite-plus:<major>.<minor>` | Última versión menor |
| `ghcr.io/voidzero-dev/vite-plus:<major>.<minor>.<patch>` | Versión exacta |

Los ejemplos utilizan `:latest` para rastrear la versión más reciente; fija una etiqueta exacta o un digest si necesitas compilaciones reproducibles. La imagen se publica para `linux/amd64` y `linux/arm64` y se ejecuta como el usuario no root `vp` por defecto. Ese usuario tiene `sudo` sin contraseña, por lo que los pasos de compilación/CI que necesitan privilegios de root (paquetes apt adicionales, `playwright install --with-deps`) funcionan sin cambiar el usuario de la imagen.

Explora todas las versiones y digests publicados en la [página del paquete de GitHub](https://github.com/voidzero-dev/vite-plus/pkgs/container/vite-plus).

## Producción: SSR / Aplicación de servidor Node.js

Para aplicaciones que ejecutan Node.js en producción (SvelteKit, Nuxt, un servidor SSR personalizado de Vite, etc.), compila con la imagen del toolchain y copia el Node.js resuelto y la aplicación compilada en una etapa de ejecución slim:

```dockerfile [Dockerfile]
# syntax=docker/dockerfile:1

# --- build stage: la imagen oficial del toolchain de Vite+ ---
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app

# Instala primero las dependencias para que esta capa se almacene en caché tras cambios en el código fuente.
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile

# Compila. vp lee .node-version y aprovisiona ese Node.js exacto automáticamente.
COPY --chown=vp:vp . .
RUN vp build

# Exporta el binario exacto de Node.js resuelto para la etapa de ejecución.
RUN cp "$(vp env which node | head -1)" /tmp/node

# --- deps stage: dependencias solo de producción ---
# Una instalación fresh y separada con `--prod` para excluir las devDependencies (incluyendo el toolchain
# de vite-plus). Ejecutar `--prod` sobre la instalación completa anterior no purgaría las devDependencies
# ya instaladas.
FROM ghcr.io/voidzero-dev/vite-plus:latest AS deps
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile --prod

# --- runtime stage: pequeña, glibc, sin vp ---
FROM debian:bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# El Node.js exacto de .node-version (compilación oficial con firma verificada).
COPY --from=build /tmp/node /usr/local/bin/node

COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

USER nobody
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

La imagen desplegada contiene únicamente Node.js junto con tu aplicación y las dependencias de producción, coincidiendo exactamente con el archivo `.node-version`. Es mucho más pequeña que la imagen predeterminada `node:*`; consulta el consejo de distroless a continuación para obtener el resultado más pequeño.

::: warning Purga las dependencias de producción en una etapa separada
Instala las dependencias de producción en su propia etapa `deps` como se muestra. Ejecutar `vp install --prod` después de un `vp install` completo en la misma etapa no elimina las devDependencies ya instaladas, por lo que el toolchain de `vite-plus` se copiaría a la imagen de ejecución. Si el bundle de tu servidor es completamente autocontenido (sin dependencias de ejecución no empaquetadas), puedes omitir por completo la copia de `node_modules`.
:::

::: tip Aún más pequeño
Para un entorno de ejecución sin shell y con un mínimo de vulnerabilidades (CVEs), cambia la base de ejecución por distroless (`gcr.io/distroless/cc`) y mantén un `ENTRYPOINT` en forma de vector. Está basado en glibc, por lo que el binario de Node.js copiado sigue siendo compatible.
:::

## Producción: SPA estático / SSG

Un sitio estático no necesita Node.js en tiempo de ejecución; sirve la salida de la compilación con cualquier servidor estático:

```dockerfile [Dockerfile]
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile
COPY --chown=vp:vp . .
RUN vp build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
```

## Integración continua

Usa la imagen directamente en entornos de CI basados en contenedores (GitLab CI, Buildkite, CircleCI, Jenkins, entre otros):

```yaml [.gitlab-ci.yml]
build:
  image: ghcr.io/voidzero-dev/vite-plus:latest
  script:
    - vp install --frozen-lockfile
    - vp check
    - vp test
    - vp build
```

En GitHub Actions, prefiere [`setup-vp`](./ci) en lugar de la imagen.

## Pruebas en modo navegador (Vitest / Playwright)

Ejecutar como el usuario no root `vp` es lo que se desea para los navegadores: Chromium mantiene su sandbox (ejecutar un navegador como root lo desactiva). Instala el navegador y sus bibliotecas del sistema en el job. `playwright install --with-deps` necesita privilegios de root para ejecutar `apt-get install` de esas bibliotecas. El usuario `vp` tiene `sudo` sin contraseña, por lo que Playwright lo utiliza para instalarlas sin cambiar el usuario de la imagen:

```yaml [.gitlab-ci.yml]
test:
  image: ghcr.io/voidzero-dev/vite-plus:latest
  script:
    - vp install --frozen-lockfile
    - vp exec playwright install --with-deps chromium
    - vp test
```

`vp exec` ejecuta el propio Playwright del proyecto (desde tu lockfile), por lo que instala la revisión del navegador que tus pruebas esperan. Es preferible en lugar de `vpx playwright install`, que descargaría la versión más reciente de Playwright y podría obtener una revisión de navegador diferente.

Para integrar el navegador y sus bibliotecas en una imagen derivada en lugar de instalarlos en cada ejecución, instala primero las dependencias del proyecto para que el navegador integrado coincida con tu lockfile, luego realiza la instalación con el Playwright del proyecto (el acceso a root está disponible a través de `sudo`):

```dockerfile [Dockerfile]
FROM ghcr.io/voidzero-dev/vite-plus:latest
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile
RUN vp exec playwright install --with-deps chromium
```

Si Chromium se cierra inesperadamente bajo carga en CI, dale más memoria compartida al contenedor con `--ipc=host`; consulta la [documentación de Docker de Playwright](https://playwright.dev/docs/docker).

## Devcontainers

Usa la imagen como un contenedor de desarrollo listo para usar con el toolchain preinstalado:

```jsonc [.devcontainer/devcontainer.json]
{
  "image": "ghcr.io/voidzero-dev/vite-plus:latest",
}
```

## Uso ad-hoc

Ejecuta cualquier comando `vp` en un proyecto sin necesidad de instalar `vp` en tu máquina:

```bash
docker run --rm -it -v "$PWD:/app" -w /app ghcr.io/voidzero-dev/vite-plus vp build
```

## Notas

- **Versión de Node.js**: se aprovisiona desde `.node-version`, `engines.node` o `devEngines.runtime` en tiempo de compilación, por lo que no existe una etiqueta de imagen específica para Node. La instrucción `COPY` de dependencias utiliza el patrón `.node-version*` para que el archivo sea opcional: los proyectos que fijan la versión mediante `engines.node`/`devEngines.runtime` no necesitan un `.node-version`, y los que lo usan lo tienen disponible en todas las etapas.
- **Usuario no root**: la imagen se ejecuta como el usuario no root `vp`, así que copia los archivos fuente usando `COPY --chown=vp:vp ...` como se muestra. Sin esto, `COPY` escribe archivos propiedad de root que `vp install` no podrá actualizar (permiso denegado). El usuario `vp` tiene `sudo` sin contraseña para los pasos ocasionales que requieren root (instalar paquetes apt adicionales o `playwright install --with-deps`), por lo que rara vez necesitarás cambiar el usuario de la imagen. La etapa de ejecución de producción utiliza una imagen base separada libre de vp, por lo que esta conveniencia no llega a tu imagen desplegada.
- **Complementos nativos (native addons)**: la imagen incluye un toolchain de compilación C/C++ (`build-essential`, `python3`), por lo que las dependencias nativas como `better-sqlite3` se compilan durante `vp install`.
- **glibc**: la imagen está basada en glibc, por lo que utiliza las compilaciones oficiales y con firma verificada de Node.js.
- **Imagen base personalizada**: para agregar `vp` a tu propia imagen base, ejecuta el instalador: `curl -fsSL https://vite.plus | bash` (establece `VP_VERSION` para fijar una versión).
