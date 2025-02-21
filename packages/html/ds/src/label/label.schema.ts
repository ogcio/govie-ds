import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const labelSchema = zod.object({
  content: zod.string({
    description: 'Content for label',
    required_error: 'content is required',
  }),
  size: zod
    .enum(getEnumValues(LabelSize), {
      description: 'Size of label.',
    })
    .optional(),
  for: zod
    .string({
      description:
        'Ensures the label is properly associated with the corresponding input element.',
    })
    .optional(),
  classNames: zod
    .string({
      description: 'Add additional classes',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type LabelProps = zod.infer<typeof labelSchema>;
