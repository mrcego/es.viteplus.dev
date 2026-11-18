# vp pm version

Actualiza la versión del paquete y los metadatos de control de versiones.

```bash
vp pm version patch
vp pm version 1.2.3 --message "Release %s"
```

## Opciones

Un incremento de versión o un número de versión específico es opcional pero usual.

| Opción                  | Descripción                                         | Notas |
| ----------------------- | --------------------------------------------------- | ----- |
| `-m, --message <message>` | Mensaje de commit para el tag de versión creado.  |       |

## Compatibilidad

- **npm:** `npm version`.
- **pnpm:** 11 o posterior: `pnpm version`. Las versiones anteriores usan `npm version` como respaldo.
- **Yarn Classic:** `yarn version`.
- **Yarn Modern:** `yarn version`.
- **Bun:** `bun pm version`.

| Opción                  | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| ----------------------- | --- | ---- | ------------ | ----------- | --- | ----- |
| `-m, --message <message>` | Sí  | Sí   | Sí           | No          | Sí  |       |

Yarn Modern gestiona las versiones a través de su flujo de trabajo de versiones y no admite `-m`. Para flujos de trabajo de versiones en pnpm que utilicen npm version como respaldo, npm crea los commits y tags de git.

## Opciones Nativas

Para opciones nativas, consulta [npm version](https://docs.npmjs.com/cli/v11/commands/npm-version), [pnpm version](https://pnpm.io/cli/version), [Yarn version](https://yarnpkg.com/cli/version), [Yarn Classic version](https://classic.yarnpkg.com/en/docs/cli/version) y [Bun pm version](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
