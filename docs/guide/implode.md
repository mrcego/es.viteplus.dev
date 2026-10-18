# Eliminar Vite+

Usa `vp implode` para eliminar `vp` y todos los datos relacionados con Vite+ de tu máquina.

## Vista General

`vp implode` es el comando de limpieza para eliminar una instalación de Vite+ y sus datos gestionados. Úsalo si ya no quieres que Vite+ gestione tu entorno de ejecución, el gestor de paquetes y el estado relacionado con las herramientas locales.

::: info INFORMACIÓN
Si decides que Vite+ no es para ti, por favor [comparte tus comentarios con nosotros](https://discord.gg/cAnsqHh5PX).
:::

## Uso

```bash
vp implode
```

Omite el aviso de confirmación con:

```bash
vp implode --yes
```


## Homebrew

Ejecuta `vp implode` primero para eliminar los entornos de ejecución administrados por Vite+, los paquetes globales, la configuración, los shims y las entradas del shell. Luego elimina el paquete de Homebrew:

```bash
vp implode
brew uninstall vite-plus
```

El aviso de confirmación explica que el paquete de Homebrew permanecerá instalado. Tras la limpieza, `vp implode` te dirigirá a ejecutar `brew uninstall vite-plus`.

Reinicia tu terminal antes de volver a ejecutar `vp`. En Bash, puedes ejecutar `hash -r` en su lugar para limpiar las rutas de comandos cacheadas. Si el paquete de Homebrew sigue instalado, el siguiente comando `vp` iniciará la configuración inicial de nuevo.
