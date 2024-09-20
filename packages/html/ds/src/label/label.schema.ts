import * as zod from 'zod';

export enum LabelSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export const labelSchema = zod.object({
  content: zod.string({
    description: 'Content for label',
    required_error: 'content is required',
  }),
  size: zod
    .string({
      description: 'Size of label.',
    })
    .optional(),
  for: zod
    .string({
      description:
        'Ensures the label is properly associated with the corresponding input element.',
    })
    .optional(),
});

export type LabelProps = zod.infer<typeof labelSchema>;