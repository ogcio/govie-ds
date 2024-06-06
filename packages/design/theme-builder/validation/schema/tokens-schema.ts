import { z } from 'zod';
import {
  TokenError,
  TokensValidationError,
} from './tokens-validation-error.js';
import { primitiveSchema } from './primitive/primitive-schema.js';

export const tokensSchema = z
  .object({
    primitive: primitiveSchema,
    semantic: z.any(), // TODO: implement
    component: z.any(), // TODO: implement
  })
  .strict();

export function validateDesignTokens({ tokens }: { tokens: unknown }) {
  try {
    return tokensSchema.parse(tokens);
  } catch (error) {
    const zodError = error as z.ZodError;

    const errors: TokenError[] = zodError.errors.map((error) => ({
      path: error.path.join('.'),
      message: error.message,
    }));

    throw new TokensValidationError(errors);
  }
}
