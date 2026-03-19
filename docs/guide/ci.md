# Integración Continua (CI)

Puedes utilizar `voidzero-dev/setup-vp` para usar Vite+ en entornos de CI.

## Vista General

Para GitHub Actions, la configuración recomendada es [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp). Instala Vite+, configura la versión de Node.js requerida y el gestor de paquetes, y puede cachear las instalaciones de paquetes automáticamente.

Esto significa que normalmente no necesitas pasos separados de `setup-node`, configuración del gestor de paquetes y pasos manuales de caché de dependencias en tu flujo de trabajo.

## GitHub Actions

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '22'
    cache: true
- run: vp install
- run: vp check
- run: vp test
- run: vp build
```

Con `cache: true`, `setup-vp` gestiona el almacenamiento en caché de dependencias por ti de forma automática.

## Simplificando Flujos de Trabajo Existentes

Si estás migrando un flujo de trabajo de GitHub Actions existente, a menudo puedes reemplazar grandes bloques de configuración de Node, gestor de paquetes y caché con un único paso `setup-vp`.

#### Antes:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '24'

- uses: pnpm/action-setup@v4
  with:
    version: 10

- name: Obtener ruta del almacén de pnpm
  run: pnpm store path

- uses: actions/cache@v4
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

- run: pnpm install && pnpm dev:setup
- run: pnpm test
```

#### Después:

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '24'
    cache: true

- run: vp install && vp run dev:setup
- run: vp check
- run: vp test
```

