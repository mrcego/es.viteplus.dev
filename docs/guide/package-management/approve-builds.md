# vp pm approve-builds

Aprueba los scripts de ciclo de vida de las dependencias usando la política de confianza del gestor seleccionado. Aprueba solo los paquetes cuyos scripts de instalación tengas la intención de ejecutar.

```bash
vp pm approve-builds
vp pm approve-builds sharp
vp pm approve-builds '!untrusted-package'
vp pm approve-builds --all
```

## Opciones

Proporciona los paquetes a aprobar, o antepón un `!` a un nombre para solicitar su denegación donde sea compatible. Entrecomilla los argumentos de denegación para evitar la expansión del historial de la shell.

| Opción  | Descripción                                                            | Notas                                                                       |
| ------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `--all` | Aprueba todos los paquetes pendientes de aprobación de build scripts. | No se puede combinar con nombres de paquetes, incluidos nombres tras `--`. |

## Compatibilidad

- **npm:** 11.16 o posterior: `npm approve-scripts`. Las versiones anteriores advierten y omiten la operación. Las denegaciones usan `npm deny-scripts`.
- **pnpm:** 10.1 o posterior: `pnpm approve-builds`. Las versiones anteriores advierten y omiten la operación.
- **Yarn Classic:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Yarn Modern:** Sin comando. Advierte y sale con éxito sin realizar la operación.
- **Bun:** `bun pm trust` para paquetes nombrados o `--all`.

| Opción  | npm              | pnpm             | Yarn Classic | Yarn Modern | Bun | Notas |
| ------- | ---------------- | ---------------- | ------------ | ----------- | --- | ----- |
| `--all` | 11.16.0 o posterior | 10.32.0 o posterior | No        | No          | Sí  |       |

Sin nombres de paquetes, pnpm abre su flujo interactivo y npm lista los paquetes pendientes con `--allow-scripts-pending`. Bun no abre un selector interactivo; inspecciona los paquetes pendientes con `bun pm untrusted` y luego especifica los paquetes a confiar.

Los argumentos de denegación con prefijo `!` requieren pnpm 11 o posterior o npm 11.16 o posterior. npm requiere invocaciones separadas de aprobación y denegación. Bun omite las entradas de denegación con una advertencia porque usa `trustedDependencies` en lugar de una lista de denegación.

Para Yarn Modern, configura `enableScripts: false` y permite explícitamente los paquetes confiables a través de `dependenciesMeta`.

### Política de Build Scripts en npm

npm 12 aplica `allowScripts` en `package.json`. Los scripts de instalación de dependencias no cubiertos por la política se omiten, incluidas las compilaciones nativas implícitas. La aprobación actualiza la política pero no ejecuta scripts omitidos anteriormente. Continúa con [`vp pm rebuild <package>`](./rebuild).

En npm 11.16 hasta 11.x, esta política es consultiva. Los scripts se siguen ejecutando y npm advierte sobre paquetes no revisados.

## Opciones Nativas

Para opciones nativas, consulta [npm approve-scripts](https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts), [npm deny-scripts](https://docs.npmjs.com/cli/v11/commands/npm-deny-scripts), [pnpm approve-builds](https://pnpm.io/cli/approve-builds), [Bun pm trust](https://bun.com/docs/pm/cli/pm) y [Bun pm untrusted](https://bun.com/docs/pm/cli/pm). Para pasar estas opciones a través de Vite+, consulta [Argumentos Nativos](./#argumentos-nativos).

Para la configuración de la política de scripts, consulta [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json), [Yarn enableScripts](https://yarnpkg.com/configuration/yarnrc#enableScripts) y [scripts de ciclo de vida de Bun](https://bun.com/docs/pm/lifecycle).
