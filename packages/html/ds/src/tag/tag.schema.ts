import * as zod from 'zod';

export enum TagType {
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  counter = 'counter',
  counterWarning = 'counterWarning',
}

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
    .string({
      description: 'Defines the visual style and color of the tag.',
    })
    .optional(),
  className: zod.string({ description: 'Add additional classes' }).optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type TagProps = zod.infer<typeof tagSchema>;
