# vp pm audit

Audita las dependencias en busca de vulnerabilidades conocidas.

```bash
vp pm audit
vp pm audit --json
vp pm audit --production --level high
```

## Opciones

| Opción            | Descripción                                         | Notas                             |
| ----------------- | --------------------------------------------------- | --------------------------------- |
| `--fix`           | Solicita la corrección automática de vulnerabilidades. |                                   |
| `--json`          | Solicita salida JSON nativa.                        | La salida conserva el esquema nativo. |
| `--level <level>` | Nivel mínimo de vulnerabilidad a reportar.          |                                   |
| `--production`    | Audita únicamente dependencias de producción.       |                                   |

## Compatibilidad

- **npm:** `npm audit` o `npm audit fix`.
- **pnpm:** `pnpm audit`.
- **Yarn Classic:** `yarn audit`.
- **Yarn Modern:** 2.4 o posterior: `yarn npm audit`. Las versiones anteriores advierten y omiten la operación.
- **Bun:** `bun audit` o `bun audit fix`.

| Opción            | npm | pnpm | Yarn Classic | Yarn Modern | Bun             | Notas |
| ----------------- | --- | ---- | ------------ | ----------- | --------------- | ----- |
| `--fix`           | Sí  | Sí   | No           | No          | 1.4 o posterior |       |
| `--json`          | Sí  | Sí   | Sí           | Sí          | Sí              |       |
| `--level <level>` | Sí  | Sí   | Sí           | Sí          | Sí              |       |
| `--production`    | Sí  | Sí   | Sí           | Sí          | 1.2.21 o posterior |   |

La salida de vulnerabilidades y los umbrales de fallo conservan la semántica del gestor nativo.

## Opciones Nativas

Para opciones nativas, consulta [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit), [pnpm audit](https://pnpm.io/cli/audit), [Yarn npm audit](https://yarnpkg.com/cli/npm/audit), [Yarn Classic audit](https://classic.yarnpkg.com/en/docs/cli/audit) y [Bun audit](https://bun.com/docs/pm/cli/audit). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
