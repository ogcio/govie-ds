import { z as zod } from 'zod';

export const Alignment = zod.enum(['start', 'center', 'end'], {
  description: 'Alignment of items.',
});

export const Distribution = zod.enum(
  ['start', 'center', 'end', 'between', 'around', 'evenly'],
  {
    description: 'Distribution of items.',
  },
);

export const SimpleDirection = zod.enum(['column', 'row'], {
  description: 'Flex directions.',
});

export const Direction = zod.union(
  [
    SimpleDirection,
    zod.object({
      base: SimpleDirection.optional(),
      xs: SimpleDirection.optional(),
      sm: SimpleDirection.optional(),
      md: SimpleDirection.optional(),
      lg: SimpleDirection.optional(),
      xl: SimpleDirection.optional(),
      '2xl': SimpleDirection.optional(),
    }),
  ],
  {
    description: 'Flex direction.',
  },
);

export const Gap = zod.union(
  [
    zod.number({
      description: 'Gap value.',
    }),
    zod.object({
      base: zod.number().optional(),
      xs: zod.number().optional(),
      sm: zod.number().optional(),
      md: zod.number().optional(),
      lg: zod.number().optional(),
      xl: zod.number().optional(),
      '2xl': zod.number().optional(),
    }),
  ],
  {
    description: 'Gap between items.',
  },
);

export const StackSchema = zod.object({
  direction: Direction.optional(),
  gap: Gap.optional(),
  itemsAlignment: Alignment.optional(),
  itemsDistribution: Distribution.optional(),
  wrap: zod
    .boolean({
      description: 'Wrap or nowrap option.',
    })
    .optional(),
  fixedHeight: zod
    .string({
      description: 'Fixed height for the stack container.',
    })
    .optional(),
  hasDivider: zod
    .boolean({
      description: 'Dividers between items.',
    })
    .optional(),
  children: zod.array(
    zod.string({
      description: 'HTML content or string representation of the child.',
    }),
    {
      description: 'An array of children elements.',
    },
  ),
});

export type StackProps = zod.infer<typeof StackSchema>;
