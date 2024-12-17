import '@storybook/test';
interface CustomMatchers<R = unknown> {
  toBeExternalLink(): () => R;
}
declare module '@storybook/test' {
  interface Assertion<T> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}
