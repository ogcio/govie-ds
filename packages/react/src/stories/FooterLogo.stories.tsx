import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterLogo from '@/atoms/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import { footerLogoMeta, Default as defaultStory } from '@/atoms/storybook/FooterLogo.meta';

const meta: Meta = {
  ...footerLogoMeta,
  title: 'Layout/Footer/FooterLogo',
  component: FooterLogo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => (
    <FooterLogo {...props}>
      <LogoGoldGreen label="Gov.ie Logo" />
    </FooterLogo>
  ),
};
