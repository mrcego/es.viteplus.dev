# Pruebas (Test)

p test ejecuta pruebas con [Vitest](https://vitest.dev).

## Vista General

p test está basado en [Vitest](https://vitest.dev/), por lo que obtienes un ejecutor de pruebas nativo de Vite que reutiliza tu configuración y plugins de Vite, admite expectativas de estilo Jest, instantáneas (snapshots) y cobertura, y maneja proyectos modernos de ESM, TypeScript y JSX de forma limpia.

Las API de Vitest están disponibles desde ite-plus/test, por lo que una sola instalación de ite-plus es suficiente: no necesitas instalar itest directamente:

`	s [src/example.test.ts]
import { describe, expect, it, vi } from 'vite-plus/test';
`

Para las subrutas del modo navegador (ite-plus/test/browser*), consulta [Migrar Vitest](/guide/migrate#vitest).

::: info INFORMACIÓN
p test siempre ejecuta el comando integrado de Vitest. Si tu proyecto también tiene un script 	est en package.json, ejecuta p run test cuando desees ejecutar ese script en su lugar. Consulta [Comandos Integrados frente a Scripts](/guide/run#comandos-integrados-frente-a-scripts).
:::

## Uso

`ash
vp test
vp test watch
vp test run --coverage
`

::: info
A diferencia de Vitest por sí solo, p test no permanece en modo de observación (watch) por defecto. Usa p test cuando quieras una ejecución de prueba normal y usa p test watch cuando quieras entrar en modo de observación.
:::

## Configuración

Coloca la configuración de prueba directamente en el bloque 	est en ite.config.ts para que toda tu configuración permanezca en un solo lugar. No recomendamos usar itest.config.ts con Vite+.

`	s [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
`

Para ver la referencia de configuración completa de Vitest, consulta la [documentación de configuración de Vitest](https://vitest.dev/config/).