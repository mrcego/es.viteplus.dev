# Actualizar a Vitest 5

Vite+ incluye Vitest `5.0.4`. Usa Node `^22.18.0 || ^24.11.0 || >=26.0.0` para la CLI y las pruebas.

## Antes de migrar

Ejecuta `vp migrate` desde la raíz del workspace antes de actualizar dependencias manualmente. Mantén el lockfile original y los paquetes instalados disponibles para que la migración pueda identificar la versión de origen de Vitest, incluyendo el ejecutor dentro de una instalación más antigua de `vite-plus`.

Actualiza los proyectos anteriores a Vitest 4 a la versión v4 antes de ejecutar esta migración. Si no se puede determinar la versión original, restaura e instala el lockfile original y luego vuelve a ejecutar `vp migrate`.

```bash
vp migrate
vp install
vp check
vp test
```

Lee el reporte de revisión específico de cada archivo antes de hacer commit del resultado. La migración se detiene antes de las actualizaciones de dependencias si hay ajustes conflictivos en `test.api` y `test.browser.api`, o si hay APIs de runtime eliminadas sin un reemplazo compatible. Resuelve estos bloqueadores y ejecuta el comando nuevamente. Puedes finalizar ediciones seguras con un estado de salida exitoso mientras permanezcan elementos de revisión.

Puedes mantener valores estáticos equivalentes de `test.api` y `test.browser.api`, incluidos objetos con diferente orden de propiedades o estilos de comillas. La migración elimina el `browser.api` redundante. Elige una configuración para valores conflictivos o expresiones que requieran evaluación; v5 utiliza un único servidor de API.

## Runtime de Node

La migración actualiza las versiones fijadas (pins) de runtime incompatibles al mínimo admitido más cercano antes de instalar las dependencias. Por ejemplo, `20.19.0` se convierte en `22.18.0`, `24.10.0` se convierte en `24.11.0`, y `25.9.0` se convierte en `26.0.0`. Las versiones fijadas compatibles se mantienen sin cambios. Los selectores no resueltos aún requieren revisión.

Mantén el contrato público `engines.node` de tu biblioteca separado del runtime de pruebas. La migración no cambia ese contrato. No necesitas revisar un rango de motores con un mínimo compatible, como `>=22.19.0`, o una versión mayor compatible completa, como `24.x`. Usa una versión de runtime concreta igual o superior al mínimo admitido para esa versión mayor.

Las comprobaciones de compatibilidad de Node cubren `.node-version`, `.nvmrc`, y las declaraciones `engines.node`, `devEngines.runtime` y `volta.node` en `package.json`. Las versiones de Node en flujos de trabajo de CI, contenedores y otros archivos están fuera del alcance de estas comprobaciones.

## Preservar el comportamiento existente

Las compilaciones de vista previa enlazan al sitio de documentación de la PR para la guía de Vite+. Las compilaciones de versión final utilizan `viteplus.dev`. Los enlaces a la documentación original de Vitest se mantienen iguales.

Para las configuraciones v4, la migración agrega ajustes de compatibilidad cuando omitiste la opción correspondiente. Los ajustes explícitos tienen prioridad. Junto a cada ajuste agregado, obtendrás un comentario con el motivo, orientación para adoptar el comportamiento de v5 y enlaces a la lista de verificación de limpieza y a la guía de migración de Vitest:

```ts
test: {
  // Vitest v4 compatibility: preserve mock call history.
  // Remove after tests no longer rely on calls from setup or earlier tests.
  // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
  // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
  clearMocks: false,
}
```

| Ajuste agregado                                                                                                             | Comportamiento a verificar antes de eliminarlo                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [`test.clearMocks: false`](https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default)                            | Verifica las aserciones que dependan de llamadas a mocks desde setup, `beforeAll`, o pruebas anteriores. V5 limpia ese historial antes de cada prueba. |
| [`test.sharedViteServer: false`](https://vitest.dev/guide/migration/#inline-projects-share-the-vite-server-by-default)      | Verifica plugins y hooks de configuración con un servidor compartido. V5 los inicializa una vez para proyectos inline aptos.            |
| [Inline `extends: false`](https://vitest.dev/guide/migration/#inline-projects-inherit-the-root-config-by-default)           | Verifica opciones de raíz heredadas, plugins y archivos de setup. V5 fusiona arreglos, así que evita configuraciones duplicadas.        |
| [`browser.locators.exact: false`](https://vitest.dev/guide/migration/#locators-are-strict-by-default)                       | Actualiza los localizadores para coincidencias exactas con distinción de mayúsculas/minúsculas, o desactívalo en localizadores individuales.  |
| [Umbral de glob `perFile: true`](https://vitest.dev/guide/migration/#glob-coverage-thresholds-no-longer-inherit-perfile)    | Mantenlo para comprobación de cobertura por archivo. Elimínalo para comprobar los archivos coincidentes como grupo.                    |
| [`fakeTimers.toNotFake: ['Temporal']`](https://vitest.dev/guide/migration/#fake-timers-and-setsystemtime-now-mock-temporal) | Verifica las pruebas que utilicen el polyfill global de Temporal con temporizadores falsos. Elimina solo `Temporal` para usar tiempo simulado; conserva otras exclusiones. |

Los nuevos proyectos utilizan los valores predeterminados de v5. Es posible que puedas eliminar algunos ajustes de compatibilidad generados sin cambios en el código o mediante correcciones pequeñas y localizadas. Sigue las comprobaciones a continuación antes de eliminarlos. Estas opciones siguen siendo compatibles en v5; mantén la compatibilidad por ahora si la eliminación requiere cambios extensos en las pruebas.

La migración deja tus ajustes y comentarios existentes intactos. No agrega comentarios a ajustes de una migración anterior, ya que no puede distinguir esos ajustes de tus propias elecciones. Las ejecuciones repetidas no duplican comentarios ni restauran comentarios que hayas eliminado.

Si tu proyecto no tiene configuración de pruebas, puedes usar los valores predeterminados de v5 sin un aviso de revisión ni una nueva configuración de compatibilidad. Otros pasos de migración, como fusionar la configuración de lint, pueden crear `vite.config.ts`; los ajustes de compatibilidad con v4 se aplican a esa nueva configuración durante la misma migración.

Después de actualizar a v5, puedes volver a ejecutar `vp migrate` sin volver a aplicar los valores predeterminados de compatibilidad de v4, incluso en proyectos sin configuración. Termina la instalación de dependencias antes de volver a ejecutar la migración.

Resuelve o guarda el reporte de revisión de la primera ejecución antes de descartar las dependencias originales. Las ejecuciones posteriores utilizan la versión y los archivos actuales de Vitest, por lo que es posible que no repitan revisiones que dependían del comportamiento original de v4.

### Eliminar ajustes de compatibilidad innecesarios {#eliminar-ajustes-de-compatibilidad-innecesarios}

Primero, valida el proyecto migrado con sus ajustes de compatibilidad intactos. Luego, usa el diff de migración y los comentarios `Vitest v4 compatibility` para identificar las adiciones en las configuraciones raíz, de workspace y de proyectos inline. Deja sin cambios las configuraciones preexistentes del usuario y las configuraciones con un origen no claro.

Elimina un ajuste agregado a la vez. Comprueba qué valor utiliza el proyecto tras la eliminación, incluyendo opciones heredadas, plugins y archivos de configuración inicial (setup). Primero ejecuta las suites afectadas sin cambios en el código. Incluye ejecuciones de navegador y cobertura cuando corresponda; una suite de Node exitosa no valida localizadores de navegador. Para `fakeTimers.toNotFake`, elimina únicamente la entrada `Temporal` agregada y conserva las demás exclusiones.

Puedes realizar correcciones pequeñas y localizadas en la aplicación, pruebas o setup que preserven la intención de la prueba, como corregir un localizador o ajustar la configuración de mocks en algunas pruebas. Mantén intactas las aserciones y la cobertura de pruebas, y revisa cualquier cambio en las instantáneas (snapshots). Si la eliminación requiere modificaciones generalizadas en las pruebas o refactorizar la configuración compartida, mantén la compatibilidad por ahora y registra el trabajo de seguimiento pendiente.

Conserva una eliminación si las pruebas afectadas pasan, ejecutan el mismo conjunto de pruebas sin nuevas omisiones y admiten el comportamiento resultante. Elimina también su comentario generado. Restaura el ajuste y el comentario si la validación sigue fallando, las suites requeridas no se pueden ejecutar o el resultado sigue siendo incierto. Deshaz únicamente las modificaciones de prueba específicas de la limpieza; conserva las correcciones de migración completadas y el trabajo no relacionado. Distingue una reescritura aplazada de un ajuste que no pudiste validar.

Que las pruebas pasen no demuestra que la exigencia de cobertura no haya cambiado. Conserva los ajustes generados `perFile: true` para umbrales de glob a menos que tengas la intención de cambiar de umbrales por archivo a comprobación agregada. Un agente debe solicitar tu aprobación para ese cambio. Consulta la [migración de umbrales de cobertura de Vitest](https://vitest.dev/guide/migration/#glob-coverage-thresholds-no-longer-inherit-perfile).

Tras las comprobaciones individuales, ejecuta la suite de validación completa con las eliminaciones aceptadas en conjunto. Informa la ruta de configuración, la decisión de eliminación, los cambios de código, los comandos y resultados de validación, y cualquier trabajo restante para cada candidato. Si conservas una opción como una elección del proyecto, reemplaza su comentario de compatibilidad por ese motivo.

## Cambios en el código fuente

La migración utiliza sintaxis y vinculaciones de importación para ediciones dirigidas. Recibirás un elemento de revisión para opciones dinámicas, envoltorios ambiguos o una función callback cuyo contrato no pueda aceptar `async`.

```ts
// Antes
test.sequential('result', () => {
  expect(result).resolves.toBe(42);
});

// Después
test('result', { concurrent: false }, async () => {
  await expect(result).resolves.toBe(42);
});
```

En pruebas de navegador, usa `toMatchTextContent` para aserciones de cadenas y expresiones regulares de v4. El comparador de cadenas de v4 aceptaba texto parcial, por lo que un texto idéntico en un archivo de prueba no demuestra que tuvieras la intención de requerir la coincidencia exacta de v5. Elige `toHaveTextContent` tú mismo si deseas la nueva semántica.

Mantén las aserciones de `@testing-library/jest-dom` para Node sin cambios. En un paquete mixto de Node/navegador, la migración comprueba la pertenencia estática al proyecto antes de renombrar un comparador. Debes revisar archivos compartidos, configuraciones dinámicas y modificaciones del navegador por línea de comandos. Las llamadas mediante `expect.element()` identifican aserciones de navegador sin esa ambigüedad.

Usa `await` con `render` de `vitest-browser-vue` y `vitest-browser-svelte` antes de consultar su resultado. Reemplaza `toThrow('')` y `toThrowError('')` por `/^$/` para mantener las aserciones de un mensaje vacío.

Para la carga programática de configuración, reemplaza la desestructuración de `{ viteConfig, vitestConfig }` con el valor de retorno de `resolveConfig()` y su propiedad `.test`. Los comandos directos migrados de `vitest list` reciben `--no-static-parse`; las llamadas compatibles a `Vitest.collect(filters, options)` reciben `{ staticParse: false }`. Mantén una elección explícita de análisis estático si deseas la recolección estática de v5.

## Benchmarks

Usa llamadas directas a `bench` con callbacks en línea sin argumentos o referencias a funciones locales sin modificar. Puedes utilizar nombres dinámicos; la migración los captura una vez durante el registro. Conserva el callback de la carga de trabajo y lo ejecuta a través de la fixture `bench` de v5 dentro de una prueba. Las llamadas simples `bench.skip`, `bench.only` y `bench.todo` se convierten en los modificadores de prueba correspondientes. Las llamadas dentro de callbacks normales de `describe` y `suite` conservan sus ámbitos circundantes.

```ts
// Antes
import { bench } from 'vitest';
bench('parse', () => JSON.parse('{"value":1}'));

// Después
import { test } from 'vitest';
test('parse', async ({ bench }) => {
  await bench('parse', () => JSON.parse('{"value":1}')).run();
});
```

Mantén los archivos de benchmark que coincidan con `benchmark.include`. Los comandos `vitest bench` y `vp test bench` continúan siendo compatibles. La migración no los elimina.

## Puntos de entrada y paquetes

Vite+ reexporta las utilidades del ejecutor de pruebas a través de `vite-plus/test`. Los paquetes originales de Vitest continúan funcionando; la migración conserva las importaciones directas de paquetes mientras existan declaraciones en `package.json`.

`vite-plus/test` incluye la API completa de Vitest, los tipos de aserción y los tipos de configuración. Utilízalo para mantener tus pruebas alineadas con el ejecutor incluido en Vite+.

## Proveedor comunitario de WebDriverIO {#proveedor-comunitario-de-webdriverio}

Vitest 5 transfirió el soporte del navegador WebDriverIO al paquete mantenido por la comunidad `@vitest/browser-webdriverio`. Para proyectos que utilizan WebDriverIO para pruebas de navegador:

1. Instala `@vitest/browser-webdriverio` con una versión de al menos `5.0.0`.
2. Actualiza la configuración de tu navegador en `vite.config.ts`:

```ts
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'webdriverio',
    },
  },
});
```

La migración maneja estas actualizaciones automáticamente cuando detecta configuraciones existentes de WebDriverIO.

## Reportes y capturas de pantalla

Si consumes reportes generados o artefactos fuera de Vitest, verifica estas rutas. Mantén las entradas antiguas en ignore mientras queden archivos en esos directorios. La migración agrega `.vitest/` a `.gitignore` sin eliminar las entradas antiguas.

| Salida              | Valor predeterminado v4       | Valor predeterminado v5                    |
| ------------------- | ----------------------------- | ------------------------------------------ |
| Adjuntos            | `.vitest-attachements/`       | `.vitest/attachments/`                     |
| Capturas de error   | `__screenshots__/`            | `.vitest/attachments/failure-screenshots/` |
| Reportes blob       | `.vitest-reports/blob-*.json` | `.vitest/blob/blob-*.json`                 |
| HTML                | `html/index.html`             | `.vitest/index.html`                       |
| JSON                | stdout                        | `.vitest/json/output.json`                 |
| JUnit               | stdout                        | `.vitest/junit/output.xml`                 |

Las opciones del reportero HTML ahora usan `outputDir` en lugar del `outputFile` que aceptaba un archivo. Configura `outputDir` tú mismo si necesitas un destino personalizado. Otros reporteros conservan el soporte de `outputFile`. Consulta los [cambios de reportes en la versión upstream](https://vitest.dev/guide/migration/#generated-reports-and-artifacts-use-the-vitest-directory).

Copia un `browser.screenshotDirectory` personalizado a `browser.expect.toMatchScreenshot.screenshotDirectory`. Revisa las imágenes de referencia antes de moverlas o regenerarlas; v4 podía guardarlas en una ubicación no deseada. El directorio de capturas de pantalla de referencia predeterminado sigue siendo `__screenshots__`.

## Resolver hallazgos de migración

Cada elemento de `BLOCK` o `REVIEW` de Vitest v5 incluye un enlace a la documentación (`Docs`). Sigue el enlace para ver el cambio de API relevante o la regla de migración correspondiente. Un bloqueador detiene las actualizaciones de dependencias; un elemento de revisión requiere que verifiques el resultado pero no detiene las ediciones seguras.

Para configuraciones dinámicas o archivos compartidos, determina los ajustes efectivos del proyecto de Vitest antes de editar. Resuelve funciones de configuración, spreads y herencia externa, o realiza los cambios de compatibilidad a mano. Confirma qué ejecutor es dueño de las variables globales no importadas en un proyecto con múltiples ejecutores.

Para fallos del analizador sintáctico o ediciones superpuestas, conserva el archivo original y aplica el cambio documentado manualmente. Ejecuta `vp migrate` nuevamente tras resolver el problema. Una salida exitosa aún puede incluir elementos de revisión; conserva ese reporte hasta que finalices los cambios manuales.

## Lista de verificación de revisión

Usa las ubicaciones de archivos en el reporte de migración para revisar estos cambios. Ejecuta suites de navegador y de cobertura, así como pruebas de Node.

Para tipos de comparadores de jest-dom, carga `@testing-library/jest-dom/vitest` en `compilerOptions.types` o impórtalo desde un archivo de configuración de TypeScript que incluya tu `tsconfig.json`. La entrada de tipo raíz de `@testing-library/jest-dom` amplía Jest. Un archivo de configuración de JavaScript excluido por `allowJs: false` no carga la ampliación de Vitest para la comprobación de tipos. Revisa las configuraciones compartidas de Jest/Vitest antes de cambiar sus entradas de tipo.

Con `vitest@5.0.1`, cargar primero las declaraciones del navegador también puede hacer que TypeScript rechace aserciones válidas de jest-dom para Node: `toHaveTextContent(/pattern/)` y propiedades personalizadas de CSS en `toHaveStyle()`. Reprodujimos este conflicto tanto con importaciones upstream como con importaciones de Vite+. Tanto `@testing-library/jest-dom@6.9.1` como `7.0.1` lo reproducen. Verifica las declaraciones cargadas por el `tsconfig.json` de cada prueba; agregar la entrada de tipo de jest-dom sola podría no resolver el conflicto. Mantén el proyecto afectado en la versión basada en v4 hasta que los tipos de comparadores de Node y de navegador pasen comprobaciones separadas.

| Área                  | Revisión requerida                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Selección de pruebas  | Los nombres completos usan separadores `>`. Revisa los filtros de nombre que abarquen límites de suite; los filtros simples de un solo segmento no necesitan revisión.                  |
| Mocks elevados        | Mueve llamadas anidadas a `vi.mock`, `vi.unmock` y `vi.hoisted` al nivel superior después de verificar las variables capturadas.                                                    |
| Automocks de navegador| Los mocks sin factoría retienen valores predeterminados de mock. Elige `{ spy: true }` si necesitas implementaciones reales.                                                              |
| Mocks de constructor  | Verifica prototipos, métodos e `instanceof` para `vi.fn`, `vi.spyOn` y `mockImplementation`.                                                                                       |
| Benchmarks            | Revisa las llamadas a benchmarks que la migración no pudo convertir, grupos de comparación y opciones de reporte eliminadas. Conserva opciones admitidas como `benchmark.enabled` e `benchmark.include`. |
| Aserciones asíncronas | Usa `await` o retorna `resolves`, `rejects`, instantáneas de archivos, sondeos (polls) y aserciones de navegador. Revisa los tiempos de espera de `expect.poll` sin aumentarlos para ocultar fallos. |
| Tipos de comparadores | Actualiza declaraciones antiguas de `Assertion<T>`, `Matchers<T>` y `jest.Matchers` para parámetros de tipo retornados y recibidos.                                                  |
| Comandos de navegador | Acepta objetos `SerializedLocator` en lugar de cadenas de selector.                                                                                                                      |
| UI de navegador       | Usa las URLs impresas por Vitest, incluidos los tokens de UI y el `sessionId` del orquestador. Revisa capturas de pantalla con y sin interfaz (headed/headless) en viewports fijos.     |
| Configuración de proyecto | Verifica proyectos dinámicos, fusiones con la configuración raíz, proyectos anidados y hooks que asuman una ejecución de servidor o configuración por proyecto.                         |
| Recolección de pruebas| Revisa envoltorios de comandos dinámicos y llamadas programáticas a `collect()` cuyas opciones de análisis estático requieran ediciones manuales.                                         |
| Cobertura             | Compara conjuntos de archivos resueltos entre v4 y v5 para `coverage.include` y `coverage.exclude` configurados. La coincidencia por ruta relativa puede cambiar el conjunto medido.  |
| IDs de worker         | Revisa operaciones aritméticas e indexación basadas en `VITEST_POOL_ID` o `VITEST_WORKER_ID`; los IDs comienzan en 1.                                                                 |
| Entornos personalizados | Restaura entradas de `populateGlobal().originals` con `Object.defineProperty`; el mapa contiene descriptores.                                                                          |
| Variables globales DOM| Verifica asignaciones en pruebas con jsdom/happy-dom; las asignaciones globales también actualizan el objeto window.                                                                       |
| Temporal              | Revisa ámbitos que utilicen Temporal y `vi.setSystemTime()`. `toNotFake` no conserva el comportamiento sin temporizadores falsos.                                                      |
| APIs eliminadas       | Reemplaza importaciones no admitidas del ejecutor e internas antes de actualizar paquetes. Las referencias de solo tipos aún requieren revisión y comprobaciones de tipos.                 |

## Ejecutar debajo de un directorio de configuración

Vitest v5 ya no busca configuraciones en directorios padres. Desde un subdirectorio, pasa tanto la configuración padre como el directorio de prueba deseado:

```bash
vp test --config ../vite.config.ts --dir .
```

Consulta la [guía de migración de Vitest 5 original (upstream)](https://vitest.dev/guide/migration/) para ver ejemplos de API y el nuevo diseño de benchmarks.
