# vp pm owner

Gestiona los propietarios de un paquete en el registro.

```bash
vp pm owner list my-package
vp pm owner add username my-package
vp pm owner rm username my-package
```

## Opciones

- `list [package]` lista los propietarios del paquete. Alias: `ls`.
- `add <user> [package]` añade un propietario.
- `rm <user> [package]` elimina un propietario.

El nombre del paquete es opcional cuando se ejecuta dentro del directorio del paquete.

| Opción             | Descripción                                      | Notas |
| ------------------ | ------------------------------------------------ | ----- |
| `--otp <otp>`      | Proporciona una contraseña de un solo uso (OTP). |       |
| `--registry <url>` | Selecciona el registro.                          |       |

### `list`

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

## Compatibilidad

- **npm:** `npm owner`.
- **pnpm:** 11 o posterior: `pnpm owner`. Las versiones anteriores usan `npm owner` como respaldo.
- **Yarn Classic:** `yarn owner`.
- **Yarn Modern:** Respaldo: `npm owner`.
- **Bun:** Respaldo: `npm owner`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas                                            |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ------------------------------------------------ |
| `--otp <otp>`      | Sí  | Sí   | No           | Sí          | Sí  |                                                  |
| `--registry <url>` | Sí  | Sí   | No           | Sí          | Sí  | Configura el registro en los ajustes de Yarn Classic. |

Yarn Modern y Bun emiten una advertencia de respaldo antes de invocar npm. pnpm infiere el paquete desde el directorio actual cuando se omite.

## Opciones Nativas

Para opciones nativas, consulta [npm owner](https://docs.npmjs.com/cli/v11/commands/npm-owner), [pnpm owner](https://pnpm.io/cli/owner) y [Yarn Classic owner](https://classic.yarnpkg.com/en/docs/cli/owner). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
