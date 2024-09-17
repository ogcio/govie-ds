import * as zod from 'zod';

export const headerSchema = zod.object({
  noJsMenuLink: zod.string({
    description:
      'The link of the menu page when there is no Javascript enabled',
    required_error:
      'The link is required for the fallback case where Javascript is disabled',
  }),
  noJsSearchLink: zod.string({
    description:
      'The link of the search page when there is no Javascript enabled',
    required_error:
      'The link is required for the fallback case where Javascript is disabled',
  }),
  logoLink: zod.string({
    description: 'The link of the logo',
    required_error: 'The link of the logo is required',
  }),
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
