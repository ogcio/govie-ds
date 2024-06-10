import { z } from 'zod';
import { createPixelSchema, createTokenSchema } from '../shared.js';

function createScreenSchema(name: string) {
  return createTokenSchema({
    type: 'dimension',
    valueSchema: createPixelSchema('screen'),
    name,
  });
}

export const screenSchema = z
  .object({
    xs: createScreenSchema('xs'),
    sm: createScreenSchema('sm'),
    md: createScreenSchema('md'),
    lg: createScreenSchema('lg'),
    xl: createScreenSchema('xl'),
    '2xl': createScreenSchema('2xl'),
  })
  .strict();
