import { Text } from '../text/text.js';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export function Heading({
  as: As = 'h1',
  size,
  children,
}: {
  as?: HeadingAs;
  size?: HeadingSize;
  children: React.ReactNode;
}) {
  const defaultSize = (() => {
    switch (As) {
      case 'h1': {
        return 'lg';
      }
      case 'h2': {
        return 'md';
      }
      case 'h3': {
        return 'sm';
      }
      case 'h4': {
        return 'xs';
      }
      case 'h5': {
        return 'xs';
      }
      case 'h6': {
        return 'xs';
      }
      default: {
        throw new Error(`Invalid heading as '${As}'.`);
      }
    }
  })();

  return (
    <Text as={As} size={size ?? defaultSize}>
      {children}
    </Text>
  );
}
