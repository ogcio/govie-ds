import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderSection from '@/atoms/header/HeaderSection';
import {
  headerSectionMeta,
  Default as defaultStory,
  Utility as utilityStory,
} from '@/atoms/storybook/HeaderSection.meta';

const meta = {
  ...headerSectionMeta,
  title: 'Layout/Header/HeaderSection',
  component: HeaderSection,
} as Meta<typeof HeaderSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => <HeaderSection {...props}>{props.children}</HeaderSection>,
};

export const Utility: Story = {
  ...utilityStory,
  tags: ['skip-playwright'],
  render: (props) => <HeaderSection {...props}>{props.children}</HeaderSection>,
};
