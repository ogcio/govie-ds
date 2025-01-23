import * as zod from 'zod';
import { headingSchema } from '../heading/heading.schema';

const validAriaProps = [
  'aria-modal',
  'aria-hidden',
  'aria-labelledby',
  'aria-describedby',
  'aria-live',
  'aria-label',
] as const;

export const titleSchema = headingSchema.omit({ as: true });

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
  triggerButton: zod
    .string({
      description: 'The button used for opening the modal',
    })
    .optional(),
  closeButtonLabel: zod
    .string({
      description: 'The custom label for close button',
    })
    .optional(),
  title: titleSchema.optional(),
  body: zod.string({
    description: 'The main content or body of the modal',
  }),
  footer: zod
    .string({
      description: 'The footer content of the modal',
    })
    .optional(),
  isOpen: zod
    .boolean({
      description: 'Set the modal to open',
    })
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type ModalProps = zod.infer<typeof modalSchema>;
