import * as zod from 'zod';

export const detailsSchema = zod.object({
  label: zod.string({
    description:
      'The label displayed in the summary section of the details component',
    required_error: 'The label is required',
  }),
  name: zod
    .string({
      description: 'Optional name attribute for the details element',
    })
    .optional(),
  startsOpen: zod
    .boolean({
      description: 'Controls whether the details element starts open',
    })
    .optional(),
  children: zod.string({
    description: 'The content displayed within the details component',
    required_error: 'The content is required',
  }),
});

export type DetailsProps = zod.infer<typeof detailsSchema>;
