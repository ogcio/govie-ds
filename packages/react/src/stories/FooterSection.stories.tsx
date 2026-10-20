import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterSection from '@/atoms/footer/FooterSection';
import * as stories from '@/atoms/storybook/FooterSection.meta';

const meta = {
  ...stories.meta,
  title: 'Layout/Footer/FooterSection',
  component: FooterSection,
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => <FooterSection {...props}>Footer section content</FooterSection>,
};
