import { z } from 'zod';
import {
  createNumberSchema,
  createRemSchema,
  createStringArraySchema,
  createTokenSchema,
} from './shared.js';

function createTypographyValueSchema(name: string) {
  return z.object({
    fontFamily: createStringArraySchema('Font family'),
    fontSize: createRemSchema('Font size'),
    fontWeight: createNumberSchema('Font weight'),
    lineHeight: createNumberSchema('Line height'),
  });
}

function createTypographySchema(name: string) {
  return createTokenSchema({
    type: 'typography',
    valueSchema: createTypographyValueSchema(name),
    name,
  });
}

export const headingSchema = z
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
      required_error: 'Heading is required.',
    },
  )
  .strict();
