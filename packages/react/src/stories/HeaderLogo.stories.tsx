import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderLogo from '@/atoms/header/HeaderLogo';
import HeaderSection from '@/atoms/header/HeaderSection';
import { LogoWhite } from '@/logos';
import * as stories from '@/atoms/storybook/HeaderLogo.meta';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderLogo',
  component: HeaderLogo,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component: `${stories.meta.parameters.docs.description.component}\n\nThis is the recommended HeaderLogo component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderLogo } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderLogo {...props}>
        <LogoWhite />
      </HeaderLogo>
    </HeaderSection>
  ),
};
