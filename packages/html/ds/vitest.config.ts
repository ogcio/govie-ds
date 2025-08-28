import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import {
  coverageConfigDefaults,
  defineConfig,
  defineProject,
  mergeConfig,
} from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: [
        'default',
        ['junit', { outputFile: 'coverage/test-report.xml' }],
      ],
      coverage: {
        enabled: true,
        provider: 'v8',
        reportsDirectory: 'coverage',
        reporter: ['lcov', 'cobertura'],
        clean: true,
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/{postcss,tailwind}.config.*',
          '**/.storybook/**',
          // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
          '../src/**/*.stories.*',
          // 👇 This pattern must align with the output directory of `storybook build`
          '**/storybook-static/**',
        ],
      },
      projects: [
        defineProject({
          test: {
            name: 'unit',
            globals: true,
            environment: 'jsdom',
            css: true,
            setupFiles: ['./vitest-unit.setup.ts'],
          },
        }),
        {
          extends: true,
          test: {
            name: 'storybook',
            globals: true,
            css: true,
            testTimeout: 30_000,
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./vitest-storybook.setup.ts'],
          },
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
            storybookTest({ configDir: '.storybook' }),
          ],
        },
      ],
      resolveSnapshotPath: (testPath, snapExtension) => {
        const testFileName = path
          .basename(testPath)
          .replace(/\.(test)\.(tsx)$/, '');

        return path.resolve(
          process.cwd(),
          '../../../snapshots',
          `${testFileName}${snapExtension}`,
        );
      },
    },
  }),
);
