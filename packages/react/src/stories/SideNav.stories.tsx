import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  sideNavMeta,
  Default as defaultStory,
  Expandable as expandableStory,
  WithHeadings as withHeadingsStory,
  WithActions as withActionsStory,
} from '@/atoms/storybook/SideNav.meta';
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
  ...defaultStory,
  render: function Render(props) {
    const [current, setCurrent] = useState('overview');
    const [inboxOpen, setInboxOpen] = useState(true);
    const itemProps = (value: string) => ({
      selected: value === current,
      onClick: () => setCurrent(value),
    });

    return (
      <SideNav ariaLabel="Side navigation" dataTestId="basic-nav" className="gi-max-w-xs">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          open={inboxOpen}
          onClick={() => {
            setInboxOpen((open) => !open);
          }}
          label={
            <GiBox className="gi-flex gi-gap-1">
              <MailIcon />
              Inbox
            </GiBox>
          }
          actions={<Tag type="counter" text="3" />}
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

export const WithActions: Story = {
  ...withActionsStory,
  render: function Render(props) {
    const [current, setCurrent] = useState('');
    const [inboxOpen, setInboxOpen] = useState(true);
    const [lastTriggered, setLastTriggered] = useState('none');
    return (
      <div>
        <p data-testid="last-triggered">{lastTriggered}</p>
        <SideNav ariaLabel="Side navigation" dataTestId="basic-nav" className="gi-max-w-xs">
          <SideNavGroup
            open={inboxOpen}
            onClick={() => {
              setInboxOpen((open) => !open);
              setLastTriggered('inbox');
            }}
            label={
              <GiBox className="gi-flex gi-justify-between gi-items-center">
                <Text>Inbox</Text>
                <Tag type="counter" text="3" />
              </GiBox>
            }
            actions={
              <IconButton
                variant="flat"
                appearance="dark"
                size="sm"
                ariaLabel="Inbox action"
                onClick={() => setLastTriggered('inbox-action')}
              >
                <MoreVerticalIcon />
              </IconButton>
            }
          >
            <SideNavItem>Primary</SideNavItem>
          </SideNavGroup>
          <SideNavItem
            selected={current === 'overview'}
            ariaCurrent={current === 'overview' ? 'page' : undefined}
            onClick={() => {
              setCurrent('overview');
              setLastTriggered('overview');
            }}
            actions={
              <IconButton
                variant="flat"
                appearance="dark"
                size="sm"
                ariaLabel="Overview action"
                onClick={() => setLastTriggered('overview-action')}
              >
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
            onClick={() => {
              setCurrent('homepage');
              setLastTriggered('homepage');
            }}
            actions={
              <IconButton
                variant="flat"
                appearance="dark"
                size="sm"
                ariaLabel="Homepage action"
                onClick={() => setLastTriggered('homepage-action')}
              >
                <MoreVerticalIcon />
              </IconButton>
            }
          >
            Homepage
          </SideNavItemLink>
        </SideNav>
      </div>
    );
  },
};

export const Expandable: Story = {
  ...expandableStory,
  render: function Render(props) {
    const [inboxOpen, setInboxOpen] = useState(true);
    const [projectsOpen, setProjectsOpen] = useState(false);

    return (
      <SideNav ariaLabel="Side navigation" dataTestId={props.dataTestId} className="gi-max-w-xs">
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
  ...withHeadingsStory,

  render: function Render(props) {
    const [current, setCurrent] = useState('overview');
    const itemProps = (value: string) => ({
      selected: value === current,
      onClick: () => setCurrent(value),
    });

    return (
      <>
        <H2 id="sidenav-with-headings-label" size="sm">
          Service navigation
        </H2>
        <SideNav
          ariaLabel="Side navigation"
          ariaLabelledBy="sidenav-with-headings-label"
          className="gi-max-w-xs"
          dataTestId="basic-nav"
        >
          <SideNavHeading>Messages</SideNavHeading>
          <SideNavItem {...itemProps('inbox')}>Inbox</SideNavItem>
          <SideNavItem {...itemProps('sent')}>Sent</SideNavItem>
          <SideNavHeading>Workspace</SideNavHeading>
          <SideNavItem {...itemProps('overview')}>Overview</SideNavItem>
          <SideNavItem {...itemProps('reports')}>Reports</SideNavItem>
          <SideNavHeading>Account</SideNavHeading>
          <SideNavItem {...itemProps('settings')}>Settings</SideNavItem>
        </SideNav>
      </>
    );
  },
};
