# Actualizar Vite+

Usa `vp upgrade` para actualizar el binario global `vp`, y utiliza los comandos de gestión de paquetes de Vite+ para actualizar el paquete local `vite-plus` en un proyecto.

## Vista General

Hay dos partes al actualizar Vite+:

- El comando global `vp` instalado en tu máquina.
- El paquete local `vite-plus` utilizado por un proyecto individual.

Puedes actualizar ambos de forma independiente.

## CLI Global `vp`

```bash
vp upgrade                        # actualizar a la última versión
vp upgrade --check                # comprobar si hay actualizaciones sin instalar
vp upgrade <versión>              # instalar una versión específica
vp upgrade --registry <registro>  # usar un registro de npm personalizado
```

### Reversión (Rollback)

Vite+ mantiene instaladas las **3 versiones más recientes** para que puedas revertir rápidamente:

```bash
vp upgrade --rollback
```

Las versiones más antiguas se eliminan automáticamente después de cada actualización. La versión activa y la versión anterior siempre se conservan, por lo que nunca se elimina un objetivo de reversión.

## `vite-plus` Local

La forma recomendada de actualizar un proyecto Vite+ existente es con `vp migrate`:

```bash
vp migrate
```

En un proyecto que ya utiliza Vite+, migrate realiza solo una actualización de la versión del toolchain: vuelve a fijar `vite-plus`, el alias `vite` -> `@voidzero-dev/vite-plus-core` y el pin de `vitest` a las versiones que la CLI global `vp` ahora empaqueta, en cada paquete del workspace. Omite los pasos de configuración inicial (hooks de git, archivos de editor y agente, migración de lint), por lo que un cambio de versión no vuelve a tocar las cosas que ya configuraste. Pasa `--full` para ejecutar también esa configuración.

### Actualización del Pin de Vitest

Si realizaste la migración con `vp migrate`, tu proyecto fija `vitest` a una versión exacta para que todo el proyecto comparta una única copia de Vitest con el ejecutor de pruebas `vp test` integrado. El pin reside en el bloque de sobrescrituras (overrides/resolutions) de tu gestor de paquetes:

- **npm / Bun:** una entrada `vitest` bajo `overrides` en `package.json`
- **Yarn:** una entrada `vitest` bajo `resolutions` en `package.json`
- **pnpm:** una entrada `vitest` bajo `overrides` en `pnpm-workspace.yaml` — a menos que tu `package.json` ya tuviera un campo `pnpm`, en cuyo caso reside bajo `pnpm.overrides` en `package.json` (pnpm ignora las sobrescrituras de `pnpm-workspace.yaml` cuando `package.json` define `pnpm.overrides`).

Un lanzamiento de Vite+ puede actualizar el Vitest empaquetado. Debido a que ese pin también se aplica a la propia dependencia `vitest` de `vite-plus`, un pin desactualizado seguirá instalando el ejecutor anterior incluso después de actualizar `vite-plus` — dividiendo los componentes internos de Vitest (mocks, `expect`, estado del ejecutor) entre la copia fijada y la que carga `vp test`.

Después de actualizar `vite-plus`, vuelve a fijar `vitest` a la versión que Vite+ ahora empaqueta. Comprueba esa versión con:

```bash
vp --version
```

Luego, establece la sobrescritura de `vitest` a esa versión exacta, o vuelve a ejecutar `vp migrate` para que actualice el pin por ti.

## Compilaciones de Vista Previa (Preview Builds)

Algunas solicitudes de extracción (pull requests) de Vite+ publican paquetes temporales para realizar pruebas antes de un lanzamiento en npm. Trata estas compilaciones como nocturnas (nightly) o de vanguardia (bleeding-edge): son útiles cuando deseas verificar una corrección específica, probar una nueva actualización de dependencias de upstream o confirmar un cambio antes del próximo lanzamiento. Para el trabajo diario, prefiere la versión `latest` publicada.

Cada commit en una pull request elegible se publica en el [puente de registro (registry bridge)](https://registry-bridge.viteplus.dev/). El puente sirve estas compilaciones como versiones ordinarias de npm con el formato `0.0.0-commit.<sha>` y redirige cualquier otro paquete al registro de npm. Eso significa que instalas una vista previa con especificadores de versión normales en lugar de URLs mutables, y las mismas versiones se resuelven en la CI.

Tanto `vite-plus` como `@voidzero-dev/vite-plus-core` se publican bajo la misma versión `0.0.0-commit.<sha>`. Cada pull request incluye un comentario que enumera la versión exacta de su último commit, junto con pasos de instalación listos para copiar.

Puedes encontrar compilaciones de vista previa en las pull requests que actualizan automáticamente las dependencias de upstream. Como ejemplo, busca en las pull requests fusionadas para [actualizaciones de dependencias de upstream](https://github.com/voidzero-dev/vite-plus/pulls?q=is%3Apr+is%3Amerged+upgrade+upstream+dependencies).

Las compilaciones de vista previa se direccionan por número de pull request o SHA del commit. No son un rango de versiones estable y debes evitar dejarlas en ramas de larga duración a menos que un mantenedor te lo pida.

### Vista Previa de la CLI Global `vp`

Instala una compilación de vista previa de la CLI global pasando `VP_PR_VERSION` al instalador. Pasa un número de pull request o un SHA de commit:

```bash
curl -fsSL https://vite.plus | VP_PR_VERSION=<pr-o-sha> bash
```

En Windows:

```powershell
$env:VP_PR_VERSION = "<pr-o-sha>"
irm https://vite.plus/ps1 | iex
Remove-Item Env:\VP_PR_VERSION
```

El instalador resuelve la referencia a su compilación `0.0.0-commit.<sha>` a través del puente de registro y la instala como cualquier otra versión. Ejecuta `vp --version` después para confirmar qué compilación y versiones de herramientas empaquetadas están activas. Cuando termines las pruebas, regresa a la versión publicada con `vp upgrade --force` o ejecutando el instalador nuevamente sin `VP_PR_VERSION`.

### Vista Previa de `vite-plus` Local

Después de instalar la CLI global de vista previa anterior, ejecuta migrate en el proyecto para mover su `vite-plus` local a la misma compilación:

```bash
vp migrate
```

Migrate apunta el proyecto al registro del puente (escribiéndolo en `.npmrc`, o `.yarnrc.yml` para Yarn Berry) y fija `vite-plus` y el alias `vite` -> `@voidzero-dev/vite-plus-core` a la versión `0.0.0-commit.<sha>` coincidente. Esa línea de registro es lo que permite resolver las mismas versiones en la CI del propio proyecto, así que confírmala si deseas que la CI también pruebe la vista previa.

Después de la instalación, comprueba las versiones empaquetadas con `vp --version`. Cuando se completen las pruebas, restaura la versión publicada: vuelve a establecer `vite-plus` en `latest`, elimina la línea de `registry` del puente de `.npmrc` (o `.yarnrc.yml`) y vuelve a instalar con `vp install`.

