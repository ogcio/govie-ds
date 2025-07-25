import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineWorkspace } from 'vitest/config';

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default defineWorkspace([
  {
    extends: 'vite.config.ts',
    test: {
      name: 'unit',
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: ['./vitest.setup.ts'],
    },
  },
  {
    extends: 'vite.config.ts',
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
      storybookTest({ configDir: '.storybook' }),
    ],
    test: {
      name: 'storybook',
      globals: true,
      css: true,
      testTimeout: 30_000,
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  },
]);
