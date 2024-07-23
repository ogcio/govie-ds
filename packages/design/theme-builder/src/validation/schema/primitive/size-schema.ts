import { z } from 'zod';
import { createPixelSchema, createTokenSchema } from '../shared.js';

function createSizeSchema(name: string) {
  return createTokenSchema({
    type: 'dimension',
    valueSchema: createPixelSchema('size'),
    name,
  });
}

export const sizeSchema = z
  .object(
    {
      sm: createSizeSchema('sm'),
      md: createSizeSchema('md'),
      lg: createSizeSchema('lg'),
      xl: createSizeSchema('xl'),
    },
    {
      required_error: 'size is required.',
    },
  )
  .strict();
