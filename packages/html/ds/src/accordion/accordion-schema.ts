import * as zod from 'zod';

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
});

export const accordionSchema = zod.object({
  iconStart: zod
    .boolean({
      description: 'specify if the icon should be on the start of the trigger',
    })
    .optional(),
  items: zod
    .array(accordionItemSchema)
    .describe('Array of the accordion items'),
});

export type AccordionProps = zod.infer<typeof accordionSchema>;
