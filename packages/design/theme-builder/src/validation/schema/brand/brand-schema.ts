import { z } from 'zod';
import {
  createAliasSchema,
  createColorHexSchema,
  createColorSwatchSetSchema,
  createTokenSchema,
} from '../shared.js';

function createBrandColorSchema(name: string) {
  return z
    .object(
      {
        emerald: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'emerald',
        }),
        gray: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'gray',
        }),
        blue: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'blue',
        }),
        red: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'red',
        }),
        yellow: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'yellow',
        }),
        green: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'green',
        }),
        purple: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(name),
          name: 'purple',
        }),
      },
      { required_error: `${name} is required.` },
    )
    .strict();
}

const supportSchema = z
  .object(
    Object.fromEntries(
      ['error', 'warning', 'success', 'info', 'focus'].map((type) => [
        type,
        createColorSwatchSetSchema(`support.${type}`, true),
      ]),
    ),
  )
  .strict();

const utilitySchema = z
  .object({
    'convention-alt': createColorSwatchSetSchema(
      'utility.convention-alt',
      true,
    ),
    convention: createColorSwatchSetSchema('utility.convention', true),
  })
  .strict();

const colorSchema = z
  .object({
    brand: createBrandColorSchema('brand'),
    primary: createColorSwatchSetSchema('primary', true),
    secondary: createColorSwatchSetSchema('secondary', true),
    neutral: createColorSwatchSetSchema('neutral', true).merge(
      z
        .object(
          {
            white: createTokenSchema({
              type: 'color',
              valueSchema: createColorHexSchema(),
              name: 'white',
            }),
            black: createTokenSchema({
              type: 'color',
              valueSchema: createColorHexSchema(),
              name: 'black',
            }),
          },
          { required_error: `neutral is required.` },
        )
        .strict(),
    ),
    support: supportSchema,
    utility: utilitySchema,
  })
  .strict();

export const brandSchema = z
  .object(
    {
      color: colorSchema,
    },
    { required_error: 'brand is required.' },
  )
  .strict();
