# Solución de Problemas

Usa esta página cuando algo en Vite+ no se esté comportando de la manera que esperas.

::: info INFORMACIÓN
Vite+ está en beta: estable, pero aún no completo. Estamos agregando funciones en el camino hacia la versión 1.0 y priorizamos los comentarios de la comunidad, así que por favor [contáctanos](#pedir-ayuda) si algo no funciona como se espera.
:::

## Versiones de Herramientas Compatibles

Vite+ espera versiones modernas de las herramientas originales (upstream).

- Vite 8 o más reciente.
- Vitest 4.1 o más reciente.

Si estás migrando un proyecto existente que aún depende de versiones anteriores de Vite o Vitest, actualízalas primero antes de adoptar Vite+.

## `vp check` no ejecuta las reglas de lint con conocimiento de tipos ni las comprobaciones de tipos

- Confirma que `lint.options.typeAware` y `lint.options.typeCheck` están habilitados en `vite.config.ts`.
- Comprueba si tu `tsconfig.json` aún utiliza `compilerOptions.baseUrl`.

El motor de comprobación de tipos de Oxlint, impulsado por `tsgolint`, no soporta `baseUrl`. `vp migrate` y `vp lint --init` intentan ejecutar el comando `vp dlx @andrewbranch/ts5to6 --fixBaseUrl .` para solucionarlo antes de habilitar el linting con conocimiento de tipos. Si esa solución falla o es rechazada, Vite+ omite `typeAware` y `typeCheck`.

## La extensión de VS Code no lee `vite.config.ts`

Si VS Code tiene múltiples carpetas abiertas, el servidor de lenguaje Oxc compartido puede elegir un espacio de trabajo diferente al esperado. Esto puede hacer que parezca que falta soporte para `vite.config.ts`.

- Confirma que la extensión está utilizando el espacio de trabajo previsto.

## `vp build` no ejecuta mi script de construcción

A diferencia de los gestores de paquetes, los comandos integrados no pueden ser sobrescritos. Si intentas ejecutar un script de `package.json`, utiliza `vp run build` en su lugar.

Por ejemplo:

- `vp build` siempre ejecuta la construcción integrada de Vite.
- `vp test` siempre ejecuta el comando integrado de Vitest.
- `vp run build` y `vp run test` ejecutan los scripts del `package.json` en su lugar.

::: info INFORMACIÓN
También puedes ejecutar tareas personalizadas definidas en `vite.config.ts` y migrar por completo fuera de los scripts de `package.json`.
:::

## Comprobaciones Staged y Hooks de Commit

Si `vp staged` falla o tu hook de pre-commit no se ejecuta:

- Asegúrate de que `vite.config.ts` contenga un bloque `staged`.
- Ejecuta `vp config` para instalar los hooks.
- Comprueba si la instalación de hooks se omitió intencionadamente mediante `VITE_GIT_HOOKS=0`.

Una configuración mínima de `staged` se ve así:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
});
```

## Carga lenta de configuración causada por plugins pesados

Cuando `vite.config.ts` importa plugins en el nivel superior, se evalúan para cada comando, incluidos `vp lint`, `vp fmt`, integraciones de editor y procesos en segundo plano de larga duración. Esto puede hacer que la carga de la configuración sea lenta y puede desencadenar efectos secundarios en la configuración del plugin, como leer archivos, iniciar observadores o conectarse a servicios.

Usa `lazyPlugins` para omitir la fábrica de plugins cuando vite-plus carga tu configuración solo para leer un bloque de metadatos (`lint`, `fmt`, `check`, `staged`, `pack`, `create`, la búsqueda de tareas de `run`/`cache` y herramientas de editor). Los plugins aún se cargan cuando Vite se ejecuta realmente, es decir, `dev`, `build`, `test`, `preview` y cualquier compilación que generen tus propios scripts (una tarea de `vp run`, `vp exec`):

```ts [vite.config.ts]
import { defineConfig, lazyPlugins } from 'vite-plus';
import myPlugin from 'vite-plugin-foo';

export default defineConfig({
  plugins: lazyPlugins(() => [myPlugin()]),
});
```

Para plugins pesados que deberían ser importados perezosamente (lazy import), combínalo con un `import()` dinámico:

```ts [vite.config.ts]
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  plugins: lazyPlugins(async () => {
    const { default: heavyPlugin } = await import('vite-plugin-heavy');
    return [heavyPlugin()];
  }),
});
```

## Pedir Ayuda

Si te has quedado bloqueado, por favor contáctanos:

- [Discord](https://discord.gg/cC6TEVFKSx) para discusiones en tiempo real y ayuda con problemas.
- [GitHub](https://github.com/voidzero-dev/vite-plus) para incidencias, discusiones y reportes de errores.

Al informar de un problema, por favor incluye:

- La salida completa de `vp env current` y `vp --version`.
- El gestor de paquetes utilizado por el proyecto.
- Los pasos exactos necesarios para reproducir el problema y tu `vite.config.ts`.
- Un repositorio con una reproducción mínima o un entorno de ejecución (sandbox).
