import * as zod from 'zod';

const validAriaProps = ['aria-describedby', 'aria-live', 'aria-label'] as const;

export const ariaSchema = zod.record(
  zod.enum(validAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const tooltipSchema = zod.object({
  text: zod.string({
    description: 'The main text or content of the tooltip.',
  }),
  content: zod
    .union([
      zod.string({
        description: 'Optional content to be wrapped by the tooltip.',
      }),
      zod.null(),
    ])
    .optional(),
  position: zod
    .enum(['top', 'bottom', 'left', 'right'], {
      description:
        'Defines the position of the tooltip relative to the target element.',
    })
    .default('top'),
  id: zod
    .string({
      description: 'Sets the ID for the tooltip, used for accessibility.',
    })
    .optional(),
  dataTestid: zod.string({
      description: 'Test id for the component.',
    }).optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type TooltipProps = zod.infer<typeof tooltipSchema>;
