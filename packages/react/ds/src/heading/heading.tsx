import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

export const sizeVariants = {
  xl: 'gi-heading-xl',
  lg: 'gi-heading-lg',
  md: 'gi-heading-md',
  sm: 'gi-heading-sm',
  xs: 'gi-heading-xs',
  '2xs': 'gi-heading-2xs',
};

export const asVariants = {
  h1: 'gi-heading-xl',
  h2: 'gi-heading-lg',
  h3: 'gi-heading-md',
  h4: 'gi-heading-sm',
  h5: 'gi-heading-xs',
  h6: 'gi-heading-2xs',
};

const headingVariants = tv({
  slots: {
    text: 'gi-text-gray-500',
    base: '',
  },
  variants: {
    size: sizeVariants,
    as: asVariants,
  },
  defaultVariants: {
    as: 'h1',
  },
});

type HeadingProps = VariantProps<typeof headingVariants> & {
  caption?: string;
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
};

function Heading({ as, size, children, caption, id, ariaLabel }: HeadingProps) {
  const Slot = as || 'h1';
  const { text, base } = headingVariants({ as, size });
  return (
    <>
      {caption && (
        <span
          className={cn(text())}
          data-testid="govie-heading-caption"
          aria-hidden="true"
        >
          {caption}
        </span>
      )}
      <Slot className={cn(base())} id={id} aria-label={ariaLabel}>
        {children}
      </Slot>
    </>
  );
}

export { Heading, headingVariants };
export type { HeadingProps };
