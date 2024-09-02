import * as zod from 'zod';
import { linkSchema } from '../link/link.schema';

export const footerSchema = zod.object({
  links: linkSchema.array().optional(),
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
      links: linkSchema.array(),
    })
    .array()
    .optional(),
});

export type FooterProps = zod.infer<typeof footerSchema>;
