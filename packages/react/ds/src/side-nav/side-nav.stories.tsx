import { Meta, StoryObj } from '@storybook/react';
import { SideNav, SideNavItem } from './side-nav.js';

const meta = {
  title: 'Navigation/SideNav',
  component: SideNavItem,
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation component supporting primary/secondary relationships and single selected child at a time.',
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;

export const Basic = {
  render: () => (
    <SideNav value="item-1">
      <SideNavItem value="item-1" label="Overview" primary />
      <SideNavItem value="item-2" label="Reports" primary />
      <SideNavItem value="item-3" label="Settings" primary />
    </SideNav>
  ),
};

export const WithIcons = {
  render: () => (
    <SideNav value="dashboard">
      <SideNavItem icon="menu" value="dashboard" label="Dashboard" />
      <SideNavItem icon="apps" value="analytics" label="Analytics" />
      <SideNavItem icon="settings" value="settings" label="Settings" />
    </SideNav>
  ),
};

export const ParentChild = {
  render: () => (
    <SideNav>
      <SideNavItem value="team" label="Team" primary expandable>
        <SideNavItem secondary value="team-members" label="Members" />
        <SideNavItem secondary value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem value="projects" label="Projects" primary expandable>
        <SideNavItem
          secondary
          value="projects-active"
          label="Active Projects"
        />
        <SideNavItem
          secondary
          value="projects-archived"
          label="Archived Projects"
        />
      </SideNavItem>
    </SideNav>
  ),
};

export const FullExample = {
  render: () => (
    <SideNav value="projects-active">
      <SideNavItem primary value="dashboard" label="Dashboard" />
      <SideNavItem primary expandable value="team" label="Team">
        <SideNavItem secondary value="team-members" label="Members" />
        <SideNavItem secondary value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem
        primary
        open
        expandable
        value="projects"
        label="Projects"
        href="#"
      >
        <SideNavItem
          secondary
          value="projects-active"
          label="Active"
          href="#"
        />
        <SideNavItem
          secondary
          href="#"
          value="projects-archived"
          label="Archived"
        />
      </SideNavItem>
      <SideNavItem primary value="settings" label="Settings" />
    </SideNav>
  ),
};
