import { variables } from '@govie-ds/tokens';
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
    <Text
      as={As}
      size={size}
      style={{
        marginTop: 0,
        marginBottom: As === 'p' ? '2em' : undefined, // TODO: tokens
        color: variables.primitive.color.gray['950'],
        maxWidth: As === 'p' ? '65ch' : undefined,
        fontFamily: 'inherit',
      }}
    >
      {children}
    </Text>
  );
}
