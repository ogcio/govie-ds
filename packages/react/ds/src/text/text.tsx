import { cn } from '../cn.js';

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
export type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

function getTextClass({ size }: { as: TextAs; size?: TextSize }) {
  const margin = 'gi-mt-2 gi-mb-8';
  const bold = 'gi-font-bold';

  const sizes = {
    '2xs': 'gi-text-sm xs:gi-text-sm md:gi-text-sm xl:gi-text-sm',
    xs: 'gi-text-md xs:gi-text-md md:gi-text-md xl:gi-text-md',
    xl: 'gi-text-4xl xs:gi-text-4xl md:gi-text-5xl xl:gi-text-6xl',
    lg: 'gi-text-2xl xs:gi-text-2xl md:gi-text-3xl xl:gi-text-4xl',
    md: 'gi-text-lg xs:gi-text-lg md:gi-text-xl xl:gi-text-2xl',
    sm: 'gi-text-lg xs:gi-text-lg md:gi-text-lg xl:gi-text-xl',
  };

  if (!size) {
    throw new Error(`Invalid size '${size}'.`);
  }
  const sizeClasses = sizes[size];
  return cn(sizeClasses, margin, bold);
}

export function Text({
  as: As,
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
        throw new Error(`Invalid text as '${As}'.`);
      }
    }
  })();

  return (
    <As
      className={cn(
        getTextClass({ as: As, size: size ?? defaultSize }),
        className,
      )}
      style={style}
    >
      {children}
    </As>
  );
}
