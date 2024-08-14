import type { Meta, StoryObj } from '@storybook/react';
import { render } from '../storybook/storybook';
import html from './macro.html?raw';

type HeaderProps = {
  title: string;
};

const Header = render<HeaderProps>({ name: 'govieHeader', html });

const meta = {
  component: Header,
  title: 'layout/Header',
  parameters: {
    macro: {
      name: 'govieHeader',
      html,
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Service Name',
  },
};

export const Title: Story = {
  args: {
    title: 'Title',
  },
};
