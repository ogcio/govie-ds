export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

export function Heading({
  as: As = 'h1',
  size,
  children,
  caption,
}: {
  caption?: string;
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
    }
  })();

  const sizeClasses = (() => {
    switch (size || defaultSize) {
      case 'xl': {
        return 'gi-heading-xl';
      }
      case 'lg': {
        return 'gi-heading-lg';
      }
      case 'md': {
        return 'gi-heading-md';
      }
      case 'sm': {
        return 'gi-heading-sm';
      }
      case 'xs': {
        return 'gi-heading-xs';
      }
      case '2xs': {
        return 'gi-heading-xs';
      }
      default: {
        return;
      }
    }
  })();

  return (
    <>
      {caption && <span className="gi-text-gray-500">{caption}</span>}
      <As className={sizeClasses}>{children}</As>
    </>
  );
}
