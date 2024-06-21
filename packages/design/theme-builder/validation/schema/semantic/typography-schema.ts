import { z } from 'zod';
import { createAliasSchema, createTokenSchema } from '../shared.js';

function createFontSchema(name: string) {
  return createTokenSchema({
    type: 'typography',
    valueSchema: z.object({
      fontFamily: createAliasSchema('fontFamily'),
      fontSize: createAliasSchema('fontSize'),
      fontWeight: createAliasSchema('fontWeight'),
      lineHeight: createAliasSchema('lineHeight'),
    }),
    name,
  });
}

function createResponsiveHeadingSchema() {
  return z
    .object(
      {
        '4xl': createFontSchema('4xl'),
        '3xl': createFontSchema('3xl'),
        '2xl': createFontSchema('2xl'),
        xl: createFontSchema('xl'),
        lg: createFontSchema('lg'),
        md: createFontSchema('md'),
      },
      {
        required_error: 'heading is required.',
      },
    )
    .strict();
}

function createResponsiveTextSchema() {
  return z
    .object(
      {
        xl: createFontSchema('xl'),
        lg: createFontSchema('lg'),
        md: createFontSchema('md'),
        sm: createFontSchema('sm'),
        xs: createFontSchema('xs'),
      },
      {
        required_error: 'text is required.',
      },
    )
    .strict();
}

function createResponsiveTypographySchema(name: string) {
  return z
    .object(
      {
        heading: createResponsiveHeadingSchema(),
        text: createResponsiveTextSchema(),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const typographySchema = z
  .object(
    {
      default: createResponsiveTypographySchema('default'),
      xs: createResponsiveTypographySchema('xs'),
      md: createResponsiveTypographySchema('md'),
      xl: createResponsiveTypographySchema('xl'),
    },
    {
      required_error: 'typography is required.',
    },
  )
  .strict();
