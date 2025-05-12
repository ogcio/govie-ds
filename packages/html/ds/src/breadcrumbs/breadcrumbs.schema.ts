import * as zod from 'zod';

export const BreadcrumbsItemSchema = zod
  .object({
    label: zod
      .string({ description: 'The label for the breadcrumb item' })
      .optional(),
    href: zod
      .string({ description: 'The URL the breadcrumb item points to' })
      .optional(),
    ellipsis: zod
      .boolean({
        description:
          'Specify if the breadcrumb item should be displayed as an ellipsis',
      })
      .optional(),
    currentPage: zod
      .boolean({
        description: 'Indicates if this breadcrumb item is the current page',
      })
      .optional(),
  })
  .refine(
    (data) => data.ellipsis || (data.label && data.href) || data.currentPage,
    {
      message:
        'Each breadcrumb item must have ellipsis, label and href, or currentPage',
    },
  );

export const BreadcrumbsArraySchema = zod.object({
  navItems: zod.array(BreadcrumbsItemSchema, {
    description: 'List of nav items',
  }),
  iconStart: zod
    .boolean({
      description: 'Indicates whether an icon is displayed at the start.',
    })
    .optional(),
});

export type BreadcrumbsProps = zod.infer<typeof BreadcrumbsArraySchema>;
