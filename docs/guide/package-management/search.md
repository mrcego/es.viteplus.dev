# vp pm search

Busca en el registro de paquetes.

```bash
vp pm search vite plugin
vp pm search typescript --json
```

## Opciones

Se requiere al menos un término de búsqueda.

| Opción             | Descripción                    | Notas                                  |
| ------------------ | ------------------------------ | -------------------------------------- |
| `--json`           | Solicita salida JSON nativa.   | La salida conserva el esquema nativo.  |
| `--long`           | Muestra resultados detallados. |                                        |
| `--registry <url>` | Selecciona el registro.        |                                        |

## Compatibilidad

- **npm:** `npm search`.
- **pnpm:** `pnpm search`.
- **Yarn Classic:** No admite búsqueda en el registro. Muestra advertencia y sale con éxito sin ejecutar.
- **Yarn Modern:** No admite búsqueda en el registro. Muestra advertencia y sale con éxito sin ejecutar.
- **Bun:** Sin comando. Usa `npm search` como respaldo (fallback).

| Opción             | npm | pnpm      | Yarn Classic | Yarn Modern | Bun | Notas |
| ------------------ | --- | --------- | ------------ | ----------- | --- | ----- |
| `--json`           | Sí  | Sí        | Sí           | Sí          | Sí  |       |
| `--long`           | Sí  | Antes de 11 | Sí         | Sí          | Sí  |       |
| `--registry <url>` | Sí  | Sí        | Sí           | Sí          | Sí  |       |

La configuración del registro y la salida siguen el comando que se ejecuta.

## Opciones Nativas

Para opciones nativas, consulta [npm search](https://docs.npmjs.com/cli/v11/commands/npm-search) y [pnpm search](https://pnpm.io/cli/search). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
