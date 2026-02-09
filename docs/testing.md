# Testing Strategy

The Govie Design System uses a comprehensive, multi-layered testing strategy to ensure the stability, accessibility, and visual integrity of both the HTML and React component libraries.

## 1. Unit Testing

Unit tests are utilised to verify core logic, utility functions, and component behaviours in isolation.

- **Tooling**: [Vitest](https://vitest.dev/)
- **Execution**: Run `pnpm run test` from the project root or within specific packages.
- **Configuration**:
  - Root-level scripts in [package.json](../package.json) orchestrate test runs.
  - React library: [vitest.config.ts](../packages/react/ds/vitest.config.ts), setups: [vitest-unit.setup.ts](../packages/react/ds/vitest-unit.setup.ts), [vitest-storybook.setup.ts](../packages/react/ds/vitest-storybook.setup.ts)
  - HTML library: [vitest.config.ts](../packages/html/ds/vitest.config.ts), setups: [vitest-unit.setup.ts](../packages/html/ds/vitest-unit.setup.ts), [vitest-storybook.setup.ts](../packages/html/ds/vitest-storybook.setup.ts)
- **Continuous Integration**: Integrated into the primary CI [pipeline.yaml](../.azure/pipeline.yaml) within the `Build_And_Test` stage.
- **Reporting**: Results are published in JUnit format, with code coverage reports available as pipeline artefacts.

## 2. Interaction Testing (Storybook Play Functions)

Storybook serves as both a documentation platform and an isolated environment for End-to-End (E2E) component testing.

- **Tooling**: Storybook Interaction Testing via `play` functions.
- **Methodology**: Within `*.stories.tsx` files, `play` functions simulate user interactions (e.g., clicks, keyboard input) and assert DOM state changes.
- **Example**: Refer to the [Tabs component stories](../packages/react/ds/src/tabs/tabs.stories.tsx).
- **Verification**: Tests are executed automatically during story development and can be validated via the Storybook test-runner.

## 3. Visual Regression Testing
    
A dual-tool approach is utilised to detect and prevent visual regressions across various browsers and viewports.

### Chromatic (Cloud-based Review)

Chromatic is a cloud-based visual testing service integrated with Storybook that captures snapshots of every component state.

- **Scope**: Covers both [`@ogcio/design-system-html`](../packages/html/ds/README.md) and [`@ogcio/design-system-react`](../packages/react/ds/README.md).
- **Configuration**: 
  - [React Chromatic Config](../packages/react/ds/chromatic.config.json)
  - [HTML Chromatic Config](../packages/html/ds/chromatic.config.json)
- **Pipeline**: Managed via [visual-regression.yaml](../.azure/visual-regression.yaml) in the `Chromatic_HTML` and `Chromatic_React` stages.
- **Workflow**: Facilitates collaborative review of visual changes during the Pull Request process.

### Playwright Visual Regression (Automated Snapshots)

An automated testing suite using Playwright for generating and comparing visual snapshots in the CI environment.

- **Scope**: Currently configured for [`@ogcio/design-system-react`](../packages/react/ds/README.md).
- **Configuration**: [playwright.config.ts](../packages/react/ds/playwright.config.ts).
- **Implementation**: Tests are dynamically generated based on the Storybook metadata ([visual.spec.ts](../packages/react/ds/tests/visual.spec.ts)).
- **Execution**: Run `pnpm playwright test` within the React package.
- **Pipeline**: Executed in the `Playwright` stage of [visual-regression.yaml](../.azure/visual-regression.yaml) using a specialised Playwright Docker container.
- **Snapshots**: Baseline images are stored in [`packages/react/ds/tests/visual.spec.ts-snapshots`](../packages/react/ds/tests/visual.spec.ts-snapshots).

#### Local execution (Makefile)

Use the provided Makefile targets to run visual regression tests locally. These commands build the Playwright Docker image, start Storybook, execute tests, and manage snapshots.

Prerequisites:
- Docker installed and running

Commands:

- Build the Playwright image (uses [Dockerfile.playwright](../Dockerfile.playwright))
  ```bash
  make build-visual-tests-image
  ```
- Run the visual regression tests (starts Storybook in the background and runs Playwright)
  ```bash
  make tests
  ```
- Update baseline screenshots after intentional visual changes
  ```bash
  make update-screenshots
  ```
- Stop the background Storybook server
  ```bash
  make stop-react-storybook
  ```

Reference: [Makefile](../Makefile)

## 4. CI/CD Integration

Regression testing is fully integrated into Azure DevOps Pipelines to ensure continuous quality assurance:

1. **Core Pipeline ([pipeline.yaml](../.azure/pipeline.yaml))**:
   - Enforces linting and formatting standards (`pnpm run lint`, `pnpm run format:check`).
   - Executes library builds and unit tests.
   - Conducts security vulnerability scans.
2. **Visual Regression Pipeline ([visual-regression.yaml](../.azure/visual-regression.yaml))**:
   - Triggered by changes in core component directories (`react/ds`, `html/ds`, `tokens`, `tailwind`).
   - Automates the build of libraries and Storybook instances.
   - Runs parallel Chromatic and Playwright visual suites across multiple browsers (Chromium, Firefox, Webkit) and mobile emulators (Android, iOS).

## 5. Test Exclusion Policy

Components or specific states that are unsuitable for visual testing (e.g. those containing persistent animations, loaders, or spinners) should be excluded:

- **Playwright**: Apply the `skip-playwright` tag to the story parameters.
- **Automatic Filters**: The [visual.spec.ts](../packages/react/ds/tests/visual.spec.ts) script automatically bypasses stories with IDs containing "loading" or "spinner".
