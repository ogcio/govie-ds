export type LinkProps = {
  as?: React.ElementType;
  href: string;
  children: React.ReactNode;
  noVisited?: boolean;
  noUnderline?: boolean;
  external?: boolean;
  dark?: boolean;
};

export function Link({
  as: Component = 'a',
  href,
  children,
  noUnderline,
  noVisited,
  external,
}: LinkProps) {
  return (
    <Component
      href={href}
      {...(external ? { rel: 'noreferrer noopener' } : {})}
      {...(external ? { target: '_blank' } : {})}
      className={`
        ${noUnderline ? '' : 'gi-underline gi-underline-offset-[0.1em]'}
        ${noVisited ? 'visited:gi-text-blue-700' : 'visited:gi-text-purple-700'}
        gi-text-blue-700
        gi-decoration-[max(1px,0.0625rem)]
        hover:gi-text-blue-800
        hover:gi-decoration-skip-ink-none
        hover:gi-decoration-[max(3px,0.1875rem,0.12em)]
        focus:gi-outline
        focus:gi-outline-transparent
        focus:gi-bg-yellow-400
        focus:gi-outline-[3px]
        focus:gi-shadow-[0_-2px_var(--gieds-color-yellow-400),0_4px_var(--gieds-color-gray-900)]`}
    >
      {children}
    </Component>
  );
}
