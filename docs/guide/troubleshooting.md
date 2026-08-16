# SoluciÃ³n de Problemas

Usa esta pÃ¡gina cuando algo en Vite+ no se estÃ© comportando de la manera que esperas.

::: info INFORMACIÃ“N
Vite+ estÃ¡ en beta: estable, pero aÃºn no completo. Estamos agregando funciones en el camino hacia la versiÃ³n 1.0 y priorizamos los comentarios de la comunidad, asÃ­ que por favor [contÃ¡ctanos](#pedir-ayuda) si algo no funciona como se espera.
:::

## Versiones de Herramientas Compatibles

Vite+ espera versiones modernas de las herramientas originales (upstream).

- Vite 8 o mÃ¡s reciente.
- Vitest 4.1 o mÃ¡s reciente.

Si estÃ¡s migrando un proyecto existente que aÃºn depende de versiones anteriores de Vite o Vitest, actualÃ­zalas primero antes de adoptar Vite+.

## `vp check` no ejecuta las reglas de lint con conocimiento de tipos ni las comprobaciones de tipos

- Confirma que `lint.options.typeAware` y `lint.options.typeCheck` estÃ¡n habilitados en `vite.config.ts`.
- Comprueba si tu `tsconfig.json` aÃºn utiliza `compilerOptions.baseUrl`.

El motor de comprobaciÃ³n de tipos de Oxlint, impulsado por `tsgolint`, no soporta `baseUrl`. `vp migrate` y `vp lint --init` intentan ejecutar el comando `vp dlx @andrewbranch/ts5to6 --fixBaseUrl .` para solucionarlo antes de habilitar el linting con conocimiento de tipos. Si esa soluciÃ³n falla o es rechazada, Vite+ omite `typeAware` y `typeCheck`.

## La extensiÃ³n de VS Code no lee `vite.config.ts`

Si VS Code tiene mÃºltiples carpetas abiertas, el servidor de lenguaje Oxc compartido puede elegir un espacio de trabajo diferente al esperado. Esto puede hacer que parezca que falta soporte para `vite.config.ts`.

- Confirma que la extensiÃ³n estÃ¡ utilizando el espacio de trabajo previsto.

## `vp dev` o `vp build` no ejecuta mi script

A diferencia de los gestores de paquetes, los comandos integrados no pueden ser sobrescritos. Si intentas ejecutar un script de `package.json`, utiliza `vp run <script>` en su lugar.

Por ejemplo:

- `vp dev` siempre inicia el servidor de desarrollo integrado de Vite.
- `vp build` siempre ejecuta la construcciÃ³n integrada de Vite.
- `vp test` siempre ejecuta el comando integrado de Vitest.
- `vp run dev`, `vp run build` y `vp run test` ejecutan los scripts de `package.json` correspondientes en su lugar.

Consulta [Comandos Integrados frente a Scripts](/guide/run#comandos-integrados-frente-a-scripts) para saber cuÃ¡ndo preferir cada opciÃ³n.

::: info INFORMACIÃ“N
TambiÃ©n puedes ejecutar tareas personalizadas definidas en `vite.config.ts` y migrar por completo fuera de los scripts de `package.json`.
:::

## Comprobaciones Staged y Hooks de Commit

Si `vp staged` falla o tu hook de pre-commit no se ejecuta:

- AsegÃºrate de que `vite.config.ts` contenga un bloque `staged`.
- Ejecuta `vp config` para instalar los hooks.
- Comprueba si la instalaciÃ³n de hooks se omitiÃ³ intencionadamente mediante `VP_GIT_HOOKS=0`.

Una configuraciÃ³n mÃ­nima de `staged` se ve asÃ­:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
});
```

## Carga lenta de configuraciÃ³n causada por plugins pesados

Cuando `vite.config.ts` importa plugins en el nivel superior, se evalÃºan para cada comando, incluidos `vp lint`, `vp fmt`, integraciones de editor y procesos en segundo plano de larga duraciÃ³n. Esto puede hacer que la carga de la configuraciÃ³n sea lenta y puede desencadenar efectos secundarios en la configuraciÃ³n del plugin, como leer archivos, iniciar observadores o conectarse a servicios.

Usa `lazyPlugins` para omitir la fÃ¡brica de plugins cuando vite-plus carga tu configuraciÃ³n solo para leer un bloque de metadatos (`lint`, `fmt`, `check`, `staged`, `pack`, `create`, la bÃºsqueda de tareas de `run`/`cache` y herramientas de editor). Los plugins aÃºn se cargan cuando Vite se ejecuta realmente, es decir, `dev`, `build`, `test`, `preview` y cualquier compilaciÃ³n que generen tus propios scripts (una tarea de `vp run`, `vp exec`):

```ts [vite.config.ts]
import { defineConfig, lazyPlugins } from 'vite-plus';
import myPlugin from 'vite-plugin-foo';

export default defineConfig({
  plugins: lazyPlugins(() => [myPlugin()]),
});
```

Para plugins pesados que deberÃ­an ser importados perezosamente (lazy import), combÃ­nalo con un `import()` dinÃ¡mico:

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

Si te has quedado bloqueado, por favor contÃ¡ctanos:

- [Discord](https://discord.gg/cC6TEVFKSx) para discusiones en tiempo real y ayuda con problemas.
- [GitHub](https://github.com/voidzero-dev/vite-plus) para incidencias, discusiones y reportes de errores.

Al informar de un problema, por favor incluye:

- La salida completa de `vp env current` y `vp --version`.
- El gestor de paquetes utilizado por el proyecto.
- Los pasos exactos necesarios para reproducir el problema y tu `vite.config.ts`.
- Un repositorio con una reproducciÃ³n mÃ­nima o un entorno de ejecuciÃ³n (sandbox).
