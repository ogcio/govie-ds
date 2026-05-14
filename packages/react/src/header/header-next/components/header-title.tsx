'use client';
import { tv } from 'tailwind-variants';
import type { HeaderTitleProps } from '@/header/types.js';
import { headerTitleVariants } from '@/header/variants.js';
import { useHeaderContext } from '@/header/header-next/header-context.js';

export const HeaderTitle = ({ children, href, className, ariaLabel }: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }
  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={styles({
          appearance: context.variant,
          link: true,
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
  base: ['gi-heading-sm gi-ml-4 md:gi-ml-6 lg:gi-ml-12 gi-min-w-0 lg:gi-block', 'gi-truncate gi-w-full gi-p-1'],
  variants: {
    appearance: {
      default: 'gi-text-white gi-stroke-white',
      light: [
        'gi-text-gray-950',
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
      ],
    },
    link: {
      true: [
        'gi-block',
        'gi-max-w-fit',
        'gi-justify-self-start',
        'focus:gi-rounded-sm',
        'focus-visible:gi-no-underline',
        'focus-visible:gi-rounded-sm',
        'focus-visible:gi-outline-none',
      ],
    },
  },
  compoundVariants: [
    {
      link: true,
      appearance: 'light',
      class: [
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
      ],
    },
    {
      link: true,
      appearance: 'default',
      class: [
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-yellow-400)]',
      ],
    },
  ],
});
