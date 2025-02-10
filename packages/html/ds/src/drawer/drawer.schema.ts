import * as zod from 'zod';

const validAriaProps = [
  'aria-modal',
  'aria-hidden',
  'aria-labelledby',
  'aria-describedby',
  'aria-live',
  'aria-label',
] as const;

const validPositions = ['left', 'right', 'bottom'] as const;
const validCloseButtonSizes = ['small', 'medium', 'large'] as const;

export const ariaSchema = zod.record(
  zod.enum(validAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const drawerSchema = zod.object({
  className: zod
    .string({
      description: 'Optional custom class name for styling',
    })
    .optional(),
  closeButtonLabel: zod
    .string({
      description: 'Custom label for the close button',
    })
    .optional(),
  triggerButton: zod
    .string({
      description: 'The button used for opening the drawer (HTML string)',
    })
    .optional(),
  startsOpen: zod
    .boolean({
      description: 'Determines if the drawer is initially open',
    })
    .optional(),
  position: zod
    .enum(validPositions, {
      description: 'Drawer position relative to the screen',
    })
    .optional(),
  closeButtonSize: zod
    .enum(validCloseButtonSizes, {
      description: 'Size of the close button',
    })
    .optional(),
  body: zod
    .string({
      description: 'Drawer body content as an HTML string (macro)',
    })
    .optional(),
  footer: zod
    .string({
      description: 'Drawer body content as an HTML string (macro)',
    })
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type DrawerProps = zod.infer<typeof drawerSchema>;
