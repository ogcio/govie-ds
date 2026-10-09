import { Slot } from '@radix-ui/react-slot';
import CoreBreadcrumbLink from '@/atoms/breadcrumbs/BreadcrumbLink';
import type { Props } from '@/atoms/breadcrumbs/BreadcrumbLink';
import { breadcrumbClasses } from '@/atoms/breadcrumbs/BreadcrumbLink.styles';

type AmendedProps = Omit<Props, 'styles'> & {
  style?: Record<string, string>;
};

export type BreadcrumbLinkAsChild = Omit<AmendedProps, 'href'> & {
  asChild: true;
  href?: string;
};

type CoreBreadcrumbLinkProps = AmendedProps & {
  asChild?: false;
  style?: Record<string, string>;
};
export type BreadcrumbLinkProps = CoreBreadcrumbLinkProps | BreadcrumbLinkAsChild;

export default function SideNavItemLink({
  children,
  asChild,
  href,
  current,
  className,
  style,
  ariaLabel,
  dataTestId,
  ...rest
}: BreadcrumbLinkProps) {
  if (asChild) {
    return (
      <li>
        <Slot
          {...rest}
          className={breadcrumbClasses({ className })}
          style={style}
          aria-current={current ? 'page' : undefined}
          aria-label={ariaLabel}
          data-testid={dataTestId}
        >
          {children}
        </Slot>
      </li>
    );
  }
  return (
    <CoreBreadcrumbLink
      href={href}
      className={className}
      styles={style}
      current={current}
      ariaLabel={ariaLabel}
      dataTestId={dataTestId}
      {...rest}
    >
      {children}
    </CoreBreadcrumbLink>
  );
}
