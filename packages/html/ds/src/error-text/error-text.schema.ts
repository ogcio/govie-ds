import * as zod from 'zod';

export enum ErrorSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export const errorTextSchema = zod.object({
  content: zod.string({
    description: 'Content for error text',
    required_error: 'content is required',
  }),
  size: zod
    .nativeEnum(ErrorSize, {
      description: 'Size of the error text.',
    })
    .optional(),
  classNames: zod
    .string({
      description: 'Add additional classes',
    })
    .optional(),
});

export type ErrorTextProps = zod.infer<typeof errorTextSchema>;
