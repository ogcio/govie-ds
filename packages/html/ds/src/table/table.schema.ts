import * as zod from 'zod';

const validAriaProps = [
  'aria-rowcount',
  'aria-colcount',
  'aria-labelledby',
] as const;

export enum LayoutVariant {
  Auto = 'auto',
  Fixed = 'fixed',
}

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
  layout: zod.nativeEnum(LayoutVariant).optional(),
  rows: zod
    .array(
      zod.any(), // Allows flexibility for HTML elements, text, or other types
      {
        description:
          'An array representing rows of the table. Each row can contain HTML elements, text, or any other type.',
      },
    )
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type TableProps = zod.infer<typeof tableSchema>;
