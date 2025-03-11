import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const hintTextSchema = zod.object({
  content: zod.string({
    description: 'Content for hint text',
    required_error: 'content is required',
  }),
  size: zod
    .enum(getEnumValues(HintSize), {
      description: 'Size of the hint text.',
    })
    .optional(),
  className: zod
    .string({
      description: 'Add additional classes',
    })
    .optional(),
});

export type HintTextProps = zod.infer<typeof hintTextSchema>;
