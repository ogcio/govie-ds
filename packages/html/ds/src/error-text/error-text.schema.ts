import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const ErrorSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export const errorTextSchema = zod.object({
  content: zod.string({
    description: 'Content for error text',
    required_error: 'content is required',
  }),
  size: zod
    .enum(getEnumValues(ErrorSize), {
      description: 'Size of the error text.',
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

export type ErrorTextProps = zod.infer<typeof errorTextSchema>;
