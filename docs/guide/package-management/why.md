# vp why

Explica por qué una dependencia está instalada. Alias: `vp explain`.

```bash
vp why react
vp why react --json
vp why react --filter web
```

## Opciones

| Opción                    | Descripción                                      | Notas                                 |
| ------------------------- | ------------------------------------------------ | ------------------------------------- |
| `--json`                  | Solicita salida JSON nativa.                     | La salida conserva el esquema nativo. |
| `--long`                  | Muestra información ampliada.                    |                                       |
| `--parseable`             | Muestra formato parseable.                       |                                       |
| `-r, --recursive`         | Comprueba recursivamente en todos los workspaces. |                                       |
| `--filter <pattern>`      | Selecciona espacios de trabajo por patrón.       | Se puede repetir.                     |
| `-w, --workspace-root`    | Comprueba en la raíz del espacio de trabajo.     |                                       |
| `-P, --prod`              | Solo dependencias de producción.                 |                                       |
| `-D, --dev`               | Solo dependencias de desarrollo.                 |                                       |
| `--depth <depth>`         | Limita la profundidad del árbol.                 |                                       |
| `--no-optional`           | Excluye dependencias opcionales.                 |                                       |
| `--exclude-peers`         | Excluye dependencias peer.                       |                                       |
| `--find-by <finder_name>` | Usa una función finder definida en .pnpmfile.cjs.|                                       |

## Compatibilidad

- **npm:** `npm explain`.
- **pnpm:** `pnpm why`.
- **Yarn Classic:** `yarn why`. Con múltiples nombres de paquetes, muestra advertencia y comprueba solo el primero.
- **Yarn Modern:** `yarn why`. Con múltiples nombres de paquetes, muestra advertencia y comprueba solo el primero.
- **Bun:** `bun why`.

| Opción                    | npm            | pnpm            | Yarn Classic | Yarn Modern | Bun            | Notas                                          |
| ------------------------- | -------------- | --------------- | ------------ | ----------- | -------------- | ---------------------------------------------- |
| `--json`                  | Sí             | Sí              | No           | No          | No             | Yarn Modern no devuelve JSON estructurado.     |
| `--long`                  | No             | Sí              | No           | No          | No             |                                                |
| `--parseable`             | No             | Sí              | No           | No          | No             |                                                |
| `-r, --recursive`         | 8.1.0 o posterior | Sí              | No           | 3 o posterior  | No             | npm incluye la raíz del workspace.             |
| `--filter <pattern>`      | 7.14.0 o posterior| Sí              | No           | Sí          | No             |                                                |
| `-w, --workspace-root`    | 8.1.0 o posterior | Sí              | No           | No          | No             |                                                |
| `-P, --prod`              | No             | Sí              | No           | No          | No             |                                                |
| `-D, --dev`               | No             | Sí              | No           | No          | No             |                                                |
| `--depth <depth>`         | No             | Sí              | No           | No          | No             |                                                |
| `--no-optional`           | No             | Sí              | No           | No          | No             |                                                |
| `--exclude-peers`         | No             | 10.16.0 o posterior| No           | No          | No             |                                                |
| `--find-by <finder_name>` | No             | 10.16.0 o posterior| No           | No          | No             |                                                |

`vp why` muestra el árbol de dependencias del gestor de paquetes. No puede mostrar el código empaquetado dentro de `@voidzero-dev/vite-plus-core` ni motores compilados en Vite+. Usa [`vp toolchain`](/guide/upgrade#mostrar-el-toolchain) para ver esas versiones y relaciones.

## Opciones Nativas

Para opciones nativas, consulta [npm explain](https://docs.npmjs.com/cli/v11/commands/npm-explain), [pnpm why](https://pnpm.io/cli/why), [Yarn why](https://yarnpkg.com/cli/why), [Yarn Classic why](https://classic.yarnpkg.com/en/docs/cli/why) y [Bun why](https://bun.com/docs/pm/cli/why). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
