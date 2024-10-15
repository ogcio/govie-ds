import * as zod from 'zod';
import { iconSchema } from '../icon/icon.schema';

const actionSchema = zod.object({
  href: zod.string({
    description: 'URL for the action link',
    required_error: 'href is required for actions',
  }),
  text: zod.string({
    description: 'Text for the action link',
    required_error: 'text is required for actions',
  }),
});

export const cardSchema = zod.object({
  type: zod.enum(['vertical', 'horizontal'], {
    description: 'Defines whether the card is vertical or horizontal',
  }),
  title: zod
    .string({
      description: 'Title of the card',
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
  icon: iconSchema
    .describe('Define icon properties')
    .optional(),
  content: zod
    .string({
      description: 'Content or description of the card',
    })
    .optional(),
  actions: zod
    .array(actionSchema, {
      description: 'List of actions available for the card',
    })
    .optional(),
});

export type CardProps = zod.infer<typeof cardSchema>;
