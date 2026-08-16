# Lint

`vp lint` analiza el cÃ³digo con Oxlint.

## Vista General

`vp lint` estÃ¡ basado en [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), el linter de Oxc. Oxlint estÃ¡ diseÃ±ado como un reemplazo rÃ¡pido de ESLint para la mayorÃ­a de los proyectos frontend e incluye soporte integrado para las reglas principales de ESLint y muchas reglas populares de la comunidad.

Usa `vp lint` para analizar tu proyecto, y `vp check` para formatear, hacer lint y verificar tipos, todo a la vez.

## Uso

```bash
vp lint
vp lint --fix
vp lint --type-aware
```

## ConfiguraciÃ³n

Coloca la configuraciÃ³n de lint directamente en el bloque `lint` en `vite.config.ts` para que toda tu configuraciÃ³n permanezca en un solo lugar. No recomendamos usar `oxlint.config.ts` o `.oxlintrc.json` con Vite+.

Para ver el conjunto de reglas original, las opciones y detalles de compatibilidad, consulta la [documentaciÃ³n de Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

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

- `typeAware: true` habilita reglas que requieren informaciÃ³n de tipos de TypeScript.
- `typeCheck: true` habilita la verificaciÃ³n de tipos completa durante el linting.

Esta ruta estÃ¡ impulsada por [tsgolint](https://github.com/oxc-project/tsgolint) sobre el toolchain de TypeScript en Go. Proporciona a Oxlint acceso a la informaciÃ³n de tipos y permite la verificaciÃ³n de tipos directamente a travÃ©s de `vp lint` y `vp check`.

## Plugins de JS

Si estÃ¡s migrando desde ESLint y aÃºn dependes de algunos plugins de ESLint crÃ­ticos basados en JavaScript, Oxlint tiene [soporte para plugins de JS](https://oxc.rs/docs/guide/usage/linter/js-plugins) que puede ayudarte a mantener esos plugins funcionando mientras completas la migraciÃ³n.


Los plugins de JS también permiten [escribir tus propias reglas personalizadas](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.html) para Oxlint.
