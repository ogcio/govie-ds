import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', 'storybook-addon-pseudo-states'],

  framework: {
    name: path.dirname(fileURLToPath(import.meta.resolve('@storybook/vue3-vite/package.json'))),
    options: {
      docgen: 'vue-component-meta',
      builder: {
        viteConfigPath: path.resolve(import.meta.dirname, 'vite.config.ts'),
      },
    },
  },
};

export default config;
