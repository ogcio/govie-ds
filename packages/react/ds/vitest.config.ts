import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      reportOnFailure: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/{postcss,tailwind}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
