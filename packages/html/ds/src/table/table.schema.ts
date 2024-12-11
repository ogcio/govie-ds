import * as zod from 'zod';

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
  rows: zod
    .array(
      zod.any(), // Allows flexibility for HTML elements, text, or other types
      {
        description:
          'An array representing rows of the table. Each row can contain HTML elements, text, or any other type.',
      },
    )
    .optional(),
});

export type TableProps = zod.infer<typeof tableSchema>;
