import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const TagType = {
  Default: 'default',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Counter: 'counter',
  CounterWarning: 'counterWarning',
} as const;

const validAriaProps = [
  'aria-label',
  'aria-describedby',
  'aria-hidden',
  'aria-live',
  'aria-role',
] as const;

export const ariaSchema = zod.record(
  zod.enum(validAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const tagSchema = zod.object({
  text: zod.string({
    description: 'Content for tag',
    required_error: 'content is required',
  }),
  type: zod
    .enum(getEnumValues(TagType), {
      description: 'Defines the visual style and color of the tag.',
    })
    .optional(),
  className: zod.string({ description: 'Add additional classes' }).optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type TagProps = zod.infer<typeof tagSchema>;
