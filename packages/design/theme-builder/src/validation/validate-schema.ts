import { mergeDesignTokens } from './merge-tokens.js';
import { validateDesignTokens } from './schema/index.js';

export async function validateDesignTokensSchema({
  source = [],
  tokens,
}: {
  source?: string[];
  tokens?: unknown;
}) {
  const mergedTokens = await mergeDesignTokens({ source, tokens });
  validateDesignTokens({ tokens: mergedTokens });
}
