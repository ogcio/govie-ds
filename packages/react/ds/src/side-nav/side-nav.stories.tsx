import { Meta, StoryObj } from '@storybook/react';
import { SideNav, SideNavItem } from './side-nav.js';

const meta = {
  title: 'Navigation/SideNav',
  component: SideNavItem,
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation with multiple parentables and single selected child.',
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  render: () => (
    <SideNav>
      <SideNavItem value="cl-1" label="Custom Label 1" />
      <SideNavItem value="cl-2" label="Custom Label 2" />
      <SideNavItem value="cl-3" label="Custom Label 3" />
    </SideNav>
  ),
};

export const WithIcon = {
  render: () => (
    <SideNav>
      <SideNavItem icon="check" value="cl-1" label="Custom Label 1" />
      <SideNavItem icon="check" value="cl-2" label="Custom Label 2" />
      <SideNavItem icon="check" value="cl-3" label="Custom Label 3" />
    </SideNav>
  ),
};

export const ParentChild = {
  render: () => (
    <SideNav>
      <SideNavItem value="parent-1" label="Parent 1" parent>
        <SideNavItem value="parent-1-child-1" label="Child 1" />
        <SideNavItem value="parent-1-child-2" label="Child 2" />
      </SideNavItem>
      <SideNavItem value="parent-2" label="Parent 2" parent>
        <SideNavItem value="parent-2-child-1" label="Child 1" />
        <SideNavItem value="parent-2-child-2" label="Child 2" />
      </SideNavItem>
    </SideNav>
  ),
};

export const Example = {
  render: () => (
    <SideNav>
      <SideNavItem icon="info" value="dashboard" label="Dashboard" />
      <SideNavItem icon="work" value="team" label="Team" parent>
        <SideNavItem value="team-members" label="Members" />
        <SideNavItem value="team-permissions" label="Permissions" />
        <SideNavItem value="team-groups" label="Groups" />
      </SideNavItem>
      <SideNavItem
        icon="attach_file"
        value="projects"
        label="Attachments"
        parent
      >
        <SideNavItem value="projects-active" label="Active Projects" />
        <SideNavItem value="projects-archived" label="Archived Projects" />
      </SideNavItem>
      <SideNavItem icon="settings" value="settings" label="Settings" />
    </SideNav>
  ),
};
