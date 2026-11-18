# Selección del Gestor de Paquetes

`vp` detecta el gestor de paquetes en la raíz del espacio de trabajo en este orden:

1. `packageManager` en el `package.json`
2. `devEngines.packageManager` en el `package.json`
3. `pnpm-workspace.yaml`
4. `pnpm-lock.yaml`
5. `yarn.lock` o `.yarnrc.yml`
6. `package-lock.json`
7. `bun.lock` o `bun.lockb`
8. `.pnpmfile.cjs` o `pnpmfile.cjs`
9. `bunfig.toml`
10. `yarn.config.cjs`

Si ninguna de estas declaraciones o archivos está presente, Vite+ recurre a pnpm por defecto. Vite+ descarga el gestor de paquetes correspondiente según sea necesario. La detección no modifica `package.json`.

Yarn Classic es Yarn 1. Yarn Modern es Yarn 2 o superior.

## Fijar una Versión

Usa [`vp env pin`](/guide/env) para declarar una versión exacta del gestor de paquetes:

```bash
vp env pin pnpm@11.3.0
```

Una fijación de `packageManager` puede incluir un hash de integridad, como `yarn@4.17.1+sha512.…`. Vite+ admite hashes de integridad compatibles con Corepack y se detiene si la verificación falla.

## Rangos de Versiones

El campo [`devEngines.packageManager`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines) acepta un objeto o un array de objetos. Su `version` puede ser un rango semver:

```json
{
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "^11.0.0",
      "onFail": "download"
    }
  }
}
```

Vite+ utiliza una versión satisfactoria ya descargada cuando es posible. De lo contrario, resuelve la versión satisfactoria más reciente desde el registro de npm. El rango sigue siendo la fuente de verdad y no se reemplaza con una fijación exacta en `packageManager`.

Cuando ambos campos están presentes, `packageManager` dirige la selección. Vite+ advierte si no cumple con la restricción de `devEngines.packageManager`. Ejecuta `vp env doctor` para ver los detalles.

## Shims de Gestores de Paquetes

Una declaración explícita de `packageManager` o `devEngines.packageManager` también controla los shims de gestores de paquetes correspondientes. Por ejemplo, `packageManager: "npm@10.9.4"` hace que `npm` y `npx` usen npm 10.9.4.

Lo mismo se aplica a los alias generados para cada gestor:

- pnpm: `pnpm`, `pnpx`, `pn` y `pnx`.
- Yarn: `yarn` y `yarnpkg`.
- Bun: `bun` y `bunx`.

Las herramientas que no coinciden no se traducen. Ejecutar `npm` en un proyecto de pnpm todavía resuelve npm. Usa los comandos de gestión de paquetes de `vp` cuando quieras que Vite+ adapte la operación al gestor del proyecto.
