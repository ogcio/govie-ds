import * as zod from 'zod';
import { buttonSchema } from '../button/button.schema';
import { iconSchema } from '../icon/icon.schema';

export const iconButtonSchema = buttonSchema.omit({ content: true }).and(
  zod.object({
    icon: iconSchema.omit({ size: true }),
  }),
);

export type IconButtonProps = zod.infer<typeof iconButtonSchema>;
