export type TokenError = {
  path: string;
  message: string;
};

export class TokensValidationError extends Error {
  constructor(errors: TokenError[]) {
    const formattedErrors = errors
      .map((error) => `${error.path}: ${error.message}`)
      .join('\n');

    super(`Invalid design tokens schema:\n\n${formattedErrors}`);
    this.errors = errors;
  }

  errors: TokenError[];
}
