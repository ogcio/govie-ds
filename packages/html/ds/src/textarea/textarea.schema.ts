import * as zod from 'zod';
import { errorTextSchema } from '../error-text/error-text.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

export const textAreaSchema = zod.object({
  rows: zod
    .number({
      description: 'Sets the number of rows (height) of the textarea.',
    })
    .optional(),
  cols: zod
    .number({
      description: 'Sets the number of columns (width) of the textarea.',
    })
    .optional(),
  autoComplete: zod
    .string({
      description: 'Sets the autocomplete behavior for the textarea.',
    })
    .optional(),
  id: zod
    .string({
      description:
        'Sets the ID for the textarea, used for accessibility and to link with the label.',
    })
    .optional(),
  maxChars: zod
    .number({
      description: 'Sets a number of characters allowed.',
    })
    .optional(),
  label: labelSchema.describe('Label for textarea').optional(),
  hint: hintTextSchema.describe('Hint for textarea').optional(),
  error: errorTextSchema
    .describe('Set error boundaries for texarea')
    .optional(),
  disabled: zod.boolean({ description: 'Disabled state' }).optional(),
});

export type TextareaProps = zod.infer<typeof textAreaSchema>;
