import { z } from 'zod';
import { createTypographySchema } from '../shared.js';

function createTypographySetSchema(name: string) {
  return z
    .object(
      {
        sm: createTypographySchema('sm'),
        md: createTypographySchema('md'),
        lg: createTypographySchema('lg'),
        xl: createTypographySchema('xl'),
        '2xl': createTypographySchema('2xl'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const textSchema = z
  .object(
    {
      regular: createTypographySetSchema('regular'),
      bold: createTypographySetSchema('bold'),
    },
    {
      required_error: 'Text is required.',
    },
  )
  .strict();
