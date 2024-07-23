import { z } from 'zod';
import { typographySchema } from './typography-schema.js';

export const semanticSchema = z
  .object(
    {
      typography: typographySchema,
    },
    { required_error: 'semantic is required.' },
  )
  .strict();
