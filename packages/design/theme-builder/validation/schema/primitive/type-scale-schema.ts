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

function createHeadingScaleSchema(name: string) {
  return z
    .object(
      {
        '100': createFontSchema('100'),
        '200': createFontSchema('200'),
        '300': createFontSchema('300'),
        '400': createFontSchema('400'),
        '500': createFontSchema('500'),
        '600': createFontSchema('600'),
        '700': createFontSchema('700'),
        '800': createFontSchema('800'),
        '900': createFontSchema('900'),
        '1000': createFontSchema('1000'),
        '1100': createFontSchema('1100'),
        '1200': createFontSchema('1200'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

function createHeadingTypeScaleSchema(name: string) {
  return z
    .object(
      {
        regular: createHeadingScaleSchema('regular'),
        bold: createHeadingScaleSchema('bold'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

function createTextTypeScaleSchema(name: string) {
  return z
    .object(
      {
        100: createFontSchema('100'),
        200: createFontSchema('200'),
        300: createFontSchema('300'),
        400: createFontSchema('400'),
        500: createFontSchema('500'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const typeScaleSchema = z
  .object(
    {
      heading: createHeadingTypeScaleSchema('heading'),
      text: createTextTypeScaleSchema('text'),
    },
    {
      required_error: 'typography is required.',
    },
  )
  .strict();
