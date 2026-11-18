# vp dedupe

Reduce las entradas de dependencias duplicadas utilizando el gestor de paquetes seleccionado.

```bash
vp dedupe
vp dedupe --check
```

## Opciones

| Opción    | Descripción                                             | Notas |
| --------- | ------------------------------------------------------- | ----- |
| `--check` | Comprueba si la desduplicación realizaría cambios.      |       |

## Compatibilidad

- **npm:** `npm dedupe`.
- **pnpm:** `pnpm dedupe`.
- **Yarn Classic:** Respaldo (fallback): `yarn install`.
- **Yarn Modern:** `yarn dedupe`.
- **Bun:** 1.4 o posterior: `bun dedupe`. Versiones anteriores usan `bun install` como respaldo.

| Opción    | npm | pnpm | Yarn Classic | Yarn Modern | Bun          | Notas |
| --------- | --- | ---- | ------------ | ----------- | ------------ | ----- |
| `--check` | Sí  | Sí   | No           | Sí          | 1.4 o posterior |       |

Una instalación de respaldo no es una comprobación de solo lectura. Las solicitudes no compatibles de `--check` fallan antes de que se ejecute el respaldo.

## Opciones Nativas

Para opciones nativas, consulta [npm dedupe](https://docs.npmjs.com/cli/v11/commands/npm-dedupe), [pnpm dedupe](https://pnpm.io/cli/dedupe), [Yarn dedupe](https://yarnpkg.com/cli/dedupe), [Yarn Classic install](https://classic.yarnpkg.com/en/docs/cli/install) y [Bun dedupe](https://bun.com/docs/pm/cli/dedupe). Para el respaldo de Bun, consulta [Bun install](https://bun.com/docs/pm/cli/install). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
