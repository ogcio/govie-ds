import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const Size = {
  Smallest: '2xs',
  ExtraSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export const Tag = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

export const headingSchema = zod.object({
  size: zod
    .enum(getEnumValues(Size), {
      description: 'Options for the size of the heading',
      required_error: 'Option is required',
    })
    .optional(),
  as: zod.enum(getEnumValues(Tag), {
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
