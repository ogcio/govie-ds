import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

const headingVariants = tv({
  variants: {
    size: {
      xl: 'gi-heading-xl',
      lg: 'gi-heading-lg',
      md: 'gi-heading-md',
      sm: 'gi-heading-sm',
      xs: 'gi-heading-xs',
      '2xs': 'gi-heading-2xs',
    },
    as: {
      h1: 'gi-heading-xl',
      h2: 'gi-heading-lg',
      h3: 'gi-heading-md',
      h4: 'gi-heading-sm',
      h5: 'gi-heading-xs',
      h6: 'gi-heading-2xs',
    },
  },
  defaultVariants: {
    as: 'h1',
  },
});

type HeadingProps = VariantProps<typeof headingVariants> & {
  caption?: string;
  className?: string;
  children: React.ReactNode;
};

function Heading({ as, size, children, caption, className }: HeadingProps) {
  const Slot = as || 'h1';
  return (
    <>
      {caption && (
        <span className="gi-text-gray-500" data-testid="govie-heading-caption">
          {caption}
        </span>
      )}
      <Slot className={cn(headingVariants({ as, size }), className)}>
        {children}
      </Slot>
    </>
  );
}

export { Heading, headingVariants };
export type { HeadingProps };
