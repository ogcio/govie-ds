import type { Meta, StoryObj } from '@storybook/react';
import { Container, ContainerInsetSizeEnum } from './container.js';

const meta = {
  title: 'Layout/Container',
  parameters: {
    docs: {
      description: {
        component:
          'Container component when you need a centralised, consistent layout wrapper for content on your webpage.',
      },
    },
  },
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
    insetTop: {
      control: 'select',
      options: Object.values(ContainerInsetSizeEnum),
      description:
        'Defines the top padding of the container. Options are `none`, `md`, `lg`, and `xl`.',
    },
    insetBottom: {
      control: 'select',
      options: Object.values(ContainerInsetSizeEnum),
      description:
        'Defines the bottom padding of the container. Options are `none`, `md`, `lg`, and `xl`.',
    },
  },
  args: {
    children: `Paragraph`,
  },
};

export const WithNoneInset: Story = {
  args: {
    children: 'Paragraph',
    insetBottom: ContainerInsetSizeEnum.None,
    insetTop: ContainerInsetSizeEnum.None,
  },
};

export const WithMediumInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Medium,
    insetBottom: ContainerInsetSizeEnum.Medium,
  },
};

export const WithLargeInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Large,
    insetBottom: ContainerInsetSizeEnum.Large,
  },
};

export const WithExtraLargeInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.ExtraLarge,
    insetBottom: ContainerInsetSizeEnum.ExtraLarge,
  },
};
