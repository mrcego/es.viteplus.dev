# vp update

Actualiza paquetes según los rangos declarados o sus etiquetas latest. Alias: `vp up`.

```bash
vp update
vp update react
vp update --latest
vp update -g
vp update -g --latest
```

## Opciones

| Opción                 | Descripción                                                   | Notas                                                                           |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `-L, --latest`         | Actualiza a la versión más reciente ignorando el rango actual. |                                                                                 |
| `-r, --recursive`      | Actualiza en todos los paquetes del espacio de trabajo.        |                                                                                 |
| `--filter <pattern>`   | Selecciona espacios de trabajo por patrón.                    | Se puede repetir.                                                               |
| `-w, --workspace-root` | Actualiza en la raíz del espacio de trabajo.                  |                                                                                 |
| `-P, --prod`           | Solo actualiza dependencias de producción.                    |                                                                                 |
| `-D, --dev`            | Solo actualiza dependencias de desarrollo.                    |                                                                                 |
| `--no-optional`        | No actualiza dependencias opcionales.                         |                                                                                 |
| `-g, --global`         | Actualiza paquetes globales.                                  | Requiere la CLI global. Usa el [almacén de paquetes globales](./global-packages). |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm update`.
- **pnpm:** `pnpm update`.
- **Yarn Classic:** `yarn upgrade`.
- **Yarn Modern:** `yarn up`.
- **Bun:** `bun update`.

| Opción                 | npm            | pnpm | Yarn Classic | Yarn Modern | Bun | Notas                                                 |
| ---------------------- | -------------- | ---- | ------------ | ----------- | --- | ----------------------------------------------------- |
| `-L, --latest`         | No             | Sí   | Sí           | No          | Sí  | Yarn Modern actualiza a latest de forma predeterminada.|
| `-r, --recursive`      | 8.1.0 o post.  | Sí   | No           | 3 o post.   | No  | npm incluye la raíz del workspace.                    |
| `--filter <pattern>`   | 7.14.0 o post. | Sí   | No           | No          | No  |                                                       |
| `-w, --workspace-root` | 8.1.0 o post.  | Sí   | No           | No          | No  |                                                       |
| `-P, --prod`           | No             | Sí   | No           | No          | No  |                                                       |
| `-D, --dev`            | No             | Sí   | No           | No          | No  |                                                       |
| `--no-optional`        | No             | Sí   | No           | No          | No  |                                                       |
| `-g, --global`         | Sí             | Sí   | Sí           | Sí          | Sí  |                                                       |

## Opciones Nativas

Para opciones nativas, consulta [npm update](https://docs.npmjs.com/cli/v11/commands/npm-update), [pnpm update](https://pnpm.io/cli/update), [Yarn up](https://yarnpkg.com/cli/up), [Yarn Classic upgrade](https://classic.yarnpkg.com/en/docs/cli/upgrade) y [Bun update](https://bun.com/docs/pm/cli/update). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
