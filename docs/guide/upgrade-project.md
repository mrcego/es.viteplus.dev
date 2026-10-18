# Actualizar Vite+

Actualización de `vite-plus` y sus dependencias de proyecto relacionadas. Para actualizar el binario global de `vp`, consulta [Actualizar Vite+](/guide/upgrade).

## Actualizar con Migrate

La forma recomendada de actualizar un proyecto es usar `vp migrate`, lo que mantiene alineadas las dependencias del conjunto de herramientas.

Después de actualizar la dependencia `vite-plus` del proyecto, ejecuta la CLI local para alinear las versiones del conjunto de herramientas:

```bash
./node_modules/.bin/vp migrate
```

Si tu CLI global es más reciente que la versión del proyecto, ejecutar `vp migrate` actualiza el proyecto a esa versión global:

```bash
vp migrate
```

En un proyecto que ya está en Vite+, migrate realiza solo una actualización de versión del conjunto de herramientas: vuelve a fijar `vite-plus`, el alias de `vite` -> `@voidzero-dev/vite-plus-core` y la versión de `vitest` a las versiones empaquetadas con la CLI que ejecuta la migración, en cada paquete del espacio de trabajo. Omite los pasos de configuración inicial (hooks de git, archivos de editor y agente, migración de lint), por lo que un cambio de versión no vuelve a tocar las cosas que ya configuraste. Pasa `--full` para ejecutar también esa configuración.

## Actualización Manual

Actualiza `vite-plus` y el alias de `vite` a `@voidzero-dev/vite-plus-core` juntos, manteniendo la versión del core alineada con `vite-plus`. Actualiza estas entradas dondequiera que estén declaradas en tu espacio de trabajo, incluidos los overrides o catálogos, luego instala dependencias para refrescar el lockfile. También [actualiza la versión fijada de Vitest](#actualizar-la-version-fijada-de-vitest) para que coincida con la versión empaquetada.

Sin la CLI global, ejecuta los comandos `vp` de esta página a través de tu gestor de paquetes, por ejemplo `pnpm exec vp toolchain vitest`.

### Actualizar la Versión Fijada de Vitest

Si migraste con `vp migrate`, tu proyecto fija `vitest` a una versión exacta para que todo el proyecto comparta una única copia de Vitest con el ejecutor integrado `vp test`. La fijación reside en el bloque de sobrescritura de tu gestor de paquetes:

- **npm / Bun:** una entrada `vitest` bajo `overrides` en `package.json`
- **Yarn:** una entrada `vitest` bajo `resolutions` en `package.json`
- **pnpm:** una entrada `vitest@*` bajo `overrides` en `pnpm-workspace.yaml`. Si tu `package.json` ya tiene un campo `pnpm`, la entrada reside bajo `pnpm.overrides` en `package.json`. pnpm ignora los overrides de `pnpm-workspace.yaml` cuando `package.json` define `pnpm.overrides`.

Una versión de Vite+ puede actualizar el Vitest empaquetado. Debido a que esa fijación también se aplica a la dependencia `vitest` del propio `vite-plus`, una versión desactualizada sigue instalando el ejecutor anterior incluso después de actualizar `vite-plus` — dividiendo los elementos internos de Vitest (mocks, `expect`, estado del ejecutor) entre la copia fijada y la que carga `vp test`.

Después de actualizar `vite-plus`, vuelve a fijar `vitest` a la versión que ahora incluye Vite+. Comprueba esa versión con:

```bash
vp toolchain vitest
```

Luego establece el override de `vitest` en esa versión exacta y reinstala dependencias.

::: details Por qué los overrides de pnpm usan `@*`
Bajo pnpm, las claves administradas usan un rango explícito `@*` (`vite@*`, `vitest@*`). pnpm aplica una sobrescritura reemplazando la especificación declarada en cada manifiesto, incluidos los manifiestos importadores. Una clave simple coincide con cualquier especificación, incluida `catalog:`. El rango `@*` mantiene la sobrescritura en los rangos semver que usan las declaraciones transitivas y pares, y deja intactas las referencias a `catalog:`. Por lo tanto, `vp up` ya no las reescribe a una versión concreta.
:::

## Compilaciones de Vista Previa

Después de [instalar una compilación de vista previa de la CLI global](/guide/upgrade#vista-previa-de-vp-global), ejecuta migrate en el proyecto para mover su `vite-plus` local a la misma versión:

```bash
vp migrate
```

Migrate escribe el registro puente en `.npmrc`. Para Yarn Berry, escribe el registro en `.yarnrc.yml`. Fija `vite-plus` y el alias de `vite` a la versión `0.0.0-commit.<sha>` correspondiente. El alias de `vite` apunta a `@voidzero-dev/vite-plus-core`. Haz commit de la línea del registro si el CI del proyecto debe probar la vista previa.

Después de la instalación, ejecuta `vp toolchain` para mostrar las versiones seleccionadas. Después de probar, establece `vite-plus` en `latest`. Elimina la línea `registry` del puente de `.npmrc` o `.yarnrc.yml`. Luego ejecuta `vp install`.
