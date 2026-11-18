# vp pm stage

Interactúa con el flujo de publicación por etapas (staged publishing) del registro de paquetes.

```bash
vp pm stage list
vp pm stage approve my-package@1.0.0
vp pm stage reject my-package@1.0.0
```

## Opciones

- `list` lista los paquetes que esperan aprobación.
- `publish` publica a través del flujo por etapas.
- `approve` aprueba un paquete retenido en el registro.
- `reject` rechaza un paquete retenido.

| Opción             | Descripción                                     | Notas                                                                 |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------- |
| `--otp <otp>`      | Proporciona una contraseña de un solo uso (OTP).|                                                                       |
| `--registry <url>` | Selecciona el registro.                         | Las rutas nativas de Yarn deben configurar el registro en los ajustes de Yarn. |

### `list`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `publish`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `approve`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

### `reject`

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--otp <otp>`      | Proporciona un OTP.     |       |
| `--registry <url>` | Selecciona el registro. |       |

## Compatibilidad

- **npm:** 11.13 o posterior: `npm stage`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 10.22 o posterior: `pnpm stage`. Las versiones anteriores usan `npm stage` como respaldo.
- **Yarn Classic:** Respaldo: `npm stage`.
- **Yarn Modern:** 4.16 o posterior: subcomandos nativos de Yarn. Las versiones anteriores usan `npm stage` como respaldo.
- **Bun:** Respaldo: `npm stage`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern   | Bun | Notas                                            |
| ------------------ | --- | ---- | ------------ | ------------- | --- | ------------------------------------------------ |
| `--otp <otp>`      | Sí  | Sí   | Sí           | Sí            | Sí  |                                                  |
| `--registry <url>` | Sí  | Sí   | Sí           | Antes de 4.16.0 | Sí | Usa los ajustes de registro de Yarn en rutas nativas. |

Las rutas de respaldo de Yarn y Bun muestran una advertencia antes de invocar npm.

Este comando no guarda relación con el comando de preparación de control de versiones de Yarn ni con las comprobaciones de archivos en stage de Vite+.

## Opciones Nativas

Para opciones nativas, consulta [npm stage](https://docs.npmjs.com/cli/v11/commands/npm-stage), [pnpm stage](https://pnpm.io/cli/stage), [Yarn npm publish](https://yarnpkg.com/cli/npm/publish), [Yarn npm stage list](https://yarnpkg.com/cli/npm/stage/list), [Yarn npm stage approve](https://yarnpkg.com/cli/npm/stage/approve) y [Yarn npm stage reject](https://yarnpkg.com/cli/npm/stage/reject). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).

Para el flujo de trabajo del registro, consulta [npm staged publishing](https://docs.npmjs.com/staged-publishing).
