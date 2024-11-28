import { z as zod } from 'zod';

export const SummaryListActionSchema = zod.object({
  href: zod.string({
    description: 'URL for the action link.',
  }),
  label: zod.string({
    description: 'Visible label for the action link.',
  }),
});

export const SummaryListValueSchema = zod.string({
  description: 'Raw HTML that will be wrapped',
});

export const SummaryListRowSchema = zod.object({
  label: zod.string({
    description: 'Label for the row.',
  }),
  value: SummaryListValueSchema,
  action: SummaryListActionSchema.optional(),
  withBorder: zod
    .boolean({
      description: 'Indicates if the row has a border.',
    })
    .optional(),
});

export const SummaryListSchema = zod.object({
  rows: zod.array(SummaryListRowSchema, {
    description: 'Array of rows in the summary list.',
  }),
});

export type SummaryListProps = zod.infer<typeof SummaryListSchema>;
