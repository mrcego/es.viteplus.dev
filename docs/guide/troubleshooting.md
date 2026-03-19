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

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
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

