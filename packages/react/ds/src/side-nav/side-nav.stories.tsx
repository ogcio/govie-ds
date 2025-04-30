import { Meta, StoryObj } from '@storybook/react';
import { SideNav, SideNavItem } from './side-nav.js';

const meta = {
  title: 'Navigation/SideNav',
  component: SideNavItem,
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation component supporting parent/child relationships and single selected child at a time.',
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  render: () => (
    <SideNav value="item-1">
      <SideNavItem value="item-1" label="Overview" parent />
      <SideNavItem value="item-2" label="Reports" parent />
      <SideNavItem value="item-3" label="Settings" parent />
    </SideNav>
  ),
};

export const WithIcons = {
  render: () => (
    <SideNav value="dashboard">
      <SideNavItem icon="menu" value="dashboard" label="Dashboard" parent />
      <SideNavItem icon="apps" value="analytics" label="Analytics" parent />
      <SideNavItem icon="settings" value="settings" label="Settings" parent />
    </SideNav>
  ),
};

export const ParentChild = {
  render: () => (
    <SideNav>
      <SideNavItem value="team" label="Team" parent expandable>
        <SideNavItem value="team-members" label="Members" />
        <SideNavItem value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem value="projects" label="Projects" parent expandable>
        <SideNavItem value="projects-active" label="Active Projects" />
        <SideNavItem value="projects-archived" label="Archived Projects" />
      </SideNavItem>
    </SideNav>
  ),
};

export const FullExample = {
  render: () => (
    <SideNav value="projects">
      <SideNavItem value="dashboard" label="Dashboard" parent icon="apps" />

      <SideNavItem value="team" label="Team" parent expandable icon="info">
        <SideNavItem value="team-members" label="Members" icon="person" />
        <SideNavItem
          value="team-permissions"
          label="Permissions"
          icon="event"
        />
      </SideNavItem>

      <SideNavItem
        value="projects"
        label="Projects"
        parent
        open
        expandable
        icon="attach_file"
      >
        <SideNavItem
          value="projects-active"
          label="Active"
          icon="check_circle"
        />
        <SideNavItem value="projects-archived" label="Archived" icon="info" />
      </SideNavItem>

      <SideNavItem value="settings" label="Settings" parent icon="settings" />
    </SideNav>
  ),
};
