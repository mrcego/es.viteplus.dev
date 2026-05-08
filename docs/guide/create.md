# Crear un Proyecto

`vp create` estructura de forma interactiva nuevos proyectos, monorepos y aplicaciones de Vite+ dentro de workspaces existentes.

## Vista General

El comando `create` es la forma más rápida de empezar con Vite+. Se puede utilizar de varias formas distintas:

- Iniciar un nuevo monorepo de Vite+.
- Crear una nueva aplicación o librería independiente.
- Añadir una nueva aplicación o librería dentro de un proyecto existente.

Este comando se puede utilizar con plantillas integradas, plantillas de la comunidad o plantillas remotas de GitHub.

## Uso

```bash
vp create
vp create <plantilla>
vp create <plantilla> -- <opciones-de-la-plantilla>
```

## Plantillas Integradas

Vite+ incluye estas plantillas integradas:

- `vite:monorepo` crea un nuevo monorepo.
- `vite:application` crea una nueva aplicación.
- `vite:library` crea una nueva librería.
- `vite:generator` crea un nuevo generador.

## Fuentes de Plantillas

`vp create` no se limita a las plantillas integradas.

- Usa atajos para plantillas como `vite`, `@tanstack/start`, `svelte`, `next-app`, `nuxt`, `react-router` y `vue`.
- Usa nombres completos de paquetes como `create-vite` o `create-next-app`.
- Usa plantillas locales como `./tools/create-ui-component` o `@acme/generator-*`.
- Usa plantillas remotas como `github:usuario/repo` o `https://github.com/usuario/template-repo`.

Ejecuta `vp create --list` para ver las plantillas integradas y los atajos comunes que reconoce Vite+.

## Opciones

- `--directory <dir>` escribe el proyecto generado en un directorio de destino específico.
- `--agent <nombre>` crea archivos de instrucciones para agentes durante la creación.
- `--editor <nombre>` escribe archivos de configuración del editor.
- `--hooks` habilita la configuración de hooks de pre-commit.
- `--no-hooks` omite la configuración de hooks.
- `--no-interactive` se ejecuta sin preguntas.
- `--verbose` muestra una salida detallada de la creación.
- `--list` imprime las plantillas integradas y populares disponibles.

## Opciones de Plantilla

Los argumentos después de `--` se pasan directamente a la plantilla seleccionada.

Esto es importante cuando la propia plantilla acepta parámetros. Por ejemplo, puedes pasar la selección de plantilla de Vite así:

```bash
vp create vite -- --template react-ts
```

## Ejemplos

```bash
# Modo interactivo
vp create

# Crear un monorepo, aplicación, librería o generador de Vite+
vp create vite:monorepo
vp create vite:application
vp create vite:library
vp create vite:generator

# Usar atajos para plantillas de la comunidad
vp create vite
vp create @tanstack/start
vp create svelte

# Usar nombres completos de paquetes
vp create create-vite
vp create create-next-app

# Usar plantillas remotas
vp create github:usuario/repo
vp create https://github.com/usuario/template-repo
```

## Plantillas de Organización

Una organización puede publicar un conjunto curado de plantillas bajo un único ámbito de npm enviando un paquete `@org/create` cuyo `package.json` incluya un manifiesto `createConfig.templates`. Una vez publicado, `vp create @org` abre un selector interactivo sobre esas plantillas.

### Seleccionar desde una organización
```bash
# Abre un selector interactivo sobre el manifiesto de @tu-org/create
vp create @tu-org

# Ejecuta una entrada específica del manifiesto directamente
vp create @tu-org:web

# Fija a una versión exacta o un dist-tag
vp create @tu-org@1.2.3
vp create @tu-org:web@next

# Establece la organización como predeterminada para un repositorio (ver configuración de create.defaultTemplate)
vp create
```

Internamente, `vp create @org` se mapea a `@org/create` (la convención existente de npm `create-*`). Si ese paquete no tiene el campo `createConfig.templates`, Vite+ vuelve a ejecutar el paquete de forma normal, por lo que adoptar el manifiesto no supone ningún riesgo para las organizaciones que ya publican `@org/create`.

Los registros privados funcionan automáticamente: Vite+ lee los archivos `.npmrc` de la raíz del proyecto y de `~/`, respetando los mapeos de ámbito `@tu-org:registry=...` y las credenciales `//host/:_authToken=...`.

### Autoría de `@org/create`
Existen dos diseños comunes. Elige el que mejor se adapte al número de plantillas y al ritmo de lanzamientos de la organización.

**Empaquetado (recomendado para la mayoría de las organizaciones).** Todas las plantillas viven como subdirectorios del propio `@org/create`. Las entradas del manifiesto utilizan valores relativos `./ruta`. Un repositorio, una publicación, una única historia de versiones; el mismo patrón utilizado por `create-vite` y `create-next-app`.

```
@tu-org/create/
├── package.json              # "createConfig": { "templates": [{ "template": "./templates/web" }, ...] }
├── templates/
│   ├── web/
│   │   ├── package.json
│   │   └── src/...
│   └── library/...
└── README.md
```

**Solo Manifiesto.** Cuando la organización ya publica paquetes `@org/template-*` independientes (o los aloja en GitHub), `@org/create` se mantiene como un índice ligero.

```
@tu-org/create/
├── package.json              # "createConfig": { "templates": [{ "template": "@tu-org/template-web" }, ...] }
└── README.md
```

Ambos diseños se pueden mezclar: un manifiesto puede apuntar la mayoría de las entradas a paquetes externos y mantener unas pocas como subdirectorios empaquetados.

Opcionalmente, proporciona un script `bin` para que `npm create @org` (la ruta heredada) siga funcionando para usuarios que no usen Vite+. `vp create @org` lee el manifiesto directamente y nunca ejecuta el `bin`.

### Esquema del Manifiesto
El manifiesto vive en `createConfig.templates` en el `package.json` de `@org/create`:

```json
{
  "name": "@tu-org/create",
  "version": "1.0.0",
  "createConfig": {
    "templates": [
      {
        "name": "monorepo",
        "description": "Monorepo",
        "template": "@tu-org/template-monorepo",
        "monorepo": true
      },
      {
        "name": "web",
        "description": "Plantilla de aplicación web (Vite + React)",
        "template": "@tu-org/template-web"
      },
      {
        "name": "demo",
        "description": "Plantilla demo empaquetada",
        "template": "./templates/demo"
      }
    ]
  }
}
```

Cada entrada soporta:

| Campo | Requerido | Notas |
| :--- | :--- | :--- |
| `name` | sí | Identificador en kebab-case. Usado por `vp create @org:<nombre>` para selección directa. Debe ser único dentro del array. |
| `description` | sí | Descripción de una línea mostrada en el selector. |
| `template` | sí | Un especificador de npm (`@org/template-foo`, opcionalmente `@version`), una URL de GitHub (`github:usuario/repo`), una plantilla integrada `vite:*`, el nombre de un paquete local del workspace, o una ruta relativa (`./templates/foo`) que se resuelve contra la raíz de `@org/create`. |
| `monorepo` | no | Si es `true`, marca esta entrada como una plantilla que crea un monorepo. Se oculta del selector cuando `vp create` se ejecuta dentro de un monorepo existente, imitando el filtro integrado de `vite:monorepo`. |

Un manifiesto inválido genera un error crítico, no una omisión silenciosa; el mantenedor que envió el manifiesto debe ser notificado sobre el campo infractor, por ejemplo: `@tu-org/create: createConfig.templates[2].template must be a non-empty string`.

### Plantillas en subdirectorios empaquetados
Las rutas relativas `./...` se resuelven contra la raíz del paquete `@org/create` que las contiene, **no** contra el cwd del usuario. El directorio referenciado se copia íntegramente en el proyecto de destino (sin procesamiento de motor de plantillas). Las rutas que escapan de la raíz del paquete son rechazadas.

### Establecer la organización como predeterminada en un repositorio
Confirma esto en `vite.config.ts` en la raíz del proyecto:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: { defaultTemplate: '@tu-org' },
});
```

Ahora `vp create` (sin argumentos) abre directamente el selector de `@tu-org`. Consulta [`create.defaultTemplate`](/config/create) para más detalles.

El selector siempre añade una entrada final **Vite+ built-in templates** para que `vite:monorepo` / `vite:application` / `vite:library` / `vite:generator` sigan siendo accesibles; seleccionarla redirige al flujo estándar integrado. Para scripts y CI, los especificadores explícitos (`vp create vite:library`) omiten el valor predeterminado configurado.

### Inspección no interactiva
`vp create @org --no-interactive` imprime el manifiesto como una tabla y sale con código 1:

```
Se requiere un nombre de plantilla al ejecutar `vp create @tu-org` en modo no interactivo.

Plantillas disponibles en @tu-org/create:

  NAME     DESCRIPTION                          TEMPLATE
  web      Plantilla de aplicación web          @tu-org/template-web
  library  Plantilla de librería TypeScript      @tu-org/template-library
  demo     Plantilla demo empaquetada           ./templates/demo

Ejemplos:
  # Crea una plantilla específica de la organización
  vp create @tu-org:web --no-interactive

  # O usa una plantilla integrada de Vite+
  vp create vite:application --no-interactive
```

