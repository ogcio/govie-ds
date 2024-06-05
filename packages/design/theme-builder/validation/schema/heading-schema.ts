import { z } from 'zod';
import { createTypographySchema } from './shared.js';

function createTypographySetSchema(name: string) {
  return z
    .object(
      {
        '2xs': createTypographySchema('2xs'),
        xs: createTypographySchema('xs'),
        sm: createTypographySchema('sm'),
        md: createTypographySchema('md'),
        lg: createTypographySchema('lg'),
        xl: createTypographySchema('xl'),
        '2xl': createTypographySchema('2xl'),
        '3xl': createTypographySchema('3xl'),
        '4xl': createTypographySchema('4xl'),
        '5xl': createTypographySchema('5xl'),
        '6xl': createTypographySchema('6xl'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const headingSchema = z
  .object(
    {
      regular: createTypographySetSchema('regular'),
      bold: createTypographySetSchema('bold'),
    },
    {
      required_error: 'Heading is required.',
    },
  )
  .strict();
