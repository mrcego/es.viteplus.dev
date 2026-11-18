# vp pm ci

Instala dependencias con un lockfile congelado para CI.

```bash
vp pm ci
vp pm ci -- --ignore-scripts
```

## Opciones

Este comando no tiene opciones adicionales de Vite+. Para opciones traducidas de Vite+, usa [`vp install --frozen-lockfile`](./install).

No hay opciones específicas para este comando.

## Compatibilidad

- **npm:** `npm ci`.
- **pnpm:** `pnpm install --frozen-lockfile`.
- **Yarn Classic:** `yarn install --frozen-lockfile`.
- **Yarn Modern:** `yarn install --immutable`.
- **Bun:** `bun install --frozen-lockfile`.

El gestor nativo determina la limpieza de la instalación y la validación del lockfile. Este comando no hace que todos los gestores se comporten exactamente como `npm ci` más allá de la solicitud de un lockfile congelado.

## Opciones Nativas

Para opciones nativas, consulta [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci), [pnpm install](https://pnpm.io/cli/install), [Yarn install](https://yarnpkg.com/cli/install), [Yarn Classic install](https://classic.yarnpkg.com/en/docs/cli/install) y [Bun install](https://bun.com/docs/pm/cli/install). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos). Para la configuración de CI, consulta la [guía de CI](/guide/ci).
