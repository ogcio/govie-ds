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
    default: zod.string({
      description: 'Label for default value',
      required_error: 'The label for default error is required',
    }),
    items: zod
      .string({
        description: 'Array of string for the label of the options',
        required_error: 'The label of the items are required',
      })
      .array(),
  }),
  hint: hintTextSchema,
  error: errorTextSchema,
});

export type SelectProps = zod.infer<typeof selectSchema>;
