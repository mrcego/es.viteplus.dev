# Lint

`vp lint` analiza el código con Oxlint.

## Vista General

`vp lint` está basado en [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), el linter de Oxc. Oxlint está diseñado como un reemplazo rápido de ESLint para la mayoría de los proyectos frontend e incluye soporte integrado para las reglas principales de ESLint y muchas reglas populares de la comunidad.

Usa `vp lint` para analizar tu proyecto, y `vp check` para formatear, hacer lint y verificar tipos, todo a la vez.

## Uso

```bash
vp lint
vp lint --fix
vp lint --type-aware
```

## Configuración {#configuracion}

Coloca la configuración de lint directamente en el bloque `lint` en el `vite.config.ts` raíz para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `oxlint.config.ts` o `.oxlintrc.json` con Vite+.

Cuando la configuración de la raíz del workspace tiene un bloque `lint`, `vp lint` y `vp check` lo usan incluso cuando se ejecutan desde el directorio de un paquete. Las configuraciones de paquetes no pueden reemplazar las reglas de la raíz ni deshabilitar sus opciones `typeAware` y `typeCheck`. Los comandos conservan el directorio de trabajo del paquete, por lo que los argumentos de archivos relativos mantienen su significado. Usa [`lint.overrides`](/guide/monorepo#configuracion-de-raiz-con-overrides) para reglas específicas de archivos o paquetes.

Un `vp lint -c <ruta>` o `vp lint --config <ruta>` explícito selecciona otra configuración. De lo contrario, cuando se ejecuta desde la raíz del workspace o cuando la configuración raíz no tiene un bloque `lint`, Oxlint detecta el archivo `vite.config.*` más cercano con un bloque `lint`. Las extensiones soportadas son `.js`, `.mjs`, `.ts`, `.cjs`, `.mts` y `.cts`. Las configuraciones anidadas no anulan los ajustes para archivos individuales.

Para ver el conjunto de reglas original, las opciones y detalles de compatibilidad, consulta la [documentación de Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
```

## Linting Consciente del Tipo (Type-Aware)

Recomendamos habilitar tanto `typeAware` como `typeCheck` en el bloque `lint`:

- `typeAware: true` habilita reglas que requieren información de tipos de TypeScript.
- `typeCheck: true` habilita la verificación de tipos completa durante el linting.

Esta ruta está impulsada por [tsgolint](https://github.com/oxc-project/tsgolint) sobre el toolchain de TypeScript en Go. Proporciona a Oxlint acceso a la información de tipos y permite la verificación de tipos directamente a través de `vp lint` y `vp check`.

## Plugins de JS

Si estás migrando desde ESLint y aún dependes de algunos plugins de ESLint críticos basados en JavaScript, Oxlint tiene [soporte para plugins de JS](https://oxc.rs/docs/guide/usage/linter/js-plugins) que puede ayudarte a mantener esos plugins funcionando mientras completas la migración.

Los plugins de JS también permiten [escribir tus propias reglas personalizadas](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.html) para Oxlint.

### Escribir Tus Propias Reglas

Importa la API para crear plugins desde `vite-plus/lint/plugins`:

```js [lint/my-plugin.js]
import { definePlugin, defineRule } from 'vite-plus/lint/plugins';

const noFoo = defineRule({
  meta: { messages: { noFoo: 'No nombres cosas como "foo".' } },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'foo') {
          context.report({ node, messageId: 'noFoo' });
        }
      },
    };
  },
});

export default definePlugin({
  meta: { name: 'my' },
  rules: { 'no-foo': noFoo },
});
```

Regístralo bajo `lint.jsPlugins` y habilita sus reglas:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    jsPlugins: ['./lint/my-plugin.js'],
    rules: {
      'my/no-foo': 'error',
    },
  },
});
```

Para probar reglas, `RuleTester` está disponible desde `vite-plus/lint/plugins-dev`.

Ambos puntos de entrada reexportan la copia que se incluye con Vite+. Por lo tanto, la API siempre coincide con el Oxlint integrado.

Úsalos en lugar de agregar `@oxlint/plugins` u `oxlint` como una dependencia directa. Una copia fijada por separado puede diferir del linter que carga tu plugin. Además, no se resolverá desde un archivo de plugin bajo el diseño estricto de pnpm, a menos que cada paquete que contenga un plugin lo declare.

`vp migrate` reescribe las importaciones existentes de `oxlint` y `@oxlint/plugins` por ti. Consulta [Importaciones de Plugins JS de Oxlint](/guide/migrate-rules#importaciones-de-plugins-js-de-oxlint). La regla `vite-plus/prefer-vite-plus-imports` reporta cualquier importación que regrese.
