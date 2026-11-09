import '@ogcio/theme-govie/theme.css';
import { setup, type Preview } from '@storybook/vue3-vite';
import { createMemoryHistory, createRouter } from 'vue-router';
import '../fonts.css';
import '../styles.css';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/:path(.*)*', component: { render: () => null } }],
});

setup((app) => {
  app.use(router);
});

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
  },

  tags: ['autodocs'],

  beforeEach: async () => {
    await router.replace('/');
  },
};

export default preview;
