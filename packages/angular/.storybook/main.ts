import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts)'],
  addons: [
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      compodoc: false,
    },
  },
};

export default config;
