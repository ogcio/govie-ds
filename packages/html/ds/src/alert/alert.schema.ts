import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const AlertVariant = {
  Info: 'info',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
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
  showIcon: zod
    .boolean({
      description:
        'Controls whether the icon is shown. Set to false to hide it.',
    })
    .default(true),
});

export type AlertProps = zod.infer<typeof alertSchema>;
