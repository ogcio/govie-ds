import AtomicContainer, {
  type Props as AtomicContainerProps,
} from '../atoms/Container.js';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'gi-w-full gi-max-w-[100vw] gi-container gi-mx-auto',
  variants: {
    insetTop: {
      none: 'gi-pt-0',
      md: 'lg:gi-pt-8 md:gi-pt-6 gi-pt-4',
      lg: 'lg:gi-pt-12 md:gi-pt-9 gi-pt-6',
      xl: 'lg:gi-pt-16 md:gi-pt-12 gi-pt-8',
    },
    insetBottom: {
      none: 'gi-pb-0',
      md: 'lg:gi-pb-8 md:gi-pb-6 gi-pb-4',
      lg: 'lg:gi-pb-12 md:gi-pb-9 gi-pb-6',
      xl: 'lg:gi-pb-16 md:gi-pb-12 gi-pb-8',
    },
  },
});
export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType =
  (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

type ContainerProps = Omit<AtomicContainerProps, 'children'> &
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
        data-testid={dataTestId ?? 'govie-container'}
        className={styles({ insetTop, insetBottom })}
        id={id}
      >
        {children}
      </div>
    );
  }

  return (
    <AtomicContainer
      id={id}
      className={className}
      dataTestId={dataTestId ?? 'govie-container'}
      maxWidth={maxWidth}
      gutters={gutters}
      inset={inset}
    >
      {children}
    </AtomicContainer>
  );
}
