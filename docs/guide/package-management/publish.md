# vp pm publish

Publica un paquete en un registro. Los destinos admitidos y las opciones de vista previa dependen del gestor de paquetes:

```bash
vp pm publish --dry-run
vp pm publish --access public --tag next
vp pm publish ./package.tgz
```

## Opciones

| Opción                          | Descripción                                            | Notas                                           |
| ------------------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| `--dry-run`                     | Previsualiza sin publicar.                             |                                                 |
| `--tag <tag>`                   | Selecciona una etiqueta de distribución (dist-tag).    |                                                 |
| `--access <public|restricted>` | Solicita acceso público o restringido para el paquete. |                                                 |
| `--otp <otp>`                   | Proporciona una contraseña de un solo uso (OTP).       |                                                 |
| `--no-git-checks`               | Omite las comprobaciones de git.                       |                                                 |
| `--publish-branch <branch>`     | Define la rama desde la cual publicar.                 |                                                 |
| `--report-summary`              | Guarda el resumen de publicación.                      |                                                 |
| `--provenance`                  | Publica con procedencia (provenance).                  | Requiere un entorno de publicación compatible. |
| `--force`                       | Solicita publicación forzada nativa.                   |                                                 |
| `--json`                        | Solicita salida JSON nativa.                           | La salida conserva el esquema nativo.           |
| `-r, --recursive`               | Publica todos los paquetes del espacio de trabajo.     |                                                 |
| `--filter <pattern>`            | Selecciona espacios de trabajo mediante un patrón.     | Se puede repetir.                               |

## Compatibilidad

- **npm:** `npm publish`.
- **pnpm:** `pnpm publish`.
- **Yarn Classic:** `yarn publish`.
- **Yarn Modern:** `yarn npm publish` para el espacio de trabajo activo. Se rechazan destinos explícitos de archivo tarball o carpeta.
- **Bun:** `bun publish`.

| Opción                          | npm             | pnpm                               | Yarn Classic    | Yarn Modern     | Bun | Notas |
| ------------------------------- | --------------- | ---------------------------------- | --------------- | --------------- | --- | ----- |
| `--dry-run`                     | 5.10.0 o posterior | Sí                                | No              | 4.9.3 o posterior | Sí |       |
| `--tag <tag>`                   | Sí              | Sí                                 | Sí              | Sí              | Sí  |       |
| `--access <public|restricted>` | Sí              | Sí                                 | Sí              | Sí              | Sí  |       |
| `--otp <otp>`                   | Sí              | Sí                                 | 1.12.1 o posterior | 3.2.0 o posterior | Sí |     |
| `--no-git-checks`               | No              | Sí                                 | No              | No              | No  |       |
| `--publish-branch <branch>`     | No              | Sí                                 | No              | No              | No  |       |
| `--report-summary`              | No              | Sí                                 | No              | No              | No  |       |
| `--provenance`                  | 9.5.0 o posterior | Sí                               | No              | 4.9.0 o posterior | No |       |
| `--force`                       | Sí              | Sí                                 | No              | No              | No  |       |
| `--json`                        | Sí              | Antes de 11.0.0 o 11.0.7 y posterior | Sí            | 4.9.3 o posterior | No |       |
| `-r, --recursive`               | 7.13.0 o posterior | Sí                                | No              | No              | No  |       |
| `--filter <pattern>`            | 7.13.0 o posterior | Sí                                | No              | No              | No  |       |

La publicación con Yarn utiliza la configuración de registro y credenciales de Yarn. Los destinos y la selección de espacios de trabajo no admitidos provocan un error en lugar de recurrir a npm. Los fallos nativos de publicación no se reintentan mediante npm.

Vite+ rechaza las opciones no admitidas antes de que se ejecute el comando nativo de publicación. Yarn Classic puede ignorar `--dry-run` y publicar de verdad, o aceptar `--provenance` sin generar una atestación. Vite+ rechaza ambas opciones en Yarn Classic.

Los argumentos después de `--` se pasan directamente al comando nativo sin estas comprobaciones. Pasa argumentos nativos solo cuando comprendas el comportamiento del gestor subyacente.

## Opciones Nativas

Para opciones nativas, consulta [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish), [pnpm publish](https://pnpm.io/cli/publish), [Yarn npm publish](https://yarnpkg.com/cli/npm/publish), [Yarn Classic publish](https://classic.yarnpkg.com/en/docs/cli/publish) y [Bun publish](https://bun.com/docs/pm/cli/publish). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
