# vp rebuild

Reconstruye paquetes instalados, por ejemplo después de cambiar de versión de Node.js o cuando un addon nativo necesita recompilación. Este comando de nivel superior requiere la CLI global. Tanto la CLI global como la local del proyecto aceptan `vp pm rebuild` y su alias `vp pm rb`.

```bash
vp rebuild
vp rebuild better-sqlite3 sharp
vp rebuild -- --update-binary
```

## Opciones

Proporciona nombres de paquetes para reconstruir solo esos paquetes. Omítelos para solicitar una reconstrucción completa. No hay opciones adicionales de Vite+.

No hay opciones específicas para este comando.

## Compatibilidad

- **npm:** `npm rebuild`.
- **pnpm:** `pnpm rebuild`.
- **Yarn Classic:** Sin comando. Muestra advertencia y sale con éxito sin realizar la operación.
- **Yarn Modern:** `yarn rebuild`.
- **Bun:** Sin comando. Muestra advertencia y sale con éxito sin realizar la operación.

Con pnpm 10 y posteriores, una reconstrucción simple respeta las aprobaciones de scripts de compilación. Nombrar un paquete explícitamente omite esa puerta de aprobación, así que reconstruye solo paquetes cuyos scripts consideres de confianza.

En npm 12, [aprobar los scripts de una dependencia](./approve-builds) registra la política pero no ejecuta scripts omitidos por una instalación previa. Reconstruye ese paquete tras la aprobación.

## Opciones Nativas

Para opciones nativas, consulta [npm rebuild](https://docs.npmjs.com/cli/v11/commands/npm-rebuild), [pnpm rebuild](https://pnpm.io/cli/rebuild) y [Yarn rebuild](https://yarnpkg.com/cli/rebuild). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).
