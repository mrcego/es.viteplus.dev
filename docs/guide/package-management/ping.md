# vp pm ping

Comprueba la conectividad con un registro de paquetes.

```bash
vp pm ping
vp pm ping --registry https://registry.npmjs.org
```

## Opciones

| Opción             | Descripción             | Notas |
| ------------------ | ----------------------- | ----- |
| `--registry <url>` | Selecciona el registro. |       |

## Compatibilidad

- **npm:** `npm ping`.
- **pnpm:** 11 o posterior: `pnpm ping`. Las versiones anteriores usan `npm ping` como respaldo.
- **Yarn Classic:** Respaldo: `npm ping`.
- **Yarn Modern:** Respaldo: `npm ping`.
- **Bun:** Respaldo: `npm ping`.

| Opción             | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ----- |
| `--registry <url>` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

La configuración del registro, la salida y los códigos de salida siguen el comando que se ejecuta. Usa [whoami](./whoami) cuando necesites verificar la cuenta autenticada en lugar de la conectividad.

## Opciones Nativas

Para opciones nativas, consulta [npm ping](https://docs.npmjs.com/cli/v11/commands/npm-ping) y [pnpm ping](https://pnpm.io/cli/ping). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
