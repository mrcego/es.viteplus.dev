# Empaquetado (Pack)

`vp pack` construye librerías para producción con [tsdown](https://tsdown.dev/guide/).

## Vista General

`vp pack` construye librerías y ejecutables independientes con tsdown. Úsalo para paquetes publicables y salidas binarias. Si quieres construir una aplicación web, usa `vp build`. `vp pack` cubre todo lo que necesitas para construir librerías de forma nativa, incluyendo la generación de archivos de declaración, múltiples formatos de salida, mapas de fuente (source maps) y minificación.

Para más información sobre cómo funciona tsdown, consulta la [guía oficial de tsdown](https://tsdown.dev/guide/).

## Uso

```bash
vp pack
vp pack src/index.ts --dts
vp pack --watch
```

## Configuración

Coloca la configuración de empaquetado directamente en el bloque `pack` en `vite.config.ts` para que toda tu configuración permanezca en un solo lugar. No recomendamos usar `tsdown.config.ts` con Vite+.

Consulta la [guía de tsdown](https://tsdown.dev/guide/) y la [documentación del archivo de configuración de tsdown](https://tsdown.dev/options/config-file) para aprender más sobre cómo usar y configurar `vp pack`.

Úsalo para:

- [archivos de declaración (`dts`)](https://tsdown.dev/options/dts)
- [formatos de salida](https://tsdown.dev/options/output-format)
- [modo escucha (watch)](https://tsdown.dev/options/watch-mode)
- [ejecutables independientes](https://tsdown.dev/options/exe#executable)

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    dts: true,
    format: ['esm', 'cjs'],
    sourcemap: true,
  },
});
```

## Ejecutables Independientes

`vp pack` también puede construir ejecutables independientes a través de la [opción experimental `exe`](https://tsdown.dev/options/exe#executable) de tsdown.

Usa esto cuando quieras distribuir un CLI u otra herramienta basada en Node como un ejecutable nativo que funcione sin necesidad de tener Node.js instalado por separado.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/cli.ts'],
    exe: true,
  },
});
```

Consulta la [documentación oficial de ejecutables de tsdown](https://tsdown.dev/options/exe#executable) para obtener detalles sobre la configuración de nombres de archivo personalizados, activos embebidos y objetivos multiplataforma.

