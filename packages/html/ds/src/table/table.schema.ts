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

export const Alignment = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
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
  captionText: zod.string().optional(),
  headers: zod
    .array(
      zod.object({
        text: zod.string().optional(),
        align: zod.enum(getEnumValues(Alignment)).optional(),
      }),
      {
        description:
          'Array of headers, each with "text" and optionally "align"',
      },
    )
    .optional(),
  layout: zod.enum(getEnumValues(LayoutVariant)).optional(),
  rows: zod
    .array(
      zod.array(
        zod.object({
          content: zod.any(),
          align: zod.enum(getEnumValues(Alignment)).optional(),
        }),
      ),
      {
        description:
          'Rows array with cells containing "content" and optional "align"',
      },
    )
    .optional(),
  aria: ariaSchema.optional(),
  dataTestid: zod.string().optional(),
});

export type TableProps = zod.infer<typeof tableSchema>;
