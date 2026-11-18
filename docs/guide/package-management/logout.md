# vp pm logout

Cierra sesión en un registro de paquetes.

```bash
vp pm logout
vp pm logout --scope @my-org
```

## Opciones

| Opción             | Descripción                     | Notas |
| ------------------ | ------------------------------- | ----- |
| `--registry <url>` | Selecciona el registro.         |       |
| `--scope <scope>`  | Ámbito (scope) para el cierre de sesión. |       |

## Compatibilidad

- **npm:** `npm logout`.
- **pnpm:** 11 o posterior: `pnpm logout`. Las versiones anteriores usan `npm logout` como respaldo.
- **Yarn Classic:** `yarn logout`.
- **Yarn Modern:** `yarn npm logout`.
- **Bun:** Respaldo: `npm logout`.

| Opción             | npm | pnpm      | Yarn Classic | Yarn Modern | Bun | Notas                                      |
| ------------------ | --- | --------- | ------------ | ----------- | --- | ------------------------------------------ |
| `--registry <url>` | Sí  | Sí        | No           | No          | Sí  | Configura el registro en los ajustes de Yarn. |
| `--scope <scope>`  | Sí  | Antes de 11 | No         | Sí          | Sí  |                                            |

La eliminación de credenciales y la invalidación del token siguen al gestor nativo y al registro. El cierre de sesión de pnpm nativo no ejecuta `npm logout` ni realiza limpiezas adicionales de credenciales. Usa [login](./login) para volver a autenticarte.

## Opciones Nativas

Para opciones nativas, consulta [npm logout](https://docs.npmjs.com/cli/v11/commands/npm-logout), [pnpm logout](https://pnpm.io/cli/logout), [Yarn npm logout](https://yarnpkg.com/cli/npm/logout) y [Yarn Classic logout](https://classic.yarnpkg.com/en/docs/cli/logout). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
