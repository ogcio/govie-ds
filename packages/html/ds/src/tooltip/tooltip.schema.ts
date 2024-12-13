import * as zod from 'zod';

export const tooltipSchema = zod.object({
  text: zod
    .string({
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
      description: 'Defines the position of the tooltip relative to the target element.',
    })
    .default('top'),
  id: zod
    .string({
      description: 'Sets the ID for the tooltip, used for accessibility.',
    })
    .optional(),
  ariaLabel: zod
    .string({
      description: 'Provides an accessible name for the tooltip.',
    })
    .optional(),
  ariaDescribedBy: zod
    .string({
      description: 'Provides an accessible aria described by property for the tooltip.',
    })
    .optional(),
});

export type TooltipProps = zod.infer<typeof tooltipSchema>;