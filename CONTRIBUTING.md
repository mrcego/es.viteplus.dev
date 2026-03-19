# Guía de Contribución

## Configuración Inicial

### macOS / Linux

Necesitarás las siguientes herramientas instaladas en tu sistema:

```
brew install pnpm node just cmake
```

Instala Rust & Cargo usando rustup:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install cargo-binstall
```

Configuración inicial para instalar las dependencias de Vite+:

```
just init
```

### Windows

Necesitarás las siguientes herramientas instaladas en tu sistema. Puedes usar [winget](https://learn.microsoft.com/es-es/windows/package-manager/).

```powershell
winget install pnpm.pnpm OpenJS.NodeJS.LTS Casey.Just Kitware.CMake
```

Instala Rust & Cargo desde [rustup.rs](https://rustup.rs/), luego instala `cargo-binstall`:

```powershell
cargo install cargo-binstall
```

Configuración inicial para instalar las dependencias de Vite+:

```powershell
just init
```

**Nota:** Ejecuta los comandos en PowerShell o Windows Terminal. Algunos comandos pueden requerir permisos elevados.

## Construir Vite+ y las dependencias de origen

Para crear una construcción de lanzamiento (release) de Vite+ y todas sus dependencias de origen, ejecuta:

```
just build
```

## Instalar la CLI Global de Vite+ desde el código fuente

```
pnpm bootstrap-cli
vp --version
```

Esto construye todos los paquetes, compila el binario `vp` en Rust e instala la CLI en `~/.vite-plus`.

## Flujo de trabajo para construcción y pruebas

Puedes ejecutar este comando para construir, probar y comprobar si hay cambios en los snapshots:

```
pnpm bootstrap-cli && pnpm test && git status
```

## Ejecución de Pruebas de Snapshot (Snap Tests)

Las pruebas de snapshot verifican la salida de la CLI. Se encuentran en `packages/cli/snap-tests/` (CLI local) y `packages/cli/snap-tests-global/` (CLI global).

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

Las pruebas de snapshot generan automáticamente archivos `snap.txt`. Revisa `git diff` para verificar que los cambios en la salida sean correctos.

## Commits Verificados

Todos los commits en las ramas de PR deben estar verificados por GitHub para que los revisores puedan confirmar su autenticidad.

Configura primero la firma de commits local y la verificación de GitHub:

- Sigue la guía de GitHub para la verificación de firmas de commits con GPG: https://docs.github.com/es/authentication/managing-commit-signature-verification/about-commit-signature-verification#gpg-commit-signature-verification
- Si usas Graphite, añade también la clave GPG de Graphite a tu cuenta de GitHub desde la interfaz de Graphite, de lo contrario los commits actualizados por Graphite no aparecerán como verificados.

Después de la configuración, vuelve a firmar cualquier commit existente en tu rama para que toda la rama esté verificada:

```bash
# Volver a firmar cada commit en tu rama (reemplaza origin/main con la base de tu rama si es necesario)
git rebase -i origin/main
# En cada parada:
git commit --amend --date=now --no-edit -S
# Luego continúa:
git rebase --continue
```

Cuando termines, fuerza el envío (force-push) del historial de la rama actualizada:

```bash
git push --force-with-lease
```

## Actualizar dependencias de origen

> [!NOTE]
> 
> Las dependencias de origen solo necesitan actualizarse cuando se fusiona un pull request de ["upgrade upstream dependencies"](https://github.com/voidzero-dev/vite-plus/pulls?q=is%3Apr+feat%28deps%29%3A+upgrade+upstream+dependencies+merged).

Para sincronizar las últimas dependencias de origen como Rolldown y Vite, ejecuta:

```
pnpm tool sync-remote
just build
```

## Consejo de Rendimiento para macOS

Si usas macOS, añade tu aplicación de terminal (Ghostty, iTerm2, Terminal, …) a las aplicaciones aprobadas de "Herramientas de Desarrollador" en el panel de Privacidad de Ajustes del Sistema y reinicia tu terminal. Tus construcciones de Rust serán aproximadamente un 30% más rápidas.
