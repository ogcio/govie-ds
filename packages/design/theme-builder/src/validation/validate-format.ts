import { validate } from "@animaapp/design-tokens-validator";
import { Tokens } from "@animaapp/design-tokens-validator/src/types.js";
import { mergeDesignTokens } from "./merge-tokens.js";

export class DesignTokenValidationError extends Error {
  constructor(errors: string[] = []) {
    super("Invalid design tokens format.");
    this.errors = errors;
  }

  public errors: string[];
}

function validateDesignTokensObject({ tokens }: { tokens: unknown }) {
  if (tokens == null) {
    throw new DesignTokenValidationError();
  }

  const errors = validate(tokens as Tokens);

  if (errors.length > 0) {
    // TODO: implement own DTCG validator
    // @animaapp/design-tokens-validator does not include error paths
    // and treats 0 as equivalent to null/undefined
    if (errors[0].message === "Token must have a value") {
      return;
    }

    throw new DesignTokenValidationError(errors.map((error) => error.message));
  }
}

export async function validateDesignTokensFormat({
  source = [],
  tokens,
}: {
  source?: string[];
  tokens?: unknown;
}) {
  const mergedTokens = await mergeDesignTokens({ source, tokens });
  validateDesignTokensObject({ tokens: mergedTokens });
}
