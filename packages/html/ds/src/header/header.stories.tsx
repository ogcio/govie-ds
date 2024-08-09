import type { Meta, StoryObj } from '@storybook/react';
import { renderMacro } from '../storybook/storybook';
import macro from './macro.html?raw';

type HeaderProps = {
  title: string;
};

const Header = renderMacro<HeaderProps>({ macro, name: 'govieHeader' });

const meta = {
  component: Header,
  title: 'layout/Header',
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
