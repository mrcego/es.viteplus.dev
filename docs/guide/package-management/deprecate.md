# vp pm deprecate

Establece un mensaje de desaprobación (deprecation) para una versión o rango de versiones publicado.

```bash
vp pm deprecate 'my-package@<2.0.0' 'Actualiza a la versión 2 o posterior'
```

## Opciones

Se requiere una especificación de paquete y un mensaje.

La desaprobación advierte a los consumidores; no despublica el paquete.

| Opción             | Descripción                                     | Notas |
| ------------------ | ----------------------------------------------- | ----- |
| `--otp <otp>`      | Proporciona una contraseña de un solo uso (OTP).|       |
| `--registry <url>` | Selecciona el registro.                         |       |

## Compatibilidad

- **npm:** `npm deprecate`.
- **pnpm:** 11 o posterior: `pnpm deprecate`. Las versiones anteriores usan `npm deprecate` como respaldo.
- **Yarn Classic:** Respaldo: `npm deprecate`.
- **Yarn Modern:** Respaldo: `npm deprecate`.
- **Bun:** Respaldo: `npm deprecate`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ----- |
| `--otp <otp>`      | Sí  | Sí   | Sí           | Sí          | Sí  |       |
| `--registry <url>` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

Bun emite una advertencia de respaldo. La configuración del registro y la autenticación siguen el comando que se ejecuta.

Un mensaje vacío se reenvía sin cambios. El pnpm nativo lo rechaza; Vite+ no lo traduce a `undeprecate`.

## Opciones Nativas

Para opciones nativas, consulta [npm deprecate](https://docs.npmjs.com/cli/v11/commands/npm-deprecate) y [pnpm deprecate](https://pnpm.io/cli/deprecate). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
