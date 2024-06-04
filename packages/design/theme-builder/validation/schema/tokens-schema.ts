import { z } from 'zod';
import {
  TokenError,
  TokensValidationError,
} from './tokens-validation-error.js';
import { colorSchema } from './color-schema.js';
import { spaceSchema } from './space-schema.js';
import { fontSchema } from './font-schema.js';
import { screenSchema } from './screen-schema.js';
import { zIndexSchema } from './z-index-schema.js';
import { borderSchema } from './border-schema.js';
import { opacitySchema } from './opacity-schema.js';
import { shadowSchema } from './shadow-schema.js';
import { headingSchema } from './heading-schema.js';

const primitiveSchema = z
  .object(
    {
      color: colorSchema,
      space: spaceSchema,
      font: fontSchema,
      screen: screenSchema,
      zIndex: zIndexSchema,
      border: borderSchema,
      opacity: opacitySchema,
      shadow: shadowSchema,
      heading: headingSchema,
    },
    { required_error: 'Primitive is required.' },
  )
  .strict();

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
