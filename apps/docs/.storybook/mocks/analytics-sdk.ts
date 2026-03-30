/**
 * Storybook mock for @ogcio/analytics-sdk.
 *
 * The real SDK depends on @logto/node, a server-only package that can't be
 * bundled for the browser. Since Storybook runs in the browser, Rollup fails
 * when it tries to resolve that dependency. This mock is aliased via viteFinal
 * in main.ts to cut off the import chain entirely.
 *
 * Add any missing named exports here as needed.
 */

export class Analytics {
  constructor(..._args: unknown[]) {}
  trackEvent() {}
  trackPageView() {}
  init() {}
}

export class ConsoleLogger {
  constructor(..._args: unknown[]) {}
  log() {}
  warn() {}
  error() {}
}

const mock = { Analytics, ConsoleLogger };
export default mock;
