# vp dlx

Descarga y ejecuta un paquete sin añadirlo a las dependencias del proyecto.

```bash
vp dlx create-vite my-app
vp dlx --silent create-vite my-app
```

## Opciones

Coloca las opciones de Vite+ antes del paquete o comando:

Los argumentos después del comando se pasan al programa ejecutado, no se analizan como opciones de Vite+. El modo shell interpreta la sintaxis de la terminal; úsalo solo con cadenas de comandos de confianza.

| Opción                 | Descripción                                                                       | Notas             |
| ---------------------- | --------------------------------------------------------------------------------- | ----------------- |
| `-p, --package <name>` | Hace que el paquete seleccionado esté disponible para el comando ejecutado.        | Se puede repetir. |
| `-c, --shell-mode`     | Se ejecuta dentro de un entorno de shell.                                         |                   |
| `-s, --silent`         | Suprime la salida de Vite+ y solicita salida silenciosa nativa donde esté disponible. |                   |

## Compatibilidad

- **npm:** `npm exec --yes`.
- **pnpm:** `pnpm dlx`.
- **Yarn Classic:** Respaldo (fallback): `npx --yes`.
- **Yarn Modern:** `yarn dlx`.
- **Bun:** `bun x`.

| Opción                 | npm | pnpm            | Yarn Classic | Yarn Modern | Bun | Notas                               |
| ---------------------- | --- | --------------- | ------------ | ----------- | --- | ----------------------------------- |
| `-p, --package <name>` | Sí  | Sí              | Sí           | Sí          | Sí  |                                     |
| `-c, --shell-mode`     | Sí  | 7.21.0 o posterior | Sí           | No          | No  |                                     |
| `-s, --silent`         | Sí  | Sí              | Sí           | Sí          | Sí  | Bun solo suprime la salida de Vite+. |

Para binarios instalados en el proyecto, usa `vp exec` o `vpx` en su lugar. Consulta [Ejecutar Binarios](/guide/vpx) para esos flujos de trabajo.

## Opciones Nativas

Para opciones nativas, consulta [npm exec](https://docs.npmjs.com/cli/v11/commands/npm-exec), [pnpm dlx](https://pnpm.io/cli/dlx), [Yarn dlx](https://yarnpkg.com/cli/dlx) y [Bun x](https://bun.com/docs/pm/bunx). Para el respaldo de Yarn Classic, consulta [npx](https://docs.npmjs.com/cli/v11/commands/npx). Para el manejo de argumentos, consulta [Argumentos Nativos](./#argumentos-nativos).
