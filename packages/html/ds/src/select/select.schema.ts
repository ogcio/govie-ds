import * as zod from 'zod';
import { errorTextSchema } from '../error-text/error-text.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

export const selectSchema = zod.object({
  id: zod.string({
    description: 'A unique ID for the select component',
    required_error: 'A value is required',
  }),
  label: labelSchema.describe('Properties for the label component').optional(),
  options: zod
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
  hint: hintTextSchema.describe('Properties for the hint component').optional(),
  error: errorTextSchema
    .describe('Properties for the erro component')
    .optional(),
});

export type SelectProps = zod.infer<typeof selectSchema>;
