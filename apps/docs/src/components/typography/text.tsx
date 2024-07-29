import { cn } from '@/lib/cn';

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

function getTextClass({ as, size }: { as: TextAs; size?: TextSize }) {
  if (as === 'p' || as === 'span') {
    const margin = as === 'p' ? 'mt-0 mb-[2em]' : 'my-0'; // TODO: tokens
    const maxWidth = as === 'p' ? 'm-w-[65ch]' : undefined; // TODO: tokens

    switch (size) {
      case 'lg': {
        return cn('text-md xs:text-md md:text-md xl:text-md', margin, maxWidth);
      }
      case 'md': {
        return cn('text-sm xs:text-sm md:text-sm xl:text-sm', margin, maxWidth);
      }
      case 'sm': {
        return cn('text-xs xs:text-xs md:text-xs xl:text-xs', margin, maxWidth);
      }
      default: {
        throw new Error(`Invalid heading size '${size}'.`);
      }
    }
  }

  // TODO: tokens
  const margin = 'mt-[0.5em] mb-[1em]';
  const bold = 'font-bold';

  switch (size) {
    case 'xl': {
      return cn(
        'font-semibold text-4xl xs:text-4xl md:text-5xl xl:text-6xl',
        bold,
        margin,
      );
    }
    case 'lg': {
      return cn('text-2xl xs:text-2xl md:text-3xl xl:text-4xl', bold, margin);
    }
    case 'md': {
      return cn('text-lg xs:text-lg md:text-xl xl:text-2xl', bold, margin);
    }
    case 'sm': {
      return cn('text-lg xs:text-lg md:text-lg xl:text-xl', bold, margin);
    }
    case 'xs': {
      return cn('text-md xs:text-md md:text-md xl:text-md', bold, margin);
    }
    case '2xs': {
      return cn('text-sm xs:text-sm md:text-sm xl:text-sm', bold, margin);
    }
    default: {
      throw new Error(`Invalid heading size '${size}'.`);
    }
  }
}
// TODO: review margin/leading options for Heading/Paragraph React components
// or exposing generic Text component from @govie-ds/react
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
      case 'p': {
        return 'md';
      }
      case 'span': {
        return 'md';
      }
      default: {
        throw new Error(`Invalid heading as '${As}'.`);
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
