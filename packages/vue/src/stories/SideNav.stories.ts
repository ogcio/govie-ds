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

/**
 * This is a DRAFT Storybook for the SideNav component. Implementation is still being finalised
 */

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
    template: `
      <SideNav :dataTestId="args.dataTestId">
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
            Promotions (disabled)
          </SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Side Nav Heading</SideNavHeading>
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
        <SideNav :dataTestId="args.dataTestId">
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
