# vp outdated

Comprueba si hay versiones más recientes de los paquetes instalados.

```bash
vp outdated
vp outdated react
vp outdated --filter web
vp outdated -g
```

## Opciones

| Opción                    | Descripción                                      | Notas                                                                           |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `--json`                  | Solicita salida JSON nativa.                     | La salida conserva el esquema nativo.                                           |
| `--long`                  | Muestra información extendida.                   |                                                                                 |
| `--parseable`             | Formato de salida parseable.                     |                                                                                 |
| `-r, --recursive`         | Comprueba en todos los workspaces.               |                                                                                 |
| `--filter <pattern>`      | Selecciona espacios de trabajo por patrón.       | Se puede repetir.                                                               |
| `-w, --workspace-root`    | Comprueba en la raíz del espacio de trabajo.     |                                                                                 |
| `-P, --prod`              | Solo comprueba dependencias de producción.       |                                                                                 |
| `-D, --dev`               | Solo comprueba dependencias de desarrollo.       |                                                                                 |
| `--no-optional`           | Excluye dependencias opcionales.                 |                                                                                 |
| `--find-by <finder_name>` | Usa una función finder.                          |                                                                                 |
| `-g, --global`            | Comprueba paquetes globales.                     | Requiere la CLI global. Usa el [almacén de paquetes globales](./global-packages). |
| `--concurrency <number>`  | Número de comprobaciones globales en paralelo.   | Requiere --global. Debe ser un entero positivo.                                 |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm outdated`.
- **pnpm:** `pnpm outdated`.
- **Yarn Classic:** `yarn outdated`.
- **Yarn Modern:** Sin comando. Muestra advertencia y sale con éxito sin ejecutar.
- **Bun:** `bun outdated`.

| Opción                    | npm            | pnpm            | Yarn Classic | Yarn Modern | Bun            | Notas                                      |
| ------------------------- | -------------- | --------------- | ------------ | ----------- | -------------- | ------------------------------------------ |
| `--json`                  | Sí             | No              | Sí           | No          | No             |                                            |
| `--long`                  | Sí             | Sí              | No           | No          | No             |                                            |
| `--parseable`             | Sí             | Sí              | No           | No          | No             |                                            |
| `-r, --recursive`         | 8.1.0 o post.  | Sí              | No           | No          | No             | npm incluye la raíz del workspace.         |
| `--filter <pattern>`      | 7.14.0 o post. | Sí              | No           | No          | No             |                                            |
| `-w, --workspace-root`    | 8.1.0 o post.  | Sí              | No           | No          | No             |                                            |
| `-P, --prod`              | No             | Sí              | Sí           | No          | No             |                                            |
| `-D, --dev`               | No             | Sí              | Sí           | No          | No             |                                            |
| `--no-optional`           | No             | Sí              | No           | No          | No             |                                            |
| `--find-by <finder_name>` | No             | 10.16.0 o post. | No           | No          | No             |                                            |
| `-g, --global`            | Sí             | Sí              | Sí           | No          | Sí             |                                            |
| `--concurrency <number>`  | Sí             | Sí              | Sí           | No          | Sí             |                                            |

## Opciones Nativas

Para opciones nativas, consulta [npm outdated](https://docs.npmjs.com/cli/v11/commands/npm-outdated), [pnpm outdated](https://pnpm.io/cli/outdated), [Yarn Classic outdated](https://classic.yarnpkg.com/en/docs/cli/outdated) y [Bun outdated](https://bun.com/docs/pm/cli/outdated). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
