# vp pm config

Inspecciona y edita los ajustes de configuración del gestor de paquetes.

```bash
vp pm config list
vp pm config get registry
vp pm config set registry https://registry.npmjs.org
vp pm config delete registry
```

## Opciones

- `list` muestra la configuración activa. Alias: `ls`.
- `get <key>` lee una clave de configuración.
- `set <key> <value>` escribe una clave de configuración.
- `delete <key>` elimina una clave de configuración. Alias: `rm`, `unset`.

| Opción                               | Descripción                                         | Notas |
| ------------------------------------ | --------------------------------------------------- | ----- |
| `--json`                             | Solicita salida JSON nativa.                        |       |
| `-g, --global`                       | Opera sobre la configuración global.                |       |
| `--location <project|user|global>` | Selecciona el archivo de configuración a consultar. |       |

### `list`

| Opción                               | Descripción                          | Notas                                                |
| ------------------------------------ | ------------------------------------ | ---------------------------------------------------- |
| `--json`                             | Solicita salida JSON nativa.         |                                                      |
| `-g, --global`                       | Opera en el ámbito global.           |                                                      |
| `--location <project|user|global>` | Selecciona el archivo de destino.    | Las lecturas conservan la configuración combinada.   |

### `get`

| Opción                               | Descripción                          | Notas                                                |
| ------------------------------------ | ------------------------------------ | ---------------------------------------------------- |
| `--json`                             | Solicita salida JSON nativa.         |                                                      |
| `-g, --global`                       | Opera en el ámbito global.           |                                                      |
| `--location <project|user|global>` | Selecciona el archivo de destino.    | Las lecturas conservan la configuración combinada.   |

### `set`

| Opción                               | Descripción                          | Notas |
| ------------------------------------ | ------------------------------------ | ----- |
| `--json`                             | Solicita salida JSON nativa.         |       |
| `-g, --global`                       | Opera en el ámbito global.           |       |
| `--location <project|user|global>` | Selecciona el archivo de destino.    |       |

### `delete`

| Opción                               | Descripción                          | Notas |
| ------------------------------------ | ------------------------------------ | ----- |
| `-g, --global`                       | Opera en el ámbito global.           |       |
| `--location <project|user|global>` | Selecciona el archivo de destino.    |       |

## Compatibilidad

### `list`

- **npm:** `npm config list`.
- **pnpm:** `pnpm config list`.
- **Yarn Classic:** `yarn config list`.
- **Yarn Modern:** `yarn config`.
- **Bun:** Respaldo: `npm config list`. Utiliza la configuración de npm, no `bunfig.toml`.

| Opción                               | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Notas                                              |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | -------------------------------------------------- |
| `--json`                             | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |                                                    |
| `-g, --global`                       | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |                                                    |
| `--location <project|user|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global | Las lecturas conservan la configuración combinada. |

### `get`

- **npm:** `npm config get`.
- **pnpm:** `pnpm config get`.
- **Yarn Classic:** `yarn config get`.
- **Yarn Modern:** `yarn config get`.
- **Bun:** Respaldo: `npm config get`. Utiliza la configuración de npm, no `bunfig.toml`.

| Opción                               | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Notas                                              |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | -------------------------------------------------- |
| `--json`                             | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |                                                    |
| `-g, --global`                       | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |                                                    |
| `--location <project|user|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global | Las lecturas conservan la configuración combinada. |

### `set`

- **npm:** `npm config set`.
- **pnpm:** `pnpm config set`.
- **Yarn Classic:** `yarn config set`.
- **Yarn Modern:** `yarn config set`.
- **Bun:** Respaldo: `npm config set`. Utiliza la configuración de npm, no `bunfig.toml`.

| Opción                               | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Notas |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ----- |
| `--json`                             | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |       |
| `-g, --global`                       | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |       |
| `--location <project|user|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global |       |

### `delete`

- **npm:** `npm config delete`.
- **pnpm:** `pnpm config delete`.
- **Yarn Classic:** `yarn config delete`.
- **Yarn Modern:** `yarn config unset`.
- **Bun:** Respaldo: `npm config delete`. Utiliza la configuración de npm, no `bunfig.toml`.

| Opción                               | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Notas |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ----- |
| `-g, --global`                       | Sí                    | Sí                    | Sí           | Sí                    | Sí                    |       |
| `--location <project|user|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global |       |

Las escrituras de usuario en Yarn Classic emplean valores predeterminados nativos.

## Opciones Nativas

Para opciones nativas, consulta [npm config](https://docs.npmjs.com/cli/v11/commands/npm-config), [pnpm config](https://pnpm.io/cli/config), [Yarn config](https://yarnpkg.com/cli/config), [Yarn config get](https://yarnpkg.com/cli/config/get), [Yarn config set](https://yarnpkg.com/cli/config/set), [Yarn config unset](https://yarnpkg.com/cli/config/unset) y [Yarn Classic config](https://classic.yarnpkg.com/en/docs/cli/config). Las opciones nativas fuera de esta interfaz requieren el comando nativo.

Para la configuración de `bunfig.toml`, consulta [configuración de Bun](https://bun.com/docs/runtime/bunfig).
