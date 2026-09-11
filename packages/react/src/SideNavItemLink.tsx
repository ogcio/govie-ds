import { Slot } from '@radix-ui/react-slot';
import GiSideNavItemLink from './atoms/sidenav/SideNavItemLink';
import type { Props } from './atoms/sidenav/SideNavItemLink';
import classes, { actionClasses } from './atoms/sidenav/SideNavItem.styles';
import { Box } from './Box';

export type SideNavItemLinkAsChild = Omit<Props, 'href'> & {
  asChild: true;
  href?: string;
};

type GiSideNavItemLinkProps = Props & {
  asChild?: false;
};
export type SideNavItemLinkProps = GiSideNavItemLinkProps | SideNavItemLinkAsChild;

export default function SideNavItemLink({
  asChild,
  href,
  selected,
  actions,
  className,
  styles,
  children,
  target,
  rel,
  external,
  ariaHidden,
  ariaCurrent,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  tabIndex,
  dataTestId,
  ...rest
}: SideNavItemLinkProps) {
  if (asChild) {
    const anchorProps = {
      target: target ?? (external ? '_blank' : undefined),
      rel: rel ?? (external ? 'noreferrer noopener' : undefined),
      tabIndex: ariaHidden ? -1 : tabIndex,
    };
    return (
      <li className="gi-list-none gi-mt-1 gi-relative" aria-hidden={ariaHidden}>
        <Slot
          {...rest}
          {...anchorProps}
          className={classes({ selected, className })}
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-hidden={ariaHidden}
          data-testid={dataTestId}
          style={styles}
        >
          {children}
        </Slot>
        <Box className={actionClasses()}>{actions}</Box>
      </li>
    );
  }
  return (
    <GiSideNavItemLink
      href={href}
      selected={selected}
      actions={actions}
      target={target}
      rel={rel}
      external={external}
      className={className}
      styles={styles}
      ariaHidden={ariaHidden}
      ariaCurrent={ariaCurrent}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      dataTestId={dataTestId}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </GiSideNavItemLink>
  );
}
