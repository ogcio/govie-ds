import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { RouterLink } from 'vue-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import * as stories from '../atoms/storybook/Breadcrumbs.meta';
import argTypes from '../atoms/storybook/argTypes';
import { BreadcrumbEllipsis, BreadcrumbLink, Breadcrumbs } from '../index';
import { HomeIcon } from '../icons';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      ...argTypes.class,
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | object | array' } },
    },
    // The shared play reads `dataTestId` from the story args; the template binds it as `data-testid`.
    dataTestId: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj;

const components = { BreadcrumbEllipsis, BreadcrumbLink, Breadcrumbs, HomeIcon, RouterLink };

export const Default: Story = {
  ...stories.Default,
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <Breadcrumbs
        :id="args.id"
        :aria-label="args.ariaLabel"
        :aria-labelledby="args.ariaLabelledBy"
        :data-testid="args.dataTestId"
      >
        <BreadcrumbLink href="#" aria-label="Home">
          <HomeIcon />
        </BreadcrumbLink>
        <BreadcrumbEllipsis />
        <BreadcrumbLink href="#">Travel</BreadcrumbLink>
        <BreadcrumbLink href="#" current>Documentation</BreadcrumbLink>
      </Breadcrumbs>
    `,
  }),
};

export const WithRouter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`BreadcrumbLink` works with Vue Router through `RouterLink custom`: the slot hands `href`, `navigate` and the active state to the design system link.',
      },
    },
  },
  render: () => ({
    components,
    template: `
      <Breadcrumbs aria-label="Breadcrumbs">
        <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
          <BreadcrumbLink :href="href" :current="isExactActive" @click="navigate">Home</BreadcrumbLink>
        </RouterLink>
        <BreadcrumbEllipsis />
        <RouterLink to="/accounts" custom v-slot="{ href, navigate, isExactActive }">
          <BreadcrumbLink :href="href" :current="isExactActive" @click="navigate">Accounts</BreadcrumbLink>
        </RouterLink>
        <RouterLink to="/accounts/security" custom v-slot="{ href, navigate, isExactActive }">
          <BreadcrumbLink :href="href" :current="isExactActive" @click="navigate">Security</BreadcrumbLink>
        </RouterLink>
      </Breadcrumbs>
    `,
  }),
};

export const TestWithRouter: Story = {
  ...WithRouter,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const home = canvas.getByRole('link', { name: 'Home' });
    const accounts = canvas.getByRole('link', { name: 'Accounts' });
    const security = canvas.getByRole('link', { name: 'Security' });

    await step('the design system links carry the router hrefs', async () => {
      expect(home.getAttribute('href')).toBe('/');
      expect(accounts.getAttribute('href')).toBe('/accounts');
      expect(security.getAttribute('href')).toBe('/accounts/security');
    });

    await step('clicking a breadcrumb navigates through the router and moves the current page', async () => {
      await waitFor(() => expect(home).toHaveAttribute('aria-current', 'page'));
      await userEvent.click(security);
      await waitFor(() => expect(security).toHaveAttribute('aria-current', 'page'));
      expect(home).not.toHaveAttribute('aria-current');
      expect(accounts).not.toHaveAttribute('aria-current');
    });
  },
};
