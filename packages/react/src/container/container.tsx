import { type MaxWidth } from '../atoms/utilities.js';
import { cn } from '../cn.js';
import { GiContainer } from '../index.js';

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
  fullWidth?: boolean;
  // Props for the new container
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: (typeof MaxWidth)[keyof typeof MaxWidth];
  dataTestId?: string;
}>;

/**
 * @deprecated Use `GiContainer` from `packages/core/atoms/Container.lite.tsx` instead.
 **/
export function Container({
  children,
  id,
  insetBottom,
  insetTop,
  className,
  inset,
  gutters,
  maxWidth,
  dataTestId,
}: ContainerProps) {
  const legacyProps = insetTop || insetBottom;
  if (legacyProps) {
    return (
      <div
        data-testid="govie-container"
        data-inset-top={insetTop}
        data-inset-bottom={insetBottom}
        className={cn(className, 'gi-layout-container-inset')}
        id={id}
      >
        {children}
      </div>
    );
  }

  return (
    <GiContainer
      id={id}
      className={className}
      dataTestId={dataTestId}
      maxWidth={maxWidth}
      gutters={gutters}
      inset={inset}
    >
      {children}
    </GiContainer>
  );
}
