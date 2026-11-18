# vp pm patch-commit

Guarda las modificaciones preparadas con [patch](./patch) como un parche de dependencia.

```bash
vp pm patch-commit /ruta/al/paquete-editado
```

## Opciones

Proporciona el directorio de edición del flujo de trabajo de parches del gestor. No hay opciones adicionales de Vite+.

No hay opciones específicas para este comando.

## Compatibilidad

- **npm:** 12 o posterior: `npm patch commit`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 7.4 o posterior: `pnpm patch-commit`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** `yarn patch-commit`.
- **Bun:** `bun patch --commit`.

La ubicación de edición y el formato de almacenamiento del parche son detalles propios del gestor nativo. Vite+ no convierte parches entre gestores.

## Opciones Nativas

Para opciones nativas, consulta [npm patch commit](https://docs.npmjs.com/cli/v12/commands/npm-patch), [pnpm patch-commit](https://pnpm.io/cli/patch-commit), [Yarn patch-commit](https://yarnpkg.com/cli/patch-commit) y [Bun patch](https://bun.com/docs/pm/cli/patch). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
