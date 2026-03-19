# Actualizar Vite+

Usa `vp upgrade` para actualizar el binario global `vp`, y utiliza los comandos de gestión de paquetes de Vite+ para actualizar el paquete local `vite-plus` en un proyecto.

## Vista General

Hay dos partes al actualizar Vite+:

- El comando global `vp` instalado en tu máquina.
- El paquete local `vite-plus` utilizado por un proyecto individual.

Puedes actualizar ambos de forma independiente.

## `vp` Global

```bash
vp upgrade
```

## `vite-plus` Local

Actualiza la dependencia del proyecto con los comandos del gestor de paquetes en Vite+:

```bash
vp update vite-plus
```

También puedes usar `vp add vite-plus@latest` si quieres mover la dependencia explícitamente a la última versión.

