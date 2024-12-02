export type LinkProps = {
  as?: React.ElementType;
  href: string;
  children: React.ReactNode;
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
  size?: 'sm' | 'md';
} & React.AriaAttributes;

export function Link({
  as: Component = 'a',
  href,
  children,
  size,
  noUnderline = false,
  noVisited = false,
  noColor = false,
  external = false,
  ...ariaProps
}: LinkProps) {
  return (
    <Component
      href={href}
      {...(external ? { rel: 'noreferrer noopener' } : {})}
      {...(external ? { target: '_blank' } : {})}
      className={`
        gi-link
        ${size ? `gi-link-${size}` : ''}
        ${noUnderline ? 'gi-link-no-underline' : ''}
        ${noVisited ? 'gi-link-no-visited' : ''}
        ${noColor ? 'gi-link-inherit' : ''}`}
      {...ariaProps}
    >
      {children}
    </Component>
  );
}
