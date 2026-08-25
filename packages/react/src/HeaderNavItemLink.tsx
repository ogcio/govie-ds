import { Slot } from '@radix-ui/react-slot';
import GiHeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import type { Props } from '@/atoms/header/HeaderNavItemLink';
import classes, { getVisibility } from '@/atoms/header/HeaderNavItem.styles';

type HeaderNavItemLinkAsChild = Omit<Props, 'href'> & {
  asChild: true;
  href?: string;
};
type GiHeaderNavItemLinkProps = Props & {
  asChild?: false;
};
export type HeaderNavItemLinkProps = GiHeaderNavItemLinkProps | HeaderNavItemLinkAsChild;

export default function HeaderNavItemLink({
  asChild,
  visible,
  href,
  className,
  children,
  target,
  rel,
  external,
  ariaCurrent,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaHidden,
  tabIndex,
  styles,
  dataTestId,
  ...rest
}: HeaderNavItemLinkProps) {
  if (asChild) {
    const anchorProps = {
      target: target ?? (external ? '_blank' : undefined),
      rel: rel ?? (external ? 'noreferrer noopener' : undefined),
      tabIndex: ariaHidden ? -1 : tabIndex,
    };
    return (
      <li className={getVisibility(visible)}>
        <Slot
          {...rest}
          {...anchorProps}
          className={classes({
            className: ['gi-header-nav-item-link', className],
          })}
          style={styles}
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-hidden={ariaHidden}
          data-testid={dataTestId}
        >
          {children}
        </Slot>
      </li>
    );
  }
  return (
    <GiHeaderNavItemLink
      {...rest}
      href={href}
      visible={visible}
      className={className}
      styles={styles}
      target={target}
      external={external}
      rel={rel}
      tabIndex={tabIndex}
      dataTestId={dataTestId}
      ariaCurrent={ariaCurrent}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      ariaHidden={ariaHidden}
    >
      {children}
    </GiHeaderNavItemLink>
  );
}
