import { tv } from 'tailwind-variants';

const AppearanceText = {
  default: 'gi-text-white gi-stroke-white',
  light: 'gi-text-color-text-tone-dark-outline-default',
};

const AppearanceBackground = {
  default: 'gi-bg-color-surface-system-primary-default',
  light: 'gi-bg-white',
};

export const headerVariants = tv({
  base: 'gi-header',
  variants: {
    appearance: AppearanceBackground,
  },
});

export const headerMenuVariants = tv({
  base: 'gi-header-menu',
  variants: {
    appearance: AppearanceBackground,
  },
});

export const headerToolItemVariants = tv({
  base: 'gi-header-tool-item ',
  variants: {
    appearance: AppearanceText,
  },
});

export const headerSecondaryLinksVariants = tv({
  base: 'gi-header-secondary-bar gi-order-1',
  variants: {
    appearance: {
      default: 'gi-bg-color-surface-system-primary-subtle',
      light: 'gi-text-color-text-tone-dark-outline-default',
    },
  },
});

export const headerSecondaryLinkItemVariants = tv({
  base: 'gi-header-secondary-item',
  variants: {
    appearance: AppearanceText,
  },
});

export const headerSecondaryLinkSlotItemVariants = tv({
  base: 'gi-header-secondary-item-slot',
  variants: {
    appearance: AppearanceText,
  },
});

export const headerTitleVariants = tv({
  base: 'gi-header-title',
  variants: {
    appearance: AppearanceText,
  },
});

export const headerDividerVariants = tv({
  base: 'gi-header-divider',
  variants: {
    appearance: {
      default: 'gi-border-white',
      light: 'gi-border-black',
    },
  },
});

export const headerSlotContainerVariants = tv({
  base: 'gi-header-slot-container',
  variants: {
    appearance: {
      default: 'gi-border-b-color-surface-system-primary-default gi-bg-gray-50',
      light: 'gi-border-black',
    },
  },
});
