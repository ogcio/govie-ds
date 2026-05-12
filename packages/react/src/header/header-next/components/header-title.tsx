'use client';

import type { HeaderTitleProps } from '../../types.js';
import { headerTitleVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';
import { tv } from 'tailwind-variants';

export const HeaderTitle = ({
  children,
  href,
  className,
}: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }
  return (
    <div
      className={headerTitleVariants({
        appearance: context.variant,
        isLink: !!href,
        className,
      })}
    >
      {href ? (
        <a href={href} className={styles({ appearance: context.variant })}>
          {children}
        </a>
      ) : (
        children
      )}
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
    'gi-truncate gi-py-1 gi-max-w-fit gi-block gi-w-full gi-underline gi-p-1',
    'focus:gi-rounded-sm',
    'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
    'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
    'focus-visible:gi-no-underline',
    'focus-visible:gi-rounded-sm',
    'focus-visible:gi-outline-none',
  ],
  variants: {
    appearance: {
      default: 'gi-text-color-text-tone-convention-inverse',
      light: 'gi-text-color-text-tone-convention-default',
    },
  },
});
