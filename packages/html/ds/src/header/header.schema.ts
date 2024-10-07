import * as zod from 'zod';

export const headerSchema = zod.object({
  title: zod
    .string({
      description: 'The application title',
    })
    .optional(),
  logo: zod
    .object({
      image: zod
        .string({
          description:
            'The application logo, a GOV.IE default one will be used if missing',
        })
        .optional(),
      href: zod
        .string({
          description: 'The link applied to the logo',
        })
        .optional(),
    })
    .describe('Application logo')
    .optional(),
  tools: zod
    .object({
      search: zod
        .object({
          action: zod
            .string({
              description: 'The search form action url',
            })
            .optional(),
          label: zod
            .string({
              description: 'The search label, default is "Search"',
            })
            .optional(),
          icon: zod
            .string({
              description: 'The search icon, default is icon "search"',
            })
            .optional(),
          noJsSearchLink: zod
            .string({
              description:
                'The link of the search page when there is no Javascript enabled',
            })
            .optional(),
        })
        .describe('Search tool options')
        .optional(),
      menu: zod
        .object({
          label: zod
            .string({
              description: 'The menu label, default is hide',
            })
            .optional(),
          icon: zod
            .string({
              description: 'The menu icon, default is icon "icon-hamburger"',
            })
            .optional(),
          noJsMenuLink: zod
            .string({
              description:
                'The link of the menu page when there is no Javascript enabled',
            })
            .optional(),
        })
        .describe('Menu tool options')
        .optional(),
      items: zod
        .object({
          label: zod
            .string({
              description: 'The label of the item',
            })
            .optional(),
          icon: zod
            .string({
              description: 'The icon of the item',
              required_error: 'The icon is required',
            })
            .optional(),
          href: zod.string({
            description: 'The url (href) of the item',
            required_error: 'The url is required',
          }),
        })
        .array()
        .describe('List of tool items')
        .optional(),
    })
    .describe('Toolbox items')
    .optional(),
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
