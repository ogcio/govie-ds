import { tv } from 'tailwind-variants';
import { baseClasses } from '../Button.styles';

export default tv({
  extend: baseClasses,
  base: [
    'gi-px-3 gi-py-2',
    'gi-font-bold',
    'gi-text-md',
    'gi-w-full',
    '[.gi-side-nav-group_&]:gi-font-normal',
    '[.gi-side-nav-group_&]:gi-px-6',
  ],
  variants: {
    expandable: {
      false: '[.gi-side-nav-list:has(.gi-side-nav-actions_*)_&]:gi-pr-12',
      true: 'gi-pr-12 [.gi-side-nav-list:has(.gi-side-nav-actions_*)_&]:gi-pr-[84px]',
    },
    selected: {
      true: 'gi-shadow-[inset_4px_0_0_var(--gieds-color-border-tone-primary-accent-selected)]',
      false: '',
    },
  },

  defaultVariants: {
    variant: 'flat',
    appearance: 'dark',
    disabled: false,
    hasAction: false,
    expandable: false,
  },
});

export const trailingPosition = tv({
  base: 'gi-absolute gi-top-1/2 -gi-translate-y-1/2',
});

export const arrowClasses = tv({
  extend: trailingPosition,
  base: 'gi-right-3 gi-pointer-events-none motion-safe:gi-transition-transform motion-safe:gi-duration-100',
  variants: {
    open: {
      true: 'gi-rotate-180',
      false: 'gi-rotate-0',
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const actionClasses = tv({
  extend: trailingPosition,
  base: 'gi-side-nav-actions gi-hidden [&:has(*)]:gi-block',
  variants: {
    expandable: {
      true: 'gi-right-12',
      false: 'gi-right-3',
    },
  },
  defaultVariants: {
    actions: false,
    expandable: false,
  },
});
