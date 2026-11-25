import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { RouterLink } from 'vue-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import * as stories from '../atoms/storybook/LinkButton.meta';
import argTypes from '../atoms/storybook/argTypes';
import { LinkButton, Stack } from '../index';
import { withAppearanceBackground, withPreventNavigation } from './utils';

const meta: Meta = {
  ...stories.linkButtonMeta,
  title: 'Navigation/LinkButton',
  component: LinkButton,
  decorators: [withAppearanceBackground, withPreventNavigation],
  argTypes: {
    ...stories.linkButtonMeta.argTypes,
    // Rendered as the default slot.
    children: { table: { disable: true } },
    // The shared play reads `dataTestId` from the story args; the template binds it as `data-testid`.
    dataTestId: { table: { disable: true } },
    class: {
      ...argTypes.class,
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | object | array' } },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  render: (args) => ({
    components: { LinkButton },
    setup: () => ({ args }),
    template: `
      <LinkButton
        :id="args.id"
        :href="args.href"
        :variant="args.variant"
        :appearance="args.appearance"
        :size="args.size"
        :external="args.external"
        :data-testid="args.dataTestId"
      >{{ args.children }}</LinkButton>
    `,
  }),
};

export const WithRouter: Story = {
  tags: ['skip-playwright'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`LinkButton` works with Vue Router through `RouterLink custom`: the slot hands `href`, `navigate` and the active state to the design system anchor.',
      },
    },
  },
  render: () => ({
    components: { LinkButton, RouterLink, Stack },
    template: `
      <Stack direction="row" :gap="4" align="center">
        <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
          <LinkButton variant="secondary" :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Home</LinkButton>
        </RouterLink>
        <RouterLink to="/apply" custom v-slot="{ href, navigate, isExactActive }">
          <LinkButton class="gi-italic" :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Apply</LinkButton>
        </RouterLink>
      </Stack>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const apply = canvas.getByRole('link', { name: 'Apply' });

    await step('the design system anchor carries the router href', async () => {
      expect(apply.getAttribute('href')).toBe('/apply');
    });

    await step('clicking navigates through the router and marks the active link', async () => {
      await userEvent.click(apply);
      await waitFor(() => expect(apply.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
    });

    await step('the consumer class merges with the link button classes', async () => {
      expect(apply.classList).toContain('gi-italic');
      expect(apply.classList).toContain('gi-no-underline');
    });
  },
};
