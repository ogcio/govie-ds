import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbLink.meta';
import BreadcrumbLink from '@/breadcrumbs-next/BreadcrumbLink';
import Breadcrumbs from '@/breadcrumbs-next/Breadcrumbs';
import SettingsIcon from '@/atoms/icons/Settings';
import HomeIcon from '@/atoms/icons/Home';
import PersonIcon from '@/atoms/icons/Person';
import { importDisclaimer } from './helpers';

const { styles, ...remainingArgTypes } = stories.breadcrumbLinkMeta.argTypes;

const meta = {
  ...stories.breadcrumbLinkMeta,
  argTypes: {
    ...remainingArgTypes,
    asChild: {
      control: false,
      description:
        'When true, `BreadcrumbLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    style: styles,
    onClick: {
      action: 'clicked',
      description: 'Click handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
  },
  title: 'Navigation/Breadcrumbs/BreadcrumbLink',
  parameters: {
    ...stories.breadcrumbLinkMeta.parameters,
    docs: {
      description: {
        component: `${stories.breadcrumbLinkMeta.parameters.docs.description.component} ${importDisclaimer('BreadcrumbLink')}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbLink>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Breadcrumbs>
      <BreadcrumbLink {...props}>Home</BreadcrumbLink>
    </Breadcrumbs>
  ),
};

export const CurrentLink: Story = {
  ...stories.CurrentLink,
  render: (props) => (
    <Breadcrumbs>
      <BreadcrumbLink {...props}>Current</BreadcrumbLink>
    </Breadcrumbs>
  ),
};

const [homeLabel, settingsLabel, accountsLabel] = stories.iconBreadcrumbLabels;

export const WithIcons: Story = {
  ...stories.WithIcons,
  render: () => (
    <Breadcrumbs>
      <BreadcrumbLink ariaLabel={homeLabel} href="#">
        <HomeIcon />
      </BreadcrumbLink>
      <BreadcrumbLink ariaLabel={settingsLabel} href="#">
        <SettingsIcon />
      </BreadcrumbLink>
      <BreadcrumbLink ariaLabel={accountsLabel} href="#">
        <PersonIcon />
      </BreadcrumbLink>
    </Breadcrumbs>
  ),
};
