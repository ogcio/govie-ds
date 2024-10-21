import * as zod from 'zod';
import { linkSchema } from '../link/link.schema';

export enum TypeEnum {
  None = 'none',
  Bullet = 'bullet',
  Number = 'number',
}

export const linkPropsSchema = zod.object({
  items: zod.array(zod.union([zod.string(), linkSchema]), {
    description: 'Array of items that can be either strings or links.',
  }),
  spaced: zod
    .boolean()
    .optional()
    .describe('Optional boolean to define spacing between items.'),
  type: zod
    .nativeEnum(TypeEnum)
    .optional()
    .describe(
      'Optional enum to define the type of the list (bullet, number, none).',
    ),
});

export type ListProps = zod.infer<typeof linkPropsSchema>;
