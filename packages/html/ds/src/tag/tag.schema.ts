import * as zod from 'zod';

export enum TagType {
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  counter = 'counter',
  counterWarning = 'counterWarning',
}

export const tagSchema = zod.object({
  text: zod.string({
    description: 'Content for tag',
    required_error: 'content is required',
  }),
  type: zod
    .string({
      description: 'Defines the visual style and color of the tag.',
    })
    .optional(),
});

export type TagProps = zod.infer<typeof tagSchema>;
