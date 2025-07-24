import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  build: {
    test: {
      disabledAddons: ['@storybook/addon-docs'],
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'PRODUCTION') {
      return config;
    }

    return mergeConfig(config, {
      server: {
        watch: {
          usePolling: true,
          interval: 1000,
        },
      },
      resolve: {
        alias: {
          '@ogcio/design-system-html': path.resolve(
            // eslint-disable-next-line unicorn/prefer-module
            __dirname,
            '../src/index.ts',
          ),
        },
      },
    });
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
