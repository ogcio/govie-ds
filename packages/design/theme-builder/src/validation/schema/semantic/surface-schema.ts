import { z } from 'zod';
import { createAliasSchema, createTokenSchema } from '../shared.js';

function createSurfaceSchema(name: string) {
  return z
    .object(
      {
        default: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'default',
        }),
        subtle: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'subtle',
        }),
        disabled: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'disabled',
        }),
        hover: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'hover',
        }),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const surfaceSchema = z
  .object(
    {
      primary: createSurfaceSchema('primary'),
      secondary: createSurfaceSchema('secondary'),
      neutral: createSurfaceSchema('neutral'),
    },
    {
      required_error: 'surface is required.',
    },
  )
  .strict();
