import { Slot } from '@radix-ui/react-slot';
import GiLinkButton, { type Props as GiLinkButtonProps, linkButtonStyles } from '@/atoms/LinkButton';
import { getSize, getVariant, getAppearance } from '@/atoms/Button';

export type LinkButtonProps =
  | (GiLinkButtonProps & { asChild?: false; style?: React.CSSProperties })
  | (Omit<GiLinkButtonProps, 'href'> & { asChild: true; href?: string; style?: React.CSSProperties });

export function LinkButton({
  asChild,
  children,
  variant,
  appearance,
  size,
  external,
  href,
  target,
  rel,
  className,
  style,
  styles,
  ariaCurrent,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaHidden,
  tabIndex,
  dataTestId,
  ...rest
}: LinkButtonProps) {
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
        className={linkButtonStyles({
          variant: getVariant(variant),
          appearance: getAppearance(appearance),
          size: getSize(size),
          class: className,
        })}
        style={(style ?? styles) as Record<string, string>}
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
    <GiLinkButton
      {...rest}
      {...anchorProps}
      href={href}
      variant={variant}
      appearance={appearance}
      size={size}
      external={external}
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
    </GiLinkButton>
  );
}
