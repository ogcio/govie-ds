import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderTitle from '@/atoms/header/HeaderTitle';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerTitleMeta, Default as defaultStory } from '@/atoms/storybook/HeaderTitle.meta';

const meta = {
  ...headerTitleMeta,
  title: 'Layout/Header/HeaderTitle',
  component: HeaderTitle,
  parameters: {
    ...headerTitleMeta.parameters,
    docs: {
      ...headerTitleMeta.parameters.docs,
      description: {
        component: `${headerTitleMeta.parameters.docs.description.component}\n\nThis is the recommended HeaderTitle component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderTitle } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderTitle {...props}>{props.children}</HeaderTitle>
    </HeaderSection>
  ),
};
