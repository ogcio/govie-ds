import * as zod from 'zod';
import { linkSchema } from '../link/link.schema';

export const footerSchema = zod.object({
  links: linkSchema
    .array()
    .optional()
    .describe(
      'Array of main links used in Footer. The links use the govieLink component therefore the properties are inhertied from govieLink',
    ),
  secondaryNavLinks: zod
    .object({
      hasTwoCols: zod
        .boolean({
          description: 'Enable two column grid for navigation links',
        })
        .optional(),
      heading: zod.string({
        description: 'Heading for the column of links',
      }),
      links: linkSchema
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
});

export type FooterProps = zod.infer<typeof footerSchema>;
