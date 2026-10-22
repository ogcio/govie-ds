import { Slot } from '@radix-ui/react-slot';
import CoreBreadcrumbLink from '@/atoms/breadcrumbs/BreadcrumbLink';
import CoreBreadcrumbItem from '@/atoms/breadcrumbs/BreadcrumbItem';
import type { Props } from '@/atoms/breadcrumbs/BreadcrumbLink';
import { breadcrumbClasses } from '@/atoms/breadcrumbs/BreadcrumbLink.styles';

type BaseProps = Omit<Props, 'styles'> & { style?: React.CSSProperties };

type CoreProps = BaseProps & { asChild?: false };

type SlotProps = Omit<BaseProps, 'href'> & { asChild: true; href?: never };

export type BreadcrumbLinkProps = CoreProps | SlotProps;

export default function BreadcrumbLink({
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
      <CoreBreadcrumbItem>
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
      </CoreBreadcrumbItem>
    );
  }
  return (
    <CoreBreadcrumbItem>
      <CoreBreadcrumbLink
        href={href}
        className={className}
        styles={style as Record<string, string>}
        current={current}
        ariaLabel={ariaLabel}
        dataTestId={dataTestId}
        {...rest}
      >
        {children}
      </CoreBreadcrumbLink>
    </CoreBreadcrumbItem>
  );
}
