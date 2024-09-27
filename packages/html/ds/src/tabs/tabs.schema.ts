import * as zod from 'zod';

export const tabsSchema = zod.object({
  ariaLabel: zod.string({
    description: 'The aria-label of the tab',
    required_error: 'The aria-label is required',
  }),
  items: zod
    .array(
      zod.object({
        label: zod.string({
          description: 'The label of the tab',
          required_error: 'The label is required',
        }),
        href: zod.string().describe('The link related to the tab').optional(),
        checked: zod
          .boolean()
          .describe('Define if the item is selected')
          .optional(),
        panel: zod
          .object({
            html: zod.string().describe('The html content').optional(),
            text: zod
              .string()
              .describe('The text content, will be wrapped into a Paragraph')
              .optional(),
          })
          .describe('Tab Panel content'),
      }),
    )
    .describe('Tab Items'),
});

export type TabsProps = zod.infer<typeof tabsSchema>;