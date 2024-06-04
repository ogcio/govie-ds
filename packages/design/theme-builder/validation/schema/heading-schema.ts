import { z } from 'zod';
import { createTypographySetSchema } from './shared.js';

export const headingSchema = z
  .object(
    {
      '2xs': createTypographySetSchema('2xs'),
      xs: createTypographySetSchema('xs'),
      sm: createTypographySetSchema('sm'),
      md: createTypographySetSchema('md'),
      lg: createTypographySetSchema('lg'),
      xl: createTypographySetSchema('xl'),
      '2xl': createTypographySetSchema('2xl'),
      '3xl': createTypographySetSchema('3xl'),
      '4xl': createTypographySetSchema('4xl'),
      '5xl': createTypographySetSchema('5xl'),
      '6xl': createTypographySetSchema('6xl'),
    },
    {
      required_error: 'Heading is required.',
    },
  )
  .strict();
