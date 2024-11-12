import * as zod from 'zod';

export enum AlertVariant {
  INFO = 'info',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export const alertSchema = zod.object({
  variant: zod
    .nativeEnum(AlertVariant, { description: 'Alert variant' })
    .optional(),
  title: zod.string({ description: 'The title of the variant' }),
  children: zod
    .string({ description: 'The HTML that will be inserted in the alert' })
    .optional(),
  dismissible: zod
    .boolean({ description: 'Specify if the alert is dismissible' })
    .optional(),
  className: zod.string({ description: 'Additional classes' }).optional(),
});

export type AlertProps = zod.infer<typeof alertSchema>;
