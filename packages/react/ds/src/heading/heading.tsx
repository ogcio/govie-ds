import { variables, meta } from '@govie-ds/tokens';
import styles from './heading.module.css';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize =
  | '7xl'
  | '6xl'
  | '5xl'
  | '4xl'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xs'
  | '2xs';

export function Heading({
  as: As = 'h1',
  size = 'md',
  children,
}: {
  as?: HeadingAs;
  size?: HeadingSize;
  children: React.ReactNode;
}) {
  return (
    <div>
      <As
        className={size === '7xl' ? styles.heading7xl : styles.heading6xl}
        style={{
          fontFamily: variables.primitive.font.family.primary,
        }}
      >
        {children}
      </As>
    </div>
  );
}
