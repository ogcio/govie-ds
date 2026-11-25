import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { RouterLink } from 'vue-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import * as stories from '../atoms/storybook/Link.meta';
import argTypes from '../atoms/storybook/argTypes';
import { HomeIcon } from '../icons';
import { H1, H2, Link, Paragraph, Stack } from '../index';
import { withPreventNavigation } from './utils';

const meta: Meta = {
  ...stories.linkMeta,
  title: 'Navigation/Link',
  component: Link,
  decorators: [withPreventNavigation],
  argTypes: {
    ...stories.linkMeta.argTypes,
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

export const InlineLink: Story = {
  ...stories.InlineLink,
  render: (args) => ({
    components: { Link },
    setup: () => ({ args }),
    template: `
      <Link
        :id="args.id"
        :href="args.href"
        :variant="args.variant"
        :underline="args.underline"
        :appearance="args.appearance"
        :visited="args.visited"
        :external="args.external"
        :data-testid="args.dataTestId"
      >{{ args.children }}</Link>
    `,
  }),
};

export const InTypography: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Link underline and scale next to heading and body typography.',
      },
    },
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
  render: () => ({
    components: { H1, H2, Link, Paragraph },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-8 gi-max-w-prose">
        <div class="gi-flex gi-flex-col gi-gap-4">
          <H1>Heading with an <Link href="#" variant="inline">inline link</Link></H1>
          <Paragraph>
            Government services are available on <Link href="#" variant="inline">gov.ie</Link>.
            You can also check <Link href="#" variant="inline">your application status</Link>
            or contact the <Link href="#" variant="inline">support team</Link> for help.
          </Paragraph>
        </div>

        <div class="gi-flex gi-flex-col gi-gap-4">
          <H2>Underlines</H2>
          <Paragraph>Always underlined: <Link href="#" variant="inline" underline="always">apply online</Link></Paragraph>
          <Paragraph>Hover only: <Link href="#" variant="inline" underline="hover">check status</Link></Paragraph>
          <Paragraph>No underline: <Link href="#" variant="inline" underline="none">learn more</Link></Paragraph>
        </div>

        <div class="gi-flex gi-flex-col gi-gap-4">
          <H2>Visited</H2>
          <Paragraph>Default visited colour: <Link href="#" variant="inline">visited link</Link></Paragraph>
          <Paragraph>No visited colour: <Link href="#" variant="inline" visited="none">always same colour</Link></Paragraph>
        </div>

        <div class="gi-flex gi-flex-col gi-gap-4">
          <H2>Appearances</H2>
          <div class="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
            <Paragraph class="gi-text-white">
              Light on dark: <Link href="#" variant="inline" appearance="light">gov.ie services</Link>
            </Paragraph>
          </div>
          <Paragraph class="gi-text-gray-700 gi-pl-4">
            Inherit parent colour: <Link href="#" variant="inline" appearance="inherit">inherited link</Link>
          </Paragraph>
        </div>

        <div class="gi-flex gi-flex-col gi-gap-4">
          <H2>Interaction states</H2>
          <Paragraph class="gi-flex gi-gap-4 gi-pl-4">
            <Link href="#" variant="inline">default</Link>
            <Link href="#" variant="inline" class="pseudo-hover">hover</Link>
            <Link href="#" variant="inline" class="pseudo-focus">focus</Link>
          </Paragraph>
          <div class="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
            <Paragraph class="gi-text-white gi-flex gi-gap-4">
              <Link href="#" variant="inline" appearance="light">light</Link>
              <Link href="#" variant="inline" appearance="light" class="pseudo-hover">hover</Link>
              <Link href="#" variant="inline" appearance="light" class="pseudo-focus">focus</Link>
            </Paragraph>
          </div>
        </div>
      </div>
    `,
  }),
};

export const PlainLink: Story = {
  ...stories.PlainLink,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The default variant renders a bare anchor with no design-system styles. Use it to wrap content such as an icon, and give the link an `aria-label` when it has no visible text.',
      },
    },
  },
  render: () => ({
    components: { HomeIcon, Link },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6 gi-items-start">
        <Link href="#" aria-label="Home" class="gi-inline-flex gi-w-fit">
          <HomeIcon />
        </Link>
        <div class="gi-bg-black gi-p-4 gi-rounded gi-w-fit gi-flex gi-gap-4 gi-items-center">
          <Link href="#" appearance="light" visited="none">Light Appearance</Link>
        </div>
      </div>
    `,
  }),
};

export const PlainFocusState: Story = {
  ...stories.PlainFocusState,
  parameters: {
    ...stories.PlainFocusState.parameters,
    controls: { disable: true },
  },
  render: () => ({
    components: { HomeIcon, Link },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div class="gi-flex gi-gap-4 gi-items-center">
          <Link href="#" aria-label="Home" data-testid="link-icon-default" class="gi-inline-flex gi-w-fit pseudo-focus">
            <HomeIcon />
          </Link>
        </div>
        <div class="gi-bg-black gi-p-4 gi-rounded gi-w-fit gi-flex gi-gap-4 gi-items-center">
          <Link
            href="#"
            appearance="light"
            aria-label="Home light"
            data-testid="link-icon-light"
            class="gi-inline-flex gi-w-fit pseudo-focus"
          >
            <HomeIcon />
          </Link>
        </div>
      </div>
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

export const AriaHiddenFalse: Story = {
  ...stories.AriaHiddenFalse,
  tags: ['!dev', '!autodocs', 'skip-playwright'],
  render: (args) => ({
    components: { Link },
    setup: () => ({ args }),
    template: '<Link :href="args.href" aria-hidden="false" :data-testid="args.dataTestId">{{ args.children }}</Link>',
  }),
};
