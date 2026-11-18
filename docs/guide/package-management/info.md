# vp info

Lee metadatos del paquete desde el registro. Alias: `vp view`, `vp show`, `vp pm view`, `vp pm info` y `vp pm show`.

```bash
vp info react
vp info react versions --json
vp info react@19 dist.tarball
```

## Opciones

Proporciona un nombre de paquete con una versión opcional, seguido de un nombre de campo opcional.

| Opción   | Descripción                   | Notas                                 |
| -------- | ----------------------------- | ------------------------------------- |
| `--json` | Solicita salida JSON nativa.  | La salida conserva el esquema nativo. |

## Compatibilidad

- **npm:** `npm view`.
- **pnpm:** `pnpm view`.
- **Yarn Classic:** `yarn info`.
- **Yarn Modern:** `yarn npm info`. Un campo solicitado se pasa como `--fields`.
- **Bun:** `bun info`.

| Opción   | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| -------- | --- | ---- | ------------ | ----------- | --- | ----- |
| `--json` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

Este comando consulta metadatos del registro, no el árbol local de dependencias. Usa [list](./list) o [why](./why) para inspeccionar paquetes instalados.

## Opciones Nativas

Para opciones nativas, consulta [npm view](https://docs.npmjs.com/cli/v11/commands/npm-view), [pnpm view](https://pnpm.io/cli/view), [Yarn npm info](https://yarnpkg.com/cli/npm/info), [Yarn Classic info](https://classic.yarnpkg.com/en/docs/cli/info) y [Bun info](https://bun.com/docs/pm/cli/info). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
