# vp pm pack

Crea un tarball de distribución a partir del paquete actual.

```bash
vp pm pack
vp pm pack --dry-run
vp pm pack --pack-destination dist
```

Para la herramienta de empaquetado de librerías de Vite+, consulta [`vp pack`](/guide/pack).

## Opciones

| Opción                           | Descripción                                               | Notas                             |
| -------------------------------- | --------------------------------------------------------- | --------------------------------- |
| `--dry-run`                      | Simula la creación del paquete sin escribir el tarball.   |                                   |
| `--json`                         | Solicita salida JSON nativa.                              | La salida conserva el esquema nativo. |
| `--pack-destination <directory>` | Directorio donde se escribirá el archivo tarball creado. |                                   |

## Compatibilidad

- **npm:** `npm pack`.
- **pnpm:** `pnpm pack`.
- **Yarn Classic:** `yarn pack`.
- **Yarn Modern:** `yarn pack`.
- **Bun:** `bun pm pack`.

| Opción                           | npm | pnpm            | Yarn Classic | Yarn Modern     | Bun             | Notas |
| -------------------------------- | --- | --------------- | ------------ | --------------- | --------------- | ----- |
| `--dry-run`                      | Sí  | Sí              | No           | 4.1 o posterior | 1.2.20 o posterior |   |
| `--json`                         | Sí  | 7.15 o posterior| No           | Sí              | No              |       |
| `--pack-destination <directory>` | Sí  | Sí              | No           | No              | 1.2.20 o posterior |   |

Yarn Classic usa `--filename` para nombrar el tarball resultante en lugar de admitir un directorio de destino. Yarn Modern empaqueta en el directorio de trabajo actual.

## Opciones Nativas

Para opciones nativas, consulta [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack), [pnpm pack](https://pnpm.io/cli/pack), [Yarn pack](https://yarnpkg.com/cli/pack), [Yarn Classic pack](https://classic.yarnpkg.com/en/docs/cli/pack) y [Bun pm pack](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
