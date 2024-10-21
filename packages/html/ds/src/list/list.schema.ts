import * as zod from 'zod';
import { linkSchema } from '../link/link.schema';

export enum TypeEnum {
  None = 'none',
  Bullet = 'bullet',
  Number = 'number',
}

const linkPropsSchema = zod.object({
  items: zod.array(zod.union([zod.string(), linkSchema])),
  spaced: zod.boolean().optional(),
  type: zod.nativeEnum(TypeEnum).optional(),
});

export type ListProps = zod.infer<typeof linkPropsSchema>;
