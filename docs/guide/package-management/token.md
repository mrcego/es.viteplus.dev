# vp pm token

Gestiona tokens de autenticación del registro.

```bash
vp pm token list
vp pm token create --read-only
vp pm token revoke <token-id-or-value>
```

## Opciones

- `list` lista los tokens activos.
- `create` genera un nuevo token.
- `revoke` revoca un token existente.

| Opción             | Descripción                                      | Notas |
| ------------------ | ------------------------------------------------ | ----- |
| `--registry <url>` | Selecciona el registro.                          |       |
| `--otp <otp>`      | Proporciona una contraseña de un solo uso (OTP). |       |

### `list`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `create`

| Opción             | Descripción                 | Notas |
| ------------------ | --------------------------- | ----- |
| `--read-only`      | Crea un token de solo lectura.|     |
| `--cidr <cidr>`    | Restringe el acceso por CIDR.| Se puede repetir. |
| `--otp <otp>`      | Proporciona un OTP.         |       |
| `--registry <url>` | Selecciona el registro.     |       |

### `revoke`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

## Compatibilidad

- **npm:** `npm token`.
- **pnpm:** 11 o posterior: `pnpm token`. Las versiones anteriores usan `npm token` como respaldo.
- **Yarn Classic:** Respaldo: `npm token`.
- **Yarn Modern:** Respaldo: `npm token`.
- **Bun:** Respaldo: `npm token`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ----- |
| `--read-only`      | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--cidr <cidr>`    | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--otp <otp>`      | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--registry <url>` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

Las rutas de respaldo muestran una advertencia antes de ejecutar `npm token`. La revocación acepta el identificador o el valor del token según las normas del registro.

## Opciones Nativas

Para opciones nativas, consulta [npm token](https://docs.npmjs.com/cli/v11/commands/npm-token) y [pnpm token](https://pnpm.io/cli/token). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
