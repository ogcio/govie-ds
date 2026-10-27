import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItemLink from '@/HeaderNavItemLink';
import HeaderNavItemSeparator from '@/atoms/header/HeaderNavItemSeparator';
import HeaderSection from '@/atoms/header/HeaderSection';
import * as stories from '@/atoms/storybook/HeaderNavItemSeparator.meta';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderNavItemSeparator',
  component: HeaderNavItemSeparator,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component: `${stories.meta.parameters.docs.description.component}\n\nThis is the recommended HeaderNavItemSeparator component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderNavItemSeparator } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderNavItemSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemSeparator {...props} />
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};

export const Light: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  args: {
    id: 'header-nav-item-separator-light-id',
    dataTestId: 'header-nav-item-separator-light',
  },
  render: (props) => (
    <HeaderSection appearance="light">
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemSeparator {...props} />
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};
