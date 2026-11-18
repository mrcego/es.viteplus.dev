# vp link

Crea enlaces de desarrollo local a través del gestor de paquetes seleccionado. Alias: `vp ln`.

```bash
vp link ../my-library
```

## Opciones

Se pasa un nombre de paquete o directorio opcional al gestor.

No hay opciones específicas para este comando.

## Compatibilidad

- **npm:** `npm link`.
- **pnpm:** `pnpm link`.
- **Yarn Classic:** `yarn link`.
- **Yarn Modern:** `yarn link`.
- **Bun:** `bun link`.

El significado de un directorio, nombre de paquete o argumento omitido sigue el flujo de trabajo de enlace nativo de ese gestor. En particular, Yarn 2 y versiones posteriores enlazan proyectos de forma diferente al flujo de trabajo de registro de paquetes de Yarn Classic.

Estos enlaces no utilizan el [almacén de paquetes globales](./global-packages) de Vite+ y no aparecen en `vp list -g`. Usa [unlink](./unlink) para eliminar enlaces nativos.

## Opciones Nativas

Para opciones nativas, consulta [npm link](https://docs.npmjs.com/cli/v11/commands/npm-link), [pnpm link](https://pnpm.io/cli/link), [Yarn link](https://yarnpkg.com/cli/link), [Yarn Classic link](https://classic.yarnpkg.com/en/docs/cli/link) y [Bun link](https://bun.com/docs/pm/cli/link). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
