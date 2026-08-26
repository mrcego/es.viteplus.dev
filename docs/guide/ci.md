# Integración Continua (CI)

Puedes utilizar `voidzero-dev/setup-vp` para usar Vite+ en entornos de CI.

## Vista General

[`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) ofrece integraciones para GitHub Actions, GitLab CI/CD y Azure Pipelines. Las tres instalan Vite+ y pueden instalar dependencias del proyecto. La Action de GitHub y la plantilla de Azure Pipelines también pueden configurar Node.js y almacenar en caché los datos del gestor de paquetes de forma automática, mientras que la plantilla de GitLab CI/CD utiliza el entorno de ejecución de Node.js y la configuración de caché proporcionada por el job.

## Versionado de setup-vp

Establece `<setup-vp-version>` en cada ejemplo a una versión exacta de la [página de versiones de `setup-vp`](https://github.com/voidzero-dev/setup-vp/releases). Puedes usar un SHA de commit en su lugar. No utilices la etiqueta `v1`. La etiqueta `v1` ya no recibe actualizaciones.

### Actualizaciones Automáticas de Versión

Dependabot y Renovate pueden actualizar versiones exactas en flujos de trabajo de GitHub Actions.

Para utilizar las [actualizaciones de versión de Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates), añade una entrada `github-actions` a `.github/dependabot.yml`:

```yaml [.github/dependabot.yml]
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

Dependabot comprueba las entradas `uses:` en `.github/workflows` cada semana.

El [gestor de GitHub Actions de Renovate](https://docs.renovatebot.com/modules/manager/github-actions/) detecta las entradas `uses:` de forma predeterminada. No necesitas una regla de paquete para `setup-vp`.

Cuando uses un SHA de commit, añade la etiqueta de versión exacta en un comentario. Renovate utiliza el comentario para encontrar actualizaciones:

```yaml
- uses: voidzero-dev/setup-vp@<commit-sha> # <setup-vp-version>
```

Estas opciones solo se aplican a los flujos de trabajo de GitHub Actions. Para GitLab CI/CD y Azure Pipelines, actualiza ambos valores de versión juntos.

## GitHub Actions

La Action de GitHub configura Vite+, la versión de Node.js requerida y el gestor de paquetes. Esto significa que normalmente no necesitas pasos separados de `setup-node`, configuración del gestor de paquetes o pasos manuales de almacenamiento en caché de dependencias en tu flujo de trabajo.

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@<setup-vp-version>
  with:
    node-version: '24'
    cache: true
- run: vp install
- run: vp check
- run: vp test
- run: vp build
```

Con `cache: true`, `setup-vp` gestiona el almacenamiento en caché de dependencias por ti de forma automática.

::: tip CONSEJO
`setup-vp` almacena en caché los datos del gestor de paquetes. Para reutilizar los resultados de Vite Task en diferentes ejecuciones de CI, añade una caché de GitHub Actions separada para Vite Task (consulta [Caché de GitHub Actions para Vite Task](/guide/github-actions-cache)).
:::

## GitLab CI/CD

Usa la plantilla remota reutilizable `setup-vp` en tu configuración de GitLab CI/CD. Establece la URL remota y `setup-ref` a la misma etiqueta de versión o SHA de commit:

```yaml [.gitlab-ci.yml]
include:
  - remote: 'https://raw.githubusercontent.com/voidzero-dev/setup-vp/<setup-vp-version>/gitlab/setup-vp.yml'
    inputs:
      setup-ref: '<setup-vp-version>'

test:
  extends: .setup-vp
  image: node:24
  script:
    - vp check
    - vp test
    - vp build
```

La integración de GitLab CI/CD se diferencia de la Action de GitHub en algunos aspectos:

- La plantilla no instala Node.js. Usa una imagen de Node.js, como se muestra arriba, o de lo contrario proporciona Node.js en el job.
- Configura el almacenamiento en caché de dependencias con la palabra clave [`cache`](https://docs.gitlab.com/ci/yaml/#cache) de GitLab del job.
- Usa un entorno de ejecutor tipo Unix con Bash y `curl` o `wget`.

Para la configuración avanzada y la referencia completa de entradas, consulta la [documentación de GitLab CI/CD de `setup-vp`](https://github.com/voidzero-dev/setup-vp#gitlab-cicd).

## Azure Pipelines

Usa la plantilla de pasos reutilizable `setup-vp` en tu configuración de Azure Pipelines. Crea una conexión de servicio de GitHub llamada `github` y luego haz referencia a la plantilla desde el repositorio `setup-vp`:

```yaml [azure-pipelines.yml]
resources:
  repositories:
    - repository: setupVp
      type: github
      endpoint: github
      name: voidzero-dev/setup-vp
      ref: refs/tags/<setup-vp-version>

pool:
  vmImage: ubuntu-latest

steps:
  - checkout: self
  - template: azure/setup-vp.yml@setupVp
    parameters:
      setupRef: '<setup-vp-version>'
      nodeVersion: 24.x
      cache: true
      runInstall: true
  - script: vp check
  - script: vp test
  - script: vp build
```

Fija `ref` y `setupRef` a la misma etiqueta o SHA de commit para una estricta reproducibilidad.

La plantilla de Azure Pipelines es compatible con agentes Linux, macOS y Windows alojados por Microsoft. Utiliza las tareas nativas `UseNode@1` y `Cache@2` de Azure para configurar Node.js y almacenar en caché los datos del gestor de paquetes.

Para la configuración avanzada y la referencia completa de parámetros, consulta la [documentación de Azure Pipelines de `setup-vp`](https://github.com/voidzero-dev/setup-vp#azure-pipelines).

## Simplificando Flujos de Trabajo Existentes

Si estás migrando un flujo de trabajo de GitHub Actions existente, a menudo puedes reemplazar grandes bloques de configuración de Node, gestor de paquetes y caché con un único paso `setup-vp`.

#### Antes:

```yaml [.github/workflows/ci.yml]
- uses: pnpm/action-setup@v6
  with:
    version: 11

- uses: actions/setup-node@v6
  with:
    node-version: '24'
    cache: pnpm

- run: pnpm ci && pnpm dev:setup
- run: pnpm check
- run: pnpm test
```

#### Después:

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@<setup-vp-version>
  with:
    node-version: '24'
    cache: true

- run: vp install && vp run dev:setup
- run: vp check
- run: vp test
```