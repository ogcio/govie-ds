import { Slot } from '@radix-ui/react-slot';
import GiLink, { type Props as GiLinkProps, linkStyles } from '@/atoms/Link';

export type LinkProps =
  | (GiLinkProps & { asChild?: false })
  | (Omit<GiLinkProps, 'href'> & { asChild: true; href?: string });

export default function Link({
  asChild,
  variant,
  underline,
  appearance,
  visited,
  className,
  children,
  href,
  ...rest
}: LinkProps) {
  const styleProps = { variant, underline, appearance, visited };

  if (asChild) {
    return (
      <Slot {...rest} className={linkStyles({ ...styleProps, class: className })}>
        {children}
      </Slot>
    );
  }

  return (
    <GiLink {...styleProps} {...rest} href={href} className={className}>
      {children}
    </GiLink>
  );
}
