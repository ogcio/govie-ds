import { z as zod } from 'zod';
import { IconSize } from '../icon/icon.schema';

export const spinnerSchema = zod.object({
  size: zod
    .nativeEnum(IconSize, {
      description: 'Specifies the Spinner size',
    })
    .optional(),
  inline: zod
    .boolean({
      description: 'View as inline (block is default).',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type SpinnerProps = zod.infer<typeof spinnerSchema>;
