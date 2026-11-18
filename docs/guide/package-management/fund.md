# vp pm fund

Muestra información de financiamiento de las dependencias instaladas.

```bash
vp pm fund
vp pm fund --json
```

## Opciones

| Opción   | Descripción                     | Notas                             |
| -------- | ------------------------------- | --------------------------------- |
| `--json` | Solicita la salida JSON nativa. | La salida conserva el esquema nativo. |

## Compatibilidad

- **npm:** `npm fund`.
- **pnpm:** Respaldo: `npm fund`.
- **Yarn Classic:** Respaldo: `npm fund`.
- **Yarn Modern:** Respaldo: `npm fund`.
- **Bun:** Respaldo: `npm fund`.

| Opción   | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Notas |
| -------- | --- | ---- | ------------ | ----------- | --- | ----- |
| `--json` | Sí  | Sí   | Sí           | Sí          | Sí  |       |

Bun emite una advertencia de respaldo. Los resultados siguen la vista de dependencias instaladas de npm.

## Opciones Nativas

Para opciones nativas, consulta [npm fund](https://docs.npmjs.com/cli/v11/commands/npm-fund), el cual Vite+ utiliza para todos los gestores de paquetes. Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
