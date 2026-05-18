'use client';
import { tv } from 'tailwind-variants';
import type { HeaderTitleProps } from '@/header/types.js';
import { headerTitleVariants } from '@/header/variants.js';
import { useHeaderContext } from '@/header/header-next/header-context.js';

export const HeaderTitle = ({ children, href, className }: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }
  if (href) {
    return (
      <a
        href={href}
        className={styles({
          appearance: context.variant,
          className,
        })}
      >
        {children}
      </a>
    );
  }
  return (
    <div
      className={headerTitleVariants({
        appearance: context.variant,
        className,
      })}
    >
      {children}
    </div>
  );
};

Object.defineProperty(HeaderTitle, 'componentType', {
  value: 'HeaderTitle',
  writable: false,
  enumerable: false,
});

const styles = tv({
  base: [
    'gi-heading-sm',
    'gi-ml-4 md:gi-ml-6 lg:gi-ml-12',
    'gi-min-w-0 gi-max-w-fit',
    'gi-block',
    'gi-truncate',
    'gi-p-1 focus:gi-rounded-sm',
    'focus-visible:gi-rounded-sm focus-visible:gi-no-underline focus-visible:gi-outline-none',
  ],
  variants: {
    appearance: {
      default: [
        'gi-text-white gi-stroke-white',
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-yellow-400)]',
      ],
      light: [
        'gi-text-gray-950',
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
      ],
    },
  },
});
