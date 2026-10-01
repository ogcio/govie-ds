import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavHeading.meta';

const meta = {
  ...stories.sideNavHeadingMeta,
  title: 'Navigation/SideNav/SideNavHeading',
  component: SideNavHeading,
  parameters: {
    ...stories.sideNavHeadingMeta.parameters,
    docs: {
      ...stories.sideNavHeadingMeta.parameters.docs,
      description: {
        component: `${stories.sideNavHeadingMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavHeading component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavHeading } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavHeading>;

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
