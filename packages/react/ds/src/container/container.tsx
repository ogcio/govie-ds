import { cn } from '../cn.js';

export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType =
  (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

type ContainerProps = React.PropsWithChildren<{
  id?: string;
  insetTop?: ContainerInsetSizeType;
  insetBottom?: ContainerInsetSizeType;
  className?: string;
}>;

export function Container({
  children,
  id,
  insetBottom,
  insetTop,
  className,
}: ContainerProps) {
  const hasInset = insetTop || insetBottom;
  return (
    <div
      data-testid="govie-container"
      data-inset-top={insetTop}
      data-inset-bottom={insetBottom}
      className={cn(className, {
        'gi-layout-container': !hasInset,
        'gi-layout-container-inset': hasInset,
      })}
      id={id}
    >
      {children}
    </div>
  );
}
