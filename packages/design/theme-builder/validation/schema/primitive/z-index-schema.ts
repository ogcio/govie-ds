import { z } from 'zod';
import { createIntegerSchema, createTokenSchema } from '../shared.js';

function createZIndexSchema(name: string) {
  return createTokenSchema({
    type: 'number',
    valueSchema: createIntegerSchema('Z-Index'),
    name,
  });
}

export const zIndexSchema = z
  .object({
    1: createZIndexSchema('1'),
    100: createZIndexSchema('100'),
    200: createZIndexSchema('200'),
    300: createZIndexSchema('300'),
    400: createZIndexSchema('400'),
    500: createZIndexSchema('500'),
    600: createZIndexSchema('600'),
    700: createZIndexSchema('700'),
    800: createZIndexSchema('800'),
    900: createZIndexSchema('900'),
    1000: createZIndexSchema('1000'),
  })
  .strict();
