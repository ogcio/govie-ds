import { Slot } from '@radix-ui/react-slot';
import CorePaginationLink, { type Props } from '@/atoms/pagination/PaginationLink';
import CorePaginationItem from '@/atoms/pagination/PaginationItem';
import classes from '@/atoms/pagination/PaginationButton.styles';

type BaseProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

type CoreProps = BaseProps & {
  asChild?: false;
};

type SlotProps = Omit<BaseProps, 'href'> & {
  asChild: true;
  href?: never;
};

export type PaginationLinkProps = CoreProps | SlotProps;

export default function PaginationLink({
  children,
  asChild,
  href,
  current,
  className,
  style,
  ariaLabel,
  dataTestId,
  ...rest
}: PaginationLinkProps) {
  if (asChild) {
    return (
      <CorePaginationItem>
        <Slot
          {...rest}
          className={classes({
            variant: current ? 'primary' : 'flat',
            className,
          })}
          style={style}
          aria-current={current ? 'page' : undefined}
          aria-label={ariaLabel}
          data-testid={dataTestId}
        >
          {children}
        </Slot>
      </CorePaginationItem>
    );
  }
  return (
    <CorePaginationItem>
      <CorePaginationLink
        href={href}
        className={className}
        styles={style as Props['styles']}
        current={current}
        ariaLabel={ariaLabel}
        dataTestId={dataTestId}
        {...rest}
      >
        {children}
      </CorePaginationLink>
    </CorePaginationItem>
  );
}
