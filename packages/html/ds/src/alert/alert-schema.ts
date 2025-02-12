import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const AlertVariant = {
  INFO: 'info',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export const alertSchema = zod.object({
  variant: zod
    .enum(getEnumValues(AlertVariant), {
      description: 'Alert variant',
    })
    .optional(),
  title: zod.string({ description: 'The title of the variant' }),
  children: zod
    .string({ description: 'The HTML that will be inserted in the alert' })
    .optional(),
  dismissible: zod
    .boolean({ description: 'Specify if the alert is dismissible' })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type AlertProps = zod.infer<typeof alertSchema>;
