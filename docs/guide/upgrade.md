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

### Actualización de Paquetes con Alias

Vite+ configura alias de npm para sus paquetes principales durante la instalación:

- `vite` tiene un alias a `npm:@voidzero-dev/vite-plus-core@latest`
- `vitest` tiene un alias a `npm:@voidzero-dev/vite-plus-test@latest`

`vp upgrade vite-plus` no vuelve a resolver estos alias en el archivo de bloqueo (lockfile). Para actualizar completamente, actualízalos por separado:

```bash
vp update @voidzero-dev/vite-plus-core @voidzero-dev/vite-plus-test
```

O actualiza todos a la vez:

```bash
vp update vite-plus @voidzero-dev/vite-plus-core @voidzero-dev/vite-plus-test
```

Puedes verificar con `vp outdated` que no queden paquetes de Vite+ desactualizados.

