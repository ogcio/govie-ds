import { Text } from '../text/text.js';

export type ParagraphAs = 'p' | 'span';
export type ParagraphSize = 'lg' | 'md' | 'sm';
export type ParagraphAlign = 'left' | 'center' | 'right' | 'justify';
export type ParagraphWhitespace =
  | 'normal'
  | 'pre'
  | 'pre-wrap'
  | 'break-spaces';

export function Paragraph({
  as: As = 'p',
  size = 'md',
  align = 'left',
  whitespace = 'normal',
  children,
}: {
  as?: ParagraphAs;
  size?: ParagraphSize;
  align?: ParagraphAlign;
  whitespace?: ParagraphWhitespace;
  children: React.ReactNode;
}) {
  const alignClass = (() => {
    switch (align) {
      case 'center': {
        return 'gi-text-center';
      }
      case 'right': {
        return 'gi-text-right';
      }
      case 'justify': {
        return 'gi-text-justify';
      }
      default: {
        return 'gi-text-left';
      }
    }
  })();

  const whitespaceClass = (() => {
    switch (whitespace) {
      case 'pre': {
        return 'gi-whitespace-pre';
      }
      case 'pre-wrap': {
        return 'gi-whitespace-pre-wrap';
      }
      case 'break-spaces': {
        return 'gi-whitespace-break-spaces';
      }
      default: {
        return 'gi-whitespace-normal';
      }
    }
  })();

  return (
    <Text
      as={As}
      size={size}
      className={`gi-text-gray-950 gi-font-primary ${alignClass} ${whitespaceClass}`}
    >
      {children}
    </Text>
  );
}
