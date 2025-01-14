import { Button } from '../button/button.js';
import { ButtonProps } from '../button/types.js';
import { cn } from '../cn.js';
import Anchor from '../primitives/anchor.js';

export enum LinkType {
  LINK = 'a',
  BUTTON = 'button',
}

export type LinkProps = {
  as?: React.ElementType<object, LinkType>;
  asButton?: Omit<ButtonProps, 'children' | 'onClick'>;
  href?: string;
  children: React.ReactNode;
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
  size?: 'sm' | 'md';
  onClick?: React.MouseEventHandler<HTMLElement>;
} & React.AriaAttributes;

export function Link({
  as,
  asButton,
  href,
  children,
  size,
  noUnderline = false,
  noVisited = false,
  noColor = false,
  external = false,
  onClick,
  ...ariaProps
}: LinkProps) {
  const Component = as === LinkType.BUTTON ? LinkType.BUTTON : Anchor;

  return (
    <Component
      href={href}
      onClick={onClick}
      external={external}
      className={cn(`
        gi-link
        ${size ? `gi-link-${size}` : ''}
        ${noUnderline ? 'gi-link-no-underline' : ''}
        ${noVisited ? 'gi-link-no-visited' : ''}
        ${noColor ? 'gi-link-inherit' : ''}`)}
      {...ariaProps}
    >
      {asButton ? <Button {...asButton}>{children}</Button> : children}
    </Component>
  );
}
