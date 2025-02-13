import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const AsEnum = {
  Paragraph: 'p',
  Span: 'span',
} as const;

export const SizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export const AlignEnum = {
  Start: 'start',
  Center: 'center',
  End: 'end',
  Justify: 'justify',
} as const;

export const WhitespaceEnum = {
  Normal: 'normal',
  Pre: 'pre',
  PreWrap: 'pre-wrap',
  BreakSpaces: 'break-spaces',
} as const;

export const paragraphSchema = zod.object({
  content: zod.string({
    description: 'Content for paragraph.',
    required_error: 'Content is required',
  }),
  as: zod
    .enum(getEnumValues(AsEnum), {
      description: 'Specifies the HTML element to render the component as.',
    })
    .optional(),
  size: zod
    .enum(getEnumValues(SizeEnum), {
      description: 'Specifies the size of the paragraph or span.',
    })
    .optional(),
  align: zod
    .enum(getEnumValues(AlignEnum), {
      description: 'Specifies the alignment of the text.',
    })
    .optional(),
  whitespace: zod
    .enum(getEnumValues(WhitespaceEnum), {
      description: 'Specifies the whitespace behavior.',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type ParagraphProps = zod.infer<typeof paragraphSchema>;
