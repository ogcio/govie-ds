import type { MaxWidth } from '../atoms/Container.js';
import { cn } from '../cn.js';
import GiContainer from '../atoms/Container.js';

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
  /** @deprecated Use the `inset` prop on the layout container instead. */
  insetTop?: ContainerInsetSizeType;
  /** @deprecated Use the `inset` prop on the layout container instead. */
  insetBottom?: ContainerInsetSizeType;
  className?: string;
  /** @deprecated Use `maxWidth` (for example `'full'`) instead. */
  fullWidth?: boolean;
  // Props for the new container
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: (typeof MaxWidth)[keyof typeof MaxWidth];
  dataTestId?: string;
}>;

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
