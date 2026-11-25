import type { Decorator } from '@storybook/vue3-vite';
import { Appearance } from '../atoms/Button.styles';

// Light buttons are meant for dark backgrounds.
export const withAppearanceBackground: Decorator = (story, context) => ({
  components: { story },
  setup: () => ({ light: context.args.appearance === Appearance.LIGHT }),
  template: `<div class="gi-p-4 gi-w-fit" :class="{ 'gi-bg-black': light }"><story /></div>`,
});

// Stop the click from navigating to avoid unexpected navigation in Storybook.
export const withPreventNavigation: Decorator = (story) => ({
  components: { story },
  setup: () => ({ preventDefault: (event: Event) => event.preventDefault() }),
  template: '<div @click="preventDefault"><story /></div>',
});
