import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as stories from '@/atoms/storybook/SideNav.meta';
import GiBox from '@/atoms/Box';
import MailIcon from '@/atoms/icons/Mail';
import H2 from '@/atoms/heading/H2';
import IconButton from '@/atoms/IconButton';
import MoreVerticalIcon from '@/atoms/icons/MoreVertical';
import Text from '@/atoms/Text';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import { Tag } from '@/tag/tag';
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import { extractRenderBody } from '@/test-utilities';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav/SideNav',
  component: SideNav,
  parameters: {
    ...stories.sideNavMeta.parameters,
    docs: {
      ...stories.sideNavMeta.parameters.docs,
      description: {
        component: `${stories.sideNavMeta.parameters.docs.description.component}\n\nThis is the recommended SideNav component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNav } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
} as Meta<typeof SideNav>;

export default meta;

type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  ...stories.Default,
  render: function Render() {
    const [current, setCurrent] = useState('overview');
    const [inboxOpen, setInboxOpen] = useState(true);

    return (
      <SideNav ariaLabel="Side navigation" dataTestId="basic-nav" className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          open={inboxOpen}
          onClick={() => setInboxOpen((open) => !open)}
          label={
            <GiBox className="gi-flex gi-gap-1">
              <MailIcon />
              Inbox
            </GiBox>
          }
          actions={<Tag type="counter" text="3" />}
        >
          <SideNavItem
            selected={current === 'primary'}
            ariaCurrent={current === 'primary' ? 'page' : undefined}
            onClick={() => setCurrent('primary')}
          >
            Primary
          </SideNavItem>
          <SideNavItem
            selected={current === 'social'}
            ariaCurrent={current === 'social' ? 'page' : undefined}
            onClick={() => setCurrent('social')}
          >
            Social
          </SideNavItem>
          <SideNavItem disabled>Promotions</SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Utilities</SideNavHeading>
        <SideNavItem
          selected={current === 'overview'}
          ariaCurrent={current === 'overview' ? 'page' : undefined}
          onClick={() => setCurrent('overview')}
        >
          Overview
        </SideNavItem>
        <SideNavItemLink
          selected={current === 'link'}
          ariaCurrent={current === 'link' ? 'page' : undefined}
          onClick={() => setCurrent('link')}
          href="#"
        >
          Homepage
        </SideNavItemLink>
        <SideNavItem
          selected={current === 'reports'}
          ariaCurrent={current === 'reports' ? 'page' : undefined}
          onClick={() => setCurrent('reports')}
        >
          Reports
        </SideNavItem>
        <SideNavItem
          selected={current === 'settings'}
          ariaCurrent={current === 'settings' ? 'page' : undefined}
          onClick={() => setCurrent('settings')}
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="Settings action">
              <MoreVerticalIcon />
            </IconButton>
          }
        >
          Settings
        </SideNavItem>
      </SideNav>
    );
  },
};

export const WithActions: Story = {
  ...stories.WithActions,
  tags: ['skip-playwright'],
  render: function Render() {
    const [current, setCurrent] = useState('');
    const [inboxOpen, setInboxOpen] = useState(true);
    return (
      <SideNav ariaLabel="Side navigation" dataTestId="sidenav-with-actions" className="gi-max-w-xs">
        <SideNavGroup
          open={inboxOpen}
          onClick={() => setInboxOpen((open) => !open)}
          label={
            <GiBox className="gi-flex gi-justify-between gi-items-center">
              <Text>Inbox</Text>
              <Tag type="counter" text="3" />
            </GiBox>
          }
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="Inbox action">
              <MoreVerticalIcon />
            </IconButton>
          }
        >
          <SideNavItem>Primary</SideNavItem>
        </SideNavGroup>
        <SideNavItem
          selected={current === 'overview'}
          ariaCurrent={current === 'overview' ? 'page' : undefined}
          onClick={() => setCurrent('overview')}
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="Overview action">
              <MoreVerticalIcon />
            </IconButton>
          }
        >
          Overview
        </SideNavItem>
        <SideNavItemLink
          selected={current === 'homepage'}
          ariaCurrent={current === 'homepage' ? 'page' : undefined}
          href="#"
          onClick={() => setCurrent('homepage')}
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="Homepage action">
              <MoreVerticalIcon />
            </IconButton>
          }
        >
          Homepage
        </SideNavItemLink>
      </SideNav>
    );
  },
};

export const Expandable: Story = {
  ...stories.Expandable,
  tags: ['skip-playwright'],
  render: function Render() {
    const [inboxOpen, setInboxOpen] = useState(true);
    const [projectsOpen, setProjectsOpen] = useState(false);

    return (
      <SideNav ariaLabel="Side navigation" dataTestId="expandable-nav" className="gi-max-w-xs">
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

export const WithHeadings: Story = {
  ...stories.WithHeadings,
  render: function Render() {
    const [current, setCurrent] = useState('overview');

    return (
      <>
        <H2 id="sidenav-with-headings-label" size="sm">
          Service navigation
        </H2>
        <SideNav
          ariaLabelledBy="sidenav-with-headings-label"
          dataTestId="sidenav-with-headings"
          className="gi-max-w-xs"
        >
          <SideNavHeading>Messages</SideNavHeading>
          <SideNavItem
            selected={current === 'inbox'}
            ariaCurrent={current === 'inbox' ? 'page' : undefined}
            onClick={() => setCurrent('inbox')}
          >
            Inbox
          </SideNavItem>
          <SideNavItem
            selected={current === 'sent'}
            ariaCurrent={current === 'sent' ? 'page' : undefined}
            onClick={() => setCurrent('sent')}
          >
            Sent
          </SideNavItem>
          <SideNavHeading>Workspace</SideNavHeading>
          <SideNavItem
            selected={current === 'overview'}
            ariaCurrent={current === 'overview' ? 'page' : undefined}
            onClick={() => setCurrent('overview')}
          >
            Overview
          </SideNavItem>
          <SideNavItem
            selected={current === 'reports'}
            ariaCurrent={current === 'reports' ? 'page' : undefined}
            onClick={() => setCurrent('reports')}
          >
            Reports
          </SideNavItem>
          <SideNavHeading>Account</SideNavHeading>
          <SideNavItem
            selected={current === 'settings'}
            ariaCurrent={current === 'settings' ? 'page' : undefined}
            onClick={() => setCurrent('settings')}
          >
            Settings
          </SideNavItem>
        </SideNav>
      </>
    );
  },
};
