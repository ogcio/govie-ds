import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import { RouterLink } from 'vue-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import Link from '../Link.vue';
import Stack from '../atoms/Stack.vue';
import * as stories from '../atoms/storybook/Link.meta';

const meta: Meta<typeof Link> = {
  ...stories.linkMeta,
  title: 'Navigation/Link',
  component: Link,
  args: omit(stories.linkMeta.args, ['children', 'dataTestId']),
  argTypes: {
    ...omit(stories.linkMeta.argTypes, ['dataTestId']),
    class: {
      control: false,
      description: 'Additional CSS classes, merged with the classes of the `<a>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      control: false,
      description: 'Inline CSS styles applied to the `<a>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: (args) => ({
    components: { Link },
    setup: () => ({ args }),
    template: '<Link v-bind="args" data-testid="link-default">Link</Link>',
  }),
};

export const WithRouter: Story = {
  tags: ['skip-playwright'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`Link` works with Vue Router through `RouterLink custom`: the slot hands `href`, `navigate` and the active state to the design system anchor.',
      },
    },
  },
  render: () => ({
    components: { Link, RouterLink, Stack },
    template: `
      <Stack direction="row" :gap="6" align="center">
        <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
          <Link :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Home</Link>
        </RouterLink>
        <RouterLink to="/about" custom v-slot="{ href, navigate, isExactActive }">
          <Link :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">About</Link>
        </RouterLink>
        <RouterLink to="/contact" custom v-slot="{ href, navigate, isExactActive }">
          <Link variant="inline" class="gi-font-bold" :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Contact</Link>
        </RouterLink>
      </Stack>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const about = canvas.getByRole('link', { name: 'About' });

    await step('the design system anchor carries the router href', async () => {
      expect(about.getAttribute('href')).toBe('/about');
    });

    await step('clicking navigates through the router and marks the active link', async () => {
      await userEvent.click(about);
      await waitFor(() => expect(about.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
    });

    await step('the consumer class merges with the link classes', async () => {
      const contact = canvas.getByRole('link', { name: 'Contact' });
      expect(contact.classList).toContain('gi-font-bold');
      expect(contact.classList).toContain('gi-underline');
    });
  },
};
