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

## La configuración anidada de lint o formato no se aplica {#nested-lint-or-format-config-is-not-applied}

Al ejecutar `vp lint`, `vp fmt` o `vp check`, las configuraciones en subdirectorios no anulan los ajustes para archivos individuales. Los comandos ejecutados desde el directorio de un paquete siguen utilizando los bloques `lint` y `fmt` de la raíz del workspace cuando existen. Usa `-c <ruta>` o `--config <ruta>` con `vp lint` o `vp fmt` para seleccionar otra configuración. Si la configuración raíz no tiene un bloque para esa herramienta, la herramienta utiliza la detección nativa desde el directorio de trabajo.

Mantén los ajustes de lint y formato en el `vite.config.ts` de la raíz. Usa [`lint.overrides`](/guide/monorepo#configuracion-de-raiz-con-overrides) y [`fmt.overrides`](/guide/monorepo#overrides-de-formato) para ajustes específicos de archivos o paquetes. También puedes [importar objetos de configuración](/guide/monorepo#composicion-de-archivos-de-configuracion) en la configuración raíz para mantener los ajustes en archivos separados.

Para la integración con IDE, `disableNestedConfig` y `fmt.disableNestedConfig` deshabilitan las configuraciones anidadas de lint y formato por archivo. Consulta [Integración con IDE](/guide/ide-integration) para obtener instrucciones de configuración para tu editor.

Por ahora estamos posponiendo la aplicación de configuraciones anidadas a archivos individuales. Algunos de los factores que estamos considerando son cómo la detección implícita de configuraciones afecta la previsibilidad del linting y formateo, qué contexto necesitan los agentes de IA para comprender los ajustes aplicables y el costo potencial de rendimiento de buscar y cargar múltiples configuraciones. Al mismo tiempo, reconocemos que mantener el contexto específico del paquete cerca del código puede tener beneficios. Los casos de uso que hemos escuchado hasta ahora no nos han dado una razón suficiente para comprometernos con esa semántica. Esperar deja espacio para agregar soporte más adelante, y nos gustaría escuchar por qué tu proyecto necesita configuraciones anidadas, especialmente dónde los overrides a nivel raíz se quedan cortos.

¿Necesitas configuraciones anidadas? [Comparte tu caso de uso y opinión en GitHub](https://github.com/voidzero-dev/vite-plus/discussions/2669), incluyendo la estructura de tu proyecto, el motivo por el cual las deseas y si los overrides a nivel raíz satisfacen tus necesidades.

## La extensión de VS Code no lee `vite.config.ts`

Si VS Code tiene múltiples carpetas abiertas, el servidor de lenguaje Oxc compartido puede elegir un espacio de trabajo diferente al esperado. Esto puede hacer que parezca que falta soporte para `vite.config.ts`.

- Confirma que la extensión está utilizando el espacio de trabajo previsto.

## `vp dev` o `vp build` no ejecuta mi script

A diferencia de los gestores de paquetes, los comandos integrados no pueden ser sobrescritos. Si intentas ejecutar un script de `package.json`, utiliza `vp run <script>` en su lugar.

Por ejemplo:

- `vp dev` siempre inicia el servidor de desarrollo integrado de Vite.
- `vp build` siempre ejecuta la construcción integrada de Vite.
- `vp test` siempre ejecuta el comando integrado de Vitest.
- `vp run dev`, `vp run build` y `vp run test` ejecutan los scripts de `package.json` correspondientes en su lugar.

Consulta [Comandos Integrados frente a Scripts](/guide/run#comandos-integrados-frente-a-scripts) para saber cuándo preferir cada opción.

::: info INFORMACIÓN
También puedes ejecutar tareas personalizadas definidas en `vite.config.ts` y migrar por completo fuera de los scripts de `package.json`.
:::

## Comprobaciones Staged y Hooks de Commit

Si `vp staged` falla o tu hook de pre-commit no se ejecuta:

- Asegúrate de que `vite.config.ts` contenga un bloque `staged`.
- Ejecuta `vp config` para instalar los hooks.
- Comprueba si la instalación de hooks se omitiÃ³ intencionadamente mediante `VP_GIT_HOOKS=0`.

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

Cuando `vite.config.ts` importa plugins en el nivel superior, se evalÃºan para cada comando, incluidos `vp lint`, `vp fmt`, integraciones de editor y procesos en segundo plano de larga duración. Esto puede hacer que la carga de la configuración sea lenta y puede desencadenar efectos secundarios en la configuración del plugin, como leer archivos, iniciar observadores o conectarse a servicios.

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
