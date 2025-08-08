import { basename, resolve } from 'node:path';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
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
    resolveSnapshotPath: (testPath, snapExtension) => {
      const testFileName = basename(testPath).replace(/\.(test)\.(tsx)$/, '');

      return resolve(
        process.cwd(),
        '../../../snapshots',
        `${testFileName}${snapExtension}`,
      );
    },
  },
});
