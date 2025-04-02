import * as zod from 'zod';

export const tabsSchema = zod.object({
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
            content: zod.string().describe('The html content').optional(),
          })
          .describe('Tab Panel content'),
      }),
    )
    .describe('Tab Items'),
});

export type TabsProps = zod.infer<typeof tabsSchema>;
