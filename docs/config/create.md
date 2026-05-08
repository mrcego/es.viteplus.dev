# Configuración de Create

`vp create` lee el bloque `create` en `vite.config.ts` para establecer valores predeterminados por repositorio. Consulta la [guía de Creación de un Proyecto](/guide/create#plantillas-de-organizacion) para el flujo completo de plantillas `@org`.

## `create.defaultTemplate`

Cuando se invoca `vp create` sin un argumento de `TEMPLATE`, Vite+ utiliza este valor como si el usuario lo hubiera escrito. Normalmente se establece en un ámbito de npm cuyo paquete `@scope/create` publica un manifiesto `createConfig.templates`, de modo que `vp create` por sí solo abre el selector de la organización.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: {
    defaultTemplate: '@tu-org',
  },
});
```

Cualquier valor aceptado por `vp create` como primer argumento funciona aquí: `@tu-org` para un selector de organización, `@tu-org:web` para una entrada directa del manifiesto, `vite:application` para una plantilla integrada, etc.

## Precedencia

Argumento CLI > `create.defaultTemplate` > selector integrado estándar.

Los especificadores explícitos siempre tienen prioridad, por lo que los scripts y CI pueden omitir el valor predeterminado configurado:

```bash
# Usa create.defaultTemplate
vp create

# Ignora explícitamente el valor predeterminado
vp create vite:library
```

El selector de la organización también añade una entrada final "Vite+ built-in templates"; seleccionarla redirige al flujo de `vite:monorepo` / `vite:application` / `vite:library` / `vite:generator`, por lo que las plantillas integradas siguen siendo accesibles de forma interactiva incluso cuando se configura un valor predeterminado.
