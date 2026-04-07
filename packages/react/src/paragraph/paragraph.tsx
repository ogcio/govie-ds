export type ParagraphAs = 'p' | 'span';
export type ParagraphAsNext = 'p';
import { Text, type TextProps } from '../atoms';
export type ParagraphAlign = 'start' | 'center' | 'end' | 'justify';

export type ParagraphProps = Omit<TextProps, 'styles'> & {
  style?: React.CSSProperties;
  /** @deprecated Use `dataTestId` */
  dataTestid?: string;
  align?: ParagraphAlign;
  ariaHidden?: boolean;
  /** @deprecated 'as' prop will now default to 'p', and should be omitted from Paragraph. When using as="span" prefer the use of <Text/> */
  as?: ParagraphAs;
};

export function Paragraph({
  as: As = 'p',
  size = 'md',
  align = 'start',
  whitespace = 'normal',
  children,
  style,
  className,
  id,
  dataTestId,
  dataTestid,
  ariaHidden,
}: ParagraphProps) {
  const sizeClass = (() => {
    switch (size) {
      case 'xl': {
        return As === 'p' ? 'gi-paragraph-xl' : 'gi-span-xl';
      }
      case 'lg': {
        return As === 'p' ? 'gi-paragraph-lg' : 'gi-span-lg';
      }
      case 'sm': {
        return As === 'p' ? 'gi-paragraph-sm' : 'gi-span-sm';
      }
      default: {
        return As === 'p' ? 'gi-paragraph-md' : 'gi-span-md';
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
  if (As === 'span') {
    return (
      <Text
        size={size}
        whitespace={whitespace}
        className={className}
        styles={style as Record<string, string>}
        id={id}
        dataTestId={dataTestid ?? dataTestId}
        ariaHidden={ariaHidden}
      >
        {children}
      </Text>
    );
  }
  return (
    <p
      className={`${sizeClass} ${alignClass} ${whitespaceClass} ${className || ''}`}
      style={style}
      id={id}
      data-testid={dataTestid}
    >
      {children}
    </p>
  );
}
