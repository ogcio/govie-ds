import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerNavMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNav.meta';

const meta = {
  ...headerNavMeta,
  title: 'Layout/Header/HeaderNav',
  component: HeaderNav,
} as Meta<typeof HeaderNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => (
    <HeaderSection>
      <HeaderNav {...props}>
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};
