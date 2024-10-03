export type ParagraphAs = 'p' | 'span';
export type ParagraphSize = 'lg' | 'md' | 'sm';
export type ParagraphAlign = 'start' | 'center' | 'end' | 'justify';
export type ParagraphWhitespace =
  | 'normal'
  | 'pre'
  | 'pre-wrap'
  | 'break-spaces';

export function Paragraph({
  as: As = 'p',
  size = 'md',
  align = 'start',
  whitespace = 'normal',
  children,
  style,
  className,
}: {
  as?: ParagraphAs;
  size?: ParagraphSize;
  align?: ParagraphAlign;
  whitespace?: ParagraphWhitespace;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const sizeClass = (() => {
    switch (size) {
      case 'lg': {
        return As === 'p' ? 'gi-paragraph-lg' : 'gi-span-lg';
      }
      case 'sm': {
        return As === 'p' ? 'gi-paragraph-sm' : 'gi-span-sm';
      }
      default: {
        return As === 'p' ? 'gi-paragraph' : 'gi-span';
      }
    }
  })();

  const alignClass = (() => {
    switch (align) {
      case 'center': {
        return 'gi-text-center';
      }
      case 'end': {
        return 'gi-text-end';
      }
      case 'justify': {
        return 'gi-text-justify';
      }
      default: {
        return 'gi-text-start';
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
    <As
      className={`${sizeClass} ${alignClass} ${whitespaceClass} ${className || ''}`}
      style={style}
    >
      {children}
    </As>
  );
}
