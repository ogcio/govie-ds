import { z } from 'zod';
import { createShadowValueSchema, createTokenSchema } from '../shared.js';

function createShadowSchema(name: string) {
  return createTokenSchema({
    type: 'shadow',
    valueSchema: createShadowValueSchema('shadow'),
    name,
  });
}

export const shadowSchema = z
  .object({
    100: createShadowSchema('100'),
    200: createShadowSchema('200'),
    300: createShadowSchema('300'),
    400: createShadowSchema('400'),
    500: createShadowSchema('500'),
    600: createShadowSchema('600'),
  })
  .strict();
