import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItem from '@/HeaderNavItem';
import HeaderSection from '@/atoms/header/HeaderSection';
import { SearchIcon } from '@/icons';
import * as stories from '@/atoms/storybook/HeaderNavItem.meta';
import * as buttonStories from '@/atoms/storybook/HeaderNavItemButton.meta';

const meta = {
  ...stories.meta,
  args: { ...stories.meta.args, ...buttonStories.meta.args },
  argTypes: {
    ...stories.meta.argTypes,
    ...buttonStories.meta.argTypes,
    style: {
      control: false,
      description: 'Inline styles. Prefer className with gi-* Tailwind utilities.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
  title: 'Layout/Header/HeaderNavItem',
  component: HeaderNavItem,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component: `Button-style navigation item for header menus. Use for actions that open panels or drawers rather than navigating to a URL.\n\nThis is the recommended HeaderNavItem component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderNavItem } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...buttonStories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItem {...props}>
          {props.children}
          <SearchIcon />
        </HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
  ),
};
