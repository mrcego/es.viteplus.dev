# Eliminar Vite+

Usa `vp implode` para eliminar `vp` y todos los datos relacionados con Vite+ de tu máquina.

## Vista general

`vp implode` es el comando de limpieza para eliminar una instalación de Vite+ y sus datos gestionados. Úsalo si ya no quieres que Vite+ gestione tu entorno de ejecución, el gestor de paquetes y el estado relacionado con las herramientas locales.

::: info INFORMACIÓN
Si decides que Vite+ no es para ti, por favor [comparte tus comentarios con nosotros](https://discord.gg/cAnsqHh5PX).
:::

## Uso

```bash
vp implode
```

Revisa los directorios y perfiles de terminal listados por el comando, luego escribe `boom` para confirmar la eliminación. Cualquier otra entrada cancela la operación.

Omite el aviso de confirmación con:

```bash
vp implode --yes
```

## Homebrew

Para el [tap oficial de Homebrew](/guide/homebrew), ejecuta `vp implode` primero para eliminar los runtimes administrados por Vite+, los paquetes globales, la configuración, los shims y las entradas del shell. Luego elimina el paquete de Homebrew:

```bash
vp implode
brew uninstall voidzero-dev/vite-plus/vp
```

El aviso de confirmación explica que el paquete de Homebrew permanecerá instalado. Tras la limpieza, `vp implode` muestra el comando de desinstalación de la fórmula correspondiente.

Para conservar tus datos al cambiar de instalación, sigue los [pasos de migración](/guide/homebrew#switch-an-existing-installation) en lugar de ejecutar `vp implode`.

Reinicia tu terminal antes de volver a ejecutar `vp`. En Bash, puedes ejecutar `hash -r` en su lugar para limpiar las rutas de comandos en caché. Si el paquete de Homebrew sigue instalado, el siguiente comando `vp` iniciará la configuración inicial de nuevo.
