# Integración con IDE

Vite+ soporta VS Code y Zed a través de configuraciones específicas del editor que `vp create` y `vp migrate` pueden escribir automáticamente en tu proyecto.

## VS Code

Para la mejor experiencia en VS Code con Vite+, instala el [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack). Actualmente incluye:

- `Oxc` para formateo y linting a través de `vp check`
- `Vitest` para la ejecución de pruebas a través de `vp test`

Cuando creas o migras un proyecto, Vite+ te pregunta si quieres que se escriba la configuración del editor para VS Code. `vp create` además establece `npm.scriptRunner` a `vp` para que el Panel de Scripts de NPM de VS Code ejecute los scripts a través del ejecutor de tareas de Vite+. Para proyectos migrados o existentes, puedes añadir esta configuración manualmente (ver más abajo).

También puedes configurar manualmente el archivo de VS Code:

```json [.vscode/extensions.json]
{
  "recommendations": ["VoidZero.vite-plus-extension-pack"]
}
```

```json [.vscode/settings.json]
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "[javascript]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[typescript]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "oxc.fmt.configPath": "./vite.config.ts",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  }
}
```

Esto le da al proyecto un formateador predeterminado compartido y habilita las acciones de corrección de Oxc al guardar. Los bloques de sobreescritura por lenguaje (`[javascript]`, `[typescript]`, etc.) son necesarios porque VS Code prioriza las configuraciones `[language]` a nivel de usuario sobre el `editor.defaultFormatter` a nivel de workspace — sin ellos, una configuración global de Prettier tomaría el control silenciosamente. Establecer `oxc.fmt.configPath` a `./vite.config.ts` mantiene el formateo al guardar del editor alineado con el bloque `fmt` de tu configuración de Vite+. Vite+ usa `formatOnSaveMode: "file"` porque Oxfmt no soporta el formateo parcial.

Para permitir que el Panel de Scripts de NPM de VS Code ejecute scripts a través de `vp`, añade lo siguiente a tu `.vscode/settings.json`:

```json [.vscode/settings.json]
{
  "npm.scriptRunner": "vp"
}
```

Esto se incluye automáticamente con `vp create` pero no con `vp migrate`, ya que los proyectos existentes pueden tener miembros del equipo que no tienen `vp` instalado localmente.

## Zed

Para la mejor experiencia con Zed y Vite+, instala la extensión [oxc-zed](https://github.com/oxc-project/oxc-zed) desde el marketplace de extensiones de Zed. Proporciona formateo y linting a través de `vp check`.

Cuando creas o migras un proyecto, Vite+ te pregunta si quieres que se escriba la configuración del editor para Zed.

También puedes configurar manualmente la configuración de Zed:

```json [.zed/settings.json]
{
  "lsp": {
    "oxlint": {
      "initialization_options": {
        "settings": {
          "run": "onType",
          "fixKind": "safe_fix",
          "typeAware": true,
          "unusedDisableDirectives": "deny"
        }
      }
    },
    "oxfmt": {
      "initialization_options": {
        "settings": {
          "configPath": "./vite.config.ts",
          "run": "onSave"
        }
      }
    }
  },
  "languages": {
    "JavaScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }],
      "code_action": "source.fixAll.oxc"
    },
    "TypeScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "Vue.js": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    }
  }
}
```

Establecer `oxfmt.configPath` a `./vite.config.ts` mantiene el formateo al guardar del editor alineado con el bloque `fmt` de tu configuración de Vite+. La configuración generada completa cubre lenguajes adicionales (CSS, HTML, JSON, Markdown, etc.) — ejecuta `vp create` o `vp migrate` para que el archivo completo se escriba automáticamente.

