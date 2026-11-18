# vp pm dist-tag

Gestiona las etiquetas que asocian nombres de paquete como `my-package@next` a una versión publicada.

```bash
vp pm dist-tag list my-package
vp pm dist-tag add my-package@2.0.0 next
vp pm dist-tag rm my-package next
```

## Opciones

- `list [package]` lista las etiquetas. Alias: `ls`.
- `add <package@version> <tag>` asigna una etiqueta.
- `rm <package> <tag>` elimina una etiqueta.

No hay opciones adicionales de Vite+ ni argumentos de transferencia nativos en estos subcomandos. Cambiar una etiqueta modifica a qué versión apuntarán las futuras instalaciones de dicha etiqueta; no elimina la versión publicada.

### `list`

No hay opciones específicas para este comando.

### `add`

No hay opciones específicas para este comando.

### `rm`

No hay opciones específicas para este comando.

## Compatibilidad

### `list`

- **npm:** `npm dist-tag list`.
- **pnpm:** 11 o posterior: `pnpm dist-tag list`. Las versiones anteriores usan `npm dist-tag list` como respaldo.
- **Yarn Classic:** `yarn tag list`.
- **Yarn Modern:** `yarn npm tag list`.
- **Bun:** Respaldo: `npm dist-tag list`.

### `add`

- **npm:** `npm dist-tag add`.
- **pnpm:** 11 o posterior: `pnpm dist-tag add`. Las versiones anteriores usan `npm dist-tag add` como respaldo.
- **Yarn Classic:** `yarn tag add`.
- **Yarn Modern:** `yarn npm tag add`.
- **Bun:** Respaldo: `npm dist-tag add`.

### `rm`

- **npm:** `npm dist-tag rm`.
- **pnpm:** 11 o posterior: `pnpm dist-tag rm`. Las versiones anteriores usan `npm dist-tag rm` como respaldo.
- **Yarn Classic:** `yarn tag rm`.
- **Yarn Modern:** `yarn npm tag rm`.
- **Bun:** Respaldo: `npm dist-tag rm`.

En la ruta nativa de pnpm, Vite+ no autocompleta un paquete omitido para `list`, no resuelve rangos de versiones para `add`, ni elude las restricciones al eliminar `latest`. pnpm valida estas solicitudes y devuelve sus propios errores.

## Opciones Nativas

Para opciones nativas, consulta [npm dist-tag](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag), [pnpm dist-tag](https://pnpm.io/cli/dist-tag), [Yarn npm tag list](https://yarnpkg.com/cli/npm/tag/list), [Yarn npm tag add](https://yarnpkg.com/cli/npm/tag/add), [Yarn npm tag remove](https://yarnpkg.com/cli/npm/tag/remove) y [Yarn Classic tag](https://classic.yarnpkg.com/en/docs/cli/tag). Los comandos originales pueden admitir opciones adicionales no reconocidas por esta interfaz de Vite+.
