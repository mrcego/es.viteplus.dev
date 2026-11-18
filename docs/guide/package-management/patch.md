# vp pm patch

Prepara una dependencia instalada para realizar parches locales.

```bash
vp pm patch my-dependency@1.0.0
```

Edita el paquete en la ubicación indicada por el gestor nativo y luego guarda el parche con [patch-commit](./patch-commit).

## Opciones

Se requiere una especificación de paquete. No hay opciones adicionales de Vite+.

No hay opciones específicas para este comando.

## Compatibilidad

- **npm:** 12 o posterior: `npm patch add`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 7.4 o posterior: `pnpm patch`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** `yarn patch`.
- **Bun:** `bun patch`.

La ubicación de edición y el formato de almacenamiento del parche son detalles propios del gestor nativo. Vite+ no convierte parches entre gestores.

## Opciones Nativas

Para opciones nativas, consulta [npm patch add](https://docs.npmjs.com/cli/v12/commands/npm-patch), [pnpm patch](https://pnpm.io/cli/patch), [Yarn patch](https://yarnpkg.com/cli/patch) y [Bun patch](https://bun.com/docs/pm/cli/patch). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
