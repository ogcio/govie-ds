import * as zod from 'zod';

export const headerSchema = zod.object({
  navLinks: zod
    .object({
      label: zod.string({
        description: 'The label of the link',
        required_error: 'The label is required',
      }),
      href: zod.string({
        description: 'The url (href) of the link',
        required_error: 'The url is required',
      }),
    })
    .array()
    .describe('List of the navigation links')
    .optional(),
  languages: zod
    .object({
      label: zod.string({
        description: 'The label of the language',
        required_error: 'The label is required',
      }),
      href: zod.string({
        description: 'The url (href) of the language page',
        required_error: 'The url is required',
      }),
    })
    .array()
    .describe('List of secondary navigation links')
    .optional(),
});

export type HeaderProps = zod.infer<typeof headerSchema>;
