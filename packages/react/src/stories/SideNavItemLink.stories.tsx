import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavItemLink from '@/atoms/sidenav/SideNavItemLink';
import { sideNavItemLinkMeta, Default as defaultStory } from '@/atoms/storybook/SideNavItemLink.meta';

const meta = {
  ...sideNavItemLinkMeta,
  title: 'Navigation/SideNav/SideNavItemLink',
  component: SideNavItemLink,
  parameters: {
    ...sideNavItemLinkMeta.parameters,
    docs: {
      ...sideNavItemLinkMeta.parameters.docs,
      description: {
        component: `${sideNavItemLinkMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavItemLink component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavItemLink } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>{props.children}</SideNavItemLink>
    </SideNav>
  ),
};
