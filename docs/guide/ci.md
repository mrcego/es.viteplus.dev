# Integración Continua (CI)

Puedes utilizar `voidzero-dev/setup-vp` para usar Vite+ en entornos de CI.

## Vista General

[`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) ofrece integraciones para GitHub Actions y GitLab CI/CD. Ambos instalan Vite+ y pueden instalar dependencias del proyecto. La Action de GitHub también puede configurar Node.js y almacenar en caché los datos del gestor de paquetes de forma automática, mientras que la plantilla de GitLab CI/CD utiliza el entorno de ejecución de Node.js y la configuración de caché proporcionada por el job.

## GitHub Actions

La Action de GitHub configura Vite+, la versión de Node.js requerida y el gestor de paquetes. Esto significa que normalmente no necesitas pasos separados de `setup-node`, configuración del gestor de paquetes o pasos manuales de almacenamiento en caché de dependencias en tu flujo de trabajo.

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@v1
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

Usa la plantilla remota reutilizable `setup-vp` en tu configuración de GitLab CI/CD:

```yaml [.gitlab-ci.yml]
include:
  - remote: 'https://raw.githubusercontent.com/voidzero-dev/setup-vp/v1/gitlab/setup-vp.yml'

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
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '24'
    cache: true

- run: vp install && vp run dev:setup
- run: vp check
- run: vp test
```

