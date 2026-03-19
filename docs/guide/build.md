# Construcción (Build)

`vp build` construye aplicaciones Vite para producción.

## Vista General

`vp build` ejecuta la construcción de producción estándar de Vite a través de Vite+. Dado que se basa directamente en Vite, el canal de construcción y el modelo de configuración son los mismos que en Vite. Para más información sobre cómo funcionan las construcciones de producción de Vite, consulta la [guía de Vite](https://vite.dev/guide/build). Ten en cuenta que Vite+ utiliza Vite 8 y [Rolldown](https://rolldown.rs/) para las construcciones.

::: info INFORMACIÓN
`vp build` siempre ejecuta la construcción de producción integrada de Vite. Si tu proyecto también tiene un script `build` en el `package.json`, ejecuta `vp run build` cuando quieras ejecutar ese script en su lugar.
:::

## Uso

```bash
vp build
vp build --watch
vp build --sourcemap
```

## Configuración

Utiliza la configuración estándar de Vite en `vite.config.ts`. Para la referencia completa de configuración, consulta la [documentación de configuración de Vite](https://vite.dev/config/).

Úsalo para:

- [plugins](https://vite.dev/guide/using-plugins)
- [alias](https://vite.dev/config/shared-options#resolve-alias)
- [`build`](https://vite.dev/config/build-options)
- [`preview`](https://vite.dev/config/preview-options)
- [modos de entorno](https://vite.dev/guide/env-and-mode)

## Vista Previa (Preview)

Usa `vp preview` para servir la construcción de producción localmente después de `vp build`.

```bash
vp build
vp preview
```

