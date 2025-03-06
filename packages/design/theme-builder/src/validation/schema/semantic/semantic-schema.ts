import { z } from 'zod';
import { surfaceSchema } from './surface-schema.js';
import { typographySchema } from './typography-schema.js';

export const semanticSchema = z
  .object(
    {
      typography: typographySchema,
      surface: surfaceSchema,
    },
    { required_error: 'semantic is required.' },
  )
  .strict();
