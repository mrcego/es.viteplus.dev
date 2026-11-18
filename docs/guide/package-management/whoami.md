# vp pm whoami

Muestra la cuenta autenticada en el registro.

```bash
vp pm whoami
vp pm whoami --registry https://registry.npmjs.org
```

## Opciones

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--registry <url>` | Selecciona el registro. |       |

## Compatibilidad

- **npm:** `npm whoami`.
- **pnpm:** 11 o posterior: `pnpm whoami`. Las versiones anteriores usan `npm whoami` como respaldo.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** `yarn npm whoami`.
- **Bun:** `bun pm whoami`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas                                             |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ------------------------------------------------- |
| `--registry <url>` | Sí  | Sí   | No           | No          | Sí  | Configura el registro en los ajustes de Yarn Modern. |

## Opciones Nativas

Para opciones nativas, consulta [npm whoami](https://docs.npmjs.com/cli/v11/commands/npm-whoami), [pnpm whoami](https://pnpm.io/cli/whoami), [Yarn npm whoami](https://yarnpkg.com/cli/npm/whoami) y [Bun pm whoami](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
