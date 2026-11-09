# Integración con IDE

Vite+ soporta VS Code, Zed y los IDEs de JetBrains a través de configuraciones específicas del editor que `vp create` y `vp migrate` pueden escribir automáticamente en tu proyecto.

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
          "fmt.configPath": "./vite.config.ts",
          "run": "onSave"
        }
      }
    }
  },
  "languages": {
    "JavaScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [
        { "language_server": { "name": "oxfmt" } },
        { "code_action": "source.fixAll.oxc" }
      ]
    },
    "JSX": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "TypeScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "TSX": {
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

Establecer `oxfmt.fmt.configPath` a `./vite.config.ts` mantiene el formateo al guardar del editor alineado con el bloque `fmt` de tu configuración de Vite+. La configuración generada completa cubre lenguajes adicionales (CSS, HTML, JSON, Markdown, etc.) — ejecuta `vp create` o `vp migrate` para que el archivo completo se escriba automáticamente.

## JetBrains (IntelliJ, WebStorm, etc...)

Para la mejor experiencia con Vite+ en IDEs de JetBrains como IntelliJ y WebStorm, instala el plugin [Oxc](https://plugins.jetbrains.com/plugin/27061-oxc) desde el marketplace de JetBrains.

Cuando creas o migras un proyecto, Vite+ te pregunta si deseas que la configuración del editor se escriba para IDEs de JetBrains.

::: tip Vite+ no fusiona con archivos de configuración existentes
Debido a algunas complejidades al fusionar archivos XML, Vite+ actualmente no fusiona tus archivos actuales si los archivos ya existen. Se te dará la oportunidad de reemplazar cualquier archivo existente, en lugar de fusionarlo.
:::

También puedes configurar manualmente la configuración del IDE para que coincida con tu configuración de Vite+:

```xml [.idea/externalDependencies.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="ExternalDependencies">
    <plugin id="com.github.oxc.project.oxcintellijplugin" />
  </component>
</project>
```

```xml [.idea/workspace.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <!-- otros ajustes... -->
  <component name="PropertiesComponent">
    <![CDATA[{
      "keyToString": {
        // otros ajustes
        "javascript.nodejs.core.library.configured.version": "24.18.0", // Reemplaza con tu versión de Node.js seleccionada
        "javascript.nodejs.core.library.typings.version": "24.13.3", // Reemplaza con la versión de @types/node que corresponda a tu runtime (u omítelo si no lo deseas)
        "javascript.preferred.runtime.type.id": "node",
        "nodejs_interpreter_path": "$USER_HOME$/.local/share/vite-plus/bin/node",
        "nodejs_package_manager_path": "pnpm" // Reemplaza con tu gestor de paquetes preferido
      }
    }]]>
  </component>
</project>
```

Esta ruta asume una instalación Unix nueva usando los directorios XDG por defecto. En Windows, usa `%LOCALAPPDATA%\vite-plus\bin\node.exe`. Ejecuta `vp env current node` para verificar la versión de Node.js resuelta y la ruta del binario. Si usas un `VP_HOME` o directorios XDG personalizados, o una instalación anterior de Vite+, actualiza `nodejs_interpreter_path` a la ruta de tu shim de Node.js.

```xml [.idea/OxfmtSettings.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="OxfmtSettings">
    <option name="preferOxfmtCodeStyleSettings" value="true" />
  </component>
</project>
```

A menudo, las carpetas `.idea` se incluyen en el gitignore de un proyecto, incluso el archivo `externalDependencies.xml`, que se utiliza para indicar a tu IDE qué plugins deben usarse para el workspace.

Asegúrate de agregar esta línea a tu archivo principal `.gitignore`, para garantizar que el archivo se incluya:

```gitignore [.gitignore]
!.idea/externalDependencies.xml
```
