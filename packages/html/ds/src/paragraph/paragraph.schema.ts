import * as zod from 'zod';

export enum AsEnum {
  Paragraph = 'p',
  Span = 'span',
}

export enum SizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export enum AlignEnum {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Justify = 'justify',
}

export enum WhitespaceEnum {
  Normal = 'normal',
  Pre = 'pre',
  PreWrap = 'pre-wrap',
  BreakSpaces = 'break-spaces',
}

export const paragraphSchema = zod.object({
  content: zod.string({
    description: 'Content for paragraph.',
    required_error: 'Content is required',
  }),
  as: zod
    .nativeEnum(AsEnum, {
      description: 'Specifies the HTML element to render the component as.',
    })
    .optional(),
  size: zod
    .nativeEnum(SizeEnum, {
      description: 'Specifies the size of the paragraph or span.',
    })
    .optional(),
  align: zod
    .nativeEnum(AlignEnum, {
      description: 'Specifies the alignment of the text.',
    })
    .optional(),
  whitespace: zod
    .nativeEnum(WhitespaceEnum, {
      description: 'Specifies the whitespace behavior.',
    })
    .optional(),
});

export type ParagraphProps = zod.infer<typeof paragraphSchema>;
