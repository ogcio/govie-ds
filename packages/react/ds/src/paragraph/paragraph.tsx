import { variables } from '@govie-ds/tokens';
import styles from './paragraph.module.css';

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
    <div>
      <As
        className={(() => {
          switch (size) {
            case 'lg': {
              return styles.paragraphLg;
            }
            case 'md': {
              return styles.paragraphMd;
            }
            case 'sm': {
              return styles.paragraphSm;
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
