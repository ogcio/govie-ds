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
  ariaCurrent,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaHidden,
  dataTestId,
  external,
  target,
  rel,
  tabIndex,
  ...rest
}: LinkProps) {
  const styleProps = { variant, underline, appearance, visited };
  const anchorProps = {
    target: target ?? (external ? '_blank' : undefined),
    rel: rel ?? (external ? 'noreferrer noopener' : undefined),
    tabIndex: ariaHidden ? -1 : tabIndex,
  };

  if (asChild) {
    return (
      <Slot
        {...rest}
        {...anchorProps}
        className={linkStyles({ ...styleProps, class: className })}
        aria-current={ariaCurrent}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-hidden={ariaHidden}
        data-testid={dataTestId}
      >
        {children}
      </Slot>
    );
  }

  return (
    <GiLink
      {...rest}
      {...styleProps}
      {...anchorProps}
      href={href}
      className={className}
      ariaCurrent={ariaCurrent}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      ariaHidden={ariaHidden}
      dataTestId={dataTestId}
    >
      {children}
    </GiLink>
  );
}
