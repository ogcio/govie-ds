import * as zod from 'zod';
import { labelSchema } from '../label/label.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { errorTextSchema } from '../error-text/error-text.schema';

export const textAreaSchema = zod.object({
  hasError: zod
    .boolean({
      description:
        'Indicates whether the textarea should be displayed in an error state. When `true`, the border color will be red.',
    })
    .optional(),
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
  label: labelSchema.optional(),
  hintText: hintTextSchema.optional(),
  errorText: errorTextSchema.optional(),
});

export type TextareaProps = zod.infer<typeof textAreaSchema>;
