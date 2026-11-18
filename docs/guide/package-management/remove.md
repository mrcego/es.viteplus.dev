# vp remove

Elimina dependencias del proyecto. Alias: `vp rm`, `vp un` y `vp uninstall`.

```bash
vp remove react
vp remove --filter web react
vp remove -g --dry-run typescript
```

## Opciones

| Opción                 | Descripción                                                   | Notas                                                                           |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `-D, --save-dev`       | Elimina de devDependencies.                                   |                                                                                 |
| `-O, --save-optional`  | Elimina de optionalDependencies.                              |                                                                                 |
| `-P, --save-prod`      | Elimina de dependencies.                                      |                                                                                 |
| `-r, --recursive`      | Elimina de todos los paquetes del espacio de trabajo.          |                                                                                 |
| `--filter <pattern>`   | Selecciona espacios de trabajo por patrón.                    | Se puede repetir.                                                               |
| `-w, --workspace-root` | Elimina de la raíz del espacio de trabajo.                    |                                                                                 |
| `-g, --global`         | Elimina paquetes globales.                                    | Requiere la CLI global. Usa el [almacén de paquetes globales](./global-packages). |
| `--dry-run`            | Muestra qué se eliminaría sin hacer cambios.                  | Requiere --global.                                                              |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm uninstall`.
- **pnpm:** `pnpm remove`.
- **Yarn Classic:** `yarn remove`.
- **Yarn Modern:** `yarn remove`.
- **Bun:** `bun remove`.

| Opción                 | npm            | pnpm | Yarn Classic | Yarn Modern | Bun | Notas                              |
| ---------------------- | -------------- | ---- | ------------ | ----------- | --- | ---------------------------------- |
| `-D, --save-dev`       | Sí             | Sí   | Sí           | No          | Sí  |                                    |
| `-O, --save-optional`  | Sí             | Sí   | Sí           | No          | Sí  |                                    |
| `-P, --save-prod`      | Sí             | Sí   | Sí           | No          | Sí  |                                    |
| `-r, --recursive`      | 8.1.0 o post.  | Sí   | No           | No          | No  | npm incluye la raíz del workspace. |
| `--filter <pattern>`   | 7.14.0 o post. | Sí   | No           | No          | No  |                                    |
| `-w, --workspace-root` | 8.1.0 o post.  | Sí   | No           | No          | No  |                                    |
| `-g, --global`         | Sí             | Sí   | Sí           | Sí          | Sí  |                                    |
| `--dry-run`            | Sí             | Sí   | Sí           | Sí          | Sí  |                                    |

## Opciones Nativas

Para opciones nativas, consulta [npm uninstall](https://docs.npmjs.com/cli/v11/commands/npm-uninstall), [pnpm remove](https://pnpm.io/cli/remove), [Yarn remove](https://yarnpkg.com/cli/remove), [Yarn Classic remove](https://classic.yarnpkg.com/en/docs/cli/remove) y [Bun remove](https://bun.com/docs/pm/cli/remove). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
