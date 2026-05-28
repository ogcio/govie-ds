import type { Meta } from '@storybook/react-vite';
import { IconButton } from '@/icon-button/icon-button';
import { Paragraph } from '@/paragraph/paragraph';
import { Tag } from '@/tag/tag';
import { SideNav, SideNavHeading, SideNavItem } from './side-nav';
import { Box } from '@/Box';
import Apps from '@/atoms/icons/Apps';
import Edit from '@/atoms/icons/Edit';
import Mail from '@/atoms/icons/Mail';
import Menu from '@/atoms/icons/Menu';
import MoreVertical from '@/atoms/icons/MoreVertical';
import Send from '@/atoms/icons/Send';
import Settings from '@/atoms/icons/Settings';

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
      <SideNavItem icon={<Menu />} value="dashboard" label="Dashboard" />
      <SideNavItem icon={<Apps />} value="analytics" label="Analytics" />
      <SideNavItem icon={<Settings />} value="settings" label="Settings" />
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
        <SideNavItem secondary value="projects-active" label="Active Projects" />
        <SideNavItem secondary value="projects-archived" label="Archived Projects" />
      </SideNavItem>
    </SideNav>
  ),
};

export const WithActions = {
  render: () => (
    <SideNav value="inbox">
      <SideNavHeading>Messages</SideNavHeading>
      <SideNavItem
        primary
        expandable
        open
        value="inbox"
        icon={<Mail />}
        label={
          <Box className="gi-flex gi-justify-between gi-flex-1 gi-items-baseline">
            <Paragraph size="md" className="gi-font-bold">
              Inbox
            </Paragraph>
            <Tag text="3" type="counter" />
          </Box>
        }
        actions={
          <IconButton size="sm" variant="flat" appearance="dark" ariaLabel="More options">
            <MoreVertical />
          </IconButton>
        }
      >
        <SideNavItem
          secondary
          value="inbox-primary"
          label="Primary"
          actions={
            <IconButton size="sm" variant="flat" appearance="dark" ariaLabel="More options">
              <MoreVertical />
            </IconButton>
          }
        />
        <SideNavItem
          secondary
          value="inbox-social"
          label={
            <Box className="gi-flex gi-justify-between gi-flex-1 gi-items-baseline">
              <Paragraph size="md">Social</Paragraph>
              <Tag text="5" type="counter" />
            </Box>
          }
        />
        <SideNavItem
          secondary
          value="inbox-promotions"
          label={
            <Box className="gi-flex gi-justify-between gi-flex-1 gi-items-baseline">
              <Paragraph size="md">Promotions</Paragraph>
              <Tag text="12" type="counter" />
            </Box>
          }
        />
      </SideNavItem>
      <SideNavItem
        primary
        value="sent"
        icon={<Send />}
        label="Sent"
        actions={
          <IconButton size="sm" variant="flat" appearance="dark" ariaLabel="More options">
            <MoreVertical />
          </IconButton>
        }
      />
      <SideNavItem
        primary
        value="drafts"
        icon={<Edit />}
        label={
          <Box className="gi-flex gi-justify-between gi-flex-1 gi-items-baseline">
            <Paragraph size="md" className="gi-font-bold">
              Drafts
            </Paragraph>
            <Tag text="1" type="counter" />
          </Box>
        }
      />
    </SideNav>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates composable labels with counter Tags and trailing actions using IconButton. The `label` prop accepts a ReactNode for rich content, and the `actions` prop provides a slot for per-item controls that are independently clickable without triggering row selection.',
      },
    },
  },
};

export const FullExample = {
  render: () => (
    <SideNav value="projects-active">
      <SideNavHeading>Heading Label</SideNavHeading>
      <SideNavItem primary value="dashboard" label="Dashboard" />
      <SideNavHeading>Heading Label</SideNavHeading>
      <SideNavItem primary expandable value="team" label="Team">
        <SideNavItem secondary value="team-members" label="Members" />
        <SideNavHeading secondary>Heading Label Secondary</SideNavHeading>
        <SideNavItem secondary value="team-permissions" label="Permissions" />
      </SideNavItem>
      <SideNavItem primary open expandable value="projects" label="Projects">
        <SideNavItem secondary value="projects-active" label="Active" href="#" />
        <SideNavItem secondary href="#" value="projects-archived" label="Archived" />
      </SideNavItem>
      <SideNavItem primary value="settings" label="Settings" />
    </SideNav>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases a fully expanded side navigation component. Several items include `href` links, which define their navigation targets. These links can be further customized using the `hrefComponent` prop for advanced routing scenarios (e.g., with React Router or Next.js Link).',
      },
    },
  },
};
