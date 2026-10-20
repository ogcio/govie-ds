import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterLogo from '@/atoms/footer/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import * as stories from '@/atoms/storybook/FooterLogo.meta';

const meta: Meta = {
  ...stories.meta,
  title: 'Layout/Footer/FooterLogo',
  component: FooterLogo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <FooterLogo {...props}>
      <LogoGoldGreen label="Gov.ie Logo" />
    </FooterLogo>
  ),
};
