# vp pm pkg

Inspecciona y edita campos en el archivo `package.json`.

```bash
vp pm pkg get name
vp pm pkg set version=1.2.3
vp pm pkg delete scripts.build
vp pm pkg fix
```

## Opciones

- `get [field...]` lee campos de `package.json`.
- `set <field=value...>` escribe valores de campos.
- `delete <field...>` elimina campos. Alias: `rm`.
- `fix` normaliza y ordena `package.json`.

| Opción   | Descripción                          | Notas                                                                  |
| -------- | ------------------------------------ | ---------------------------------------------------------------------- |
| `--json` | Parsea los valores como JSON al escribir. | Parsea booleanos, números, arreglos y objetos en lugar de guardar texto. |

### `get`

| Opción   | Descripción                 | Notas                             |
| -------- | --------------------------- | --------------------------------- |
| `--json` | Solicita salida JSON nativa. | La salida conserva el esquema nativo. |

### `set`

| Opción   | Descripción                          | Notas                                                                  |
| -------- | ------------------------------------ | ---------------------------------------------------------------------- |
| `--json` | Parsea los valores como JSON al escribir. | Parsea booleanos, números, arreglos y objetos en lugar de guardar texto. |

### `delete`

No hay opciones específicas para este comando.

### `fix`

No hay opciones específicas para este comando.

## Compatibilidad

### `get`

- **npm:** 7.20.0 o posterior: `npm pkg get`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 11.3.0 o posterior: `pnpm pkg get`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.2.19 o posterior: `bun pm pkg get`. Las versiones anteriores advierten y omiten la operación.

| Opción   | npm              | pnpm             | Yarn Classic | Yarn Modern | Bun              | Notas |
| -------- | ---------------- | ---------------- | ------------ | ----------- | ---------------- | ----- |
| `--json` | 7.20.0 o posterior | 11.3.0 o posterior | No         | No          | 1.2.19 o posterior |     |

### `set`

- **npm:** 7.20.0 o posterior: `npm pkg set`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 11.3.0 o posterior: `pnpm pkg set`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.2.19 o posterior: `bun pm pkg set`. Las versiones anteriores advierten y omiten la operación.

| Opción   | npm              | pnpm             | Yarn Classic | Yarn Modern | Bun              | Notas |
| -------- | ---------------- | ---------------- | ------------ | ----------- | ---------------- | ----- |
| `--json` | 7.20.0 o posterior | 11.3.0 o posterior | No         | No          | 1.2.19 o posterior |     |

### `delete`

- **npm:** 7.20.0 o posterior: `npm pkg delete`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 11.3.0 o posterior: `pnpm pkg delete`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.2.19 o posterior: `bun pm pkg delete`. Las versiones anteriores advierten y omiten la operación.

### `fix`

- **npm:** 9.8.0 o posterior: `npm pkg fix`. Las versiones anteriores advierten y omiten la operación.
- **pnpm:** 11.3.0 o posterior: `pnpm pkg fix`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.2.19 o posterior: `bun pm pkg fix`. Las versiones anteriores advierten y omiten la operación.

Las versiones inferiores a los requisitos indicados advierten y salen con éxito sin realizar la operación. No existe un respaldo de npm para versiones o gestores incompatibles.

## Opciones Nativas

Para opciones nativas, consulta [npm pkg](https://docs.npmjs.com/cli/v11/commands/npm-pkg), [pnpm pkg](https://pnpm.io/cli/pkg) y [Bun pm pkg](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
