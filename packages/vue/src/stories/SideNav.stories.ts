import type { StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import * as stories from '../atoms/storybook/SideNav.meta';
import {
  Box,
  IconButton,
  MailIcon,
  MoreVerticalIcon,
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

export const Default: Story = {
  ...stories.Default,
  render: (args) => ({
    components: {
      Box,
      MailIcon,
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
    template: /*html*/ `
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
            :onClick="() => selectItem('primary')"
          >
            Primary
          </SideNavItem>
          <SideNavItem
            :selected="current === 'social'"
            :onClick="() => selectItem('social')"
          >
            Social
          </SideNavItem>
          <SideNavItem
            :selected="current === 'promotions'"
            :disabled="true"
          >
            Promotions
          </SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Utilities</SideNavHeading>
        <SideNavItem
          :selected="current === 'overview'"
          :onClick="() => selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItemLink
          :selected="current === 'link'"
          :onClick="() => selectItem('link')"
          href="#"
        >
          Homepage
        </SideNavItemLink>
        <SideNavItem
          :selected="current === 'reports'"
          :onClick="() => selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavItem
          :selected="current === 'settings'"
          :onClick="() => selectItem('settings')"
        >
          Settings
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
    },
    setup() {
      const current = ref('');
      const inboxOpen = ref(true);
      const lastTriggered = ref('none');
      const triggerAction = (value: string) => {
        lastTriggered.value = value;
      };
      const selectItem = (value: string) => {
        current.value = value;
        lastTriggered.value = value;
      };
      const toggleInbox = () => {
        inboxOpen.value = !inboxOpen.value;
        lastTriggered.value = 'inbox';
      };
      return { args, current, inboxOpen, lastTriggered, triggerAction, selectItem, toggleInbox };
    },
    template: /*html*/ `
      <div>
        <p data-testid="last-triggered">{{ lastTriggered }}</p>
        <SideNav v-bind="args" className="gi-max-w-xs">
          <SideNavGroup
            :open="inboxOpen"
            :onClick="toggleInbox"
          >
            <template #label>Inbox</template>
            <template #actions>
              <div class="gi-flex gi-items-center">
                <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
                <IconButton
                  variant="flat"
                  appearance="dark"
                  size="sm"
                  ariaLabel="Inbox action"
                  :onClick="() => triggerAction('inbox-action')"
                >
                  <MoreVerticalIcon />
                </IconButton>
              </div>
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
                :onClick="() => triggerAction('overview-action')"
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
                :onClick="() => triggerAction('homepage-action')"
              >
                <MoreVerticalIcon />
              </IconButton>
            </template>
            Homepage
          </SideNavItemLink>
        </SideNav>
      </div>
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
    template: /*html*/ `
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

export const MultiSection: Story = {
  ...stories.MultiSection,
  render: (args) => ({
    components: {
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
    template: /*html*/ `
      <SideNav v-bind="args" className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavItem
          :selected="current === 'inbox'"
          :onClick="() => selectItem('inbox')"
        >
          Inbox
        </SideNavItem>
        <SideNavItem
          :selected="current === 'sent'"
          :onClick="() => selectItem('sent')"
        >
          Sent
        </SideNavItem>
        <SideNavHeading>Workspace</SideNavHeading>
        <SideNavItem
          :selected="current === 'overview'"
          :onClick="() => selectItem('overview')"
        >
          Overview
        </SideNavItem>
        <SideNavItem
          :selected="current === 'reports'"
          :onClick="() => selectItem('reports')"
        >
          Reports
        </SideNavItem>
        <SideNavHeading>Account</SideNavHeading>
        <SideNavItem
          :selected="current === 'settings'"
          :onClick="() => selectItem('settings')"
        >
          Settings
        </SideNavItem>
      </SideNav>
    `,
  }),
};
