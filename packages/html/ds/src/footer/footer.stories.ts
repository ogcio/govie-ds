import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './footer.html?raw';

// Name of the folder the macro resides
const path = import.meta.url.split('/footer')[0];

const macro = { name: 'govieFooter', html, path };

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
