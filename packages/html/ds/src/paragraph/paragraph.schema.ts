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

export const paragraphSchema = zod.object({
  content: zod.string({
    description: 'Content is required',
    required_error: '',
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
});

export type ParagraphProps = zod.infer<typeof paragraphSchema>;
