# vp pm prune

Elimina paquetes instalados innecesarios.

```bash
vp pm prune
vp pm prune --prod
```

## Opciones

| Opción          | Descripción                         | Notas |
| --------------- | ----------------------------------- | ----- |
| `--prod`        | Elimina dependencias de desarrollo. |       |
| `--no-optional` | Elimina dependencias opcionales.    |       |

## Compatibilidad

- **npm:** `npm prune`.
- **pnpm:** `pnpm prune`.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.4 o posterior: `bun prune`. Las versiones anteriores advierten y omiten la operación.

| Opción          | npm               | pnpm | Yarn Classic | Yarn Modern | Bun             | Notas |
| --------------- | ----------------- | ---- | ------------ | ----------- | --------------- | ----- |
| `--prod`        | Sí                | Sí   | No           | No          | 1.4 o posterior |       |
| `--no-optional` | 7 o posterior     | Sí   | No           | No          | 1.4 o posterior |       |

npm 7 y versiones posteriores traducen las banderas de selección a `--omit=dev` y `--omit=optional`. npm 6 traduce `--prod` a `--production` y no admite `--no-optional`. Bun traduce `--prod` a `--production`. Yarn y versiones anteriores de Bun eliminan paquetes extraños durante la instalación en lugar de ofrecer un comando de poda nativo.

## Opciones Nativas

Para opciones nativas, consulta [npm prune](https://docs.npmjs.com/cli/v11/commands/npm-prune), [pnpm prune](https://pnpm.io/cli/prune) y [Bun prune](https://bun.com/docs/pm/cli/prune). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
