import { Text } from '../text/text.js';

export type ParagraphAs = 'p' | 'span';
export type ParagraphSize = 'lg' | 'md' | 'sm';
export type ParagraphAlign = 'left' | 'center' | 'right' | 'justify';

export function Paragraph({
  as: As = 'p',
  size = 'md',
  align = 'left',
  children,
}: {
  as?: ParagraphAs;
  size?: ParagraphSize;
  align?: ParagraphAlign;
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

  return (
    <Text
      as={As}
      size={size}
      className={`gi-text-gray-950 gi-font-primary ${alignClass}`}
    >
      {children}
    </Text>
  );
}
