import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbLink.meta';
import BreadcrumbLink from '@/atoms/breadcrumbs/BreadcrumbLink';
import Breadcrumbs from '@/atoms/breadcrumbs/Breadcrumbs';
import SettingsIcon from '@/atoms/icons/Settings';
import HomeIcon from '@/atoms/icons/Home';
import PersonIcon from '@/atoms/icons/Person';
import { importDisclaimer } from './helpers';

const meta = {
  ...stories.breadcrumbLinkMeta,
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
