import { z } from 'zod';
import { createColorSchema, createColorSwatchSetSchema } from '../shared.js';

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
      base: z.object(
        {
          emerald: createColorSchema('emerald'),
          gray: createColorSchema('gray'),
          blue: createColorSchema('blue'),
          red: createColorSchema('red'),
          yellow: createColorSchema('yellow'),
          green: createColorSchema('green'),
          purple: createColorSchema('purple'),
          white: createColorSchema('white'),
          transparent: createColorSchema('transparent'),
          black: createColorSchema('black'),
        },
        {
          required_error: `base color is required.`,
        },
      ),
    },
    {
      required_error: 'color is required.',
    },
  )
  .strict();
