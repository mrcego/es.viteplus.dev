# Solución de Problemas

Usa esta página cuando algo en Vite+ no se esté comportando de la manera que esperas.

::: warning ADVERTENCIA
Vite+ aún está en versión alfa. Estamos realizando cambios frecuentes, añadiendo funciones rápidamente y queremos recibir comentarios para ayudar a que sea excelente.
:::

## Versiones de Herramientas Compatibles

Vite+ espera versiones modernas de las herramientas originales (upstream).

- Vite 8 o más reciente.
- Vitest 4.1 o más reciente.

Si estás migrando un proyecto existente que aún depende de versiones anteriores de Vite o Vitest, actualízalas primero antes de adoptar Vite+.

## `vp check` no ejecuta las reglas de lint con conocimiento de tipos ni las comprobaciones de tipos

- Confirma que `lint.options.typeAware` y `lint.options.typeCheck` están habilitados en `vite.config.ts`.
- Comprueba si tu `tsconfig.json` utiliza `compilerOptions.baseUrl`.

El motor de comprobación de tipos de Oxlint, impulsado por `tsgolint`, no soporta `baseUrl`, por lo que Vite+ omite `typeAware` y `typeCheck` cuando ese ajuste está presente.

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

## `vp lint` / `vp fmt` pueden fallar al leer `vite.config.ts`

`vp lint`, `vp fmt` y la extensión de VS Code para Oxc intentan leer los bloques `lint` / `fmt` de tu `vite.config.ts`. Sin embargo, esta integración tiene limitaciones actualmente.

La configuración de Vite se lee correctamente si utilizas exportaciones de objetos estáticos:

```ts
export default { ... }
// o
export default defineConfig({ ... })
```

Esta integración puede fallar en los siguientes casos:

- **Configuraciones funcionales o asíncronas**: `defineConfig((env) => ({ ... }))`.
- **Dependencia de transformaciones de Vite**: Archivos de configuración que dependen del comportamiento de empaquetado (bundling) de Vite para ser ejecutados.

Estas integraciones se comportan de forma más similar a la carga nativa de ESM (como Vite con `--configLoader native`), lo que puede causar que las configuraciones que dependen de transformaciones fallen. Consulta la [issue #930](https://github.com/voidzero-dev/vite-plus/issues/930) para más detalles.

### Soluciones Temporales

Para asegurar que tu configuración de `lint` y `fmt` sea leída correctamente:

1. **Usa exportaciones estáticas**: Prefiere `defineConfig({ ... })` siempre que sea posible.
2. **Evita características no estándar**: No uses globales específicos de Node (como `__dirname` en ESM), importaciones de TypeScript no resueltas o importaciones de JSON sin atributos de importación.
3. **Usa archivos de configuración dedicados**: Si es necesario, puedes usar archivos `.oxlintrc.*` o `.oxfmtrc.*` temporalmente, aunque unificarlo en `vite.config.ts` sigue siendo el objetivo a largo plazo.

### Problemas con VS Code Multi-Root

En espacios de trabajo con varias carpetas abiertas (Multi-Root), el servidor de lenguaje Oxc puede elegir un espacio de trabajo distinto al que esperas. Asegúrate de que la extensión esté utilizando el espacio de trabajo correcto y que se resuelva a una versión reciente del toolchain de Oxc.

## Carga lenta de configuración causada por plugins pesados

Cuando `vite.config.ts` importa plugins pesados en el nivel superior, cada `import` se evalúa de manera ansiosa, incluso para comandos como `vp lint` o `vp fmt` que no necesitan esos plugins. Esto puede hacer que la carga de la configuración sea notablemente lenta.

Usa `lazyPlugins` para envolver la carga de los plugins. Los plugins solo se cargarán para los comandos que los necesitan (`dev`, `build`, `test`, `preview`), y se omitirán para el resto:

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

- [Discord](https://discord.gg/cAnsqHh5PX) para discusiones en tiempo real y ayuda con problemas.
- [GitHub](https://github.com/voidzero-dev/vite-plus) para incidencias, discusiones y reportes de errores.

Al informar de un problema, por favor incluye:

- La salida completa de `vp env current` y `vp --version`.
- El gestor de paquetes utilizado por el proyecto.
- Los pasos exactos necesarios para reproducir el problema y tu `vite.config.ts`.
- Un repositorio con una reproducción mínima o un entorno de ejecución (sandbox).

