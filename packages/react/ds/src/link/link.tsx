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
        ${noUnderline ? '' : 'gi-underline gi-underline-offset-[0.1em]'}
        ${noVisited ? 'visited:gi-text-blue-700' : 'visited:gi-text-purple-700'}
        ${noColor ? '' : 'gi-text-blue-700 hover:gi-text-blue-800'}
        gi-decoration-xs
        hover:gi-decoration-lg
        focus:gi-outline
        focus:gi-outline-transparent
        focus:gi-bg-yellow-400
        focus:gi-outline-2
        focus:gi-shadow-sm
        focus:gi-shadow-yellow-400`}
    >
      {children}
    </Component>
  );
}
