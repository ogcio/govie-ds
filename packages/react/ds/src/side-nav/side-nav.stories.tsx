import { Meta } from '@storybook/react';
import { SideNav, SideNavItem } from './side-nav.js';

const meta = {
  title: 'Navigation/SideNav',
  component: SideNavItem,
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation item that toggles its content visibility.',
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;

export const Basic = {
  render: () => (
    <SideNav>
      <SideNavItem value="cl-1" label="Custom Label 1" />
      <SideNavItem value="cl-2" label="Custom Label 1" />
      <SideNavItem value="cl-3" label="Custom Label 3" />
    </SideNav>
  ),
};

export const WithIcon = {
  render: () => (
    <SideNav>
      <SideNavItem icon="check" value="cl-1" label="Custom Label 1" />
      <SideNavItem icon="check" value="cl-2" label="Custom Label 1" />
      <SideNavItem icon="check" value="cl-3" label="Custom Label 3" />
    </SideNav>
  ),
};

export const Expandable = {
  render: () => (
    <SideNav>
      <SideNavItem value="cl-1" label="Custom Label 1" isExpandable>
        Content Slot
      </SideNavItem>
      <SideNavItem value="cl-2" label="Custom Label 1" isExpandable>
        Content Slot
      </SideNavItem>
      <SideNavItem value="cl-3" label="Custom Label 3" isExpandable>
        Content Slot
      </SideNavItem>
    </SideNav>
  ),
};

export const Example = {
  render: () => (
    <SideNav>
      <SideNavItem icon="info" value="dashboard" label="Dashboard" />
      <SideNavItem icon="work" value="team" label="Team" isExpandable>
        <div>Members</div>
        <div>Permissions</div>
        <div>Groups</div>
      </SideNavItem>
      <SideNavItem
        icon="attach_file"
        value="projects"
        label="Attachments"
        isExpandable
      >
        <div>Active Projects</div>
        <div>Archived Projects</div>
      </SideNavItem>
      <SideNavItem icon="settings" value="settings" label="Settings" />
    </SideNav>
  ),
};
