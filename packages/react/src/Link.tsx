'use client';
import { Slot } from '@radix-ui/react-slot';
import GiLink, { type Props as GiLinkProps } from '@/atoms/Link';
import linkStyles from '@/atoms/Link.styles';

export type LinkProps =
  | (GiLinkProps & { asChild?: false; style?: React.CSSProperties })
  | (Omit<GiLinkProps, 'href'> & { asChild: true; href?: string; style?: React.CSSProperties });

export default function Link({
  asChild,
  variant,
  underline,
  appearance,
  visited,
  className,
  style,
  styles,
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
        style={style ?? styles}
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
      styles={(style ?? styles) as Record<string, string>}
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
