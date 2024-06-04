import { z } from 'zod';
import {
  createNumberSchema,
  createRemSchema,
  createStringArraySchema,
  createTokenSchema,
} from './shared.js';

function createTypographyValueSchema(name: string) {
  return z
    .object(
      {
        fontFamily: createStringArraySchema('Font family'),
        fontSize: createRemSchema('Font size'),
        fontWeight: createNumberSchema('Font weight'),
        lineHeight: createNumberSchema('Line height'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

function createTypographySchema(name: string) {
  return createTokenSchema({
    type: 'typography',
    valueSchema: createTypographyValueSchema(name),
    name,
  });
}

function createTypographySetSchema(name: string) {
  return z
    .object(
      {
        regular: createTypographySchema('regular'),
        bold: createTypographySchema('bold'),
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
