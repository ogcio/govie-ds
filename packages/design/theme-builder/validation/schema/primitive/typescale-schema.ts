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

function createHeadingTypescaleSchema(name: string) {
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
        '7xl': createFontSchema('7xl'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

function createTextTypescaleSchema(name: string) {
  return z.object({
    xs: createFontSchema('xs'),
    sm: createFontSchema('sm'),
    md: createFontSchema('md'),
    lg: createFontSchema('lg'),
    xl: createFontSchema('xl'),
  });
}

export const typescaleSchema = z

  .object(
    {
      heading: createHeadingTypescaleSchema('heading'),
      text: createTextTypescaleSchema('text'),
    },
    {
      required_error: 'typography is required.',
    },
  )
  .strict();
