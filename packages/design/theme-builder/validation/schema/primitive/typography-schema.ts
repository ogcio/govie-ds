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

function createTypographyScaleSchema(name: string) {
  return z
    .object(
      {
        '2xs': createFontSchema('2xs'),
        xs: createFontSchema('xs'),
        sm: createFontSchema('sm'),
        md: createFontSchema('md'),
        lg: createFontSchema('lg'),
        xl: createFontSchema('xl'),
        '2xl': createFontSchema('2xl'),
        '3xl': createFontSchema('3xl'),
        '4xl': createFontSchema('4xl'),
        '5xl': createFontSchema('5xl'),
        '6xl': createFontSchema('6xl'),
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
      regular: createTypographyScaleSchema('regular'),
      bold: createTypographyScaleSchema('bold'),
    },
    {
      required_error: 'typography is required.',
    },
  )
  .strict();
