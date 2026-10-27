import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderSection from '@/atoms/header/HeaderSection';
import * as stories from '@/atoms/storybook/HeaderSection.meta';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderSection',
  component: HeaderSection,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component: `${stories.meta.parameters.docs.description.component}\n\nThis is the recommended HeaderSection component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderSection } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => <HeaderSection {...props}>{props.children}</HeaderSection>,
};

export const Utility: Story = {
  ...stories.Utility,
  tags: ['skip-playwright'],
  render: (props) => <HeaderSection {...props}>{props.children}</HeaderSection>,
};
