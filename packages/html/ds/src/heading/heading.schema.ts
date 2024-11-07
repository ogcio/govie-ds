import * as zod from 'zod';

export enum Size {
  Smallest = '2xs',
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export enum Tag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export const headingSchema = zod.object({
  size: zod
    .nativeEnum(Size, {
      description: 'Options for the size of the heading',
      required_error: 'Option is required',
    })
    .optional(),
  as: zod.nativeEnum(Tag, {
    description: 'Options for the tag element of the heading',
    required_error: 'An as property is required',
  }),
  text: zod.string({
    description: 'Title of the heading',
    required_error: 'Title is required',
  }),
  caption: zod
    .string({
      description: 'Caption of the heading',
    })
    .optional(),
});

export type HeadingProps = zod.infer<typeof headingSchema>;
