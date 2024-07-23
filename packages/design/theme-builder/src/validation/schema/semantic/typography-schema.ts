import { z } from 'zod';
import { createAliasSchema, createTokenSchema } from '../shared.js';

function createTypographySchema(name: string) {
  return createTokenSchema({
    type: 'typography',
    valueSchema: createAliasSchema(name),
    name,
  });
}

function createResponsiveHeadingSchema() {
  return z
    .object(
      {
        xl: createTypographySchema('xl'),
        lg: createTypographySchema('lg'),
        md: createTypographySchema('md'),
        sm: createTypographySchema('sm'),
        xs: createTypographySchema('xs'),
        ['2xs']: createTypographySchema('2xs'),
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
        lg: createTypographySchema('lg'),
        md: createTypographySchema('md'),
        sm: createTypographySchema('sm'),
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
