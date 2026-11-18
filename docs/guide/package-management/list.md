# vp list

Enumera las dependencias instaladas. Alias: `vp ls`. Estos comandos de nivel superior requieren la CLI global. Tanto la CLI global como la local del proyecto aceptan `vp pm list` y `vp pm ls`.

```bash
vp list
vp list react --depth 2
vp list --json
vp list -g
```

## Opciones

| Opción                    | Descripción                              | Notas                                                                           |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| `--depth <depth>`         | Profundidad máxima del árbol.            |                                                                                 |
| `--json`                  | Solicita salida JSON nativa.             | La salida conserva el esquema nativo.                                           |
| `--long`                  | Muestra información extendida.           |                                                                                 |
| `--parseable`             | Formato de salida parseable.             |                                                                                 |
| `-P, --prod`              | Solo dependencias de producción.         |                                                                                 |
| `-D, --dev`               | Incluye dependencias de desarrollo.      |                                                                                 |
| `--no-optional`           | Excluye dependencias opcionales.         |                                                                                 |
| `--exclude-peers`         | Excluye dependencias peer.               |                                                                                 |
| `--only-projects`         | Muestra solo paquetes del proyecto.      |                                                                                 |
| `--find-by <finder_name>` | Usa una función finder.                  |                                                                                 |
| `-r, --recursive`         | Lista en todos los workspaces.           |                                                                                 |
| `--filter <pattern>`      | Selecciona espacios de trabajo por patrón.| Se puede repetir.                                                              |
| `-g, --global`            | Lista paquetes globales.                 | Requiere la CLI global. Usa el [almacén de paquetes globales](./global-packages). |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm list`.
- **pnpm:** `pnpm list`.
- **Yarn Classic:** `yarn list`.
- **Yarn Modern:** No hay equivalente directo. `yarn info` no es una alternativa directa para listar el árbol completo. Muestra advertencia y sale con éxito sin ejecutar.
- **Bun:** `bun pm ls`.

| Opción                    | npm            | pnpm            | Yarn Classic | Yarn Modern | Bun            | Notas                                      |
| ------------------------- | -------------- | --------------- | ------------ | ----------- | -------------- | ------------------------------------------ |
| `--depth <depth>`         | Sí             | Sí              | Sí           | No          | No             | Con Bun, profundidad > 0 requiere `--all`. |
| `--json`                  | Sí             | Sí              | Sí           | No          | No             |                                            |
| `--long`                  | Sí             | Sí              | No           | No          | No             |                                            |
| `--parseable`             | Sí             | Sí              | No           | No          | No             |                                            |
| `-P, --prod`              | Sí             | Sí              | Sí           | No          | No             |                                            |
| `-D, --dev`               | Sí             | Sí              | Sí           | No          | No             |                                            |
| `--no-optional`           | No             | Sí              | No           | No          | No             |                                            |
| `--exclude-peers`         | No             | 10.16.0 o posterior| No          | No          | No             |                                            |
| `--only-projects`         | No             | Sí              | No           | No          | No             |                                            |
| `--find-by <finder_name>` | No             | 10.16.0 o posterior| No          | No          | No             |                                            |
| `-r, --recursive`         | 8.1.0 o posterior | Sí              | No           | No          | No             | npm incluye la raíz del workspace.         |
| `--filter <pattern>`      | 7.14.0 o posterior| Sí              | No           | No          | No             |                                            |
| `-g, --global`            | Sí             | Sí              | Sí           | No          | Sí             | Usa el almacén de Vite+.                   |

## Opciones Nativas

Para opciones nativas, consulta [npm list](https://docs.npmjs.com/cli/v11/commands/npm-ls), [pnpm list](https://pnpm.io/cli/list), [Yarn Classic list](https://classic.yarnpkg.com/en/docs/cli/list) y [Bun pm ls](https://bun.com/docs/pm/cli/pm-ls). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
