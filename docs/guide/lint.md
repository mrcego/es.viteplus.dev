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

## Configuración

Coloca la configuración de lint directamente en el bloque `lint` en `vite.config.ts` para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `oxlint.config.ts` o `.oxlintrc.json` con Vite+.

Para ver el conjunto de reglas original, las opciones y detalles de compatibilidad, consulta la [documentación de Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

```ts
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
