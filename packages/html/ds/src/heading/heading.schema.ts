import * as zod from 'zod';

export enum SIZE {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

export enum TAG {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
}

export const headingSchema = zod.object({
  size: zod.nativeEnum(SIZE, {
    description: 'Options for the size of the heading',
    required_error: 'Option is required',
  }),
  tag: zod.nativeEnum(TAG, {
    description: 'Options for the tag element of the heading',
    required_error: 'A tag element is required',
  }),
  text: zod.string({
    description: 'Ttitle of the heading',
    required_error: 'Title is required',
  }),
  caption: zod
    .string({
      description: 'Caption of the heading',
    })
    .optional(),
});

export type HeadingProps = zod.infer<typeof headingSchema>;
