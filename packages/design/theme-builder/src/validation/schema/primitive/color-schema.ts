import { z } from 'zod';
import { createColorSchema, createColorSwatchSetSchema } from '../shared.js';

const knownColorSchema = z.object({
  gray: createColorSwatchSetSchema('gray'),
  blue: createColorSwatchSetSchema('blue'),
  red: createColorSwatchSetSchema('red'),
  yellow: createColorSwatchSetSchema('yellow'),
  green: createColorSwatchSetSchema('green'),
  emerald: createColorSwatchSetSchema('emerald'),
  purple: createColorSwatchSetSchema('purple'),
  gold: createColorSwatchSetSchema('gold'),
  base: z
    .object({
      emerald: createColorSchema('emerald'),
      gold: createColorSchema('gold'),
      gray: createColorSchema('gray'),
      blue: createColorSchema('blue'),
      red: createColorSchema('red'),
      yellow: createColorSchema('yellow'),
      green: createColorSchema('green'),
      purple: createColorSchema('purple'),
      white: createColorSchema('white'),
      transparent: createColorSchema('transparent'),
      black: createColorSchema('black'),
    })
    .strict(),
});

export const colorSchema = z.any().superRefine((value, context) => {
  if (
    typeof value !== 'object' ||
    value === null ||
    Object.keys(value)?.length == 0
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'color is required.',
    });
    return;
  }

  const knownResult = knownColorSchema.safeParse(value);
  if (knownResult.success) {
    return;
  }

  // validation for dynamic colors e.g: brown. It should match with createColorSwatchSetSchema
  for (const [key, swatch] of Object.entries(value)) {
    const result = createColorSwatchSetSchema(key).safeParse(swatch);
    if (!result.success) {
      for (const error of result.error.errors) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key, ...(error.path || [])],
          message: error.message,
        });
      }
    }
  }
});
