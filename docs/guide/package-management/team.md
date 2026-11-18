# vp pm team

Gestiona equipos de organizaciones y membresías de paquetes.

```bash
vp pm team create my-org:my-team
vp pm team add my-org:my-team username
vp pm team list my-org
```

## Opciones

- `create <scope:team>` crea un nuevo equipo.
- `destroy <scope:team>` elimina un equipo existente.
- `add <scope:team> <user>` añade un usuario al equipo.
- `rm <scope:team> <user>` elimina un usuario del equipo.
- `list <scope|scope:team>` lista equipos o miembros de un equipo. Alias: `ls`.

| Opción             | Descripción                                      | Notas                             |
| ------------------ | ------------------------------------------------ | --------------------------------- |
| `--json`           | Solicita salida JSON nativa.                     | La salida conserva el esquema nativo. |
| `--otp <otp>`      | Proporciona una contraseña de un solo uso (OTP). |                                   |
| `--registry <url>` | Selecciona el registro.                          |                                   |

### `create`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `destroy`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `add`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `rm`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `list`

| Opción             | Descripción                  | Notas                             |
| ------------------ | ---------------------------- | --------------------------------- |
| `--json`           | Solicita salida JSON nativa. | La salida conserva el esquema nativo. |
| `--otp <otp>`      | Proporciona un OTP.          |                                   |
| `--registry <url>` | Selecciona el registro.      |                                   |

## Compatibilidad

- **npm:** `npm team`.
- **pnpm:** 11 o posterior: `pnpm team`. Las versiones anteriores usan `npm team` como respaldo.
- **Yarn Classic:** Respaldo: `npm team`.
- **Yarn Modern:** Respaldo: `npm team`.
- **Bun:** Respaldo: `npm team`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ----- |
| `--json`           | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--otp <otp>`      | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--registry <url>` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

Las rutas de respaldo advierten antes de invocar npm. Las comprobaciones de membresía de organizaciones y permisos dependen de las reglas de acceso del registro.

## Opciones Nativas

Para opciones nativas, consulta [npm team](https://docs.npmjs.com/cli/v11/commands/npm-team) y [pnpm team](https://pnpm.io/cli/team). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
