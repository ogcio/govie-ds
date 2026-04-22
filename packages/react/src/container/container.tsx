import { cn } from '../cn.js';
import GiContainer, {
  type Props as GiContainerProps,
} from '../atoms/Container.js';

export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType =
  (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

type ContainerProps = Omit<GiContainerProps, 'children'> &
  React.PropsWithChildren<{
    /** @deprecated Use the `inset` prop on the layout container instead. */
    insetTop?: ContainerInsetSizeType;
    /** @deprecated Use the `inset` prop on the layout container instead. */
    insetBottom?: ContainerInsetSizeType;
    /** @deprecated Use `maxWidth` (for example `'full'`) instead. */
    fullWidth?: boolean;
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
