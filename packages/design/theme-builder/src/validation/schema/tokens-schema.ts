import { z } from 'zod';
import { brandSchema } from './brand/brand-schema.js';
import { primitiveSchema } from './primitive/primitive-schema.js';
import { semanticSchema } from './semantic/semantic-schema.js';
import {
  TokenError,
  TokensValidationError,
} from './tokens-validation-error.js';

export const tokensSchema = z
  .object({
    primitive: primitiveSchema,
    semantic: semanticSchema,
    brand: brandSchema,
    component: z.any(), // TODO: implement
  })
  .strict();

export function validateDesignTokens({ tokens }: { tokens: unknown }) {
  try {
    return tokensSchema.parse(tokens);
  } catch (error) {
    const zodError = error as z.ZodError;

    const errors: TokenError[] = zodError?.errors
      ? zodError.errors.map((error) => ({
          path: error.path.join('.'),
          message: error.message,
        }))
      : [{ message: zodError.toString(), path: '' }];

    throw new TokensValidationError(errors);
  }
}
