import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './container.html?raw';
import { ContainerProps } from './container.schema';

const macro = { name: 'govieContainer', html };

const Container = renderComponent<ContainerProps>(macro);

const meta = {
  component: Container,
  title: 'Layout/Container',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    html: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
  },
  args: {
    html: `<p>Paragraph</p>`,
  },
};
