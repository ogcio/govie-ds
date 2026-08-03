import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerNavItemLinkMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItemLink.meta';

const meta = {
  ...headerNavItemLinkMeta,
  title: 'Layout/Header/HeaderNavItemLink',
  component: HeaderNavItemLink,
} as Meta<typeof HeaderNavItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink {...props}>{props.children}</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};
