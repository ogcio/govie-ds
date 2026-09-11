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
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['!dev', '!autodocs'], // exclude story until Storybook examples complete
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
        current.value = 'inbox';
      };
      return { args, current, inboxOpen, selectItem, toggleInbox };
    },
    template: `
      <SideNav :dataTestId="args.dataTestId">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          :open="inboxOpen"
          :onClick="toggleInbox"
          :selected="current === 'inbox'"
          :ariaCurrent="current === 'inbox' ? 'page' : 'false'"
        >
          <template #label>
            <Box className="gi-flex gi-w-full gi-justify-between">
              <Box className="gi-flex gi-gap-1">
                <MailIcon />
                Inbox
              </Box>
              <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
            </Box>
          </template>
          <template #actions>
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="More actions">
              <MoreVerticalIcon />
            </IconButton>
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
