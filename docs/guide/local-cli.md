# CLI Local del Proyecto

A diferencia de la [CLI global `vp`](/guide/global-cli), `vite-plus` es un paquete npm que contiene la CLI local `vp` del proyecto y el conjunto de herramientas frontend integrado. Instálalo como dependencia de desarrollo cuando desees que la versión del conjunto de herramientas quede registrada en el manifiesto y lockfile del proyecto, o cuando no desees instalar la CLI global independiente.

El paquete local incluye Vite, Rolldown, Vitest, Oxlint, Oxfmt, tsdown, el ejecutor de tareas de Vite+ y comandos del gestor de paquetes. Requiere un entorno de ejecución de Node.js existente y un gestor de paquetes.

## Instalación

Para la mayoría de los casos de uso, recomendamos usar la CLI de Vite+ para instalar en un proyecto o crear uno nuevo. Obtén más información en [Crear un Proyecto](/guide/create) y [Migrar a Vite+](/guide/migrate).

::: code-group

```bash [pnpm]
pnpm dlx --package=vite-plus vp create
```

```bash [npm]
npx --package=vite-plus vp create
```

```bash [Yarn]
yarn dlx --package vite-plus vp create
```

```bash [Bun]
bunx --package vite-plus vp create
```

:::

Ejecuta su binario a través de tu gestor de paquetes. Por ejemplo:

```bash
./node_modules/.bin/vp migrate --help
./node_modules/.bin/vp check
```

La documentación utiliza comandos `vp` simples para facilitar la lectura. Sin la CLI global, antepón a los comandos interactivos el ejecutor de binarios locales de tu gestor de paquetes, como `pnpm exec`.

### Instalación Manual

Si estás migrando manualmente un proyecto a Vite+, instala estas dependencias de desarrollo primero:

```bash
vp install -D vite-plus
```

Debes agregar sobrescrituras (overrides) a tu gestor de paquetes para que otros paquetes resuelvan las versiones de Vite+: crea un alias de `vite` a `@voidzero-dev/vite-plus-core` y fija `vitest` a la versión que incluye Vite+ (ejecuta `vp --version`) para que todo el proyecto comparta una única copia de Vitest con `vp test`. Sin fijar `vitest`, una dependencia o paquete del espacio de trabajo puede obtener un Vitest diferente al ejecutor integrado, dividiendo los elementos internos de Vitest (mocks, `expect`, estado del ejecutor):

::: code-group

```yaml [pnpm-workspace.yaml]
overrides:
  vite: npm:@voidzero-dev/vite-plus-core@latest
  vitest: 5.0.1
```

```json [npm / Bun package.json]
"overrides": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "5.0.1"
}
```

```json [Yarn package.json]
"resolutions": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "5.0.1"
}
```

:::

::: details ¿Por qué son necesarios estos ajustes?

Las dependencias y los plugins pueden importar `vite` o `vitest` directamente, incluso cuando tu propio código importa desde `vite-plus`. Estas sobrescrituras alinean sus dependencias con el conjunto de herramientas que utiliza Vite+:

- El alias de `vite` dirige esas importaciones al paquete principal (core) de Vite+. Instancias separadas de Vite pueden romper comprobaciones de identidad en tiempo de ejecución: la [issue #1391](https://github.com/voidzero-dev/vite-plus/issues/1391) reportó que TanStack Start devolvía errores 404 porque una comprobación `instanceof` cruzaba dos copias. El [PR #2617](https://github.com/voidzero-dev/vite-plus/pull/2617) aborda el lado de la CLI compartiendo Vite a través del mismo alias.
- Fijar exactamente `vitest` mantiene las dependencias y `vp test` en la misma versión de Vitest, evitando mocks separados, instancias de `expect` y estados de ejecutor divididos. El [PR #2365](https://github.com/voidzero-dev/vite-plus/pull/2365) documenta este requisito para la instalación manual.

Mantén el alias del core alineado con tu versión instalada de `vite-plus` y actualiza la versión fijada de Vitest para que coincida con su versión empaquetada al actualizar. La [issue #2356](https://github.com/voidzero-dev/vite-plus/issues/2356) describe cómo los bots de dependencias pueden actualizar estos paquetes de forma independiente y dejar versiones incompatibles instaladas juntas.

:::

## Buenas Prácticas

Recomendamos usar la [CLI global](/guide/global-cli) junto con la CLI local del proyecto. La CLI global hace que `vp` esté disponible directamente en tu terminal y delega los comandos de desarrollo como `vp dev`, `vp build` y `vp test` al paquete `vite-plus` instalado en el proyecto. Esto te brinda un acceso cómodo al conjunto de herramientas mientras mantiene su versión controlada por el proyecto. También puedes usar solo la CLI local del proyecto si lo prefieres.

Para proyectos de código abierto o cualquier proyecto con colaboradores, recomendamos agregar scripts en `package.json` que llamen a `vp`, ya sea que uses ambas CLIs o solo la local. Dentro de los scripts, `vp` se resuelve automáticamente desde `node_modules/.bin`:

```json [package.json]
{
  "scripts": {
    "dev": "vp dev",
    "check": "vp check",
    "test": "vp test",
    "build": "vp build"
  }
}
```

Después de instalar las dependencias del proyecto, los colaboradores pueden ejecutar estos scripts a través de su gestor de paquetes, como `pnpm run dev` o `npm run dev`, sin necesidad de instalar la CLI global.

## Qué Incluye

La CLI local del proyecto se puede utilizar de forma independiente para:

- [`vp dev`](/guide/dev), [`vp build`](/guide/build) y [`vp preview`](/guide/build) con Vite y Rolldown
- [`vp check`](/guide/check), [`vp lint`](/guide/lint) y [`vp fmt`](/guide/fmt) con Oxc
- [`vp test`](/guide/test) con Vitest
- [`vp pack`](/guide/pack) con tsdown
- [`vp toolchain`](/guide/upgrade#mostrar-el-toolchain) para inspeccionar las versiones empaquetadas con el paquete local del proyecto
- [`vp run`](/guide/run) y caché de tareas en todos los espacios de trabajo
- [comandos del gestor de paquetes](/guide/install) utilizando el entorno de ejecución de Node.js activo en tu shell
- [`vp create`](/guide/create), [`vp migrate`](/guide/migrate) y comandos de configuración del proyecto

El paquete local no puede gestionar la instalación de Vite+ a nivel de máquina. Los comandos `vp env`, `vp upgrade` y `vp implode` requieren la [CLI global](/guide/global-cli). Actualiza o elimina una instalación exclusivamente local a través de tu gestor de paquetes.

## Agregar la CLI Global Más Tarde

Puedes instalar la CLI global en cualquier momento sin cambiar la dependencia del proyecto. Comandos como `vp dev`, `vp build` y `vp test` continuarán usando la versión de `vite-plus` instalada en el proyecto.

Consulta [Usar Ambas CLIs Juntas](/guide/global-cli#usar-ambas-clis-juntas) para conocer las reglas de selección.
