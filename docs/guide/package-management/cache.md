# vp pm cache

Inspecciona o limpia la caché de descargas o el almacén del gestor de paquetes. Es independiente de [`vp cache`](/guide/cache), que gestiona los resultados de tareas.

```bash
vp pm cache dir
vp pm cache clean
```

## Opciones

- `dir` y `path` imprimen la ubicación de la caché o almacén.
- `clean` solicita la limpieza de la caché nativa.

Otros subcomandos advierten y salen con éxito sin ejecutar un comando. No hay opciones adicionales de Vite+.

### `dir`

Imprime la ubicación de la caché o almacén. Alias: `path`. No hay opciones específicas para este comando.

### `clean`

Solicita la limpieza de la caché nativa. No hay opciones específicas para este comando.

## Compatibilidad

### `dir`

- **npm:** `npm config get cache`.
- **pnpm:** `pnpm store path`.
- **Yarn Classic:** `yarn cache dir`.
- **Yarn Modern:** `yarn config get cacheFolder`.
- **Bun:** `bun pm cache`.

### `clean`

- **npm:** `npm cache clean`.
- **pnpm:** `pnpm store prune`. Poda el almacén en lugar de eliminar todo el contenido.
- **Yarn Classic:** `yarn cache clean`.
- **Yarn Modern:** `yarn cache clean`.
- **Bun:** `bun pm cache rm`.

npm normalmente requiere un `--force` nativo explícito para la eliminación de la caché:

```bash
vp pm cache clean -- --force
```

Ese ejemplo es específico de npm. Vite+ no expone un comando separado `vp pm store`.

## Opciones Nativas

Para opciones nativas, consulta [npm config](https://docs.npmjs.com/cli/v11/commands/npm-config), [npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache), [pnpm store](https://pnpm.io/cli/store), [Yarn config get](https://yarnpkg.com/cli/config/get), [Yarn cache clean](https://yarnpkg.com/cli/cache/clean), [Yarn Classic cache](https://classic.yarnpkg.com/en/docs/cli/cache) y [Bun pm cache](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
