# Gestión de Paquetes

Vite+ ofrece una interfaz de comandos unificada para npm, pnpm, Yarn y Bun. `vp` detecta el gestor de paquetes del espacio de trabajo, descarga la versión seleccionada cuando es necesario y traduce los comandos y las opciones compatibles para él.

```bash
vp install
vp add react
vp add -D typescript
vp remove react
vp update
```

## Primeros Pasos

- [Selección del Gestor de Paquetes](./package-manager-selection) explica la detección, los rangos de versiones y los shims de gestores de paquetes.
- [Paquetes Globales](./global-packages) explica el almacén separado de paquetes globales de Vite+.

## Comandos

Los comandos principales como `vp add` se ejecutan directamente bajo `vp`. Los comandos reenviados (Forwarded Commands) usan `vp pm` para delegar operaciones al gestor de paquetes detectado, traduciendo comandos y opciones compatibles tal como lo hacen los comandos principales. El prefijo `vp pm` mantiene nombres como `pack` disponibles para los comandos de Vite+. Por ejemplo, `vp pm pack` crea un tarball del paquete, pero [`vp pack`](/guide/pack) construye una librería.

## Argumentos Nativos

Coloca los argumentos nativos después de `--` para pasarlos directamente sin traducción:

```bash
vp install -- --registry=https://registry.npmjs.org
```

## Comandos Principales

- [install](./install)
- [add](./add)
- [remove](./remove)
- [update](./update)
- [dedupe](./dedupe)
- [outdated](./outdated)
- [list](./list)
- [why](./why)
- [info](./info)
- [link](./link)
- [unlink](./unlink)
- [rebuild](./rebuild)
- [dlx](./dlx)

## Comandos Reenviados

- **Instalación y limpieza**
  - [pm ci](./ci)
  - [pm prune](./prune)
- **Inspección y diagnóstico**
  - [pm licenses](./licenses)
  - [pm search](./search)
  - [pm audit](./audit)
  - [pm fund](./fund)
  - [pm ping](./ping)
- **Desarrollo local**
  - [pm approve-builds](./approve-builds)
  - [pm patch](./patch)
  - [pm patch-commit](./patch-commit)
- **Publicación**
  - [pm pack](./pack)
  - [pm version](./version)
  - [pm publish](./publish)
  - [pm stage](./stage)
  - [pm dist-tag](./dist-tag)
  - [pm deprecate](./deprecate)
- **Registro y cuentas**
  - [pm login](./login)
  - [pm logout](./logout)
  - [pm whoami](./whoami)
  - [pm token](./token)
  - [pm owner](./owner)
  - [pm team](./team)
- **Configuración y mantenimiento**
  - [pm config](./config)
  - [pm pkg](./pkg)
  - [pm cache](./cache)
