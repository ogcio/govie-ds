export type ParagraphAs = 'p' | 'span';
export type ParagraphSize = 'lg' | 'md' | 'sm';
export type ParagraphAlign = 'start' | 'center' | 'end' | 'justify';
export type ParagraphWhitespace =
  | 'normal'
  | 'pre'
  | 'pre-wrap'
  | 'break-spaces';

export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  as?: ParagraphAs;
  size?: ParagraphSize;
  align?: ParagraphAlign;
  whitespace?: ParagraphWhitespace;
  dataTestid?: string;
};
