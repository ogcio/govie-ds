import { z } from 'zod';
import { createColorHexSchema, createTokenSchema } from '../shared.js';

function createColorSchema(name: string) {
  return createTokenSchema({
    type: 'color',
    valueSchema: createColorHexSchema(),
    name,
  });
}

function createColorSwatchSetSchema(name: string) {
  return z
    .object(
      {
        '50': createColorSchema('50'),
        '100': createColorSchema('100'),
        '200': createColorSchema('200'),
        '300': createColorSchema('300'),
        '400': createColorSchema('400'),
        '500': createColorSchema('500'),
        '600': createColorSchema('600'),
        '700': createColorSchema('700'),
        '800': createColorSchema('800'),
        '900': createColorSchema('900'),
        '950': createColorSchema('950'),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export const colorSchema = z
  .object(
    {
      gray: createColorSwatchSetSchema('gray'),
      blue: createColorSwatchSetSchema('blue'),
      red: createColorSwatchSetSchema('red'),
      yellow: createColorSwatchSetSchema('yellow'),
      green: createColorSwatchSetSchema('green'),
      emerald: createColorSwatchSetSchema('emerald'),
      purple: createColorSwatchSetSchema('purple'),
      gold: createColorSwatchSetSchema('gold'),
    },
    {
      required_error: 'Color is required.',
    },
  )
  .strict();
