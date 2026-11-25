import type { Decorator } from '@storybook/vue3-vite';
import Box from '../Box.vue';
import { Appearance } from '../atoms/Button.styles';

// Light buttons are meant for dark backgrounds.
export const withAppearanceBackground: Decorator = (story, context) => ({
  components: { story, Box },
  setup: () => ({ light: context.args.appearance === Appearance.LIGHT }),
  template: `<Box class="gi-p-4 gi-w-fit" :class="{ 'gi-bg-black': light }"><story /></Box>`,
});

// Stop the click from navigating to avoid unexpected navigation in Storybook.
export const withPreventNavigation: Decorator = (story) => ({
  components: { story, Box },
  setup: () => ({ preventDefault: (event: Event) => event.preventDefault() }),
  template: '<Box @click="preventDefault"><story /></Box>',
});
