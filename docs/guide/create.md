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

