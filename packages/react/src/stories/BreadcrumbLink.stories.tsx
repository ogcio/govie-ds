import type { Meta, StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbLink.meta';
import BreadcrumbLink from '@/breadcrumbs/BreadcrumbLink';
import Breadcrumbs from '@/breadcrumbs/Breadcrumbs';
import SettingsIcon from '@/atoms/icons/Settings';
import HomeIcon from '@/atoms/icons/Home';
import PersonIcon from '@/atoms/icons/Person';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbLink',
  component: BreadcrumbLink,
  argTypes: {
    ...stories.meta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the anchor element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: {
        disable: true,
      },
      description:
        'Inline styles applied directly to the anchor element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: {
        type: {
          summary: 'React.CSSProperties',
        },
      },
    },
    asChild: {
      control: false,
      description:
        'When true, `BreadcrumbLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
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
  parameters: {
    ...stories.meta.parameters,
    docs: {
      description: {
        component: `${stories.meta.parameters.docs.description.component} ${importNext('BreadcrumbLink')}`,
      },
    },
  },
} satisfies Meta<typeof BreadcrumbLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <Breadcrumbs>
      <BreadcrumbLink {...props}>Home</BreadcrumbLink>
    </Breadcrumbs>
  ),
};

export const CurrentLink: Story = {
  ...stories.CurrentLink,
  tags: ['skip-playwright'],
  render: (props) => (
    <Breadcrumbs>
      <BreadcrumbLink {...props}>Current</BreadcrumbLink>
    </Breadcrumbs>
  ),
};

const [homeLabel, settingsLabel, accountsLabel] = stories.ICON_BREADCRUMB_LABELS;

export const WithIcons: Story = {
  ...stories.WithIcons,
  tags: ['skip-playwright'],
  render: (props) => (
    <Breadcrumbs>
      <BreadcrumbLink {...props} ariaLabel={homeLabel}>
        <HomeIcon />
      </BreadcrumbLink>
      <BreadcrumbLink {...props} ariaLabel={settingsLabel}>
        <SettingsIcon />
      </BreadcrumbLink>
      <BreadcrumbLink {...props} current ariaLabel={accountsLabel}>
        <PersonIcon />
      </BreadcrumbLink>
    </Breadcrumbs>
  ),
};
