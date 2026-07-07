# Configuración de Comprobación (Check)

`vp check` ejecuta comprobaciones de formato, lint y tipos de forma conjunta. El bloque `check` en `vite.config.ts` establece los valores predeterminados para este comando compuesto, reflejando las opciones de CLI `--no-fmt` y `--no-lint`.

Esto es útil cuando un proyecto desea conservar la mayor parte del toolchain pero omitir un paso de forma predeterminada. Por ejemplo, un equipo que realiza linting pero no formatea puede deshabilitar `check.fmt` para que un simple `vp check` (el comando que los agentes y colaboradores ejecutan con más frecuencia) solo realice linting, sin que nadie tenga que recordar usar `--no-fmt`.

## Ejemplo

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  check: {
    // Omite el paso de formato en `vp check`. Por defecto es true.
    fmt: false,
    // Omite las reglas de lint en `vp check`. La comprobación de tipos
    // aún se ejecuta cuando `lint.options.typeAware` y `lint.options.typeCheck`
    // están habilitados. Por defecto es true.
    lint: true,
  },
});
```

Cuando un paso se deshabilita aquí, `vp check` imprime una línea corta de nota (`note:`) para dejar en claro por qué el paso no se ejecutó. Con la configuración `check.fmt: false` anterior:

```bash
$ vp check
note: Format skipped (check.fmt: false in vite.config.ts)
pass: Found no warnings or lint errors in 1 file (12ms, 8 threads)
```

## Alcance y precedencia

- Estas opciones solo afectan al comando compuesto `vp check`. Los comandos individuales [`vp fmt`](/config/fmt) y [`vp lint`](/config/lint) no se ven afectados, por lo que aún puedes ejecutar una herramienta deshabilitada directamente cuando la necesites de forma puntual. Ten en cuenta que cualquier invocación de `vp check` respeta estos valores predeterminados, incluyendo una ejecución desde un hook de pre-commit: si tus tareas de [`staged`](/config/staged) llaman a `vp check`, ese paso también se omitirá allí.
- Un paso se omite si la configuración lo deshabilita **o** si se pasa la opción correspondiente en la CLI. No hay ninguna opción para volver a habilitar un paso deshabilitado en la configuración; en su lugar, ejecuta `vp fmt` o `vp lint` directamente.
