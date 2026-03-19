<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="/logo.svg">
  <img alt="Vite+" src="/logo.svg">
</picture>

**El Toolchain Unificado para la Web**
_gestión del entorno de ejecución y de paquetes, creación, desarrollo, comprobación, pruebas, construcción, empaquetado y caché de tareas de monorepos en una sola dependencia_

---

Vite+ es el punto de entrada unificado para el desarrollo web local. Combina [Vite](https://vite.dev/), [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Rolldown](https://rolldown.rs/), [tsdown](https://tsdown.dev/) y [Vite Task](https://github.com/voidzero-dev/vite-task) en un solo toolchain sin configuración que también gestiona los flujos de trabajo del entorno de ejecución y del gestor de paquetes:

- **`vp env`:** Gestiona Node.js globalmente y por proyecto.
- **`vp install`:** Instala dependencias con detección automática del gestor de paquetes.
- **`vp dev`:** Ejecuta el servidor de desarrollo nativo ESM rápido de Vite con HMR instantáneo.
- **`vp check`:** Ejecuta el formateo, lint y comprobaciones de tipos en un solo comando.
- **`vp test`:** Ejecuta pruebas a través del Vitest integrado.
- **`vp build`:** Construye aplicaciones para producción con Vite + Rolldown.
- **`vp run`:** Ejecuta tareas de monorepos con caché y programación consciente de las dependencias.
- **`vp pack`:** Construye librerías para publicar en npm o binarios de aplicaciones independientes.
- **`vp create` / `vp migrate`:** Crea nuevos proyectos o migra los existentes.

Todo esto se configura desde la raíz de tu proyecto y funciona en todo el ecosistema de frameworks de Vite.
Vite+ es totalmente de código abierto bajo la licencia MIT.

## Primeros Pasos

Instala Vite+ globalmente como `vp`:

Para Linux o macOS:

```bash
curl -fsSL https://vite.plus | bash
```

Para Windows:

```bash
irm https://viteplus.dev/install.ps1 | iex
```

`vp` maneja todo el ciclo de vida del desarrollo, como la gestión de paquetes, servidores de desarrollo, linting, formateo, pruebas y construcción para producción.

## Configurando Vite+

Vite+ se puede configurar usando un único archivo `vite.config.ts` en la raíz de tu proyecto:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Configuración estándar de Vite para dev/build/preview.
  plugins: [],

  // Configuración de Vitest.
  test: {
    include: ['src/**/*.test.ts'],
  },

  // Configuración de Oxlint.
  lint: {
    ignorePatterns: ['dist/**'],
  },

  // Configuración de Oxfmt.
  fmt: {
    semi: true,
    singleQuote: true,
  },

  // Configuración de Vite Task.
  run: {
    tasks: {
      'generate:icons': {
        command: 'node scripts/generate-icons.js',
        envs: ['ICON_THEME'],
      },
    },
  },

  // Configuración de `vp staged`.
  staged: {
    '*': 'vp check --fix',
  },
});
```

Esto te permite mantener la configuración de tu servidor de desarrollo, construcción, pruebas, lint, formato, ejecutor de tareas y flujo de trabajo de archivos preparados en un solo lugar con una configuración segura (type-safe) y valores predeterminados compartidos.

Usa `vp migrate` para migrar a Vite+. Fusiona archivos de configuración específicos de herramientas como `.oxlintrc*`, `.oxfmtrc*` y la configuración de lint-staged en `vite.config.ts`.

### Flujos de trabajo de la CLI (`vp help`)

#### Inicio

- **create** - Crea un nuevo proyecto desde una plantilla
- **migrate** - Migra un proyecto existente a Vite+
- **config** - Configura hooks e integración con agentes
- **staged** - Ejecuta linters en archivos preparados (staged)
- **install** (`i`) - Instala dependencias
- **env** - Gestiona versiones de Node.js

#### Desarrollo

- **dev** - Ejecuta el servidor de desarrollo
- **check** - Ejecuta comprobaciones de formato, lint y tipos
- **lint** - Analiza el código (lint)
- **fmt** - Formatea el código
- **test** - Ejecuta las pruebas

#### Ejecución

- **run** - Ejecuta tareas de monorepo
- **exec** - Ejecuta un comando desde el `node_modules/.bin` local
- **dlx** - Ejecuta un binario de paquete sin instalarlo como dependencia
- **cache** - Gestiona la caché de tareas

#### Construcción

- **build** - Construye para producción
- **pack** - Construye librerías
- **preview** - Previsualiza la construcción de producción

#### Gestión de Dependencias

Vite+ envuelve automáticamente tu gestor de paquetes (pnpm, npm o Yarn) basándose en `packageManager` y los archivos de bloqueo (lockfiles):

- **add** - Añade paquetes a las dependencias
- **remove** (`rm`, `un`, `uninstall`) - Elimina paquetes de las dependencias
- **update** (`up`) - Actualiza paquetes a las últimas versiones
- **dedupe** - Deduplica dependencias
- **outdated** - Comprueba paquetes desactualizados
- **list** (`ls`) - Lista los paquetes instalados
- **why** (`explain`) - Muestra por qué está instalado un paquete
- **info** (`view`, `show`) - Ver metadatos del paquete desde el registro
- **link** (`ln`) / **unlink** - Gestiona enlaces de paquetes locales
- **pm** - Reenvía un comando al gestor de paquetes

#### Mantenimiento

- **upgrade** - Actualiza el propio `vp` a la última versión
- **implode** - Elimina `vp` y todos los datos relacionados

### Creando tu primer proyecto Vite+

Usa `vp create` para crear un nuevo proyecto:

```bash
vp create
```

Puedes ejecutar `vp create` dentro de un proyecto para añadir nuevas aplicaciones o librerías.

### Migrar un proyecto existente

Puedes migrar un proyecto existente a Vite+:

```bash
vp migrate
```

### GitHub Actions

Usa la acción oficial [`setup-vp`](https://github.com/voidzero-dev/setup-vp) para instalar Vite+ en GitHub Actions:

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '22'
    cache: true
```

#### Instalación y Migración Manual

Si estás migrando manualmente un proyecto a Vite+, instala primero estas dependencias de desarrollo:

```bash
npm install -D vite-plus @voidzero-dev/vite-plus-core@latest
```

Necesitas añadir sobrescrituras (overrides) en tu gestor de paquetes para `vite` y `vitest` para que otros paquetes que dependan de ellos usen las versiones de Vite+:

```json
"overrides": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "npm:@voidzero-dev/vite-plus-test@latest"
}
```

Si usas `pnpm`, añade esto a tu `pnpm-workspace.yaml`:

```yaml
overrides:
  vite: npm:@voidzero-dev/vite-plus-core@latest
  vitest: npm:@voidzero-dev/vite-plus-test@latest
```

O, si usas Yarn:

```json
"resolutions": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "npm:@voidzero-dev/vite-plus-test@latest"
}
```
