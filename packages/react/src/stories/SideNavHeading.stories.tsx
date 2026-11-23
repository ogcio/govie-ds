import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavHeading from '@/SideNav/SideNavHeading';
import SideNavItem from '@/SideNav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavHeading.meta';
import { importNext } from './helpers';

const meta = {
  ...stories.sideNavHeadingMeta,
  title: 'Navigation/SideNav/SideNavHeading',
  component: SideNavHeading,
  args: {
    ...stories.sideNavHeadingMeta.args,
    children: 'Section heading',
  },
  argTypes: {
    ...stories.sideNavHeadingMeta.argTypes,
    children: {
      control: 'text',
      description: 'Heading text.',
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  parameters: {
    ...stories.sideNavHeadingMeta.parameters,
    docs: {
      ...stories.sideNavHeadingMeta.parameters.docs,
      description: {
        component: `${stories.sideNavHeadingMeta.parameters.docs.description.component}\n\nPlace \`SideNavHeading\` inside \`SideNav\`, before the items it labels.${importNext('SideNavHeading')}`,
      },
    },
  },
} satisfies Meta<typeof SideNavHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavHeading {...props}>{props.children}</SideNavHeading>
      <SideNavItem>Overview</SideNavItem>
      <SideNavItem>Reports</SideNavItem>
    </SideNav>
  ),
};
