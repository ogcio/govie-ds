import { cn } from '../cn.js';

export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType =
  (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

type ContainerProps = {
  children: React.ReactNode;
  id?: string;
  insetTop?: ContainerInsetSizeType;
  insetBottom?: ContainerInsetSizeType;
};

export function Container({
  children,
  id,
  insetBottom,
  insetTop,
}: ContainerProps) {
  const hasInset = insetTop || insetBottom;
  return (
    <div
      data-testid="govie-container"
      data-inset-top={insetTop}
      data-inset-bottom={insetBottom}
      className={cn({
        'gi-layout-container': !hasInset,
        'gi-layout-container-inset': hasInset,
      })}
      id={id}
    >
      {children}
    </div>
  );
}
