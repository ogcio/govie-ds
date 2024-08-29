import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './footer.html?raw';

const macro = { name: 'govieFooter', html };

const Footer = renderComponent(macro);

const meta = {
  component: Footer,
  title: 'Layout/Footer',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};




