# Configuración de Creación (Create)

`vp create` lee el bloque `create` en `vite.config.ts` para establecer valores predeterminados por repositorio. Consulta la [guía de Creación de Proyectos](/guide/create#plantillas-de-organizacion) para conocer el flujo de trabajo completo de las plantillas `@org`.

## `create.defaultTemplate`

Cuando se invoca `vp create` sin ningún argumento `TEMPLATE`, Vite+ utiliza este valor como si el usuario lo hubiera escrito. Normalmente se establece en un ámbito (scope) de npm cuya paquete `@scope/create` publica un manifiesto `createConfig.templates` — de modo que al ejecutar `vp create` vacío se abre el selector de la organización.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: {
    defaultTemplate: '@your-org',
  },
});
```

Cualquier valor aceptado por `vp create` como primer argumento funciona aquí: `@your-org` para un selector de organización, `@your-org:web` para una entrada directa de manifiesto, `vite:application` para una plantilla integrada, o el nombre (`name`) de una entrada local de `create.templates` (ver más abajo).

## `create.templates`

Declara plantillas locales disponibles para `vp create` dentro de un monorepo. Cada entrada se enumera en el selector de `vp create`, y seleccionarla (o pasar su `name` como argumento de plantilla) ejecuta la plantilla (`template`) resuelta.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: {
    templates: [
      {
        name: 'component',
        description: 'Componente de IU interno',
        template: './tools/create-component',
      },
      { name: 'service', description: 'Servicio backend', template: 'service-generator' },
    ],
  },
});
```

Cada entrada tiene:

| Campo | Requerido | Notas |
| --- | --- | --- |
| `name` | sí | Identificador mostrado en el selector y aceptado como `vp create <name>`. Debe ser único dentro del array. El prefijo `vite:` está reservado para plantillas integradas. |
| `description` | sí | Descripción de una línea mostrada en el selector. |
| `template` | sí | Nombre de un paquete del workspace, una ruta relativa `./path` al directorio de un paquete local (resuelta de forma relativa a la raíz del workspace), una plantilla integrada `vite:*`, una URL de GitHub o un nombre de paquete de npm completo (por ejemplo, `create-foo`). Se ejecuta tal cual (sin expandirse mediante atajos). |

`create.templates` es la fuente de verdad para las plantillas locales: solo las entradas enumeradas aquí aparecen en el selector. Vite+ no infiere plantillas a partir de palabras clave de package.json. Una entrada de `create.templates` cuya `template` no coincide con ningún paquete del workspace, o se resuelve como un paquete local sin `bin`, se reporta como un error en lugar de recurrir a un paquete de npm no relacionado.

[`vp create vite:generator`](/guide/create#generadores-de-codigo) agrega una entrada aquí automáticamente (de forma idempotente, preservando `defaultTemplate`); también puedes editar la lista a mano.

`create.defaultTemplate` puede nombrar una entrada local, de modo que `vp create` vacío la abra directamente.

## Precedencia

Argumento de CLI > `create.defaultTemplate` > el selector integrado estándar.

Los especificadores explícitos siempre ganan, por lo que los scripts y CI pueden omitir el valor predeterminado configurado:

```bash
# Usa create.defaultTemplate
vp create

# Ignora explícitamente el valor predeterminado
vp create vite:library
```

El selector de la organización también agrega una entrada final "Plantillas integradas de Vite+" — seleccionarla te redirige al flujo de `vite:monorepo` / `vite:application` / `vite:library` / `vite:generator`, por lo que las plantillas integradas siguen estando accesibles de forma interactiva incluso cuando se configura un valor predeterminado.
