import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithHomeHref: Story = {
  args: {
    homeHref: '#',
  },
};

export const WithServiceName: Story = {
  args: {
    serviceName: 'Service Name',
  },
};

export const WithServiceHref: Story = {
  args: {
    serviceName: 'Service Name',
    serviceHref: '#',
  },
};
