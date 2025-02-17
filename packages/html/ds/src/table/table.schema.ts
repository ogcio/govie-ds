import * as zod from 'zod';

import { getEnumValues } from '../helpers';

const validAriaProps = [
  'aria-rowcount',
  'aria-colcount',
  'aria-labelledby',
] as const;

export const LayoutVariant = {
  Auto: 'auto',
  Fixed: 'fixed',
} as const;

export const ariaSchema = zod.record(
  zod.enum(validAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const tableSchema = zod.object({
  captionText: zod
    .string({
      description:
        'Text for the table caption, providing a brief description of the table contents.',
    })
    .optional(),
  headers: zod
    .array(zod.string(), {
      description:
        'An array of strings representing column headers for the table.',
    })
    .optional(),
  layout: zod.enum(getEnumValues(LayoutVariant)).optional(),
  rows: zod
    .array(zod.any(), {
      description:
        'An array representing rows of the table. Each row can contain HTML elements, text, or any other type.',
    })
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type TableProps = zod.infer<typeof tableSchema>;
