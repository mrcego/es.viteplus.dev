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

Esto proporciona al proyecto un formateador predeterminado compartido y habilita las acciones de corrección de Oxc al guardar. Establecer `oxc.fmt.configPath` en `./vite.config.ts` mantiene el formateo al guardar del editor alineado con el bloque `fmt` en tu configuración de Vite+. Vite+ utiliza `formatOnSaveMode: "file"` porque Oxfmt no soporta el formateo parcial.

