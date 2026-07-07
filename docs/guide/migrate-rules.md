# Reglas de Migración

Esta referencia describe exactamente qué hace `vp migrate` a un proyecto: cómo actualiza las dependencias, reescribe las importaciones de origen y los scripts del paquete, y ajusta la configuración del gestor de paquetes. Consulta la [guía de migración](./migrate.md) para ver la descripción general del comando y el flujo de trabajo.

Excepto por [Antes de Migrar](#antes-de-migrar), que enumera los pasos que realizas tú mismo, todo lo que se describe a continuación es un comportamiento automático.

## Antes de Migrar

1. Ejecuta `vp upgrade` para que la CLI global tenga las reglas de migración más recientes. Un `vite-plus` local desactualizado no es un obstáculo: cuando la copia local del proyecto es más antigua, la migración delega en la CLI global.
2. Actualiza el proyecto a Vite 8+ y Vitest 4.1+ cuando sea necesario.
3. Ejecuta `vp migrate` desde la raíz del workspace. Usa `--no-interactive` en entornos automatizados.
4. Revisa cada manifiesto cambiado, la configuración del gestor de paquetes, la reescritura de código fuente y el lockfile generado.
5. Valida con `vp install`, `vp check`, `vp test` y `vp build`.

La migración es idempotente: ejecutarla nuevamente después de una migración exitosa no debería producir otro diff.

## Actualización frente a Configuración Completa (Upgrade vs. Full Setup)

En un proyecto que ya depende de `vite-plus`, `vp migrate` realiza solo una actualización: actualiza las dependencias y la configuración del gestor de paquetes, y finaliza las importaciones. No toca la configuración del proyecto.

- `--full` también ejecuta las acciones de configuración: hooks de git, configuración del editor, archivos del agente, migración de ESLint y Prettier, shims de framework, la corrección de `baseUrl` en tsconfig y la conversión de `.nvmrc`/Volta a `.node-version`.
- `--hooks`, `--agent` y `--editor` optan por una sola acción de configuración sin `--full`.

Cuando una actualización predeterminada omite acciones de configuración que se aplicarían, imprime una sugerencia para ejecutar `vp migrate --full`. Los proyectos nuevos (que no son de Vite+) siempre ejecutan la migración completa.

## Reglas de Dependencias

Qué le sucede a cada dependencia del toolchain, de un vistazo:

| Dependencia | Qué sucede |
| --- | --- |
| `vite-plus` | Se agrega donde se migra el paquete; los rangos simples se vuelven a fijar al objetivo concreto, directamente o a través de un catálogo. |
| `vite` | Las declaraciones existentes se mantienen y apuntan al alias del core. Bajo pnpm, se agrega como una dependencia de desarrollo directa donde sea necesario (ver [Vite y Sobrescrituras](#vite-y-sobrescrituras)). |
| `vitest` | Se elimina en el caso común de modo Node porque `vite-plus` lo proporciona de forma transitiva. Se mantiene o se agrega solo cuando se [requiere directamente](#cuando-se-requiere-vitest-directamente). |
| `@vitest/*` | Los paquetes del ecosistema instalados directamente se alinean con la versión de Vitest empaquetada (ver [Paquetes del Ecosistema de Vitest](#paquetes-del-ecosistema-de-vitest)). |
| `@voidzero-dev/vite-plus-test` | Se elimina de todas partes: dependencias, sobrescrituras, resoluciones y alias de catálogo. Las importaciones se reescriben a la superficie actual de `vite-plus/test*`. |

### Selección de Versión

- `vite-plus` se fija a la versión concreta de la CLI que ejecuta la migración, nunca al tag de distribución `latest`.
- El alias `vite` apunta a `@voidzero-dev/vite-plus-core` de la misma versión de Vite+.
- Un manifiesto respaldado por un catálogo puede contener `catalog:` o una referencia de catálogo con nombre. La migración mantiene la referencia y actualiza el valor del catálogo referenciado al objetivo concreto del toolchain.
- Se conservan las fijaciones de protocolos deliberadas: `workspace:`, `file:`, `link:`, `npm:`, `github:`, URLs de Git y URLs de HTTP.
- La migración reconcilia cada paquete del workspace, no solo el manifiesto raíz. Las sobrescrituras compartidas y los catálogos permanecen en la raíz del workspace; las dependencias que proporcionan un peer pertenecen a cada paquete que las necesita.

### Vite y Sobrescrituras (Overrides)

Las sobrescrituras del gestor de paquetes no crean relaciones de dependencia por sí mismas. Bajo pnpm, un paquete que enumera `vite-plus` en `dependencies` o `devDependencies` pero no tiene una entrada `vite` en ningún lugar (`dependencies`, `devDependencies`, `optionalDependencies` o `peerDependencies`) hace que pnpm instale automáticamente la versión upstream de Vite para satisfacer la peer dependency de `vite` requerida por Vitest, lo que divide el proyecto en instancias independientes de Vite+, Vite y Vitest. Para evitar esto, `vp migrate` agrega la entrada `vite` faltante a las `devDependencies` de cada uno de estos paquetes; luego, la sobrescritura del workspace la redirige al core de Vite+.

Reglas relacionadas:

- Una declaración `vite` directa nunca se elimina simplemente porque exista una sobrescritura raíz.
- Se normalizan las declaraciones simples o desactualizadas; se mantienen las referencias a catálogos con nombre.
- La regla de entrada directa anterior es específica de pnpm. Bun duplica su alias de core como una dependencia directa para su resolución de pares, y los diseños de proveedores de navegadores de npm pueden necesitar una entrada `vite` de nivel superior para que los paquetes anidados de Vitest puedan resolver `vite`.

### Cuando se Requiere Vitest Directamente

La migración mantiene o agrega un paquete local `vitest` en la versión exacta integrada cuando se cumple cualquiera de las siguientes condiciones:

- una dependencia instalada tiene una peer dependency de `vitest` no opcional, ya sea exacta o un rango;
- el paquete utiliza el modo navegador de Vitest o un proveedor de navegador opcional;
- la configuración de código fuente o de TypeScript conserva una referencia a `vitest` de upstream;
- el paquete declara `@nuxt/test-utils`; o
- los metadatos de dependencia no están disponibles y un `vitest` directo existente podría estar satisfaciendo una peer dependency requerida desconocida.

La detección lee los metadatos de pares instalados, por lo que integraciones como `vite-plugin-gherkin` se manejan incluso si sus nombres no contienen `vitest`.

Cuando un paquete califica, la migración:

- agrega `vitest` a ese paquete, no de forma indiscriminada a cada paquete del workspace;
- usa la referencia de catálogo existente cuando sea compatible; de lo contrario, usa la versión exacta integrada; y
- mantiene una sobrescritura o resolución del workspace coincidente para que el grafo resuelva una única versión de Vitest.

Una declaración de peer dependency por sí sola no instala Vitest. Si una declaración `peerDependencies.vitest` sobreviviente utiliza una entrada de catálogo que la migración eliminará, se resuelve primero al rango de pares público.

### Paquetes del Ecosistema de Vitest

Los paquetes oficiales actuales de `@vitest/*` generalmente se publican sincronizados con Vitest. La migración alinea los que el proyecto instala directamente, incluyendo `@vitest/coverage-v8`, `@vitest/coverage-istanbul`, `@vitest/ui` y `@vitest/web-worker`:

- cuando el gestor de paquetes admite catálogos, se referencian a través del catálogo del toolchain: se conserva una referencia existente `catalog:` / `catalog:<name>`, se agrega una entrada de catálogo para cualquier paquete que carezca de ella y cada entrada se actualiza a la versión de Vitest integrada;
- cuando los catálogos no son compatibles (npm, un proyecto de bun independiente o un pnpm/Yarn anterior a los catálogos), se escribe en su lugar la versión concreta integrada.

Paquetes que **no** se alinean:

- `@vitest/eslint-plugin` sigue su propia línea de versiones;
- `@vitest/coverage-c8` se detuvo en una versión anterior y no tiene versión de Vitest 4; y
- las integraciones de terceros `vitest-*` conservan sus propias versiones compatibles, aunque su peer dependency de Vitest requerida aún puede activar la [provisión directa](#cuando-se-requiere-vitest-directamente).

Para el modo navegador, el entorno de ejecución base `@vitest/browser` y `@vitest/browser-preview` son empaquetados por Vite+ y se eliminan como dependencias directas. Los proveedores de Playwright y WebdriverIO siguen siendo opcionales: un proveedor conservado o inyectado se referencia a través del catálogo de herramientas preferido en la versión de Vitest integrada (o se escribe concretamente cuando los catálogos no son compatibles), y su par `playwright` o `webdriverio` se instala junto con él.

Los proveedores se detectan antes de que se reescriban las importaciones. Esto cubre proyectos heredados que aliaron `vitest` a `@voidzero-dev/vite-plus-test` e importan desde `vitest/browser-<provider>`, `vitest/browser/providers/<provider>` o `vitest/plugins/browser-<provider>`: esas importaciones aún instalan la dependencia `@vitest/browser-playwright` o `@vitest/browser-webdriverio` correspondiente y su par del framework.

Se conservan las sobrescrituras anidadas de npm y Bun con valores de objeto: son ámbitos definidos por el usuario en lugar de fijaciones de versión escalares.

## Reglas de Reescritura de Código Fuente

### Importaciones de `vite`

Las importaciones de `vite` y `vite/*` se reescriben a `vite-plus` **solo en los archivos de entrada de configuración**: `vite.config.*`, `vitest.config.*` y cualquier archivo de configuración que la migración haya resuelto. Todos los demás archivos mantienen sus importaciones de `vite` por dos razones:

- `vite-plus` no es un superconjunto garantizado de la superficie expuesta de Vite. Solo posee `defineConfig`, `defineProject` y `lazyPlugins`, por lo que reescribir un símbolo de paso como `createBuilder` o `loadConfigFromFile` (incluso en posiciones de tipo `typeof import('vite')`) puede fallar.
- Una importación de `vite` no reescrita todavía se resuelve a través del alias `@voidzero-dev/vite-plus-core` en un proyecto de Vite+.

Los paquetes de plugins (un nombre sin ámbito que comienza con `vite-plugin-` o `unplugin-`, o `vite` en `peerDependencies`/`dependencies`) omiten la reescritura incluso en archivos de configuración. Solo el especificador `vite` está dentro del alcance de esta regla.

Las declaraciones de aumento de módulo `declare module 'vite'` siguen la misma regla y se conservan fuera de los archivos de configuración. A través del alias del core, alcanzan el mismo módulo `@voidzero-dev/vite-plus-core` cuyos tipos `UserConfig` utiliza `defineConfig` de `vite-plus`, por lo que siguen funcionando después de la migración; `vite-plus` en sí no exporta ningún símbolo `UserConfig`, por lo que una declaración de aumento `declare module 'vite-plus'` reescrita no se fusionaría con nada. Las extensiones dirigidas a la propia superficie de `vite-plus` se escriben contra `vite-plus` manualmente.

### Importaciones de `vitest` y Navegador

- Las importaciones ordinarias de `vitest` y `vitest/*` se reescriben a `vite-plus/test*`.
- Las importaciones de proveedores heredados de Playwright y WebdriverIO se detectan antes de esta reescritura para que no se pierdan sus dependencias de proveedores opcionales.
- Las importaciones de `@vitest/browser*` con ámbito se reescriben a las exportaciones correspondientes de `vite-plus/test/browser*`, aprovisionando proveedores opcionales cuando sea necesario.
- Las importaciones existentes de `vite-plus/test*` se dejan sin cambios.

### Qué No Se Reescribe Nunca

- `declare module 'vitest'` y `declare module '@vitest/browser*'`: las declaraciones de aumento de módulo deben conservar la identidad del módulo upstream.
- Las referencias que quedan atrás, como `compilerOptions.types`, `require.resolve`, `import.meta.resolve` y `vitest/package.json`, requieren un Vitest local en el paquete (ver [Cuando Vitest es requerido directamente](#cuando-se-requiere-vitest-directamente)).
- En un paquete que declara `@nuxt/test-utils`, cada especificador de módulo `vitest` y `vitest/*` se conserva en todo el paquete: la transformación de Nuxt requiere la identidad upstream y, de lo contrario, puede inyectar una importación `vi` duplicada. Esta excepción no se aplica a paquetes hermanos ni a importaciones de `@vitest/browser*` con ámbito.

La regla de lint `prefer-vite-plus-imports` sigue la misma excepción de Nuxt, por lo que la corrección automática de lint también conserva estas importaciones.

## Reglas de Reescritura de Scripts de Paquetes

La migración reescribe los comandos proporcionados por el toolchain de Vite+ en los scripts de `package.json` mientras conserva sus argumentos:

| Antes | Después |
| --- | --- |
| `vite` | `vp dev`, o el subcomando `vp` correspondiente |
| `vitest` | `vp test` |
| `oxlint` | `vp lint` |
| `oxfmt` | `vp fmt` |
| `tsdown` | `vp pack` |
| `lint-staged` | `vp staged` |
| `eslint` | `vp lint`, cuando se ejecuta su migración opcional |
| `prettier` | `vp fmt`, cuando se ejecuta su migración opcional |

Para los comandos lanzados a través de `bunx`, la migración conserva `bunx` y su flag `--bun` (manteniendo el entorno de ejecución elegido por el usuario) y reescribe solo el comando gestionado. Esto también funciona cuando `bunx` sigue a un delimitador de inicio de comando como `run` o `--`:

| Antes | Después |
| --- | --- |
| `bunx --bun vite build` | `bunx --bun vp build` |
| `bunx --bun vitest run` | `bunx --bun vp test run` |
| `portless --tailscale run bunx --bun vite` | `portless --tailscale run bunx --bun vp dev` |
| `dotenv -e .env.test -- bunx --bun oxlint --type-aware` | `dotenv -e .env.test -- bunx --bun vp lint --type-aware` |

Los comandos de `bunx` no relacionados y otras formas de ejecutores de paquetes permanecen sin cambios.

## Reglas de Versión de Node.js

La migración convierte los archivos heredados del gestor de versiones de Node.js a `.node-version`, el formato que lee Vite+. En un proyecto de Vite+ existente, esta conversión es parte del grupo de configuración completa, por lo que se ejecuta con `vp migrate --full`; las migraciones nuevas la ejecutan de forma incondicional.

- Los pines de `.nvmrc` y Volta `volta.node` se convierten a `.node-version`. Se mantiene un `.node-version` existente.
- Cuando se elimina `.nvmrc`, cualquier referencia a `actions/setup-node` `node-version-file: .nvmrc` en `.github/workflows/*.{yml,yaml}` y acciones compuestas (`.github/actions/**/action.{yml,yaml}`) se redirige a `.node-version` para que la CI no falle con "node version file ... does not exist".

## Reglas de Gestores de Paquetes

### pnpm

**Ubicación de la configuración raíz.** pnpm 10.6.2+ utiliza `pnpm-workspace.yaml` como la única fuente para las configuraciones raíz admitidas. La migración mueve los campos `package.json#pnpm` reconocidos allí, incluyendo sobrescrituras, reglas de pares, configuraciones de parches, extensiones de paquetes, política de arquitectura y compilación, configuración de auditoría/actualización y dependencias de configuración. Elimina el objeto `pnpm` cuando queda vacío y conserva las claves desconocidas que puedan pertenecer a otras herramientas.

- Cuando ambos archivos definen la misma configuración migrada, las entradas del objeto se fusionan de forma recursiva y se conservan las entradas del array únicas. Los valores de `package.json#pnpm` ganan en las hojas escalares en conflicto, mientras que se conservan las entradas hermanas exclusivas del workspace.
- Antes de pnpm 10.6.2, estas configuraciones permanecen en `package.json#pnpm`. (El soporte para configuraciones de workspace llegó de forma incremental: 10.5.0 en general, 10.5.1 para sobrescrituras, 10.6.2 para `peerDependencyRules`. pnpm 11 ya no lee las configuraciones heredadas de `package.json`).

**Catálogos (Catalogs).** Los catálogos son una característica independiente, admitida desde pnpm 9.5.0, independiente del límite de configuración anterior. Incluso por debajo de 10.6.2, donde las sobrescrituras permanecen en `package.json#pnpm`, la migración todavía reescribe el catálogo del workspace eliminando los alias de envoltura obsoletos y mantiene las sobrescrituras `catalog:` como referencias en lugar de integrarlas directamente en versiones concretas.

- Las referencias de dependencia, los catálogos predeterminados y nombrados, las sobrescrituras y las reglas `peerDependencyRules` se mantienen coherentes entre sí.
- pnpm acepta el catálogo predeterminado lógico como `catalog` de nivel superior o `catalogs.default`, pero no ambos. La migración conserva la forma existente y nunca crea la otra forma a su lado.
- Cuando un catálogo nombrado existente ya posee `vite-plus`, `vite` o `vitest`, la migración reutiliza ese catálogo de herramientas gestionado para las dependencias y sobrescrituras recién agregadas. Crea un catálogo predeterminado de nivel superior solo cuando no se puede reutilizar ningún catálogo gestionado o predeterminado.

**Otras reglas.**

- Cada paquete que declara `vite-plus` también obtiene una dependencia de desarrollo directa de `vite` (ver [Vite y Sobrescrituras](#vite-y-sobrescrituras)).
- Se conservan las sobrescrituras no relacionadas con formas de selectores y con valores de objeto.

### npm

- Los alias directos se normalizan antes de agregar la sobrescritura correspondiente, por lo que npm no falla con `EOVERRIDE`.
- Cuando una instalación real de Vite cambia al alias de core, el estado de instalación y lockfile de Vite obsoleto se elimina antes de volver a instalar.
- Los diseños de proveedores de navegadores opt-in obtienen una relación `vite` de nivel superior cuando los paquetes anidados de Vitest de otro modo no pueden resolverla.

### Yarn

- Vite+ no admite Plug'n'Play. La migración detecta PnP explícito e implícito y convierte el proyecto a `nodeLinker: node-modules`, conservando todas las configuraciones no relacionadas de `.yarnrc.yml`. `--no-interactive` acepta la conversión; un proceso con `YARN_NODE_LINKER=pnp` debe ser corregido por el usuario que invoca el comando.
- Se conservan las referencias de catálogos y las configuraciones de hoisting del usuario.
- La migración evita copias de Vitest divididas bajo el aislamiento de hoisting del workspace: aplica una corrección a nivel de paquete donde sea posible y advierte cuando el aislamiento no se puede cambiar de forma segura.

### Bun

- Los catálogos de Bun solo se resuelven dentro de un workspace (un `package.json` raíz con un campo `workspaces` no vacío). En un workspace de bun, se conservan las ubicaciones de catálogo de nivel superior o de workspace existentes y las referencias de catálogos nombrados. Un proyecto bun independiente (de un solo paquete) conserva las especificaciones concretas y no obtiene ningún campo de catálogo, porque `bun install` no puede resolver `catalog:` fuera de un workspace.
- El alias core se refleja como una dependencia directa de `vite` para que Bun vea el proveedor de pares antes de aplicar las sobrescrituras.

## Después de la Migración

- Cada configuración de Vite se inspecciona en busca de patrones incompatibles con Rolldown (como `manualChunks`). Cualquier cosa encontrada se reporta como una advertencia; la configuración no se modifica.
- Las dependencias se vuelven a instalar una vez para actualizar el lockfile. Si la instalación falla, la migración reporta el error y sale con un estado diferente de cero.
- Después de una migración exitosa, se ejecuta `vp fmt` en los archivos cambiados durante la migración, excluyendo las rutas que ya estaban modificadas (dirty) en el árbol de trabajo de Git (Git worktree). Oxfmt selecciona los formatos compatibles; los proyectos que no usan Git conservan la formación de formato en todo el proyecto. El formateo se omite mientras el proyecto siga usando Prettier. Un fallo del formateador se reporta como una advertencia para que el resultado de la migración y el comando de formateo manual sigan estando disponibles.
