import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Deodar',
  tagline: 'An ACF Pro powered theme and plugin framework',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://deodar.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Deodar',
      logo: {
        alt: 'Deodar Logo',
        src: 'img/deodar.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'learnSidebar',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: 'Reference',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'examplesSidebar',
        //   position: 'left',
        //   label: 'Examples',
        // },
        {
          href: 'https://github.com/brockcataldi/deodar',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Learn',
              to: '/docs/learn/',
            },
            {
              label: 'Reference',
              to: '/docs/reference/class-deodar',
            },
            {
              label: 'Examples',
              to: '/docs/examples/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/brockcataldi/deodar',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Brock Cataldi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php']
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
