# vp unlink

Elimina los enlaces nativos del gestor de paquetes creados para el desarrollo local.

```bash
vp unlink my-library
```

## Opciones

Se reenvía un nombre de paquete o directorio opcional al gestor. `-r, --recursive` solicita desenlazar en todos los espacios de trabajo donde sea compatible.

| Opción            | Descripción                                         | Notas |
| ----------------- | --------------------------------------------------- | ----- |
| `-r, --recursive` | Desvincula en cada paquete del espacio de trabajo. |       |

## Compatibilidad

- **npm:** `npm unlink`.
- **pnpm:** `pnpm unlink`.
- **Yarn Classic:** `yarn unlink`.
- **Yarn Modern:** 3 o posterior: `yarn unlink`. Las versiones anteriores muestran advertencia y omiten.
- **Bun:** `bun unlink`.

| Opción            | npm            | pnpm | Yarn Classic | Yarn Modern | Bun | Notas                                 |
| ----------------- | -------------- | ---- | ------------ | ----------- | --- | ------------------------------------- |
| `-r, --recursive` | 8.1.0 o posterior | Sí   | No           | 3 o posterior  | No  | npm incluye la raíz del workspace.    |

El comportamiento del operando y de la actualización del manifiesto sigue al gestor nativo. Esto no elimina paquetes del [almacén global](./global-packages) de Vite+.

## Opciones Nativas

Para opciones nativas, consulta [npm unlink](https://docs.npmjs.com/cli/v11/commands/npm-uninstall), [pnpm unlink](https://pnpm.io/cli/unlink), [Yarn unlink](https://yarnpkg.com/cli/unlink), [Yarn Classic unlink](https://classic.yarnpkg.com/en/docs/cli/unlink) y [Bun unlink](https://bun.com/docs/pm/cli/link). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
