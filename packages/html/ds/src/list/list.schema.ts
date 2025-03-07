import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const TypeEnum = {
  None: 'none',
  Bullet: 'bullet',
  Number: 'number',
} as const;

export const linkPropsSchema = zod.object({
  items: zod.array(zod.string(), {
    description: 'Array of items that can be either strings or links.',
  }),
  spaced: zod
    .boolean()
    .optional()
    .describe('Optional boolean to define spacing between items.'),
  type: zod
    .enum(getEnumValues(TypeEnum))
    .optional()
    .describe(
      'Optional enum to define the type of the list (bullet, number, none).',
    ),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type ListProps = zod.infer<typeof linkPropsSchema>;
