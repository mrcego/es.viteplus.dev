# vp install

Instala las dependencias declaradas por el proyecto. Alias: `vp i`. Suministrar nombres de paquetes cambia al comportamiento de [add](./add).

```bash
vp install
vp install --frozen-lockfile
vp install --lockfile-only
vp install --filter web
vp install react
```

## Opciones

| Opción                   | Descripción                                                                       | Notas                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `-P, --prod`             | Selecciona dependencias de producción o guarda paquetes añadidos en dependencies. |                                                                                                      |
| `-D, --dev`              | Incluye dependencias de desarrollo o guarda paquetes añadidos en devDependencies. |                                                                                                      |
| `--no-optional`          | No instala optionalDependencies.                                                  |                                                                                                      |
| `--frozen-lockfile`      | Evita cambios en el lockfile.                                                     | Anula un `--no-frozen-lockfile` anterior.                                                           |
| `--no-frozen-lockfile`   | Permite explícitamente actualizaciones del lockfile.                              | Anula un `--frozen-lockfile` anterior.                                                              |
| `--lockfile-only`        | Actualiza el lockfile sin una instalación completa.                               |                                                                                                      |
| `--prefer-offline`       | Usa paquetes en caché cuando estén disponibles.                                   |                                                                                                      |
| `--offline`              | Solo usa paquetes que ya estén en caché.                                          |                                                                                                      |
| `-f, --force`            | Solicita una reinstalación forzada.                                               |                                                                                                      |
| `--ignore-scripts`       | No ejecuta scripts del ciclo de vida.                                             |                                                                                                      |
| `--no-lockfile`          | Omite leer o generar un lockfile.                                                |                                                                                                      |
| `--fix-lockfile`         | Repara entradas del lockfile.                                                     | No se puede combinar con nombres de paquetes.                                                        |
| `--shamefully-hoist`     | Crea una estructura plana de `node_modules`.                                      |                                                                                                      |
| `--resolution-only`      | Vuelve a ejecutar la resolución de dependencias para análisis.                    | No se puede combinar con nombres de paquetes.                                                        |
| `--silent`               | Suprime la salida de Vite+ y solicita salida silenciosa nativa.                   |                                                                                                      |
| `--filter <pattern>`     | Selecciona espacios de trabajo por patrón.                                        | Se puede repetir.                                                                                    |
| `-w, --workspace-root`   | Selecciona la raíz del espacio de trabajo.                                        |                                                                                                      |
| `-E, --save-exact`       | Guarda una versión exacta de la dependencia.                                      | Requiere nombres de paquetes.                                                                        |
| `--save-peer`            | Solicita el comportamiento del gestor para guardar dependencias peer.              | Requiere nombres de paquetes.                                                                        |
| `-O, --save-optional`    | Guarda en optionalDependencies.                                                   | Requiere nombres de paquetes.                                                                        |
| `--save-catalog`         | Guarda la dependencia en el catálogo predeterminado.                              | Requiere nombres de paquetes.                                                                        |
| `-g, --global`           | Instala globalmente.                                                              | Requiere la CLI global. Usa el [almacén global](./global-packages). Requiere nombres de paquetes.     |
| `--node <version>`       | Versión de Node.js a usar para la instalación global.                             | Requiere --global.                                                                                   |
| `--concurrency <number>` | Número de instalaciones de paquetes globales a ejecutar en paralelo.              | Requiere --global. Debe ser un entero positivo.                                                      |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm install`, o `npm ci` con `--frozen-lockfile` y sin nombres de paquetes. Con nombres de paquetes: `npm install`.
- **pnpm:** `pnpm install`. Con nombres de paquetes: `pnpm add`.
- **Yarn Classic:** `yarn install`. Con nombres de paquetes: `yarn add`.
- **Yarn Modern:** `yarn install`. Con nombres de paquetes: `yarn add`.
- **Bun:** `bun install`. Con nombres de paquetes: `bun add`.

| Opción                   | npm                       | pnpm                  | Yarn Classic          | Yarn Modern           | Bun                              | Notas                                                    |
| ------------------------ | ------------------------- | --------------------- | --------------------- | --------------------- | -------------------------------- | -------------------------------------------------------- |
| `-P, --prod`             | Sí                        | Sí                    | Sí                    | Con nombres de paquetes| Sí                              | Yarn Modern solo advierte en modo install.               |
| `-D, --dev`              | Sí                        | Sí                    | Sí                    | Con nombres de paquetes| Sí                              |                                                          |
| `--no-optional`          | Sí                        | Sí                    | Sí                    | No                    | Sí                               |                                                          |
| `--frozen-lockfile`      | Sin nombres de paquetes   | Sin nombres de paquetes| Sí                   | Sin nombres de paquetes| Sí                              |                                                          |
| `--no-frozen-lockfile`   | Sin nombres de paquetes   | Sin nombres de paquetes| Sin nombres de paquetes| Sin nombres de paquetes| Sí                             |                                                          |
| `--lockfile-only`        | Sin --frozen-lockfile     | Sí                    | No                    | 3 o posterior         | Sí                               | npm ignora esto en modo CI.                              |
| `--prefer-offline`       | Sí                        | Sí                    | Sí                    | No                    | 1.4.1 o posterior                |                                                          |
| `--offline`              | Sí                        | Sí                    | Sí                    | No                    | 1.4.1 o posterior                |                                                          |
| `-f, --force`            | Sin --frozen-lockfile     | Sí                    | Sí                    | No                    | Sí                               | npm ignora esto en modo CI.                              |
| `--ignore-scripts`       | Sí                        | Sí                    | Sí                    | 2.4 o posterior       | Sí                               | En Yarn Modern, el modo lockfile-only tiene prioridad.   |
| `--no-lockfile`          | Sin --frozen-lockfile     | Sí                    | Sí                    | No                    | No                               | npm ignora esto en modo CI.                              |
| `--fix-lockfile`         | No                        | Sí                    | No                    | 4 o posterior         | No                               |                                                          |
| `--shamefully-hoist`     | No                        | Sí                    | No                    | No                    | No                               |                                                          |
| `--resolution-only`      | No                        | Sí                    | No                    | No                    | No                               |                                                          |
| `--silent`               | Sí                        | Sí                    | Sí                    | No                    | Sí                               |                                                          |
| `--filter <pattern>`     | 7.14.0 o posterior        | Sí                    | No                    | Sí                    | Install: Sí. Add: 1.4 o posterior|                                                          |
| `-w, --workspace-root`   | 8.1.0 o posterior         | Sí                    | Con nombres de paquetes| No                   | No                               |                                                          |
| `-E, --save-exact`       | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |
| `--save-peer`            | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |
| `-O, --save-optional`    | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |
| `--save-catalog`         | No                        | 10.12.0 o posterior   | No                    | No                    | 1.4 o posterior                  |                                                          |
| `-g, --global`           | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |
| `--node <version>`       | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |
| `--concurrency <number>` | Sí                        | Sí                    | Sí                    | Sí                    | Sí                               |                                                          |

Con nombres de paquetes, se aplican las reglas de compatibilidad de [add](./add).

### Dependencias Git y Tarballs Remotos

npm 12 deshabilita las dependencias git y las URLs de tarballs remotos de forma predeterminada. Las instalaciones pueden fallar con `EALLOWGIT` o `EALLOWREMOTE`. Habilítalas a través de la configuración del proyecto `allow-git` o `allow-remote` de npm solo cuando esas fuentes sean intencionadas.

Para la aprobación de scripts de compilación de dependencias, consulta [approve-builds](./approve-builds).

## Opciones Nativas

Para opciones nativas, consulta [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install), [pnpm install](https://pnpm.io/cli/install), [Yarn install](https://yarnpkg.com/cli/install), [Yarn Classic install](https://classic.yarnpkg.com/en/docs/cli/install) y [Bun install](https://bun.com/docs/pm/cli/install). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
