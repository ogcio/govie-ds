import { z } from 'zod';
import { colorSchema } from './color-schema.js';
import { surfaceSchema } from './surface-schema.js';
import { typographySchema } from './typography-schema.js';

export const semanticSchema = z
  .object(
    {
      typography: typographySchema,
      surface: surfaceSchema,
      color: colorSchema,
    },
    { required_error: 'semantic is required.' },
  )
  .strict();
