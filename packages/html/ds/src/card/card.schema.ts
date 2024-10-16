import * as zod from 'zod';
import { buttonSchema } from '../button/button-schema';
import { iconSchema } from '../icon/icon.schema';
import { linkSchema } from '../link/link.schema';
import { tagSchema } from '../tag/tag.schema';

const actionSchema = zod.union([
  buttonSchema.extend({
    type: zod.literal('button').describe('Type of action is a button'),
  }),
  linkSchema.extend({
    type: zod.literal('link').describe('Type of action is a link'),
  }),
]);

export const cardSchema = zod.object({
  type: zod.enum(['vertical', 'horizontal'], {
    description: 'Defines whether the card is vertical or horizontal',
  }),
  title: zod
    .string({
      description: 'Title of the card',
    })
    .optional(),
  subTitle: zod
    .string({
      description: 'subTitle of the card',
    })
    .optional(),
  href: zod
    .string({
      description: 'URL for the card title link (if applicable)',
    })
    .optional(),
  img: zod
    .string({
      description: 'Image URL for the card (if applicable)',
    })
    .optional(),
  tag: tagSchema.describe('Define tag properties').optional(),
  icon: iconSchema.describe('Define icon properties').optional(),
  content: zod
    .string({
      description: 'Content or description of the card',
    })
    .optional(),
  action: actionSchema
    .describe('Defines the action for the card (either a button or link)')
    .optional(),
});

export type CardProps = zod.infer<typeof cardSchema>;
