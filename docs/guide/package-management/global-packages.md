# Paquetes Globales

Las operaciones de paquetes globales requieren la [CLI global](/guide/global-cli). Usa `-g` para gestionar herramientas de forma independiente de las dependencias de un proyecto:

```bash
vp install -g typescript
vp install -g --node 22 typescript
vp uninstall -g typescript
vp update -g
vp list -g
vp outdated -g
```

## Almacenamiento y Node.js

Vite+ almacena los paquetes globales en `packages/` bajo su directorio de datos resuelto, no en el directorio de instalación global del gestor de paquetes subyacente.

Sin `--node`, una instalación global utiliza la versión de Node.js resuelta para el directorio actual. Por lo tanto, la fijación de un proyecto tiene prioridad sobre `vp env default`. Consulta [Selección de Node.js](/guide/env#seleccion-de-node-js).

`vp link` utiliza enlaces nativos del gestor de paquetes. No modifica el almacén de paquetes globales de Vite+, y esos enlaces no aparecen en `vp list -g`.

## Actualizar Paquetes

Las actualizaciones conservan la especificación de versión registrada en la instalación. Un paquete instalado con `some-pkg@nightly` se actualiza a la versión más reciente de esa etiqueta. Un rango de versiones se mantiene dentro del rango.

```bash
vp update -g some-pkg
vp update -g some-pkg@latest
vp update -g --latest
```

Con `--latest`, las actualizaciones futuras siguen la etiqueta latest en lugar de la etiqueta o rango de versiones original.
