# Guía de Inicio

Vite+ es el toolchain unificado y el punto de entrada para el desarrollo web. Gestiona tu entorno de ejecución, gestor de paquetes y toolchain frontend en un solo lugar al combinar [Vite](https://vite.dev/), [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Rolldown](https://rolldown.rs/), [tsdown](https://tsdown.dev/) y [Vite Task](https://github.com/voidzero-dev/vite-task).

Vite+ se distribuye en dos partes: `vp`, la herramienta global de línea de comandos, y `vite-plus`, el paquete local instalado en cada proyecto. Si ya tienes un proyecto Vite, usa [`vp migrate`](/guide/migrate) para migrarlo a Vite+, o pega nuestro [prompt de migración](/guide/migrate#prompt-de-migración) en tu agente de IA.

## Instalar `vp`

### macOS / Linux

```bash
curl -fsSL https://vite.plus | bash
```

### Windows

```powershell
irm https://vite.plus/ps1 | iex
```

Después de la instalación, abre una nueva terminal y ejecuta:

```bash
vp help
```

::: info
Vite+ gestionará tu entorno de ejecución global de Node.js y el gestor de paquetes. Si deseas desactivar este comportamiento, ejecuta `vp env off`. Si te das cuenta de que Vite+ no es para ti, escribe `vp implode`, pero por favor [comparte tus comentarios con nosotros](https://discord.gg/cAnsqHh5PX).
:::

## Inicio Rápido

Crea un proyecto, instala las dependencias y usa los comandos predeterminados:

```bash
vp create # Crea un nuevo proyecto
vp install # Instala las dependencias
vp dev # Inicia el servidor de desarrollo
vp check # Formateo, lint y verificación de tipos
vp test # Ejecuta pruebas de JavaScript
vp build # Construye para producción
```

También puedes ejecutar simplemente `vp` por sí solo y usar la línea de comandos interactiva.

## Comandos Principales

Vite+ puede manejar todo el ciclo de desarrollo frontend local, desde iniciar un proyecto, desarrollarlo, verificarlo y probarlo, hasta construirlo para producción.

### Iniciar

- [`vp create`](/guide/create) crea nuevas aplicaciones, paquetes y monorepos.
- [`vp migrate`](/guide/migrate) mueve proyectos existentes a Vite+.
- [`vp config`](/guide/commit-hooks) configura los hooks de commit y la integración con agentes.
- [`vp staged`](/guide/commit-hooks) ejecuta verificaciones en archivos preparados (staged).
- [`vp install`](/guide/install) instala dependencias con el gestor de paquetes correcto.
- [`vp env`](/guide/env) gestiona versiones de Node.js.

### Desarrollar

- [`vp dev`](/guide/dev) inicia el servidor de desarrollo impulsado por Vite.
- [`vp check`](/guide/check) ejecuta el formateo, lint y verificación de tipos en conjunto.
- [`vp lint`](/guide/lint), [`vp fmt`](/guide/fmt) y [`vp test`](/guide/test) te permiten ejecutar esas herramientas directamente.

### Ejecutar

- [`vp run`](/guide/run) ejecuta tareas a través de los workspaces con caché.
- [`vp cache`](/guide/cache) limpia las entradas de caché de tareas.
- [`vpx`](/guide/vpx) ejecuta binarios globalmente.
- [`vp exec`](/guide/vpx) ejecuta binarios locales del proyecto.
- [`vp dlx`](/guide/vpx) ejecuta binarios de paquetes sin añadirlos como dependencias.

### Construir

- [`vp build`](/guide/build) construye aplicaciones.
- [`vp pack`](/guide/pack) construye librerías o artefactos independientes.
- [`vp preview`](/guide/build) previsualiza la construcción de producción localmente.

### Gestionar Dependencias

- [`vp add`](/guide/install), [`vp remove`](/guide/install), [`vp update`](/guide/install), [`vp dedupe`](/guide/install), [`vp outdated`](/guide/install), [`vp why`](/guide/install) y [`vp info`](/guide/install) envuelven los flujos de trabajo del gestor de paquetes.
- [`vp pm <comando>`](/guide/install) llama directamente a otros comandos del gestor de paquetes.

### Mantener

- [`vp upgrade`](/guide/upgrade) actualiza la propia instalación de `vp`.
- [`vp implode`](/guide/implode) elimina `vp` y los datos relacionados con Vite+ de tu máquina.

::: info
Vite+ viene con muchos comandos predefinidos como `vp build`, `vp test` y `vp dev`. Estos comandos están integrados y no se pueden cambiar. Si deseas ejecutar un comando de los scripts de tu `package.json`, usa `vp run <comando>`.

[Más información sobre `vp run`.](/guide/run)
:::

