import { resolve } from 'node:path';

import type { VoidZeroThemeConfig } from '@voidzero-dev/vitepress-theme';
import { extendConfig } from '@voidzero-dev/vitepress-theme/config';
import { defineConfig, type HeadConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

const taskRunnerGuideItems = [
  {
    text: 'Ejecución (Run)',
    link: '/guide/run',
  },
  {
    text: 'Caché de Tareas',
    link: '/guide/cache',
  },
  {
    text: 'Ejecutar Binarios',
    link: '/guide/vpx',
  },
];

const guideSidebar = [
  {
    text: 'Introducción',
    items: [
      { text: 'Primeros Pasos', link: '/guide/' },
      { text: 'Crear un Proyecto', link: '/guide/create' },
      { text: 'Migrar a Vite+', link: '/guide/migrate' },
      { text: 'Instalar Dependencias', link: '/guide/install' },
      { text: 'Entorno', link: '/guide/env' },
      { text: '¿Por qué Vite+?', link: '/guide/why' },
    ],
  },
  {
    text: 'Desarrollo',
    items: [
      { text: 'Desarrollo (Dev)', link: '/guide/dev' },
      {
        text: 'Comprobación (Check)',
        link: '/guide/check',
        items: [
          { text: 'Lint', link: '/guide/lint' },
          { text: 'Formato (Fmt)', link: '/guide/fmt' },
        ],
      },
      { text: 'Pruebas (Test)', link: '/guide/test' },
    ],
  },
  {
    text: 'Ejecución',
    items: taskRunnerGuideItems,
  },
  {
    text: 'Construcción',
    items: [
      { text: 'Construir (Build)', link: '/guide/build' },
      { text: 'Empaquetar (Pack)', link: '/guide/pack' },
    ],
  },
  {
    text: 'Mantenimiento',
    items: [
      { text: 'Actualizar Vite+', link: '/guide/upgrade' },
      { text: 'Eliminar Vite+', link: '/guide/implode' },
    ],
  },
  {
    text: 'Flujo de Trabajo',
    items: [
      { text: 'Integración con IDE', link: '/guide/ide-integration' },
      { text: 'CI', link: '/guide/ci' },
      { text: 'Hooks de Commit', link: '/guide/commit-hooks' },
      { text: 'Solución de Problemas', link: '/guide/troubleshooting' },
    ],
  },
];

export default extendConfig(
  withMermaid(
    defineConfig({
      title: 'Vite+',
      titleTemplate: ':title | El conjunto de herramientas unificado para la Web',
      description: 'El conjunto de herramientas unificado para la Web',
      cleanUrls: true,
      head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        [
          'link',
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'true',
          },
        ],
        ['meta', { name: 'theme-color', content: '#7474FB' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Vite+' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@voidzerodev' }],
        [
          'script',
          {
            src: 'https://cdn.usefathom.com/script.js',
            'data-site': 'JFDLUWBH',
            'data-spa': 'auto',
            defer: '',
          },
        ],
      ],
      vite: {
        ssr: {
          noExternal: ['@braintree/sanitize-url', 'mermaid', 'vitepress-plugin-mermaid'],
        },
        optimizeDeps: {
          include: ['mermaid > @braintree/sanitize-url', 'mermaid', 'vitepress-plugin-mermaid'],
        },
        resolve: {
          tsconfigPaths: true,
          alias: [
            { find: '@local-assets', replacement: resolve(__dirname, 'theme/assets') },
            { find: '@layouts', replacement: resolve(__dirname, 'theme/layouts') },
            // dayjs ships CJS by default; redirect to its ESM build so
            // mermaid (imported via vitepress-plugin-mermaid) works in dev
            { find: /^dayjs$/, replacement: 'dayjs/esm' },
          ],
        },
        build: {
          commonjsOptions: {
            include: [/@braintree\/sanitize-url/, /node_modules/],
          },
        },
      },
      themeConfig: {
        variant: 'viteplus' as VoidZeroThemeConfig['variant'],
        nav: [
          {
            text: 'Guía',
            link: '/guide/',
            activeMatch: '^/guide/',
          },
          {
            text: 'Configuración',
            link: '/config/',
            activeMatch: '^/config/',
          },
          {
            text: 'Recursos',
            items: [
              { text: 'GitHub', link: 'https://github.com/voidzero-dev/vite-plus' },
              { text: 'Versiones', link: 'https://github.com/voidzero-dev/vite-plus/releases' },
              {
                text: 'Anuncio',
                link: 'https://voidzero.dev/posts/announcing-vite-plus-alpha',
              },
              {
                text: 'Contribuir',
                link: 'https://github.com/voidzero-dev/vite-plus/blob/main/CONTRIBUTING.md',
              },
            ],
          },
        ],
        sidebar: {
          '/guide/': guideSidebar,
          '/config/': [
            {
              text: 'Configuración',
              items: [
                { text: 'Configurando Vite+', link: '/config/' },
                { text: 'Ejecución (Run)', link: '/config/run' },
                { text: 'Formato (Fmt)', link: '/config/fmt' },
                { text: 'Lint', link: '/config/lint' },
                { text: 'Pruebas (Test)', link: '/config/test' },
                { text: 'Construcción (Build)', link: '/config/build' },
                { text: 'Empaquetado (Pack)', link: '/config/pack' },
                { text: 'Staged', link: '/config/staged' },
              ],
            },
          ],
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/voidzero-dev/vite-plus' },
          { icon: 'x', link: 'https://x.com/voidzerodev' },
          { icon: 'discord', link: 'https://discord.gg/cC6TEVFKSx' },
          { icon: 'bluesky', link: 'https://bsky.app/profile/voidzero.dev' },
        ],
        outline: {
          level: [2, 3],
          label: 'En esta página',
        },
        search: {
          provider: 'local',
          options: {
            locales: {
              root: {
                translations: {
                  button: {
                    buttonText: 'Buscar',
                    buttonAriaLabel: 'Buscar'
                  },
                  modal: {
                    noResultsText: 'No se han encontrado resultados',
                    resetButtonTitle: 'Limpiar búsqueda',
                    footer: {
                      selectText: 'para seleccionar',
                      navigateText: 'para navegar',
                      closeText: 'para cerrar'
                    }
                  }
                }
              }
            }
          }
        },
        footer: {
          copyright: `© ${new Date().getFullYear()} VoidZero Inc. y contribuyentes.`,
          nav: [
            {
              title: "Empresa",
              items: [
                { text: "VoidZero", link: "https://voidzero.dev" },
                { text: "Vite", link: "https://vite.dev" },
                { text: "Vitest", link: "https://vitest.dev" },
                { text: "Rolldown", link: "https://rolldown.rs" },
                { text: "Oxc", link: "https://oxc.rs" },
              ],
            },
          ],
          social: [
            { icon: "github", link: "https://github.com/voidzero-dev/vite-plus" },
            { icon: "x", link: "https://x.com/voidzerodev" },
            { icon: "discord", link: "https://discord.gg/cC6TEVFKSx" },
            { icon: "bluesky", link: "https://bsky.app/profile/voidzero.dev" },
          ],
        }
      },
      transformHead({ page, pageData }) {
        const url = 'https://viteplus.dev/' + page.replace(/\.md$/, '').replace(/index$/, '');

        const canonicalUrlEntry: HeadConfig = [
          'link',
          {
            rel: 'canonical',
            href: url,
          },
        ];

        const ogInfo: HeadConfig[] = [
          ['meta', { property: 'og:title', content: pageData.frontmatter.title ?? 'Vite+' }],
          [
            'meta',
            {
              property: 'og:image',
              content: `https://viteplus.dev/${pageData.frontmatter.cover ?? 'og.jpg'}`,
            },
          ],
          ['meta', { property: 'og:url', content: url }],
          [
            'meta',
            {
              property: 'og:description',
              content: pageData.frontmatter.description ?? 'El conjunto de herramientas unificado para la Web',
            },
          ],
        ];

        return [...ogInfo, canonicalUrlEntry];
      },

    }),
  ),
);
