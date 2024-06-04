import { z } from 'zod';
import { createTypographySetSchema } from './shared.js';

export const textSchema = z
  .object(
    {
      sm: createTypographySetSchema('sm'),
      md: createTypographySetSchema('md'),
      lg: createTypographySetSchema('lg'),
      xl: createTypographySetSchema('xl'),
      '2xl': createTypographySetSchema('2xl'),
    },
    {
      required_error: 'Text is required.',
    },
  )
  .strict();
