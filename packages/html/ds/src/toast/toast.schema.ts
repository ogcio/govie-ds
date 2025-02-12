import * as zod from 'zod';

import { buttonSchema } from '../button/button-schema';
import { getEnumValues } from '../helpers';
import { linkSchema } from '../link/link.schema';

export const ToastVariant = {
  INFO: 'info',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export const toastSchema = zod.object({
  duration: zod
    .number({ description: 'Specify the content in the toast component' })
    .optional(),
  position: zod
    .object({
      x: zod.union([
        zod.literal('center'),
        zod.literal('left'),
        zod.literal('right'),
      ]),
      y: zod.union([
        zod.literal('center'),
        zod.literal('top'),
        zod.literal('bottom'),
      ]),
    })
    .describe('Set the duration of the toast appearing on screen')
    .optional(),
  trigger: buttonSchema
    .describe(
      'If specified the toast will be triggered by the click event of this React Button Component',
    )
    .optional(),
  variant: zod
    .enum(getEnumValues(ToastVariant), { description: 'Toast variant' })
    .optional(),
  title: zod.string({
    description: 'Specify the title of the toast component',
  }),
  description: zod
    .string({ description: 'Specify the content in the toast component' })
    .optional(),
  action: linkSchema
    .describe('Specify a link for the toast component')
    .optional(),
  dismissible: zod
    .boolean({ description: 'Specify if the toast is dismissible' })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type ToastProps = zod.infer<typeof toastSchema>;
