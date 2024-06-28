import { Text } from '../text/text.js';

export type ParagraphAs = 'p' | 'span';

export type ParagraphSize = 'lg' | 'md' | 'sm';

export function Paragraph({
  as: As = 'p',
  size = 'md',
  children,
}: {
  as?: ParagraphAs;
  size?: ParagraphSize;
  children: React.ReactNode;
}) {
  return (
    <Text as={As} size={size}>
      {children}
    </Text>
  );
}
