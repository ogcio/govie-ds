import { z } from 'zod';
import { colorSchema } from './color-schema.js';
import { spaceSchema } from './space-schema.js';
import { fontSchema } from './font-schema.js';
import { screenSchema } from './screen-schema.js';
import { zIndexSchema } from './z-index-schema.js';
import { borderSchema } from './border-schema.js';
import { opacitySchema } from './opacity-schema.js';
import { shadowSchema } from './shadow-schema.js';

export const primitiveSchema = z
  .object(
    {
      color: colorSchema,
      space: spaceSchema,
      font: fontSchema,
      screen: screenSchema,
      zIndex: zIndexSchema,
      border: borderSchema,
      opacity: opacitySchema,
      shadow: shadowSchema,
    },
    { required_error: 'Primitive is required.' },
  )
  .strict();
