import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { storybookAngularVitest } from '@storybook/angular-vite/vitest';
import { playwright } from '@vitest/browser-playwright';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default', ['junit', { outputFile: 'coverage/results.xml' }]],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'cobertura'],
      clean: true,
      include: ['src/**/*.ts'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        // Stories and the shared Storybook metas are test code.
        'src/**/*.stories.ts',
        'src/**/storybook/**',
        // Generated SVG icon components.
        'src/atoms/icons/**',
        // Generated atoms whose classes never run: the gi-* components import only their Props type.
        'src/atoms/{Button,IconButton,InsetText,Link,LinkButton,Paragraph,Text}.ts',
        'src/atoms/heading/{H1,H2,H3,H4,H5,H6}.ts',
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'storybook',
          testTimeout: 30_000,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
        plugins: [storybookAngularVitest(), storybookTest({ configDir: '.storybook' })],
      },
    ],
  },
});
