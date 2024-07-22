import type { Meta, StoryObj } from '@storybook/react';
import { DesignTokensIcon } from '../get-started/design-tokens-icon';
import { Card } from './card';

function Center({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

const meta = {
  title: 'Common/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Center>
        <DesignTokensIcon />
      </Center>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    ...Default.args,
    title: 'Design tokens',
  },
};

export const WithLink: Story = {
  args: {
    ...Default.args,
    link: {
      href: '#',
      label: 'Design tokens',
    },
  },
};

export const WithTitleAndLink: Story = {
  args: {
    ...WithTitle.args,
    link: {
      href: '#',
      label: 'Design tokens',
    },
  },
};
