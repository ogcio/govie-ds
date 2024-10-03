import * as zod from 'zod';

export enum TagType {
  blue = 'blue',
  gray = 'gray',
  green = 'green',
  yellow = 'yellow',
  red = 'red',
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