import * as zod from 'zod';

const accordionValidAriaProps = ['aria-label'] as const;

const accordionItemValidAriaProps = [
  'aria-expanded',
  'aria-controls',
  'aria-disabled',
  'aria-labelledby',
] as const;

export const AccordionVariant = {
  Small: 'small',
  Default: 'default',
} as const;

export const accordionAriaSchema = zod.record(
  zod.enum(accordionValidAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const accordionItemAriaSchema = zod.record(
  zod.enum(accordionItemValidAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

const accordionItemSchema = zod.object({
  label: zod.string({ description: 'Set the title of the accordion Item' }),
  content: zod.string({ description: 'Set the content of the accordion' }),
  defaultExpanded: zod
    .boolean({
      description:
        'Specify if the accordion item should be expanded by default',
    })
    .optional(),
  disabled: zod
    .boolean({
      description: 'Specify if the accordion item should be disabled',
    })
    .optional(),
  aria: accordionItemAriaSchema
    .describe('Defines the aria attributes')
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export const accordionSchema = zod.object({
  iconStart: zod
    .boolean({
      description: 'specify if the icon should be on the start of the trigger',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
  items: zod
    .array(accordionItemSchema)
    .describe('Array of the accordion items'),
  aria: accordionAriaSchema.describe('Defines the aria attributes').optional(),
  variant: zod.enum(Object.values(AccordionVariant) as any, {
    description: 'Defines if is a small or default accordion size',
  }),
});

export type AccordionProps = zod.infer<typeof accordionSchema>;
