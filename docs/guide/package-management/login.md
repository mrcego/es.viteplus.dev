# vp pm login

Autentícate con un registro de paquetes. Alias: `vp pm adduser`.

```bash
vp pm login
vp pm login --scope @my-org
```

## Opciones

| Opción             | Descripción                    | Notas |
| ------------------ | ------------------------------ | ----- |
| `--registry <url>` | Selecciona el registro.        |       |
| `--scope <scope>`  | Ámbito (scope) para el inicio de sesión. |       |

## Compatibilidad

- **npm:** `npm login`.
- **pnpm:** 11 o posterior: `pnpm login`. Las versiones anteriores usan `npm login` como respaldo.
- **Yarn Classic:** `yarn login`.
- **Yarn Modern:** `yarn npm login`.
- **Bun:** Respaldo: `npm login`.

| Opción             | npm | pnpm                              | Yarn Classic | Yarn Modern | Bun | Notas                                      |
| ------------------ | --- | --------------------------------- | ------------ | ----------- | --- | ------------------------------------------ |
| `--registry <url>` | Sí  | Sí                                | No           | No          | Sí  | Configura el registro en los ajustes de Yarn. |
| `--scope <scope>`  | Sí  | Antes de 11 o 11.2 y posterior    | No           | Sí          | Sí  |                                            |

Las solicitudes de autenticación y el almacenamiento de credenciales corresponden al comando nativo. `pnpm login` no copia credenciales a npm, por lo que comandos que aún usen npm pueden requerir un inicio de sesión por separado. Consulta [whoami](./whoami) para comprobar la cuenta seleccionada y [logout](./logout) para cerrar sesión.

## Opciones Nativas

Para opciones nativas, consulta [npm login](https://docs.npmjs.com/cli/v11/commands/npm-login), [pnpm login](https://pnpm.io/cli/login), [Yarn npm login](https://yarnpkg.com/cli/npm/login) y [Yarn Classic login](https://classic.yarnpkg.com/en/docs/cli/login). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
