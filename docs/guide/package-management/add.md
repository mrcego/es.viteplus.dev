# vp add

Añade paquetes al proyecto y actualiza su manifiesto y lockfile.

```bash
vp add react
vp add -D typescript
vp add --save-peer react
vp add --filter web react
```

## Opciones

Elige un destino de dependencia a la vez. Las dependencias peer siguen el comportamiento del gestor nativo, incluyendo si también registra una dependencia de desarrollo.

| Opción                       | Descripción                                                   | Notas                                                                          |
| ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `-P, --save-prod`            | Guarda en dependencies, el destino predeterminado.            | Elige un destino de dependencia.                                               |
| `-D, --save-dev`             | Guarda en devDependencies.                                    | Elige un destino de dependencia.                                               |
| `--save-peer`                | Solicita el comportamiento del gestor para dependencias peer. | Elige un destino de dependencia.                                               |
| `-O, --save-optional`        | Guarda en optionalDependencies.                               | Elige un destino de dependencia.                                               |
| `-E, --save-exact`           | Guarda una versión exacta de la dependencia.                  |                                                                                |
| `--save-catalog-name <name>` | Guarda la dependencia en un catálogo con nombre.              |                                                                                |
| `--save-catalog`             | Guarda la dependencia en el catálogo predeterminado.          |                                                                                |
| `--allow-build <names>`      | Permite que los paquetes nombrados ejecuten postinstall.      |                                                                                |
| `--ignore-scripts`           | No ejecuta scripts del ciclo de vida.                         |                                                                                |
| `--no-optional`              | No instala optionalDependencies.                              | No se puede combinar con --global.                                             |
| `--frozen-lockfile`          | Evita cambios en el lockfile.                                 | No se puede combinar con --global. Anula un `--no-frozen-lockfile` anterior.  |
| `--no-frozen-lockfile`       | Permite explícitamente actualizaciones del lockfile.          | No se puede combinar con --global. Anula un `--frozen-lockfile` anterior.     |
| `--lockfile-only`            | Actualiza el lockfile sin una instalación completa.           | No se puede combinar con --global.                                             |
| `--prefer-offline`           | Usa paquetes en caché cuando estén disponibles.               | No se puede combinar con --global.                                             |
| `--offline`                  | Solo usa paquetes que ya estén en caché.                      | No se puede combinar con --global.                                             |
| `-f, --force`                | Solicita una reinstalación forzada.                           | No se puede combinar con --global.                                             |
| `--no-lockfile`              | Omite leer o generar un lockfile.                             | No se puede combinar con --global.                                             |
| `--shamefully-hoist`         | Crea una estructura plana de `node_modules`.                  | No se puede combinar con --global.                                             |
| `--filter <pattern>`         | Selecciona espacios de trabajo por patrón.                    | Se puede repetir.                                                              |
| `-w, --workspace-root`       | Añade a la raíz del espacio de trabajo.                       |                                                                                |
| `-g, --global`               | Instala globalmente.                                          | Requiere la CLI global. Usa el [almacén global](./global-packages).             |
| `--node <version>`           | Versión de Node.js para la instalación global.                | Requiere --global.                                                             |
| `--concurrency <number>`     | Número de instalaciones globales en paralelo.                 | Requiere --global. Debe ser un entero positivo.                                |

## Compatibilidad

Los comandos siguientes describen operaciones del proyecto. El modo global se describe en [Opciones](#opciones).

- **npm:** `npm install`.
- **pnpm:** `pnpm add`.
- **Yarn Classic:** `yarn add`.
- **Yarn Modern:** `yarn add`.
- **Bun:** `bun add`.

| Opción                       | npm                       | pnpm            | Yarn Classic | Yarn Modern  | Bun             | Notas                                                    |
| ---------------------------- | ------------------------- | --------------- | ------------ | ------------ | --------------- | -------------------------------------------------------- |
| `-P, --save-prod`            | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `-D, --save-dev`             | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `--save-peer`                | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `-O, --save-optional`        | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `-E, --save-exact`           | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `--save-catalog-name <name>` | No                        | Sí              | No           | No           | No              |                                                          |
| `--save-catalog`             | No                        | 10.12.0 o post. | No           | No           | 1.4 o posterior |                                                          |
| `--allow-build <names>`      | No                        | 10.18.0 o post. | No           | No           | No              |                                                          |
| `--ignore-scripts`           | Sí                        | Sí              | Sí           | 2.4 o post.  | Sí              | En Yarn Modern, el modo lockfile-only tiene prioridad.   |
| `--no-optional`              | Sí                        | Sí              | Sí           | No           | Sí              |                                                          |
| `--frozen-lockfile`          | No                        | Sí              | Sí           | No           | Sí              |                                                          |
| `--no-frozen-lockfile`       | No                        | Sí              | Sí           | No           | Sí              |                                                          |
| `--lockfile-only`            | Sin --frozen-lockfile     | Sí              | No           | 3 o posterior| Sí              | npm ignora esto en modo CI.                              |
| `--prefer-offline`           | Sí                        | Sí              | Sí           | No           | 1.4.1 o post.   |                                                          |
| `--offline`                  | Sí                        | Sí              | Sí           | No           | 1.4.1 o post.   |                                                          |
| `-f, --force`                | Sin --frozen-lockfile     | Sí              | Sí           | No           | Sí              | npm ignora esto en modo CI.                              |
| `--no-lockfile`              | Sin --frozen-lockfile     | Sí              | Sí           | No           | No              | npm ignora esto en modo CI.                              |
| `--shamefully-hoist`         | No                        | Sí              | No           | No           | No              |                                                          |
| `--filter <pattern>`         | 7.14.0 o posterior        | Sí              | No           | Sí           | 1.4 o posterior |                                                          |
| `-w, --workspace-root`       | 8.1.0 o posterior         | Sí              | Sí           | No           | No              |                                                          |
| `-g, --global`               | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `--node <version>`           | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |
| `--concurrency <number>`     | Sí                        | Sí              | Sí           | Sí           | Sí              |                                                          |

## Opciones Nativas

Para opciones nativas, consulta [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install), [pnpm add](https://pnpm.io/cli/add), [Yarn add](https://yarnpkg.com/cli/add), [Yarn Classic add](https://classic.yarnpkg.com/en/docs/cli/add) y [Bun add](https://bun.com/docs/pm/cli/add). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
