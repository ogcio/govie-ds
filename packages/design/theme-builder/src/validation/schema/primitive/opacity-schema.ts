import { z } from 'zod';
import { createNumberSchema, createTokenSchema } from '../shared.js';

function createOpacitySchema(name: string) {
  return createTokenSchema({
    type: 'number',
    valueSchema: createNumberSchema('opacity'),
    name,
  });
}

export const opacitySchema = z
  .object({
    0: createOpacitySchema('0'),
    5: createOpacitySchema('5'),
    10: createOpacitySchema('10'),
    15: createOpacitySchema('15'),
    20: createOpacitySchema('20'),
    25: createOpacitySchema('25'),
    30: createOpacitySchema('30'),
    35: createOpacitySchema('35'),
    40: createOpacitySchema('40'),
    45: createOpacitySchema('45'),
    50: createOpacitySchema('50'),
    55: createOpacitySchema('55'),
    60: createOpacitySchema('60'),
    65: createOpacitySchema('65'),
    70: createOpacitySchema('70'),
    75: createOpacitySchema('75'),
    80: createOpacitySchema('80'),
    85: createOpacitySchema('85'),
    90: createOpacitySchema('90'),
    95: createOpacitySchema('95'),
    100: createOpacitySchema('100'),
  })
  .strict();
