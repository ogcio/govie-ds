# Testing Strategy

The Govie Design System uses a comprehensive, multi-layered testing strategy to ensure the stability, accessibility, and visual integrity of the HTML, React, Angular and Vue component libraries.

## 1. Unit Testing

Unit tests are utilised to verify core logic, utility functions, and component behaviours in isolation.

- **Tooling**: [Vitest](https://vitest.dev/)
- **Execution**: Run `pnpm run test` from the project root or within specific packages.
- **Configuration**:
  - Root-level scripts in [package.json](../package.json) orchestrate test runs.
  - React library: [vitest.config.ts](../packages/react/vitest.config.ts), setups: [vitest-unit.setup.ts](../packages/react/vitest-unit.setup.ts), [vitest-storybook.setup.ts](../packages/react/vitest-storybook.setup.ts)
  - HTML library: [vitest.config.ts](../packages/html/ds/vitest.config.ts), setups: [vitest-unit.setup.ts](../packages/html/ds/vitest-unit.setup.ts), [vitest-storybook.setup.ts](../packages/html/ds/vitest-storybook.setup.ts)
  - Angular library: [vitest.config.ts](../packages/angular/vitest.config.ts), Storybook tests only
  - Vue library: [vitest.config.ts](../packages/vue/vitest.config.ts), Storybook tests only
- **Continuous Integration**: Integrated into the primary CI [pipeline.yaml](../.azure/pipeline.yaml) within the unit tests stage.
- **Reporting**: Results are published in JUnit format, with code coverage reports available as pipeline artefacts.

### Coverage

Coverage counts the code consumers can reach through each library's published entry points. Stories, the shared Storybook metas and generated icon components are excluded. Angular also excludes the generated atoms whose `gi-*` components render the native element themselves instead of the `core-*` tag.

## 2. Interaction Testing (Storybook Play Functions)

Storybook serves as both a documentation platform and an isolated environment for End-to-End (E2E) component testing.

- **Tooling**: Storybook Interaction Testing via `play` functions.
- **Methodology**: Within `*.stories.tsx` files, `play` functions simulate user interactions (e.g., clicks, keyboard input) and assert DOM state changes.
- **Example**: Refer to the [Tabs component stories](../packages/react/src/tabs/tabs.stories.tsx).
- **Verification**: Every story runs in headless Chromium through `@storybook/addon-vitest` as part of `pnpm run test`.

## 3. Visual Regression Testing
    
A dual-tool approach is utilised to detect and prevent visual regressions across various browsers and viewports.

### Chromatic (Cloud-based Review)

Chromatic is a cloud-based visual testing service integrated with Storybook that captures snapshots of every component state.

- **Scope**: Covers both [`@ogcio/design-system-html`](../packages/html/ds/README.md) and [`@ogcio/design-system-react`](../packages/react/README.md).
- **Configuration**: 
  - [React Chromatic Config](../packages/react/chromatic.config.json)
  - [HTML Chromatic Config](../packages/html/ds/chromatic.config.json)
- **Pipeline**: Managed via [visual-regression.yaml](../.azure/visual-regression.yaml) in the `ChromaticHTML` and `ChromaticReact` stages.
- **Workflow**: Facilitates collaborative review of visual changes during the Pull Request process.

### Playwright Visual Regression (Automated Snapshots)

An automated testing suite using Playwright for generating and comparing visual snapshots in the CI environment.

- **Scope**: Configured for [`@ogcio/design-system-react`](../packages/react/README.md) and [`@ogcio/design-system-angular`](../packages/angular/README.md).
- **Configuration**: [React playwright.config.ts](../packages/react/playwright.config.ts), [Angular playwright.config.ts](../packages/angular/playwright.config.ts).
- **Implementation**: Tests are dynamically generated based on the Storybook metadata ([React visual.spec.ts](../packages/react/tests/visual.spec.ts), [Angular visual.spec.ts](../packages/angular/e2e/visual.spec.ts)).
- **Execution**: Run `pnpm playwright test` within the React or Angular package.
- **Pipeline**: Executed in the `Playwright` and `PlaywrightAngular` stages of [visual-regression.yaml](../.azure/visual-regression.yaml) using a specialised Playwright Docker container.
- **Snapshots**: Baseline images are stored in [`packages/react/tests/visual.spec.ts-snapshots`](../packages/react/tests/visual.spec.ts-snapshots) and [`packages/angular/e2e/visual.spec.ts-snapshots`](../packages/angular/e2e/visual.spec.ts-snapshots).

#### Local execution (Makefile)

Use the provided Makefile targets to run visual regression tests locally. These commands build the Playwright Docker image, start Storybook, execute tests, and manage snapshots.

Prerequisites:
- Docker installed and running

Commands:

- Build the Playwright image (uses [Dockerfile.playwright](../Dockerfile.playwright))
  ```bash
  make build-visual-tests-image
  ```
- Run the visual regression tests (builds Storybook and runs Playwright in Docker)
  ```bash
  make react-visual-tests
  ```
- Update baseline screenshots after intentional visual changes
  ```bash
  make react-visual-update
  ```
- Run or update the Angular visual regression tests
  ```bash
  make angular-visual-tests
  make angular-visual-update
  ```

#### Running a subset of tests

To run or update only a subset of stories, append Playwright's `-g` flag (grep on test title) to the command inside the `react-visual-tests` / `react-visual-update` Makefile targets. The flag accepts a regex, so you can match multiple components at once:

```bash
# Run only Autocomplete stories
... test -g "Autocomplete"

# Update snapshots for Autocomplete and Select
... test --update-snapshots -g "Autocomplete|Select"
```

This speeds up iteration when debugging a specific flaky component without re-running the full suite.

Reference: [Makefile](../Makefile)

## 4. CI/CD Integration

Regression testing is fully integrated into Azure DevOps Pipelines to ensure continuous quality assurance:

1. **Core Pipeline ([pipeline.yaml](../.azure/pipeline.yaml))**:
   - Enforces linting and formatting standards (`pnpm run lint`, `pnpm run format:check`).
   - Executes library builds and unit tests.
   - Conducts security vulnerability scans.
2. **Visual Regression Pipeline ([visual-regression.yaml](../.azure/visual-regression.yaml))**:
   - Triggered by changes in the component libraries (`react`, `html/ds`, `angular`), the design packages and the themes.
   - Automates the build of libraries and Storybook instances.
   - Runs parallel Chromatic and Playwright visual suites across multiple browsers (Chromium, Firefox, Webkit) and mobile emulators (Android, iOS).

## 5. Test Exclusion Policy

Components or specific states that are unsuitable for visual testing (e.g. those containing persistent animations, loaders, or spinners) should be excluded:

- **Playwright**: Apply the `skip-playwright` tag to the story.
- **Slow stories**: For stories with `play` functions that need extra settle time before the screenshot, apply the `slow` tag — the test adds an additional wait of 3 seconds before capturing.
