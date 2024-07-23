import { cn } from '../cn.js';
import headingStyles from './heading.module.css';
import paragraphStyles from './paragraph.module.css';

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

function getTextClass({ as, size }: { as: TextAs; size?: TextSize }) {
  if (as === 'p' || as === 'span') {
    switch (size) {
      case 'lg': {
        return paragraphStyles.paragraphLg;
      }
      case 'md': {
        return paragraphStyles.paragraphMd;
      }
      case 'sm': {
        return paragraphStyles.paragraphSm;
      }
      default: {
        throw new Error(`Invalid text size '${size}'.`);
      }
    }
  }

  switch (size) {
    case 'xl': {
      return headingStyles.headingXl;
    }
    case 'lg': {
      return headingStyles.headingLg;
    }
    case 'md': {
      return headingStyles.headingMd;
    }
    case 'sm': {
      return headingStyles.headingSm;
    }
    case 'xs': {
      return headingStyles.headingXs;
    }
    case '2xs': {
      return headingStyles.heading2Xs;
    }
    default: {
      throw new Error(`Invalid heading size '${size}'.`);
    }
  }
}

export function Text({
  as: As = 'p',
  size,
  children,
  className,
  style,
}: {
  as?: TextAs;
  size?: TextSize;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <As className={cn(getTextClass({ as: As, size }), className)} style={style}>
      {children}
    </As>
  );
}
