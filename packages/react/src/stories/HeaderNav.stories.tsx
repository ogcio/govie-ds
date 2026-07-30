import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerNavMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNav.meta';

const meta = {
  ...headerNavMeta,
  title: 'Layout/Header/HeaderNav',
  component: HeaderNav,
  parameters: {
    ...headerNavMeta.parameters,
    docs: {
      ...headerNavMeta.parameters.docs,
      description: {
        component: `${headerNavMeta.parameters.docs.description.component}\n\nThis is the recommended HeaderNav component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderNav } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav {...props}>
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};
