import { variables } from '@govie-ds/tokens';
import styles from './heading.module.css';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

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
        className={(() => {
          switch (size) {
            case 'xl': {
              return styles.headingXl;
            }
            case 'lg': {
              return styles.headingLg;
            }
            case 'md': {
              return styles.headingMd;
            }
            case 'sm': {
              return styles.headingSm;
            }
            case 'xs': {
              return styles.headingXs;
            }
            default: {
              throw new Error(`Invalid heading size '${size}'.`);
            }
          }
        })()}
        style={{
          fontFamily: variables.primitive.font.family.primary,
        }}
      >
        {children}
      </As>
    </div>
  );
}
