import { z as zod } from 'zod';

export const SummaryListActionSchema = zod.object({
  href: zod.string({
    description: 'URL for the action link.',
  }),
  label: zod.string({
    description: 'Visible label for the action link.',
  }),
});

export const SummaryListRowSchema = zod.object({
  label: zod.string({
    description: 'Label for the row.',
  }),
  value: zod
    .string({
      description: 'Plain text value for the row.',
    })
    .optional(),
  valueHtml: zod
    .string({
      description: 'Raw HTML to be injected into the value cell.',
    })
    .optional(),
  actions: zod
    .array(SummaryListActionSchema, {
      description: 'List of action links to render in the actions cell.',
    })
    .min(1)
    .optional(),
  withBorder: zod
    .boolean({
      description: 'Indicates if the row has a border.',
    })
    .optional(),
});

const SummaryListHeaderActionSchema = zod.object({
  href: zod.string({ description: 'URL for the header action link.' }),
  label: zod.string({
    description: 'Visible label for the header action link.',
  }),
});

const SummaryListHeaderSchema = zod
  .object({
    label: zod.string({
      description: 'Heading text shown in the first header column.',
    }),
    actions: zod
      .array(SummaryListHeaderActionSchema, {
        description:
          'Optional list of header actions displayed in the last header column.',
      })
      .optional(),
  })
  .describe('Summary list header');

export const SummaryListSchema = zod.object({
  rows: zod.array(SummaryListRowSchema, {
    description: 'Array of rows in the summary list.',
  }),
  header: SummaryListHeaderSchema.optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type SummaryListProps = zod.infer<typeof SummaryListSchema>;
