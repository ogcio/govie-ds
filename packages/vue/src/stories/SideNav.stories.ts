import type { StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import * as stories from '../atoms/storybook/SideNav.meta';
import {
  Box,
  H2,
  IconButton,
  MailIcon,
  MoreVerticalIcon,
  Text,
  SideNav,
  SideNavGroup,
  SideNavHeading,
  SideNavItem,
  SideNavItemLink,
} from '../atoms';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
  tags: ['!dev', '!autodocs'], // exclude story until Storybook examples complete
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
      const toggleInbox = () => {
        inboxOpen.value = !inboxOpen.value;
      };
      return { args, current, inboxOpen, selectItem, toggleInbox };
    },
    template: `
      <SideNav v-bind="args" className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          :open="inboxOpen"
          :onClick="toggleInbox"
        >
          <template #label>
            <Box className="gi-flex gi-gap-1">
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
            :onClick="() => selectItem('primary')"
          >
            Primary
          </SideNavItem>
          <SideNavItem
            :selected="current === 'social'"
            :ariaCurrent="current === 'social' ? 'page' : undefined"
            :onClick="() => selectItem('social')"
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
          :onClick="() => selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItemLink
          :selected="current === 'link'"
          :ariaCurrent="current === 'link' ? 'page' : undefined"
          :onClick="() => selectItem('link')"
          href="#"
        >
          Homepage
        </SideNavItemLink>
        <SideNavItem
          :selected="current === 'reports'"
          :ariaCurrent="current === 'reports' ? 'page' : undefined"
          :onClick="() => selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavItem
          :selected="current === 'settings'"
          :ariaCurrent="current === 'settings' ? 'page' : undefined"
          :onClick="() => selectItem('settings')"
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
      const toggleInbox = () => {
        inboxOpen.value = !inboxOpen.value;
      };
      return { args, current, inboxOpen, selectItem, toggleInbox };
    },
    template: `
      <SideNav v-bind="args" className="gi-max-w-xs">
        <SideNavGroup
          :open="inboxOpen"
          :onClick="toggleInbox"
        >
          <template #label>
            <Box className="gi-flex gi-justify-between gi-items-center">
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
          :onClick="() => selectItem('overview')"
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
          :onClick="() => selectItem('homepage')"
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
      const toggleInbox = () => {
        inboxOpen.value = !inboxOpen.value;
      };
      const toggleProjects = () => {
        projectsOpen.value = !projectsOpen.value;
      };
      return { args, inboxOpen, projectsOpen, toggleInbox, toggleProjects };
    },
    template: `
      <SideNav v-bind="args" className="gi-max-w-xs">
        <SideNavGroup
          :open="inboxOpen"
          :onClick="toggleInbox"
        >
          <template #label>Inbox</template>
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
        <SideNavGroup
          :open="projectsOpen"
          :onClick="toggleProjects"
        >
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
      <SideNav v-bind="args" className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavItem
          :selected="current === 'inbox'"
          :ariaCurrent="current === 'inbox' ? 'page' : undefined"
          :onClick="() => selectItem('inbox')"
        >
          Inbox
        </SideNavItem>
        <SideNavItem
          :selected="current === 'sent'"
          :ariaCurrent="current === 'sent' ? 'page' : undefined"
          :onClick="() => selectItem('sent')"
        >
          Sent
        </SideNavItem>
        <SideNavHeading>Workspace</SideNavHeading>
        <SideNavItem
          :selected="current === 'overview'"
          :ariaCurrent="current === 'overview' ? 'page' : undefined"
          :onClick="() => selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItem
          :selected="current === 'reports'"
          :ariaCurrent="current === 'reports' ? 'page' : undefined"
          :onClick="() => selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavHeading>Account</SideNavHeading>
        <SideNavItem
          :selected="current === 'settings'"
          :ariaCurrent="current === 'settings' ? 'page' : undefined"
          :onClick="() => selectItem('settings')"
        >
          Settings
        </SideNavItem>
      </SideNav>
    `,
  }),
};
