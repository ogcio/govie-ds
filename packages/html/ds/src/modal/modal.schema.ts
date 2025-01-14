import * as zod from 'zod';

const validAriaProps = [
  'aria-modal',
  'aria-hidden',
  'aria-labelledby',
  'aria-describedby',
  'aria-live',
  'aria-label'
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

export const modalSchema = zod.object({
  html: zod.string({
    description: 'The content of the modal',
    required_error: 'The content is required',
  }),
  triggerButton: zod
    .string({
      description: 'The button used for opening the modal',
    })
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type ModalProps = zod.infer<typeof modalSchema>;
