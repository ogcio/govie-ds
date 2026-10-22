import { Slot } from '@radix-ui/react-slot';
import GiHeaderNavItem from '@/atoms/header/HeaderNavItem';
import type { Props as ItemProps } from '@/atoms/header/HeaderNavItem';
import GiHeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import type { Props as LinkProps } from '@/atoms/header/HeaderNavItemLink';
import { linkClasses } from '@/atoms/header/HeaderNavItem.styles';

type Props = Omit<LinkProps, 'styles'> & {
  visible?: ItemProps['visible'];
  style?: React.CSSProperties;
};

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
  style,
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
      <GiHeaderNavItem visible={visible}>
        <Slot
          {...rest}
          {...anchorProps}
          className={linkClasses({ className })}
          style={style}
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-hidden={ariaHidden}
          data-testid={dataTestId}
        >
          {children}
        </Slot>
      </GiHeaderNavItem>
    );
  }
  return (
    <GiHeaderNavItem visible={visible}>
      <GiHeaderNavItemLink
        {...rest}
        href={href}
        className={className}
        styles={style as Record<string, string>}
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
    </GiHeaderNavItem>
  );
}
