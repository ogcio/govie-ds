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
  ...rest
}: LinkProps) {
  const styleProps = { variant, underline, appearance, visited };

  if (asChild) {
    return (
      <Slot
        {...rest}
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
      {...styleProps}
      {...rest}
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
