import * as zod from 'zod';
import { labelSchema } from '../label/label.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { errorTextSchema } from '../error-text/error-text.schema';

export const selectSchema = zod.object({
  id: zod.string({
    description: 'A unique ID for the select component',
    required_error: 'A value is required',
  }),
  label: labelSchema,
  options: zod.object({
    default: zod.object({
      label: zod.string({
        description: 'Label for default option',
        required_error: 'The label for default error is required',
      }),
      value: zod.string({
        description: 'Value for the default option',
      }),
    }),
    items: zod
      .object({
        label: zod.string({
          description: 'Label for the option',
          required_error: 'The label for the option is required',
        }),
        value: zod.string({
          description: 'Value for the option',
          required_error: 'The value for the option is required',
        }),
      })
      .array()
      .describe('Array of options with labels and values'),
  }),
  hint: hintTextSchema.optional(),
  error: errorTextSchema.optional(),
});

export type SelectProps = zod.infer<typeof selectSchema>;
