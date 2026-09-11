import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  sideNavMeta,
  Default as defaultStory,
  Expandable as expandableStory,
  MultiSection as multiSectionStory,
} from '@/atoms/storybook/SideNav.meta';
import GiBox from '@/atoms/Box';
import MailIcon from '@/atoms/icons/Mail';
import MoreVertical from '@/atoms/icons/MoreVertical';
import { IconButton } from '@/atoms';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import SideNavItemLink from '@/atoms/sidenav/SideNavItemLink';
import { Tag } from '@/tag/tag';

const meta = {
  ...sideNavMeta,
  title: 'Navigation/SideNav/SideNav',
  component: SideNav,
  parameters: {
    ...sideNavMeta.parameters,
    docs: {
      ...sideNavMeta.parameters.docs,
      description: {
        component: `${sideNavMeta.parameters.docs.description.component}\n\nThis is the recommended SideNav component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNav } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: function Render(props) {
    const [current, setCurrent] = useState('overview');
    const [inboxOpen, setInboxOpen] = useState(true);
    const itemProps = (value: string) => ({
      selected: value === current,
      onClick: () => setCurrent(value),
    });

    return (
      <SideNav {...props} className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          open={inboxOpen}
          onClick={() => {
            setInboxOpen((open) => !open);
            setCurrent('inbox');
          }}
          selected={current === 'inbox'}
          ariaCurrent={current === 'inbox' ? 'page' : 'false'}
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="More actions">
              <MoreVertical />
            </IconButton>
          }
          label={
            <GiBox className="gi-flex gi-w-full gi-justify-between">
              <GiBox className="gi-flex gi-gap-1">
                <MailIcon />
                Inbox
              </GiBox>
              <Tag type="counter" text={'3'} />
            </GiBox>
          }
        >
          <SideNavItem {...itemProps('primary')}>Primary</SideNavItem>
          <SideNavItem {...itemProps('social')}>Social</SideNavItem>
          <SideNavItem {...itemProps('promotions')} disabled>
            Promotions
          </SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Utilities</SideNavHeading>
        <SideNavItem {...itemProps('overview')}>Overview</SideNavItem>
        <SideNavItemLink {...itemProps('link')} href="#">
          Homepage
        </SideNavItemLink>
        <SideNavItem {...itemProps('reports')}>Reports</SideNavItem>
        <SideNavItem {...itemProps('settings')}>Settings</SideNavItem>
      </SideNav>
    );
  },
};

export const Expandable: Story = {
  ...expandableStory,
  render: function Render(props) {
    const [inboxOpen, setInboxOpen] = useState(true);
    const [projectsOpen, setProjectsOpen] = useState(false);

    return (
      <SideNav {...props} className="gi-max-w-xs">
        <SideNavGroup open={inboxOpen} onClick={() => setInboxOpen((open) => !open)} label="Inbox">
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
        <SideNavGroup open={projectsOpen} onClick={() => setProjectsOpen((open) => !open)} label="Projects">
          <SideNavItem>Active</SideNavItem>
          <SideNavItem>Archived</SideNavItem>
        </SideNavGroup>
      </SideNav>
    );
  },
};

export const MultiSection: Story = {
  ...multiSectionStory,
  render: function Render(props) {
    const [current, setCurrent] = useState('overview');
    const itemProps = (value: string) => ({
      selected: value === current,
      onClick: () => setCurrent(value),
    });

    return (
      <SideNav {...props} className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavItem {...itemProps('inbox')}>Inbox</SideNavItem>
        <SideNavItem {...itemProps('sent')}>Sent</SideNavItem>
        <SideNavHeading>Workspace</SideNavHeading>
        <SideNavItem {...itemProps('overview')}>Overview</SideNavItem>
        <SideNavItem {...itemProps('reports')}>Reports</SideNavItem>
        <SideNavHeading>Account</SideNavHeading>
        <SideNavItem {...itemProps('settings')}>Settings</SideNavItem>
      </SideNav>
    );
  },
};
