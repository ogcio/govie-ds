import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/SideNav.meta';
import GiBox from '@/atoms/Box';
import GiParagraph from '@/atoms/Paragraph';
import MailIcon from '@/atoms/icons/Mail';
import EditIcon from '@/atoms/icons/Edit';
import SpaceDashboardIcon from '@/atoms/icons/SpaceDashboard';
import PersonIcon from '@/atoms/icons/Person';
import MoreVerticalIcon from '@/atoms/icons/MoreVertical';
import WorkIcon from '@/atoms/icons/Work';
import MenuIcon from '@/atoms/icons/Menu';
import AppsIcon from '@/atoms/icons/Apps';
import SettingsIcon from '@/atoms/icons/Settings';
import { SideNav, SideNavHeading, SideNavItem } from '@/side-nav/index';
import { Tag } from '@/tag/tag';
import { IconButton } from '@/atoms';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  ...stories.Basic,
  render: () => (
    <SideNav value="item-1" dataTestId="basic-nav">
      <SideNavItem value="item-1" label="Overview" />
      <SideNavItem value="item-2" label="Reports" />
      <SideNavItem value="item-3" label="Settings" />
    </SideNav>
  ),
};

export const WithIcons: Story = {
  ...stories.WithIcons,
  render: () => (
    <SideNav value="dashboard" dataTestId="icons-nav">
      <SideNavItem value="dashboard" icon={<MenuIcon />} label="Dashboard" />
      <SideNavItem value="analytics" icon={<AppsIcon />} label="Analytics" />
      <SideNavItem value="settings" icon={<SettingsIcon />} label="Settings" />
    </SideNav>
  ),
};

export const ParentChild: Story = {
  ...stories.ParentChild,
  render: () => (
    <SideNav dataTestId="parent-child-nav">
      <SideNavItem expandable value="team" label="Team">
        <SideNavItem value="team-members" label="Members" />
        <SideNavItem value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem expandable value="projects" label="Projects">
        <SideNavItem value="projects-active" label="Active Projects" />
        <SideNavItem value="projects-archived" label="Archived Projects" />
      </SideNavItem>
    </SideNav>
  ),
};

export const FullExample: Story = {
  ...stories.FullExample,
  render: () => (
    <SideNav value="projects-active" dataTestId="full-example-nav">
      <SideNavItem
        value="inbox"
        icon={<MailIcon />}
        label={
          <GiBox className="gi-flex gi-items-center gi-gap-2 gi-flex-1">
            <GiParagraph size="md" className="gi-flex-1">
              Inbox
            </GiParagraph>
            <Tag text="5" type="counter" />
          </GiBox>
        }
        actions={
          <IconButton variant="flat" ariaLabel="Inbox options" appearance="dark">
            <MoreVerticalIcon />
          </IconButton>
        }
      />
      <SideNavItem
        expandable
        open
        value="drafts"
        icon={<EditIcon />}
        label={
          <GiBox className="gi-flex gi-items-center gi-gap-2 gi-flex-1">
            <GiParagraph size="md" className="gi-flex-1">
              Drafts
            </GiParagraph>
            <Tag text="2" type="counter" />
          </GiBox>
        }
        actions={
          <IconButton variant="flat" ariaLabel="Drafts options" appearance="dark">
            <MoreVerticalIcon />
          </IconButton>
        }
      >
        <SideNavItem
          value="drafts-personal"
          label="Personal"
          actions={
            <IconButton variant="flat" ariaLabel="Personal drafts options" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
        <SideNavItem
          value="drafts-work"
          label="Work"
          actions={
            <IconButton variant="flat" ariaLabel="Work drafts options" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
      </SideNavItem>
      <SideNavHeading>Workspace</SideNavHeading>
      <SideNavItem value="dashboard" icon={<SpaceDashboardIcon />} label="Dashboard" />
      <SideNavItem expandable value="team" icon={<PersonIcon />} label="Team">
        <SideNavItem
          value="team-members"
          label={
            <GiBox className="gi-flex gi-items-center gi-gap-2 gi-flex-1">
              <GiParagraph size="sm" className="gi-flex-1">
                Members
              </GiParagraph>
              <Tag text="12" type="counter" />
            </GiBox>
          }
        />
        <SideNavItem value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem
        expandable
        open
        value="projects"
        icon={<WorkIcon />}
        label={
          <GiBox className="gi-flex gi-items-center gi-gap-2 gi-flex-1">
            <GiParagraph size="md" className="gi-flex-1">
              Projects
            </GiParagraph>
            <Tag text="3" type="counter" />
          </GiBox>
        }
      >
        <SideNavItem
          value="projects-active"
          label="Active"
          href="/projects/active"
          actions={
            <IconButton variant="flat" ariaLabel="Active options" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
        <SideNavItem
          value="projects-archived"
          label="Archived"
          href="/projects/archived"
          actions={
            <IconButton variant="flat" ariaLabel="Archived options" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
        <SideNavItem
          value="projects-completed"
          label="Completed"
          href="/projects/completed"
          actions={
            <IconButton variant="flat" ariaLabel="Completed options" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
      </SideNavItem>
      <SideNavItem value="account" icon={<PersonIcon />} label="Account" />
    </SideNav>
  ),
};
