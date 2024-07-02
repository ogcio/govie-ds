import { z } from 'zod';
import { borderSchema } from './border-schema.js';
import { colorSchema } from './color-schema.js';
import { fontSchema } from './font-schema.js';
import { opacitySchema } from './opacity-schema.js';
import { screenSchema } from './screen-schema.js';
import { shadowSchema } from './shadow-schema.js';
import { sizeSchema } from './size-schema.js';
import { spaceSchema } from './space-schema.js';
import { typeScaleSchema } from './type-scale-schema.js';
import { zIndexSchema } from './z-index-schema.js';

export const primitiveSchema = z
  .object(
    {
      color: colorSchema,
      font: fontSchema,
      typeScale: typeScaleSchema,
      screen: screenSchema,
      space: spaceSchema,
      size: sizeSchema,
      border: borderSchema,
      shadow: shadowSchema,
      opacity: opacitySchema,
      zIndex: zIndexSchema,
    },
    { required_error: 'primitive is required.' },
  )
  .strict();
