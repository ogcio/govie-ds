import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderTitle from '@/atoms/header/HeaderTitle';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerTitleMeta, Default as defaultStory } from '@/atoms/storybook/HeaderTitle.meta';

const meta = {
  ...headerTitleMeta,
  title: 'Layout/Header/HeaderTitle',
  component: HeaderTitle,
} as Meta<typeof HeaderTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => (
    <HeaderSection>
      <HeaderTitle {...props}>{props.children}</HeaderTitle>
    </HeaderSection>
  ),
};
