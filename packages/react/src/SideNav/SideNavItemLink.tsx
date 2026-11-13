import { Slot } from '@radix-ui/react-slot';
import CoreSideNavItemLink, { type Props as BaseProps } from '@/atoms/sidenav/SideNavItemLink';
import CoreSideNavItem from '@/atoms/sidenav/SideNavItem';
import CoreSideNavItemAction from '@/atoms/sidenav/SideNavItemAction';
import classes from '@/atoms/sidenav/SideNavItem.styles';
import { isAriaHidden } from '@/atoms/utilities';

type Props = Omit<BaseProps, 'actions'> & {
  actions?: React.ReactNode;
  style?: React.CSSProperties;
};

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
  className,
  style,
  styles,
  children,
  actions,
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
      tabIndex: isAriaHidden(ariaHidden) ? -1 : tabIndex,
    };
    return (
      <CoreSideNavItem ariaHidden={ariaHidden}>
        <Slot
          {...rest}
          {...anchorProps}
          className={classes({ selected: !!selected, className })}
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-hidden={ariaHidden}
          data-testid={dataTestId}
          style={style ?? styles}
        >
          {children}
        </Slot>
        {actions && <CoreSideNavItemAction>{actions}</CoreSideNavItemAction>}
      </CoreSideNavItem>
    );
  }
  return (
    <CoreSideNavItem ariaHidden={ariaHidden}>
      <CoreSideNavItemLink
        href={href}
        selected={selected}
        target={target}
        rel={rel}
        external={external}
        className={className}
        styles={(style as Props['styles']) ?? styles}
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
      </CoreSideNavItemLink>
      <CoreSideNavItemAction>{actions}</CoreSideNavItemAction>
    </CoreSideNavItem>
  );
}
