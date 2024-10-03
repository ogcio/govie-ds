export type LinkProps = {
  as?: React.ElementType;
  href: string;
  children: React.ReactNode;
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
};

export function Link({
  as: Component = 'a',
  href,
  children,
  noUnderline = false,
  noVisited = false,
  noColor = false,
  external = false,
}: LinkProps) {
  return (
    <Component
      href={href}
      {...(external ? { rel: 'noreferrer noopener' } : {})}
      {...(external ? { target: '_blank' } : {})}
      className={`
        gi-link
        ${noUnderline ? 'gi-link-no-underline' : ''}
        ${noVisited ? 'gi-link-no-visited' : ''}
        ${noColor ? 'gi-link-inherit' : ''}`}
    >
      {children}
    </Component>
  );
}
