import { cn } from '@/lib/cn';

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

function getTextClass({ as, size }: { as: TextAs; size?: TextSize }) {
  if (as === 'p' || as === 'span') {
    switch (size) {
      case 'lg': {
        return 'text-md xs:text-md md:text-md xl:text-md';
      }
      case 'md': {
        return 'text-sm xs:text-sm md:text-sm xl:text-sm';
      }
      case 'sm': {
        return 'text-xs xs:text-xs md:text-xs xl:text-xs';
      }
      default: {
        throw new Error(`Invalid heading size '${size}'.`);
      }
    }
  }

  switch (size) {
    case 'xl': {
      return 'text-2xl xs:text-2xl md:text-3xl xl:text-4xl';
    }
    case 'lg': {
      return 'text-lg xs:text-lg md:text-xl xl:text-2xl';
    }
    case 'md': {
      return 'text-sm xs:text-sm md:text-sm xl:text-md';
    }
    case 'sm': {
      return 'text-xs xs:text-xs md:text-xs xl:text-xs';
    }
    case 'xs': {
      return 'text-2xl xs:text-2xl md:text-2xl xl:text-2xl';
    }
    default: {
      throw new Error(`Invalid heading size '${size}'.`);
    }
  }
}

// TODO: tokens
function getStyles(as: TextAs) {
  if (as === 'p') {
    return {
      marginTop: 0,
      marginBottom: '1.5em',
      maxWidth: '65ch',
    };
  }

  if (as === 'span') {
    return {
      marginTop: 0,
      marginBottom: 0,
    };
  }

  return {
    marginTop: '0.5em',
    marginBottom: '1em',
  };
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
      style={{
        ...getStyles(As),
        ...style,
      }}
    >
      {children}
    </As>
  );
}
