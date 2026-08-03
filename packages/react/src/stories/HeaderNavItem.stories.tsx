import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItem from '@/atoms/header/HeaderNavItem';
import HeaderSection from '@/atoms/header/HeaderSection';
import SearchIcon from '@/atoms/icons/Search';
import { headerNavItemMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItem.meta';

const meta = {
  ...headerNavItemMeta,
  title: 'Layout/Header/HeaderNavItem',
  component: HeaderNavItem,
} as Meta<typeof HeaderNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItem {...props}>
          {props.children} <SearchIcon />
        </HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
  ),
};
