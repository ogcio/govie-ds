import type { StoryObj } from '@storybook/vue3-vite';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import * as stories from '../atoms/storybook/SideNav.meta';
import {
  Box,
  H2,
  IconButton,
  Text,
  SideNav,
  SideNavGroup,
  SideNavHeading,
  SideNavItem,
  SideNavItemLink,
} from '../index';
import { MailIcon, MoreVerticalIcon } from '../icons';
import omit from 'lodash/omit';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
  tags: ['!dev', '!autodocs'], // exclude story until Storybook examples complete
  component: SideNav,
  argTypes: {
    ...omit(stories.sideNavMeta.argTypes, ['className', 'styles']),
    class: {
      control: false,
      description: 'Additional CSS classes, merged with the classes of the `<nav>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      control: false,
      description: 'Inline CSS styles applied to the `<nav>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

/**
 * This is a DRAFT Storybook for the SideNav component. The stories mirror the React set but are not yet validated for this framework.
 */

export const Default: Story = {
  ...stories.Default,
  render: (args) => ({
    components: {
      Box,
      IconButton,
      MailIcon,
      MoreVerticalIcon,
      SideNav,
      SideNavGroup,
      SideNavHeading,
      SideNavItem,
      SideNavItemLink,
    },
    setup() {
      const current = ref('overview');
      const inboxOpen = ref(true);
      const selectItem = (value: string) => {
        current.value = value;
      };
      return { args, current, inboxOpen, selectItem };
    },
    template: `
      <SideNav v-bind="args" class="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup v-model:open="inboxOpen">
          <template #label>
            <Box class="gi-flex gi-gap-1">
              <MailIcon />
              Inbox
            </Box>
          </template>
          <template #actions>
            <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
          </template>
          <SideNavItem
            :selected="current === 'primary'"
            :ariaCurrent="current === 'primary' ? 'page' : undefined"
            @click="selectItem('primary')"
          >
            Primary
          </SideNavItem>
          <SideNavItem
            :selected="current === 'social'"
            :ariaCurrent="current === 'social' ? 'page' : undefined"
            @click="selectItem('social')"
          >
            Social
          </SideNavItem>
          <SideNavItem
            :disabled="true"
          >
            Promotions
          </SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Utilities</SideNavHeading>
        <SideNavItem
          :selected="current === 'overview'"
          :ariaCurrent="current === 'overview' ? 'page' : undefined"
          @click="selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItemLink
          :selected="current === 'link'"
          :ariaCurrent="current === 'link' ? 'page' : undefined"
          @click="selectItem('link')"
          href="#"
        >
          Homepage
        </SideNavItemLink>
        <SideNavItem
          :selected="current === 'reports'"
          :ariaCurrent="current === 'reports' ? 'page' : undefined"
          @click="selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavItem
          :selected="current === 'settings'"
          :ariaCurrent="current === 'settings' ? 'page' : undefined"
          @click="selectItem('settings')"
        >
          Settings
          <template #actions>
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="Settings action">
              <MoreVerticalIcon />
            </IconButton>
          </template>
        </SideNavItem>
      </SideNav>
    `,
  }),
};

export const WithActions: Story = {
  ...stories.WithActions,
  render: (args) => ({
    components: {
      Box,
      IconButton,
      MoreVerticalIcon,
      SideNav,
      SideNavGroup,
      SideNavItem,
      SideNavItemLink,
      Text,
    },
    setup() {
      const current = ref('');
      const inboxOpen = ref(true);
      const selectItem = (value: string) => {
        current.value = value;
      };
      return { args, current, inboxOpen, selectItem };
    },
    template: `
      <SideNav v-bind="args" class="gi-max-w-xs">
        <SideNavGroup v-model:open="inboxOpen">
          <template #label>
            <Box class="gi-flex gi-justify-between gi-items-center">
              <Text>Inbox</Text>
              <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
            </Box>
          </template>
          <template #actions>
            <IconButton
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Inbox action"
            >
              <MoreVerticalIcon />
            </IconButton>
          </template>
          <SideNavItem>Primary</SideNavItem>
        </SideNavGroup>
        <SideNavItem
          :selected="current === 'overview'"
          :ariaCurrent="current === 'overview' ? 'page' : undefined"
          @click="selectItem('overview')"
        >
          <template #actions>
            <IconButton
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Overview action"
            >
              <MoreVerticalIcon />
            </IconButton>
          </template>
          Overview
        </SideNavItem>
        <SideNavItemLink
          :selected="current === 'homepage'"
          :ariaCurrent="current === 'homepage' ? 'page' : undefined"
          @click="selectItem('homepage')"
          href="#"
        >
          <template #actions>
            <IconButton
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Homepage action"
            >
              <MoreVerticalIcon />
            </IconButton>
          </template>
          Homepage
        </SideNavItemLink>
      </SideNav>
    `,
  }),
};

export const WithRouter: Story = {
  args: {
    dataTestId: 'sidenav-with-router',
    ariaLabel: undefined,
    ariaLabelledBy: 'sidenav-with-router-label',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`SideNavItemLink` works with Vue Router through `RouterLink custom`: the slot hands `href`, `navigate` and the active state to the design system item. The recommended way to mark the active page is to bind `aria-current` to `isExactActive ? \'page\' : undefined`. This sets `aria-current="page"` on the active link, which applies the selected style and tells assistive technologies which page the user is on.\n\nAlternatively, you can bind the boolean `selected` prop to `isExactActive`. This only applies the selected style and does not set `aria-current`, so prefer `aria-current` where possible.',
      },
    },
  },
  render: (args) => ({
    components: { H2, RouterLink, SideNav, SideNavItemLink },
    setup() {
      const router = useRouter();
      onMounted(() => router.replace('/inbox'));
      return { args };
    },
    template: `
      <H2 id="sidenav-with-router-label" size="sm">Service navigation</H2>
      <SideNav v-bind="args" class="gi-max-w-xs">
        <RouterLink to="/inbox" custom v-slot="{ href, navigate, isExactActive }">
          <SideNavItemLink :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Inbox</SideNavItemLink>
        </RouterLink>
        <RouterLink to="/sent" custom v-slot="{ href, navigate, isExactActive }">
          <SideNavItemLink :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Sent</SideNavItemLink>
        </RouterLink>
        <RouterLink to="/drafts" custom v-slot="{ href, navigate, isExactActive }">
          <SideNavItemLink :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Drafts</SideNavItemLink>
        </RouterLink>
        <RouterLink to="/promotions" custom v-slot="{ href, navigate, isExactActive }">
          <SideNavItemLink :href="href" :aria-current="isExactActive ? 'page' : undefined" @click="navigate">Promotions</SideNavItemLink>
        </RouterLink>
      </SideNav>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('URLs from RouterLink match', () => {
      for (const name of ['Inbox', 'Sent', 'Drafts', 'Promotions']) {
        const link = canvas.getByRole('link', { name });
        expect(link).toHaveAttribute('href', `/${name.toLowerCase()}`);
      }
    });
    await step('aria-current set to initial url', async () => {
      await waitFor(() => expect(canvas.getByRole('link', { current: 'page' })).toHaveAccessibleName('Inbox'));
    });
  },
};

export const TestWithRouter: Story = {
  ...WithRouter,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = await canvas.findByRole('navigation', { name: 'Service navigation' });
    const scoped = within(nav);

    await waitFor(() => expect(scoped.getByRole('link', { name: 'Inbox' })).toHaveAttribute('aria-current', 'page'));

    await step('click moves aria-current', async () => {
      await userEvent.click(scoped.getByRole('link', { name: 'Sent' }));
      await waitFor(() => expect(scoped.getByRole('link', { name: 'Sent' })).toHaveAttribute('aria-current', 'page'));
      await expect(scoped.getByRole('link', { name: 'Inbox' })).not.toHaveAttribute('aria-current');
      await expect(scoped.getAllByRole('link', { current: 'page' })).toHaveLength(1);
    });
    await step('keyboard activation', async () => {
      const promotions = scoped.getByRole('link', { name: 'Promotions' });
      promotions.focus();
      await expect(promotions).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(promotions).toHaveAttribute('aria-current', 'page'));
    });
  },
};

export const Expandable: Story = {
  ...stories.Expandable,
  render: (args) => ({
    components: {
      SideNav,
      SideNavGroup,
      SideNavItem,
    },
    setup() {
      const inboxOpen = ref(true);
      const projectsOpen = ref(false);
      return { args, inboxOpen, projectsOpen };
    },
    template: `
      <SideNav v-bind="args" class="gi-max-w-xs">
        <SideNavGroup v-model:open="inboxOpen">
          <template #label>Inbox</template>
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
        <SideNavGroup :open="projectsOpen" @update:open="projectsOpen = $event">
          <template #label>Projects</template>
          <SideNavItem>Active</SideNavItem>
          <SideNavItem>Archived</SideNavItem>
        </SideNavGroup>
      </SideNav>
    `,
  }),
};

export const WithHeadings: Story = {
  ...stories.WithHeadings,
  render: (args) => ({
    components: {
      H2,
      SideNav,
      SideNavHeading,
      SideNavItem,
    },
    setup() {
      const current = ref('overview');
      const selectItem = (value: string) => {
        current.value = value;
      };
      return { args, current, selectItem };
    },
    template: `
      <H2 id="sidenav-with-headings-label" size="sm">Service navigation</H2>
      <SideNav v-bind="args" class="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavItem
          :selected="current === 'inbox'"
          :ariaCurrent="current === 'inbox' ? 'page' : undefined"
          @click="selectItem('inbox')"
        >
          Inbox
        </SideNavItem>
        <SideNavItem
          :selected="current === 'sent'"
          :ariaCurrent="current === 'sent' ? 'page' : undefined"
          @click="selectItem('sent')"
        >
          Sent
        </SideNavItem>
        <SideNavHeading>Workspace</SideNavHeading>
        <SideNavItem
          :selected="current === 'overview'"
          :ariaCurrent="current === 'overview' ? 'page' : undefined"
          @click="selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItem
          :selected="current === 'reports'"
          :ariaCurrent="current === 'reports' ? 'page' : undefined"
          @click="selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavHeading>Account</SideNavHeading>
        <SideNavItem
          :selected="current === 'settings'"
          :ariaCurrent="current === 'settings' ? 'page' : undefined"
          @click="selectItem('settings')"
        >
          Settings
        </SideNavItem>
      </SideNav>
    `,
  }),
};
