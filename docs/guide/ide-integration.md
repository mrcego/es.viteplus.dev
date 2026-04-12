# Integración con IDE

Vite+ soporta VS Code a través del [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack) y los ajustes de VS Code que `vp create` y `vp migrate` pueden escribir automáticamente en tu proyecto.

## VS Code

Para la mejor experiencia en VS Code con Vite+, instala el [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack). Actualmente incluye:

- `Oxc` para formateo y linting a través de `vp check`.
- `Vitest` para la ejecución de pruebas a través de `vp test`.

Cuando creas o migras un proyecto, Vite+ te pregunta si quieres que se escriba la configuración del editor para VS Code. También puedes configurar manualmente el archivo de VS Code:

`.vscode/extensions.json`

```json
{
  "recommendations": ["VoidZero.vite-plus-extension-pack"]
}
```

`.vscode/settings.json`

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "oxc.fmt.configPath": "./vite.config.ts",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  }
}
```


## Panel de Scripts de NPM de VS Code

Al crear un nuevo proyecto con `vp create`, Vite+ añade automáticamente `"npm.scriptRunner": "vp"` a la configuración de tu área de trabajo (`.vscode/settings.json`) de VS Code. Esto permite que los scripts ejecutados a través de la interfaz de usuario de VS Code utilicen el ejecutor de tareas de Vite+.

Para proyectos existentes o migrados, puedes añadir esta configuración manualmente a tu archivo `.vscode/settings.json`:

```json
{
  "npm.scriptRunner": "vp"
}
```

::: warning Nota sobre vp migrate
`vp migrate` **no** añade esta configuración automáticamente. Esto es intencional para evitar romper el flujo de trabajo de otros miembros del equipo que podrían no tener `vp` instalado todavía.
:::

