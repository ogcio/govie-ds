import {
  Text,
  Paragraph as GiParagraph,
  type ParagraphProps as GiParagraphProps,
} from '../atoms';
export type ParagraphAs = 'p' | 'span';

export type ParagraphProps = GiParagraphProps & {
  style?: React.CSSProperties;
  /** @deprecated ariaLabel prop will be removed in the next major release. */
  ariaLabel?: string;
  /** @deprecated 'as' prop will now default to 'p', and should be omitted from Paragraph. When using as="span" prefer the use of <Text/> */
  as?: ParagraphAs;
  /** @deprecated Use `dataTestId` instead. */
  dataTestid?: string;
};

export function Paragraph({
  id,
  size = 'md',
  align = 'start',
  whitespace = 'normal',
  children,
  className,
  as: As = 'p',
  style,
  styles,
  dataTestid,
  dataTestId,
  ariaHidden,
}: ParagraphProps) {
  if (As === 'span') {
    return (
      <Text
        size={size}
        whitespace={whitespace}
        className={className}
        styles={(style ?? styles) as Record<string, string>}
        id={id}
        dataTestId={dataTestid ?? dataTestId}
        ariaHidden={ariaHidden}
      >
        {children}
      </Text>
    );
  }

  return (
    <GiParagraph
      size={size}
      align={align}
      whitespace={whitespace}
      className={className}
      styles={(style ?? styles) as Record<string, string>}
      id={id}
      dataTestId={dataTestid ?? dataTestId}
    >
      {children}
    </GiParagraph>
  );
}
