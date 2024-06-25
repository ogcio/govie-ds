import { variables } from '@govie-ds/tokens';
import styles from './heading.module.css';

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
        return 'xl';
      }
      case 'h2': {
        return 'lg';
      }
      case 'h3': {
        return 'md';
      }
      case 'h4': {
        return 'sm';
      }
      case 'h5': {
        return 'xs';
      }
      case 'h6': {
        return 'xs';
      }
      default: {
        throw new Error(`Invalid heading as '${as}'.`);
      }
    }
  })();

  return (
    <div>
      <As
        className={(() => {
          switch (size ?? defaultSize) {
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
          color: variables.primitive.color.gray['950'],
        }}
      >
        {children}
      </As>
    </div>
  );
}
