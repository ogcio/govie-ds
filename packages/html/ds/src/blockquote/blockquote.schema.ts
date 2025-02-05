import * as zod from 'zod';

export const blockquoteSchema = zod.object({
  content: zod.string({
    description: 'Content for blockquote.',
    required_error: 'Content is required',
  }),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type BlockquoteProps = zod.infer<typeof blockquoteSchema>;
