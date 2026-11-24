import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterLogo from '@/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import * as stories from '@/atoms/storybook/FooterLogo.meta';
import argTypes from '@/atoms/storybook/argTypes';

const meta: Meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    className: argTypes.class,
    style: {
      ...argTypes.style,
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
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
