import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import Toast from './toast.js';

const meta = {
  title: 'Application/Toast',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
      description: {
        component: 'Toast component',
      },
    },
  },
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Toast Triggered',
    trigger: <Button>Trigger Toast</Button>,
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Dismissible',
    dismissible: true,
  },
};

export const withDuration: Story = {
  args: {
    title: 'WithDuration',
    duration: 8000,
  },
};

export const DangerToast: Story = {
  args: {
    title: 'Danger Toast',
    duration: 8000,
    dismissible: true,
    variant: 'danger',
  },
};

export const withPositionChange: Story = {
  args: {
    title: 'withPositionChange',
    position: {
      x: 'left',
      y: 'bottom',
    },
  },
};
