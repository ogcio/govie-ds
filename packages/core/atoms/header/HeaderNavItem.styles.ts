import { tv } from 'tailwind-variants';
import type { Size, ResponsiveValue, ValueOf } from '../constants';
import { resolveResponsive } from '../utilities';

export type VisibleValue = ValueOf<typeof Size> | ResponsiveValue<boolean>;

export default tv({
  base: [
    'gi-flex gi-items-center gi-gap-md',
    'gi-h-auto gi-p-2 gi-rounded-sm',
    'gi-cursor-pointer',
    'gi-leading-[24px] gi-truncate',
    'gi-border-solid gi-border-transparent',
    '[.gi-header-section-utility_&]:gi-py-1',
    '[.gi-header-section-utility_&]:gi-leading-[18px]',
    'hover:gi-bg-black hover:gi-bg-opacity-20',
    'focus:gi-bg-black focus:gi-bg-opacity-20',
    'focus-visible:gi-bg-black focus-visible:gi-bg-opacity-20',
    'focus:gi-outline-none focus-visible:gi-outline-none',
    'focus:gi-rounded-sm focus-visible:gi-rounded-sm',
    'focus:gi-shadow-[0_0_0_3px_var(--gieds-color-yellow-400)]',
    '[.gi-header-section-light_&]:focus:gi-shadow-[inset_0_0_0_2px_black,0_0_0_3px_var(--gieds-color-yellow-400)]',
    '[.gi-header-section-light_&]:focus-visible:gi-shadow-[inset_0_0_0_2px_black,0_0_0_3px_var(--gieds-color-yellow-400)]',
  ],
});

export const getVisibility = (visible: VisibleValue = true): string => {
  if (typeof visible === 'boolean') {
    return visible ? 'gi-flex' : 'gi-hidden';
  } else if (typeof visible === 'string') {
    return `gi-hidden ${visible}:gi-flex`;
  }
  return resolveResponsive(visible, (v, bp) => (v ? `${bp}gi-flex` : `${bp}gi-hidden`));
};
