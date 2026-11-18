# vp pm licenses

Lista las licencias reportadas para las dependencias instaladas.

```bash
vp pm licenses list
vp pm licenses list --json
```

## Opciones

`list`, también escrito como `ls`, es el subcomando admitido. `--json` solicita la salida JSON nativa del gestor de paquetes. Vite+ no normaliza la salida en un esquema compartido.

### `list`

| Opción   | Descripción                        | Notas                             |
| -------- | ---------------------------------- | --------------------------------- |
| `--json` | Solicita la salida JSON nativa.    | La salida conserva el esquema nativo. |

## Compatibilidad

### `list`

- **npm:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **pnpm:** 7.17.0 o posterior: `pnpm licenses list`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** `yarn licenses list`.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** 1.4.0 o posterior: `bun pm licenses`. Las versiones anteriores advierten y omiten la operación.

| Opción   | npm | pnpm            | Yarn Classic | Yarn Modern | Bun            | Notas |
| -------- | --- | --------------- | ------------ | ----------- | -------------- | ----- |
| `--json` | No  | 7.17.0 o posterior | Sí           | No          | 1.4.0 o posterior |       |

## Opciones Nativas

Por ejemplo, un proyecto con pnpm puede usar:

```bash
vp pm licenses list -- --prod --long
```

Para opciones nativas, consulta [pnpm licenses](https://pnpm.io/cli/licenses), [Yarn Classic licenses](https://classic.yarnpkg.com/en/docs/cli/licenses) y [Bun pm licenses](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
