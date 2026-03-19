# Pruebas (Test)

`vp test` ejecuta pruebas con [Vitest](https://vitest.dev).

## Vista General

`vp test` está basado en [Vitest](https://vitest.dev/), por lo que obtienes un ejecutor de pruebas nativo de Vite que reutiliza tu configuración y plugins de Vite, admite expectativas de estilo Jest, instantáneas (snapshots) y cobertura, y maneja proyectos modernos de ESM, TypeScript y JSX de forma limpia.

## Uso

```bash
vp test
vp test watch
vp test run --coverage
```

::: info
A diferencia de Vitest por sí solo, `vp test` no permanece en modo de observación (watch) por defecto. Usa `vp test` cuando quieras una ejecución de prueba normal y usa `vp test watch` cuando quieras entrar en modo de observación.
:::

## Configuración

Coloca la configuración de prueba directamente en el bloque `test` en `vite.config.ts` para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `vitest.config.ts` con Vite+.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
```

Para ver la referencia de configuración completa de Vitest, consulta la [documentación de configuración de Vitest](https://vitest.dev/config/).
