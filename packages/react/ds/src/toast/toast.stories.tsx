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
  argTypes: {
    variant: {
      control: 'radio',
      description: 'Specify the variant of the toast component',
      options: ['info', 'danger', 'success', 'warning'],
    },
    title: {
      control: 'text',
      description: 'Specify the title of the toast component',
    },
    dismissible: {
      control: 'boolean',
      description: 'Specify if the toast is dismissible',
    },
    children: {
      control: 'text',
      description: 'Specify the HTML for the content in the toast component',
    },
    duration: {
      control: 'number',
      description: 'Set the duration of the toast appearing on screen',
    },
    position: {
      control: 'object',
      table: {
        type: {
          summary: `x: ['left', 'center', 'right'] y: ['top', 'cented', 'bottom']`,
        },
      },
      description: 'Specify the position of the toast',
    },
    trigger: {
      control: 'object',
      description:
        'If specified the toast will be triggered by the click event of this React Button Component',
    },
  },
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

export const WithTrigger: Story = {
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

export const withLongerDuration: Story = {
  args: {
    title: 'WithDuration',
    duration: 8000,
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
