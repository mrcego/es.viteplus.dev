# Vite-Plus

Un ejecutor de tareas para monorepos (como nx/turbo) con caché inteligente y resolución de dependencias.

## Concepto Central

**Ejecución de Tareas**: Ejecuta tareas en los paquetes del monorepo con orden de dependencias automático.

```bash
# Comandos integrados
vp build                           # Ejecuta Vite build (comando dedicado)
vp test                            # Ejecuta Vitest (comando dedicado)
vp lint                            # Ejecuta oxlint (comando dedicado)

# Ejecutar tareas en los paquetes (modo explícito)
vp run build -r                    # recursivo con orden topológico
vp run app#build web#build         # paquetes específicos
vp run build -r --no-topological   # recursivo sin dependencias implícitas

# Ejecutar tarea en el paquete actual (modo implícito - para tareas no integradas)
vp run dev                         # ejecuta el script dev de package.json
```

## Arquitectura Clave

- **Entrada**: `crates/vite_task/src/lib.rs` - Análisis de CLI y lógica principal.
- **Workspace**: `crates/vite_task/src/config/workspace.rs` - Carga paquetes, crea el grafo de tareas.
- **Grafo de Tareas**: `crates/vite_task/src/config/task_graph_builder.rs` - Construye el grafo de dependencias.
- **Ejecución**: `crates/vite_task/src/schedule.rs` - Ejecuta tareas en orden de dependencia.

## Dependencias de Tareas

1. **Explícitas** (siempre aplicadas): Definidas en `vite-task.json`.

   ```json
   {
     "tasks": {
       "test": {
         "command": "jest",
         "dependsOn": ["build", "lint"]
       }
     }
   }
   ```

2. **Implícitas** (con `--topological`): Basadas en las dependencias de `package.json`.
   - Si A depende de B, entonces `A#build` depende automáticamente de `B#build`.

## Características Clave

- **Flag Topológico**: Controla las dependencias implícitas de las relaciones entre paquetes.
  - Predeterminado: ACTIVADO para `--recursive`, DESACTIVADO en caso contrario.
  - Cambia con `--no-topological` para desactivarlo.

- **Flags Booleanos**: Todos admiten el patrón `--no-*` para desactivación explícita.
  - Ejemplo: `--recursive` vs `--no-recursive`.
  - Conflictos gestionados por `clap`.
  - Si quieres añadir un nuevo flag booleano, sigue este patrón.

## Sistema de Tipos de Rutas

- **Seguridad de Tipos**: Todas las rutas usan el tipo `vite_path` en lugar de `std::path` para mayor seguridad.
  - **Rutas Absolutas**: `vite_path::AbsolutePath` / `AbsolutePathBuf`.
  - **Rutas Relativas**: `vite_path::RelativePath` / `RelativePathBuf`.

- **Guías de Uso**:
  - Usa los métodos como `strip_prefix`/`join` proporcionados en `vite_path` para operaciones de rutas en lugar de convertirlos a rutas `std`.
  - Solo convierte a rutas `std` cuando interactúes con funciones de la biblioteca estándar, lo cual debería ser implícito en la mayoría de los casos gracias a las implementaciones `AsRef<Path>`.
  - Añade los métodos necesarios en `vite_path` en lugar de recurrir a los tipos de rutas `std`.

- **Convertir desde rutas std** (ej. `TempDir::path()`):

  ```rust
  let temp_path = AbsolutePathBuf::new(temp_dir.path().to_path_buf()).unwrap();
  ```

- **Firmas de funciones**: Prefiere `&AbsolutePath` sobre `&std::path::Path`.

- **Pasar a funciones std**: `AbsolutePath` implementa `AsRef<Path>`, usa `.as_path()` cuando se requiera un `&Path` explícito.

## Reglas de Clippy

Todo el código Rust **nuevo** debe seguir las reglas personalizadas de clippy definidas en `.clippy.toml` (tipos, macros y métodos no permitidos). Es posible que el código existente no cumpla totalmente por razones históricas.

## Salida de la CLI

Toda la salida orientada al usuario debe pasar por módulos de salida compartidos en lugar de llamadas directas de impresión.

- **Rust**: Usa las funciones de `vite_shared::output` (`info`, `warn`, `error`, `note`, `success`) — nunca `println!`/`eprintln!` directamente (forzado por `disallowed-macros` de clippy).
- **TypeScript**: Usa las funciones de `packages/cli/src/utils/terminal.ts` (`infoMsg`, `warnMsg`, `errorMsg`, `noteMsg`, `log`) — nunca `console.log`/`console.error` directamente.

## Flujo de Trabajo de Git

- Ejecuta `vp check --fix` antes de hacer commit para formatear y analizar el código.

## Referencia Rápida

- **Comandos Compuestos**: `"build": "tsc && rollup"` se divide en subtareas.
- **Formato de Tarea**: `paquete#tarea` (ej. `app#build`).
- **Tipos de Rutas**: Usa tipos de `vite_path` en lugar de `std::path` para seguridad de tipos.
- **Pruebas**: Ejecuta `cargo test -p vite_task` para verificar los cambios.
- **Depuración**: Usa `--debug` para ver las operaciones de caché.

## Pruebas

- Ejecuta `cargo test` para ejecutar todas las pruebas.
- Nunca necesitas ejecutar `pnpm install` en el directorio de fixtures de prueba; `vite-plus` debería ser capaz de cargar y analizar el workspace sin `pnpm install`.

## Construcción

- Ejecuta `pnpm bootstrap-cli` desde la raíz del proyecto para construir todos los paquetes e instalar la CLI global.
  - Esto construye todos los paquetes `@voidzero-dev/*` y `vite-plus`.
  - Compila los bindings NAPI de Rust y el binario Rust `vp`.
  - Instala la CLI globalmente en `~/.vite-plus/`.

## Pruebas de Snapshot

Las pruebas de snapshot se encuentran en `packages/cli/snap-tests/` (CLI local) y `packages/cli/snap-tests-global/` (CLI global). Cada caso de prueba es un directorio que contiene:

- `package.json` - Configuración del paquete para la prueba.
- `steps.json` - Comandos a ejecutar y variables de entorno.
- `src/` - Archivos fuente para la prueba.
- `snap.txt` - Salida esperada (generada/actualizada al ejecutar la prueba).

```bash
# Ejecutar todas las pruebas de snapshot (local + global)
pnpm -F vite-plus snap-test

# Ejecutar solo las pruebas de snapshot de la CLI local
pnpm -F vite-plus snap-test-local
pnpm -F vite-plus snap-test-local <filtro-de-nombre>

# Ejecutar solo las pruebas de snapshot de la CLI global
pnpm -F vite-plus snap-test-global
pnpm -F vite-plus snap-test-global <filtro-de-nombre>
```

La prueba de snapshot generará/actualizará automáticamente el archivo `snap.txt` con las salidas de los comandos. Finaliza con estado cero incluso si hay diferencias en la salida; debes comprobar manualmente los cambios (`git diff`) para verificar que sean correctos.
