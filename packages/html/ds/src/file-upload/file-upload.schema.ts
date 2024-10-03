import * as zod from 'zod';
import { errorTextSchema } from '../error-text/error-text.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

// Main FileUpload schema
export const fileUploadSchema = zod.object({
  id: zod.string({
    description: 'Unique ID for the file input field.',
    required_error: 'ID is required',
  }),
  label: labelSchema.describe('File upload label').optional(),
  hint: hintTextSchema.describe('Hint text below label').optional(),
  error: errorTextSchema
    .describe('Error text below label or hint if provided')
    .optional(),
  accept: zod
    .string({
      description: 'Accepted file types (e.g., image/*, application/pdf).',
    })
    .optional(),
  name: zod
    .string({
      description:
        'Specifies the name of the file input field, used for form submission identification.',
    })
    .optional(),
});

export type FileUploadProps = zod.infer<typeof fileUploadSchema>;
