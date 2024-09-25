import { Text } from '../text/text.js';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

export function Heading({
  as: As = 'h1',
  size,
  children,
}: {
  as?: HeadingAs;
  size?: HeadingSize;
  children: React.ReactNode;
}) {
  return (
    <Text as={As} size={size}>
      {children}
    </Text>
  );
}
