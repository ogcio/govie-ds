import * as zod from 'zod';

export const footerSchema = zod.object({
  links: zod
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
    .optional()
    .describe(
      'Array of main links used in Footer. The links use the govieLink component therefore the properties are inhertied from govieLink',
    ),
  secondaryNavLinks: zod
    .object({
      heading: zod.string({
        description: 'Heading for the column of links',
      }),
      links: zod
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
        .describe(
          'Array of secondary navigation links used in Footer. The links use the govieLink component therefore the properties are inhertied from govieLink',
        ),
    })
    .array()
    .optional()
    .describe(
      'Array of secondaryNavLink object which includes heading, the ability to display the link on two columns and the navigation links',
    ),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type FooterProps = zod.infer<typeof footerSchema>;
